"use client";

import { useSearchParams } from "next/navigation";
import { getAllConversations } from "@/ai/ai-api";
import { useEffect, useState } from "react";
import { ConversationCard } from "@/components/ConversationCard";
import { AiConversation } from "@/ai/ai-model";
const AdminPage = () => {
  const query = useSearchParams();
  const password = query.get("password");
  const [conversations, setConversations] = useState([]);

  console.log(conversations);

  useEffect(() => {
    // if (password !== "1234") {
    //   return;
    // }
    getAllConversations().then((conversations) => {
      setConversations(conversations);
    });
  }, []);

  //   if (password !== "1234") {
  //     return <div>Unauthorized</div>;
  //   }
  return (
    <>
      <div>Admin</div>
      <div key={conversations.length} className="grid grid-cols-4 gap-4 p-4">
        {conversations.map((conv: AiConversation) => (
          <ConversationCard key={conv._id} conv={conv} />
        ))}
      </div>
    </>
  );
};

export default AdminPage;
