const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch all explore skills
 */
export async function fetchExploreSkills() {
  const res = await fetch(`${API_URL}/api/skills/explore`);
  if (!res.ok) throw new Error("Failed to fetch explore skills");
  return res.json();
}

/**
 * Add skill interest
 */
export async function addSkillInterest(clerkId, skill) {
  const res = await fetch(`${API_URL}/api/skills/add-interest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clerkId, skill }),
  });

  if (!res.ok) throw new Error("Failed to add skill interest");
  return res.json();
}

/**
 * Fetch user's skill interests (dashboard)
 */
export async function fetchSkillInterests(clerkId) {
  const res = await fetch(
    `${API_URL}/api/dashboard/skill-interests?clerkId=${clerkId}`
  );

  if (!res.ok) throw new Error("Failed to fetch skill interests");
  return res.json();
}

/**
 * Fetch mentors by skill
 */
export async function fetchMentorsBySkill(skill) {
  const res = await fetch(
    `${API_URL}/api/skills/mentors?skill=${encodeURIComponent(skill)}`
  );

  if (!res.ok) throw new Error("Failed to fetch mentors");
  return res.json();
}
