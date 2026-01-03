export async function fetchMessages(conversationId) {
  const res = await fetch(
    `http://localhost:5000/api/messages/${conversationId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  return res.json();
}

export async function sendMessage(conversationId, clerkId, content) {
  const res = await fetch("http://localhost:5000/api/messages", {
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
