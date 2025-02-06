import { useEffect } from "react";
import { useChatStore } from "./chat-store";
import { PlusCircle } from "lucide-react";

export default function Sidebar() {
  const { chats, activeChatId, createChat, setActiveChat, fetchChats } =
    useChatStore();

  useEffect(() => {
    fetchChats(); // Initial fetch

    const interval = setInterval(() => {
      fetchChats();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchChats]);

  return (
    <div className="w-55 bg-gray-900 text-white p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <button
        onClick={createChat}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mb-4"
      >
        <PlusCircle size={18} /> New Chat
      </button>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {chats?.map((chat) => (
          <div
            key={chat._id}
            className={`flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer ${
              activeChatId === chat._id ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveChat(chat._id)}
          >
            <span>{chat.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
