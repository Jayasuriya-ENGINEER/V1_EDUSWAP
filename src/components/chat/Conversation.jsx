import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../services/supabaseClient";
import { fetchMessages, sendMessage } from "../../services/messageApi";

export default function Conversation({ conversation }) {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [meetLink, setMeetLink] = useState(conversation.meet_link || null);
  const bottomRef = useRef(null);

  /* Check Google connection status */
  useEffect(() => {
    fetch("http://localhost:5000/api/google/status")
      .then((res) => res.json())
      .then((data) => setIsGoogleConnected(data.connected))
      .catch(() => setIsGoogleConnected(false));
  }, []);

  /* Update meet link when conversation changes */
  useEffect(() => {
    setMeetLink(conversation.meet_link);
  }, [conversation.meet_link]);

  /* Connect to Google */
  function handleConnectGoogle() {
    window.open("http://localhost:5000/api/google/auth", "_blank");

    // Poll for connection status
    const interval = setInterval(async () => {
      const res = await fetch("http://localhost:5000/api/google/status");
      const data = await res.json();

      if (data.connected) {
        setIsGoogleConnected(true);
        clearInterval(interval);
      }
    }, 2000);
  }

  /* Create or join Meet */
  async function handleJoinMeet() {
    if (!isGoogleConnected) {
      alert("Please connect Google Calendar first");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/conversations/${conversation.id}/meet`,
        { method: "POST" }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Meet creation failed");
      }

      const data = await res.json();
      setMeetLink(data.meetLink);
      window.open(data.meetLink, "_blank");
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  }





  /* Load messages */
  useEffect(() => {
    if (!conversation?.id) return;

    fetchMessages(conversation.id)
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch(() => setMessages([]));
  }, [conversation.id]);

  /* Realtime */
  useEffect(() => {
    if (!conversation?.id) return;

    const channel = supabase
      .channel(`messages-${conversation.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [conversation.id]);

  /* Auto scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!text.trim()) return;

    const optimistic = {
      id: crypto.randomUUID(),
      sender_clerk_id: user.id,
      content: text,
      created_at: null,
    };

    setMessages((prev) => [...prev, optimistic]);
    setText("");

    await sendMessage(conversation.id, user.id, text);
  }



  async function handleCompleteSession() {
    if (
      !confirm(
        "Mark this session as completed? This will award credits to the mentor."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/conversations/${conversation.id}/complete`,
        { method: "POST" }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to complete session");
      }

      const data = await res.json();
      alert(
        `Session completed! ${data.creditsAwarded} credits awarded to mentor 🎉`
      );
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  }

  return (
    <div className="h-full flex flex-col bg-zinc-50">
      {/* HEADER */}
      {/* HEADER */}
      <div className="h-14 bg-white border-b px-4 flex items-center justify-between">
        <p className="font-medium text-sm">{conversation.other_user_name}</p>

        <div className="flex gap-2">
          {!isGoogleConnected ? (
            <button
              onClick={handleConnectGoogle}
              className="text-sm px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Connect Google
            </button>
          ) : meetLink ? (
            <>
              <button
                onClick={() => window.open(meetLink, "_blank")}
                className="text-sm px-3 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600"
              >
                Join Meeting
              </button>
              <button
                onClick={handleCompleteSession}
                className="text-sm px-3 py-1.5 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
              >
                Complete Session
              </button>
            </>
          ) : (
            <button
              onClick={handleJoinMeet}
              className="text-sm px-3 py-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
            >
              Create Meet
            </button>
          )}
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.sender_clerk_id === user.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm
                  ${
                    isMe
                      ? "bg-orange-500 text-white rounded-br-sm"
                      : "bg-white border rounded-bl-sm"
                  }`}
              >
                {msg.content}

                {msg.created_at && (
                  <div className="text-[10px] opacity-60 mt-1 text-right">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="h-16 bg-white border-t px-4 flex items-center gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 border rounded-full text-sm outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
