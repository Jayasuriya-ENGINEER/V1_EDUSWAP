import express from "express";
import supabase from "../supabase.js";

const router = express.Router();

/**
 * GET /api/dashboard/summary
 */
router.get("/summary", async (req, res) => {
  try {
    const { clerkId } = req.query;
    if (!clerkId) {
      return res.status(400).json({ error: "clerkId required" });
    }

    // 1️⃣ Fetch user
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, name, credits")
      .eq("clerk_id", clerkId)
      .single();

    if (userError || !user) {
      console.error("USER ERROR:", userError);
      return res.status(404).json({ error: "User not found" });
    }

    // 2️⃣ Skills taught (count of completed sessions as mentor)
    const { data: taughtSessions, error: taughtError } = await supabase
      .from("sessions")
      .select("id")
      .eq("mentor_id", user.id)
      .eq("status", "completed");

    if (taughtError) console.warn("TAUGHT ERROR:", taughtError);

    // 3️⃣ Lessons completed (count of completed sessions as learner)
    const { data: learnedSessions, error: learnedError } = await supabase
      .from("sessions")
      .select("id, completed_at")
      .eq("learner_id", user.id)
      .eq("status", "completed");

    if (learnedError) console.warn("LEARNED ERROR:", learnedError);

    // 4️⃣ Calculate average learning per week
    let avgLearningPerWeek = 0;
    if (learnedSessions && learnedSessions.length > 0) {
      const completedDates = learnedSessions
        .map((s) => s.completed_at)
        .filter(Boolean)
        .map((date) => new Date(date));

      if (completedDates.length > 0) {
        const oldestDate = new Date(Math.min(...completedDates));
        const newestDate = new Date(Math.max(...completedDates));
        const weeksDiff = Math.max(
          1,
          (newestDate - oldestDate) / (1000 * 60 * 60 * 24 * 7)
        );

        // Assuming 1 hour per session
        avgLearningPerWeek =
          Math.round((learnedSessions.length / weeksDiff) * 10) / 10;
      }
    }

    // 5️⃣ Final response
    res.json({
      name: user.name,
      credits: user.credits ?? 0,
      skillsTaught: taughtSessions?.length ?? 0,
      lessonsCompleted: learnedSessions?.length ?? 0,
      avgLearningPerWeek,
    });
  } catch (err) {
    console.error("SUMMARY CRASH:", err);
    res.status(500).json({ error: "Dashboard summary failed" });
  }
});

/**
 * GET /api/dashboard/skills
 */
router.get("/skills", async (req, res) => {
  try {
    const { clerkId } = req.query;
    if (!clerkId) {
      return res.status(400).json({ error: "clerkId required" });
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkId)
      .single();

    if (!user || userError) {
      return res.json({ skillsTaught: [], skillsLearned: [] });
    }

    const { data: taught = [] } = await supabase
      .from("sessions")
      .select("skill")
      .eq("mentor_id", user.id)
      .eq("status", "completed");

    const { data: learned = [] } = await supabase
      .from("sessions")
      .select("skill")
      .eq("learner_id", user.id)
      .eq("status", "completed");

    res.json({
      skillsTaught: [...new Set(taught.map((s) => s.skill))],
      skillsLearned: [...new Set(learned.map((s) => s.skill))],
    });
  } catch (err) {
    console.error("SKILLS ERROR:", err);
    res.status(500).json({ error: "Failed to load skills" });
  }
});

/**
 * GET /api/dashboard/skill-interests
 */
router.get("/skill-interests", async (req, res) => {
  try {
    const { clerkId } = req.query;
    if (!clerkId) {
      return res.status(400).json({ error: "clerkId required" });
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkId)
      .single();

    if (!user || userError) {
      return res.json([]);
    }

    const { data = [] } = await supabase
      .from("skill_interests")
      .select("skill")
      .eq("user_id", user.id);

    res.json(data.map((d) => d.skill));
  } catch (err) {
    console.error("INTEREST ERROR:", err);
    res.status(500).json({ error: "Failed to load interests" });
  }
});

/**
 * GET /api/dashboard/progress
 */
router.get("/progress", async (req, res) => {
  try {
    const { clerkId } = req.query;
    if (!clerkId) {
      return res.status(400).json({ error: "clerkId required" });
    }

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkId)
      .single();

    if (!user) return res.json([]);

    const { data: sessions } = await supabase
      .from("sessions")
      .select("completed_at")
      .eq("learner_id", user.id)
      .eq("status", "completed")
      .not("completed_at", "is", null);

    if (!sessions || sessions.length === 0) {
      return res.json([]);
    }

    const weekly = {};

    sessions.forEach((s) => {
      const d = new Date(s.completed_at);
      // Get week number of year
      const startOfYear = new Date(d.getFullYear(), 0, 1);
      const days = Math.floor((d - startOfYear) / (24 * 60 * 60 * 1000));
      const weekNum = Math.ceil((days + startOfYear.getDay() + 1) / 7);

      const key = `W${weekNum} ${d.getFullYear()}`;
      weekly[key] = (weekly[key] || 0) + 1;
    });

    const graphData = Object.entries(weekly)
      .map(([week, lessons]) => ({
        week,
        lessons,
      }))
      .sort((a, b) => {
        const [aWeek, aYear] = a.week.split(" ");
        const [bWeek, bYear] = b.week.split(" ");
        if (aYear !== bYear) return parseInt(aYear) - parseInt(bYear);
        return parseInt(aWeek.slice(1)) - parseInt(bWeek.slice(1));
      });

    res.json(graphData);
  } catch (err) {
    console.error("PROGRESS ERROR:", err);
    res.status(500).json({ error: "Progress failed" });
  }
});

export default router;
