export interface Message {
  text: string;
  sender: "user" | "assistant";
}

export interface Chat {
  id: number;
  name: string;
  messages: Message[];
}

export interface ChatStore {
  chats: Chat[];
  currentChat: number | null;
  addChat: () => void;
  deleteChat: (id: number) => void;
  setCurrentChat: (id: number) => void;
  addMessage: (chatId: number, message: Message) => void;
}
