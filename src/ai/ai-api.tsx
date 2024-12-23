"use server";

import { AiMessage } from "./ai-model";
const API_AI_URL = process.env.API_AI_URL;

export async function postAiMessage(conversationId: string, message: string) {
  const response = await fetch(`${API_AI_URL}/${conversationId}`, {
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
  console.log("url", url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
