"use server";

import { AiMessage } from "./ai-model";
import { API_AI_URL } from "@/lib/constants";

export async function deleteConversation(conversationId: string) {
  const url = `${API_AI_URL}/${conversationId}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  return response.text();
}

export async function getAllConversations() {
  const url = `${API_AI_URL}/allConversations`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function postAiMessage(conversationId: string, message: string) {
  const url = `${API_AI_URL}/${conversationId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });
  return response.json();
}

export async function getAiMessages(
  conversationId: string
): Promise<AiMessage[]> {
  const url = `${API_AI_URL}/history/${conversationId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
