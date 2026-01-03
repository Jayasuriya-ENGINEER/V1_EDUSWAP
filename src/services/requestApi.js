const BASE = `${import.meta.env.VITE_API_URL}/api/requests`;

export async function sendRequest(fromClerkId, mentorSkillId) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fromClerkId, mentorSkillId }),
  });

  if (!res.ok) throw new Error("Request failed");
}

export async function fetchInbox(clerkId) {
  const res = await fetch(`${BASE}/inbox?clerkId=${clerkId}`);
  if (!res.ok) throw new Error("Inbox failed");
  return res.json();
}

export async function acceptRequest(requestId) {
  const res = await fetch(`${BASE}/${requestId}/accept`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Accept failed");
}



export async function fetchMyRequests(clerkId) {
  const res = await fetch(`${BASE}/incoming?clerkId=${clerkId}`);
  if (!res.ok) throw new Error("Failed to fetch requests");
  return res.json();
}

export async function respondToRequest(id, action, meetLink = null) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/requests/${id}/accept`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetLink }),
    }
  );

  if (!res.ok) throw new Error("Failed");
}
