import { useEffect, useRef, useState } from "react";
import { useChatStore } from "./chat-store";
import { Send, Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const { chats, activeChatId, sendMessage, loading } = useChatStore();
  const [message, setMessage] = useState<string>("");
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadingMessages = [
    "Thinking...",
    "Searching through Siemens products...",
    "Formatting message...",
    "Gathering relevant information...",
    "Analyzing data...",
  ];

  const activeChat = chats.find((chat) => chat._id === activeChatId);
  const messageCount = activeChat?.messages.length || 0;
  const showLoadingMessage = messageCount % 2 !== 0;

  useEffect(() => {
    if (showLoadingMessage) {
      const randomMessage =
        loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
      setLoadingMessage(randomMessage);
    }
  }, [messageCount]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageCount]);

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex-1 flex flex-col px-3 pb-3 text-white rounded-lg shadow-md">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 p-3">
        {activeChat?.messages.length ? (
          activeChat.messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-3 rounded-lg max-w-[80%] break-words ${
                msg.owner === "USER"
                  ? "ml-auto bg-blue-600 text-white text-left"
                  : "mr-auto bg-gray-800 text-white text-left"
              }`}
            >
              <ReactMarkdown
                components={{
                  hr(props) {
                    return null;
                  },
                }}
              >
                {msg.message.result || msg.message}
              </ReactMarkdown>
            </div>
          ))
        ) : (
          // No Messages Yet
          <div className="text-gray-400 text-center mt-10">
            No messages yet. Start a conversation!
          </div>
        )}

        {/* Loading Indicator & Dynamic Message */}
        {showLoadingMessage && (
          <div className="flex items-center text-gray-400">
            <Loader className="animate-spin mr-2" size={18} />
            {loadingMessage}
          </div>
        )}

        {/* Auto-scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="mt-4 flex border-t border-gray-700 pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full"
        >
          <input
            type="text"
            className="flex-1 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.altKey) {
                e.preventDefault();
                handleSendMessage();
              } else if (e.key === "Enter" && e.altKey) {
                setMessage((prev) => prev + "\n");
              }
            }}
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
