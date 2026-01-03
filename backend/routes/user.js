import express from "express";
import supabase from "../supabase.js";

const router = express.Router();

/**
 * POST /api/user/sync
 * Called after Clerk login
 */
router.post("/sync", async (req, res) => {
  try {
    const { clerkId, name, email } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "Missing data" });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_id", clerkId)
      .single();

    if (existingUser) {
      return res.json(existingUser);
    }

    // Create user
    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        clerk_id: clerkId,
        name,
        email,
        credits: 0,
      })
      .select()
      .single();

    if (error) throw error;

    res.json(newUser);
  } catch (err) {
    console.error("USER SYNC ERROR:", err);
    res.status(500).json({ error: "Failed to sync user" });
  }
});






export default router;
