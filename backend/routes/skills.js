import express from "express";
import supabase from "../supabase.js";

const router = express.Router();

/**
 * GET /api/skills/explore
 */
router.get("/explore", async (req, res) => {
  try {
    const { data: sessions } = await supabase
      .from("sessions")
      .select("skill, mentor_id")
      .eq("status", "completed");

    const skillMap = {};

    sessions.forEach(({ skill, mentor_id }) => {
      if (!skillMap[skill]) {
        skillMap[skill] = new Set();
      }
      skillMap[skill].add(mentor_id);
    });

    const skills = Object.entries(skillMap).map(([skill, mentors]) => ({
      skill,
      mentorCount: mentors.size,
    }));

    res.json(skills);
  } catch (err) {
    console.error("EXPLORE SKILLS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

/**
 * GET /api/skills/mentors?skill=React
 */
router.get("/mentors", async (req, res) => {
  try {
    const { skill } = req.query;
    if (!skill) {
      return res.status(400).json({ error: "Skill is required" });
    }

    const { data: sessions, error } = await supabase
      .from("sessions")
      .select(
        `
        mentor_id,
        users:mentor_id (
          id,
          name,
          email
        )
      `
      )
      .eq("skill", skill)
      .eq("status", "completed");

    if (error) throw error;

    // Remove duplicate mentors
    const mentorMap = {};
    sessions.forEach((row) => {
      mentorMap[row.mentor_id] = row.users;
    });

    res.json(Object.values(mentorMap));
  } catch (err) {
    console.error("MENTORS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch mentors" });
  }
});

/**
 * POST /api/skills/add-interest
 */
router.post("/add-interest", async (req, res) => {
  try {
    const { clerkId, skill } = req.body;
    if (!clerkId || !skill) {
      return res.status(400).json({ error: "Missing data" });
    }

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkId)
      .single();

    await supabase.from("skill_interests").insert({
      user_id: user.id,
      skill,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("ADD INTEREST ERROR:", err);
    res.status(500).json({ error: "Failed to add interest" });
  }
});

export default router;
