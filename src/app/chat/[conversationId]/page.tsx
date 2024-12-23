"use client";

import { useEffect, useState, useRef } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { getAiMessages } from "@/ai/ai-api";
import { AiMessage } from "@/ai/ai-model";
import { Avatar } from "@/components/ui/avatar";
import { FaTrash } from "react-icons/fa";
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal.component";

export default function AiChatWikiBot() {
  const params = useParams();
  const router = useRouter();
  const { open, onClose, onOpen } = useDisclosure();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isTyping, setIsTyping] = useState(false);
  const [initialMessages, setInitialMessages] = useState<AiMessage[]>([]);
  const [suggestedQuestions] = useState([
    "What do you know?",
    "Tell me about fishing?",
  ]);

  const conversationId = params?.conversationId as string;
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    handleQuestionClick,
  } = useChat(initialMessages);

  const handleDelete = () => {
    localStorage.removeItem("conversationId");
    setTimeout(() => router.push("/"), 1000);
  };

  const handleMySubmit = async (input: string) => {
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);
    try {
      await handleSubmit(input, conversationId);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    handleQuestionClick(question);
    handleMySubmit(question);
  };

  useEffect(() => {
    if (conversationId) {
      getAiMessages(conversationId).then(setInitialMessages);
    }
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
              {isTyping && (
                <Flex justifyContent="flex-start">
                  <>
                    <Avatar
                      size="sm"
                      name="AI"
                      src="/assets/ai/ai-avatar.png"
                      mr={2}
                    />
                  </>
                  <Box maxWidth="70%" p={2} borderRadius="lg" bg="gray.100">
                    <Text fontFamily="Gnellen">Typing...</Text>
                  </Box>
                </Flex>
              )}
              <div ref={messagesEndRef} />
            </VStack>
          </CardBody>
          <CardFooter>
            <VStack w="100%">
              <Flex h="100%" justify="center">
                <HStack justify="center">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={() => handleSuggestedQuestion(question)}
                      fontFamily="Gnellen"
                    >
                      {question}
                    </Button>
                  ))}
                </HStack>
              </Flex>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleMySubmit(input);
                }}
                style={{ width: "100%" }}
              >
                <HStack width="100%">
                  <Input
                    bgColor="white"
                    fontFamily="Gnellen"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    flex={1}
                  />
                  <Button
                    type="button"
                    onClick={() => handleMySubmit(input)}
                    colorScheme="blue"
                  >
                    Send
                  </Button>
                </HStack>
              </form>
            </VStack>
          </CardFooter>
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
