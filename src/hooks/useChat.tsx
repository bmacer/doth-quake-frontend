import { postAiMessage } from "@/ai/ai-api";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiMessage } from "@/ai/ai-model";

export function useChat(initialMessages: AiMessage[]) {
  const [messages, setMessages] = useState<AiMessage[]>(initialMessages);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  const handleSubmit = async (input: string, conversationId?: string) => {
    const chatId =
      conversationId || localStorage.getItem("conversationId") || uuidv4();
    if (!conversationId) {
      localStorage.setItem("conversationId", chatId);
    }

    const userMessage = { role: "user" as const, content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");

    const response = await postAiMessage(chatId, input);
    const assistantMessage = {
      role: "assistant" as const,
      content: response.content,
    };

    setMessages([...newMessages, assistantMessage]);
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    handleQuestionClick,
  };
}
