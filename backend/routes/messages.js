import express from "express";
import supabase from "../supabase.js";

const router = express.Router();

/**
 * GET /api/messages/:conversationId
 * Fetch messages for a conversation
 */
router.get("/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("❌ FETCH MESSAGES ERROR:", error);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }

    res.json(data);
  } catch (err) {
    console.error("🔥 MESSAGES GET CRASH:", err);
    res.status(500).json({ error: "Server crash" });
  }
});

/**
 * POST /api/messages
 * Send a message
 */
router.post("/", async (req, res) => {
  try {
    console.log("📥 RAW BODY:", req.body);

    const { conversationId, clerkId, content } = req.body;

    console.log("➡️ Parsed:", { conversationId, clerkId, content });

    if (!conversationId || !clerkId || !content) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // 🔎 Find user by clerk_id
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkId)
      .single();

    console.log("👤 USER:", user, userError);

    if (userError || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ INSERT MESSAGE (FIXED COLUMN NAME)
    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_clerk_id: clerkId, // ✅ CORRECT COLUMN
        content: content,
      })
      .select()
      .single();

    console.log("💬 INSERT RESULT:", data, error);

    if (error) {
      return res.status(500).json(error);
    }

    res.json(data);
  } catch (err) {
    console.error("🔥 MESSAGE ROUTE CRASH:", err);
    res.status(500).json({ error: "Server crash" });
  }
});

export default router;
