const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchDashboardSummary(clerkId) {
    
  const res = await fetch(
    `${API_BASE_URL}/api/dashboard/summary?clerkId=${clerkId}`
  );

  if (!res.ok) throw new Error("Failed to fetch dashboard summary");
  return res.json();
}

export async function fetchLearningProgress(clerkId) {
  const res = await fetch(
    `${API_BASE_URL}/api/dashboard/progress?clerkId=${clerkId}`
  );

  if (!res.ok) throw new Error("Failed to fetch progress data");
  return res.json();
}

export async function fetchUserSkills(clerkId) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/dashboard/skills?clerkId=${clerkId}`
  );

  if (!res.ok) throw new Error("Failed to fetch user skills");
  return res.json();
}

