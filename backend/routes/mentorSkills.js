import express from "express";
import supabase from "../supabase.js";

const router = express.Router();

/**
 * POST /api/mentor-skills
 */
router.post("/", async (req, res) => {
  try {
    const {
      clerkId,
      mentorName,
      skill,
      level,
      weeklyAvailability,
      description,
      bannerUrl,
    } = req.body;

    if (!clerkId || !skill || !mentorName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1️⃣ Get user
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkId)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2️⃣ Insert mentor skill
    const { error } = await supabase.from("mentor_skills").insert({
      user_id: user.id,
      mentor_name: mentorName,
      skill,
      level,
      weekly_availability: weeklyAvailability,
      description,
      banner_url: bannerUrl,
    });

    if (error) {
      console.error("INSERT ERROR:", error);
      return res.status(500).json({ error: "Insert failed" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("MENTOR SKILL ERROR:", err);
    res.status(500).json({ error: "Server crashed" });
  }
});


/**
 * GET /api/mentor-skills/my
 */
router.get("/", async (req, res) => {
  try {
    const { clerkId } = req.query;

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkId)
      .single();

    const { data } = await supabase
      .from("mentor_skills")
      .select("id, skill, level")
      .eq("user_id", user.id);

    res.json(data);
  } catch (err) {
    console.error("MY MENTOR SKILLS ERROR:", err);
    res.status(500).json({ error: "Failed to load mentor skills" });
  }
});



/**
 * GET /api/mentor-skills/public
 */
router.get("/public", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("mentor_skills")
      .select(
        `
    id,
    user_id,
    skill,
    level,
    banner_url,
    rating,
    total_learners,
    users (
      name
    )
  `
      )
      .order("created_at", { ascending: false });


    if (error) {
      console.error("PUBLIC MENTOR SKILLS ERROR:", error);
      return res.status(500).json({ error: "Failed to load mentor skills" });
    }

   const formatted = data.map((item) => ({
     id: item.id, // mentor_skill_id
     userId: item.user_id, // ✅ THIS IS THE FIX
     skill: item.skill,
     level: item.level,
     bannerUrl: item.banner_url,
     rating: item.rating || 0,
     totalLearners: item.total_learners || 0,
     mentorName: item.users?.name || "Mentor",
   }));

    res.json(formatted);
  } catch (err) {
    console.error("PUBLIC MENTOR SKILLS CRASH:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/public/:skill", async (req, res) => {
  try {
    const { skill } = req.params;

    const { data, error } = await supabase
      .from("mentor_skills")
      .select("*")
      .ilike("skill", skill);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("PUBLIC MENTOR FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch mentors" });
  }
});



export default router;
