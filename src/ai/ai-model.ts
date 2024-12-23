export interface AiMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AiConversation {
  id: string;
  messages: AiMessage[];
}
