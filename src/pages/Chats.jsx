import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { MessageSquare, Search, UserCircle2 } from "lucide-react";

import { fetchMyConversations } from "../services/conversationApi";
import Conversation from "../components/chat/Conversation";

export default function Chats() {
  const { user } = useUser();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetchMyConversations(user.id).then(setConversations).catch(console.error);
  }, [user]);

  return (
    <div className="h-[calc(100vh-80px)] bg-zinc-100 rounded-xl overflow-hidden shadow-sm border flex">
      {/* LEFT: Conversation List */}
      <aside className="w-80 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b flex items-center gap-2">
          <MessageSquare size={18} className="text-orange-500" />
          <h2 className="font-semibold text-sm">Messages</h2>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-lg">
            <Search size={14} className="text-zinc-400" />
            <input
              type="text"
              placeholder="Search conversations"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="text-sm text-zinc-400 text-center mt-10">
              No conversations yet
            </p>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv)}
                className={`w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-zinc-100 transition
                  ${activeConversation?.id === conv.id ? "bg-orange-50" : ""}
                `}
              >
                <UserCircle2 className="text-zinc-400" size={28} />

                <div className="flex-1">
                  <p className="text-sm font-medium">{conv.other_user_name}</p>
                  <p className="text-xs text-zinc-400 truncate">
                    Click to open chat
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* RIGHT: Chat Window */}
      <section className="flex-1 bg-zinc-50">
        {activeConversation ? (
          <Conversation conversation={activeConversation} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-400">
            <MessageSquare size={40} />
            <p className="mt-2 text-sm">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
