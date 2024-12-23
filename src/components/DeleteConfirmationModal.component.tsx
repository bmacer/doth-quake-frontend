"use client";

import {
  Button,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
  DialogRoot,
} from "@chakra-ui/react";

export const DeleteConfirmationModal = ({
  open,
  onClose,
  handleDelete,
}: {
  open: boolean;
  onClose: () => void;
  handleDelete: () => void;
}) => (
  <DialogRoot open={open} onOpenChange={onClose}>
    <DialogContent
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex={1000}
      border="1px solid black"
      borderRadius="lg"
      bgColor="white"
      boxShadow="lg"
    >
      <DialogHeader fontFamily="Gnellen">Delete Conversation</DialogHeader>
      <DialogBody fontFamily="Gnellen">
        Are you sure you want to delete this conversation?
      </DialogBody>
      <DialogFooter>
        <Button
          colorScheme="gray"
          mr={3}
          onClick={onClose}
          fontFamily="Gnellen"
        >
          Cancel
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            handleDelete();
            onClose();
          }}
          fontFamily="Gnellen"
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </DialogRoot>
);
