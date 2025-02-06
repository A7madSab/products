import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/chat";

interface Message {
  _id: string;
  message: string | { result: string };
  graph?: {
    edges: Array<{
      id: string;
      source: string;
      target: string;
    }>;
    nodes: Array<{
      data: { label: string };
      label: string;
      id: string;
      level: number;
      position: { x: number; y: number };
    }>;
  };
  owner: "USER" | "SYSTEM";
}

interface Chat {
  _id: string;
  title: string;
  messages: Message[];
}

interface ChatStore {
  chats: Chat[];
  loading: boolean;
  activeChatId: string | null;
  fetchChats: () => Promise<void>;
  createChat: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  setActiveChat: (chatId: string) => void;
}

const createChatTitle = (ideaNumber: number): string => {
  switch (ideaNumber) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";

    default:
      return `${ideaNumber}th`;
  }
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  activeChatId: null,
  loading: false,

  // Fetch all chats from the API
  fetchChats: async () => {
    try {
      const response = await axios.get<Chat[]>(API_BASE_URL);
      const chats = response.data;
      set({ chats });

      // If no active chat, set the first one by default
      if (!get().activeChatId && chats.length > 0) {
        set({ activeChatId: chats[0]._id });
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  },

  // Create a new chat
  createChat: async () => {
    try {
      const { chats } = get();

      const response = await axios.post(API_BASE_URL, {
        title: `${createChatTitle(chats.length + 1)} idea`,
      });
      const newChat = response.data;
      set((state) => ({
        chats: [...state.chats, newChat],
        activeChatId: newChat._id,
      }));
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  },

  // Send a message to the active chat
  sendMessage: async (message) => {
    const { activeChatId, chats } = get();
    if (!activeChatId) return;

    try {
      set({ loading: true });
      const response = await axios.post<Chat>(
        `${API_BASE_URL}/${activeChatId}/message`,
        { message }
      );
      const newMessage = response.data;

      // Update chat messages in the state
      set({
        chats: chats.map((chat) =>
          chat._id === activeChatId
            ? { ...chat, messages: newMessage.messages }
            : chat
        ),
        loading: false,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },

  // Set active chat
  setActiveChat: (chatId) => set({ activeChatId: chatId }),
}));
