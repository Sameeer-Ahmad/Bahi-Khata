import  { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Flex,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const AddNote = ({ onNoteAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleAddNote = async () => {
    try {
      const response = await axios.post("https://bahi-khata.onrender.com/notes/add", {
        title,
        content,
      });

      if (response.status === 201) {
        toast({
          title: "Note added.",
          description: "Your note has been successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTitle("");
        setContent("");
        handleCloseModal();
        onNoteAdded(); 
      } else {
        toast({
          title: "Error",
          description: "Failed to add note.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error); 
    }
  };

  return (
    <Box>
      <Flex align={"center"} gap={2}>
        <IconButton
          icon={<AddIcon />}
          onClick={handleOpenModal}
          aria-label="Add Note"
          colorScheme="teal"
          mb={4}
        />
        <Text mb={4} fontWeight={500} fontSize={"xl"}>Add Note</Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title" mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title"
              />
            </FormControl>

            <FormControl id="content" mb={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter note content"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddNote}>
              Add Note
            </Button>
            <Button onClick={handleCloseModal} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddNote;
