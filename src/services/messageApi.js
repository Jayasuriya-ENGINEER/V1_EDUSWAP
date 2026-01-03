const API_URL = import.meta.env.VITE_API_URL;

export async function fetchMessages(conversationId) {
  const res = await fetch(`${API_URL}/api/messages/${conversationId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  return res.json();
}

export async function sendMessage(conversationId, clerkId, content) {
  const res = await fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationId,
      clerkId,
      content,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}
