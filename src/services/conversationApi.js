const BASE = `${import.meta.env.VITE_API_URL}/api/conversations`;

/**
 * Fetch all conversations for logged-in user
 */

export async function fetchMyConversations(clerkId) {
  const res = await fetch(`${BASE}?clerkId=${clerkId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch conversations");
  }

  return res.json();
}
