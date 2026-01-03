import { MessageSquare } from "lucide-react";

export default function ChatListItem({ chat }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-100 cursor-pointer border-b">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
        {chat.otherUser?.name?.[0] || "U"}
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="font-medium text-sm">{chat.otherUser?.name || "User"}</p>
        <p className="text-xs text-zinc-500 truncate">Conversation started</p>
      </div>

      <MessageSquare size={18} className="text-zinc-400" />
    </div>
  );
}
