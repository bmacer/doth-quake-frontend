import { AiConversation } from "@/ai/ai-model";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const ConversationCard = ({ conv }: { conv: AiConversation }) => {
  const router = useRouter();
  const { _id, conversation, conversationId } = conv;
  const firstMessage = conversation.length > 1 ? conversation[1] : null;
  return (
    <Box
      key={_id}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        bg: "gray.50",
        transform: "translateY(-2px)",
        shadow: "md",
      }}
      onClick={() => router.push(`/admin/${conversationId}`)}
    >
      <Text fontSize="sm" color="gray.600">
        {firstMessage?.content}
      </Text>
    </Box>
  );
};
