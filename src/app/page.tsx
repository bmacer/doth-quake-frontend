"use client";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CenteredSpinner } from "@/components/util/centered-spinner";

export default function AiChatInterface() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const existingConversationId = localStorage.getItem("conversationId");
    if (!existingConversationId) {
      const newConversationId = uuidv4();
      localStorage.setItem("conversationId", newConversationId);
      setConversationId(newConversationId);
    } else {
      setConversationId(existingConversationId);
    }
  }, []);

  useEffect(() => {
    if (conversationId) {
      router.push(`/${conversationId}`);
    }
  }, [conversationId, router]);

  return <CenteredSpinner />;
}
