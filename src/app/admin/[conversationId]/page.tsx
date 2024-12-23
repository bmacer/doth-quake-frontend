"use client";

import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { deleteConversation, getAiMessages } from "@/ai/ai-api";
import { AiMessage } from "@/ai/ai-model";
import { Avatar } from "@/components/ui/avatar";
import { FaTrash } from "react-icons/fa";
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal.component";

export default function AiChatWikiBot() {
  const params = useParams();
  const router = useRouter();
  const { open, onClose, onOpen } = useDisclosure();

  const [messages, setMessages] = useState<AiMessage[]>([]);

  useEffect(() => {
    getAiMessages(params?.conversationId as string).then((r) => {
      setMessages(r);
    });
  }, [params?.conversationId]);

  const handleDelete = () => {
    deleteConversation(params?.conversationId as string).then(() => {
      router.push("/admin");
    });
  };

  return (
    <Box
      minH="100vh"
      bgImage="url('/assets/ai/trakan.jpg')"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Flex minH="100vh" justify="center" align="center">
        <Card.Root bgColor="tan" width="440px" boxShadow="lg">
          <CardHeader h="60px" borderBottom="1px solid black">
            <Flex justify="space-between" align="center">
              <Heading fontFamily="Gnellen" size="md">
                Doth Quake (subject to mistakes)
              </Heading>
              <FaTrash onClick={onOpen} cursor="pointer" />
            </Flex>
          </CardHeader>
          <CardBody paddingBottom="0px" paddingTop="0px">
            <VStack pt="10px" height="600px" overflowY="auto" align="stretch">
              {messages
                .filter((message) => message.role !== "system")
                .map((message, index) => (
                  <Flex
                    key={index}
                    justifyContent={
                      message.role === "user" ? "flex-end" : "flex-start"
                    }
                  >
                    {message.role === "assistant" && (
                      <>
                        <Avatar
                          size="sm"
                          name="AI"
                          src="/assets/ai/ai-avatar.png"
                        />
                      </>
                    )}
                    <Box
                      maxWidth="70%"
                      p={2}
                      borderRadius="lg"
                      bg={message.role === "user" ? "blue.500" : "gray.100"}
                      color={message.role === "user" ? "white" : "black"}
                    >
                      <Text fontFamily="Gnellen" whiteSpace="pre-line">
                        {message.content
                          .replaceAll("**", "")
                          .replaceAll("- ", "")}
                      </Text>
                    </Box>
                  </Flex>
                ))}
            </VStack>
          </CardBody>
        </Card.Root>
        <DeleteConfirmationModal
          open={open}
          onClose={onClose}
          handleDelete={handleDelete}
        />
      </Flex>
    </Box>
  );
}
