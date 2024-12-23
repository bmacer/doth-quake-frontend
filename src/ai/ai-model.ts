export interface AiMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AiConversation {
  _id: string;
  conversation: AiMessage[];
  conversationId: string;
}
