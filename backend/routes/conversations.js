import express from "express";
import supabase from "../supabase.js";
import { google } from "googleapis";
import { createMeetEvent } from "../services/googleCalendar.js";

const router = express.Router();

/**
 * GET /api/conversations?clerkId=
 * Fetch all conversations for user
 */
router.get("/", async (req, res) => {
  try {
    const { clerkId } = req.query;

    if (!clerkId) {
      return res.status(400).json({ error: "Missing clerkId" });
    }

    // Find user
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkId)
      .single();

    if (!user) return res.json([]);

    // Fetch conversations
    const { data, error } = await supabase
      .from("conversations")
      .select(
        `
        id,
        meet_link,
        user1_id,
        user2_id,
        users1:users!conversations_user1_id_fkey ( name ),
        users2:users!conversations_user2_id_fkey ( name )
      `
      )
      .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("CONVERSATION FETCH ERROR:", error);
      return res.status(500).json({ error: "Failed to fetch conversations" });
    }

    // Normalize other user name
    const conversations = data.map((c) => ({
      id: c.id,
      meet_link: c.meet_link,
      other_user_name: c.user1_id === user.id ? c.users2.name : c.users1.name,
    }));

    res.json(conversations);
  } catch (err) {
    console.error("FETCH CONVERSATIONS CRASH:", err);
    res.status(500).json({ error: "Server crash" });
  }
});

/**
 * POST /api/conversations/:id/meet
 * Create or retrieve Google Meet link
 */
router.post("/:id/meet", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("📍 CREATE MEET REQUEST FOR:", id);

    // 1️⃣ Check if meet link already exists
    const { data: conversation, error: fetchError } = await supabase
      .from("conversations")
      .select("meet_link")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("❌ Conversation fetch error:", fetchError);
      return res.status(404).json({ error: "Conversation not found" });
    }

    // 2️⃣ If meet link exists, return it
    if (conversation.meet_link) {
      console.log("✅ Reusing existing meet link:", conversation.meet_link);
      return res.json({ meetLink: conversation.meet_link });
    }

    // 3️⃣ Check Google connection
    if (!global.googleTokens) {
      console.error("❌ Google not connected");
      return res.status(400).json({ error: "Google not connected" });
    }

    // 4️⃣ Create OAuth client
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    auth.setCredentials(global.googleTokens);

    // 5️⃣ Create NEW Meet link
    console.log("🔄 Creating new meet link...");
    const meetLink = await createMeetEvent(auth, "Skill Swap Session");
    console.log("✅ Meet link created:", meetLink);

    // 6️⃣ Save meet link to database
    const { error: updateError } = await supabase
      .from("conversations")
      .update({ meet_link: meetLink })
      .eq("id", id);

    if (updateError) {
      console.error("❌ Failed to save meet link:", updateError);
      return res.status(500).json({ error: "Failed to save meet link" });
    }

    res.json({ meetLink });
  } catch (err) {
    console.error("🔥 MEET ERROR:", err);
    res.status(500).json({ error: "Meet creation failed" });
  }
});

/**
 * POST /api/conversations/:id/complete
 * Mark session as completed and award credits
 */


router.post("/:id/complete", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("📍 COMPLETE SESSION REQUEST FOR:", id);

    // 1️⃣ Find session by conversation ID
    const { data: session, error: fetchError } = await supabase
      .from("sessions")
      .select("*")
      .eq("conversation_id", id)
      .single();

    if (fetchError) {
      console.error("❌ SESSION NOT FOUND:", fetchError);

      // 🔍 Debug: Check if conversation exists
      const { data: conv } = await supabase
        .from("conversations")
        .select("*")
        .eq("id", id)
        .single();

      console.log("🔍 Conversation exists:", !!conv);

      // 🔍 Debug: Check all sessions for this conversation
      const { data: allSessions } = await supabase
        .from("sessions")
        .select("*")
        .eq("conversation_id", id);

      console.log("🔍 Sessions found:", allSessions?.length || 0);

      return res
        .status(404)
        .json({ error: "Session not found for this conversation" });
    }

    // Check if already completed
    if (session.status === "completed") {
      return res.status(400).json({ error: "Session already completed" });
    }

    // 2️⃣ Update session to completed
    const { error: updateError } = await supabase
      .from("sessions")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", session.id);

    if (updateError) {
      console.error("❌ SESSION UPDATE FAILED:", updateError);
      return res.status(500).json({ error: "Failed to complete session" });
    }

    console.log("✅ SESSION COMPLETED");

    // 3️⃣ Award credits to mentor
    const { data: mentor, error: mentorFetchError } = await supabase
      .from("users")
      .select("credits")
      .eq("id", session.mentor_id)
      .single();

    if (mentor && !mentorFetchError) {
      const { error: creditError } = await supabase
        .from("users")
        .update({ credits: (mentor.credits || 0) + 10 })
        .eq("id", session.mentor_id);

      if (creditError) {
        console.error("❌ CREDIT UPDATE FAILED:", creditError);
      } else {
        console.log("✅ CREDITS AWARDED TO MENTOR");
      }
    }

    res.json({ success: true, creditsAwarded: 10 });
  } catch (err) {
    console.error("🔥 COMPLETE SESSION ERROR:", err);
    res.status(500).json({ error: "Failed to complete session" });
  }
});



export default router;
