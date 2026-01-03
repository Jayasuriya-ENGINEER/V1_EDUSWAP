import express from "express";
import supabase from "../supabase.js";

const router = express.Router();

/**
 * POST /api/requests
 * Create a request
 */
router.post("/", async (req, res) => {
  try {
    const { fromClerkId, toUserId, mentorSkillId } = req.body;

    if (!fromClerkId || !toUserId || !mentorSkillId) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const { data: fromUser, error: fromUserError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", fromClerkId)
      .single();

    if (fromUserError || !fromUser) {
      return res.status(404).json({ error: "Sender not found" });
    }

    await supabase.from("requests").insert({
      from_user_id: fromUser.id,
      to_user_id: toUserId,
      mentor_skill_id: mentorSkillId,
      status: "pending",
    });

    res.json({ success: true });
  } catch (err) {
    console.error("REQUEST CREATE ERROR:", err);
    res.status(500).json({ error: "Request failed" });
  }
});

/**
 * GET /api/requests/incoming
 * Get incoming requests
 */
router.get("/incoming", async (req, res) => {
  try {
    const { clerkId } = req.query;

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkId)
      .single();

    if (!user) return res.json([]);

    const { data, error } = await supabase
      .from("requests")
      .select(
        `
        id,
        mentor_skills ( skill ),
        users!requests_from_user_id_fkey ( name )
      `
      )
      .eq("to_user_id", user.id)
      .eq("status", "pending");

    if (error) {
      console.error("FETCH INCOMING ERROR:", error);
      return res.status(500).json([]);
    }

    res.json(data);
  } catch (err) {
    console.error("INCOMING REQUEST ERROR:", err);
    res.status(500).json([]);
  }
});

/**
 * POST /api/requests/:id/accept
 * Accept request + create conversation + session
 */
router.post("/:id/accept", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("➡️ ACCEPT REQUEST ID:", id);

    // 1️⃣ Get request details with mentor skill info
    const { data: request, error: fetchError } = await supabase
      .from("requests")
      .select(
        `
        *,
        mentor_skills ( skill )
      `
      )
      .eq("id", id)
      .single();

    if (fetchError || !request) {
      console.error("❌ REQUEST FETCH FAILED:", fetchError);
      return res.status(404).json({ error: "Request not found" });
    }

    console.log("✅ REQUEST FETCHED:", request);

    // 2️⃣ Update request status
    const { error: updateError } = await supabase
      .from("requests")
      .update({ status: "accepted" })
      .eq("id", id);

    if (updateError) {
      console.error("❌ REQUEST UPDATE FAILED:", updateError);
      return res.status(500).json({ error: "Request update failed" });
    }

    console.log("✅ REQUEST UPDATED");

    // 3️⃣ Create conversation
    const { data: conversation, error: convoError } = await supabase
      .from("conversations")
      .insert({
        request_id: request.id,
        user1_id: request.from_user_id,
        user2_id: request.to_user_id,
        meet_link: null,
      })
      .select()
      .single();

    if (convoError || !conversation) {
      console.error("❌ CONVERSATION CREATE FAILED:", convoError);
      return res.status(500).json({ error: "Conversation failed" });
    }

    console.log("✅ CONVERSATION CREATED:", conversation);

    // 4️⃣ Create session (IMPORTANT: Link to conversation)
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .insert({
        mentor_id: request.to_user_id,
        learner_id: request.from_user_id,
        skill: request.mentor_skills.skill,
        status: "pending",
        conversation_id: conversation.id, // 🔥 THIS IS CRUCIAL
      })
      .select()
      .single();

    if (sessionError || !session) {
      console.error("❌ SESSION CREATE FAILED:", sessionError);
      return res.status(500).json({ error: "Session creation failed" });
    }

    console.log("✅ SESSION CREATED:", session);

    res.json({ success: true });
  } catch (err) {
    console.error("🔥 ACCEPT ERROR:", err);
    res.status(500).json({ error: "Accept failed" });
  }
});

/**
 * POST /api/requests/:id/reject
 */
router.post("/:id/reject", async (req, res) => {
  try {
    await supabase
      .from("requests")
      .update({ status: "rejected" })
      .eq("id", req.params.id);

    res.json({ success: true });
  } catch (err) {
    console.error("REJECT ERROR:", err);
    res.status(500).json({ error: "Reject failed" });
  }
});

export default router;
