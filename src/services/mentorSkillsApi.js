const BASE_URL = `${import.meta.env.VITE_API_URL}/api/mentor-skills`;

export async function addMentorSkill(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to add mentor skill");
  return res.json();
}

export async function fetchMyMentorSkills(clerkId) {
  const res = await fetch(`${BASE_URL}?clerkId=${clerkId}`);
  if (!res.ok) throw new Error("Failed to fetch mentor skills");
  return res.json();
}

/** 🔓 All public mentor skills */
export async function fetchPublicMentorSkills() {
  const res = await fetch(`${BASE_URL}/public`);
  if (!res.ok) throw new Error("Failed to fetch public mentor skills");
  return res.json();
}

/** 🎯 Mentors by skill (THIS WAS MISSING) */
export async function fetchPublicMentorSkill(skill) {
  const res = await fetch(`${BASE_URL}/public/${encodeURIComponent(skill)}`);
  if (!res.ok) throw new Error("Failed to fetch mentors by skill");
  return res.json();
}
