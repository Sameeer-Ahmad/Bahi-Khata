import  { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import AddNote from "./AddNote";
import UpdateNote from "./updateNote";

const GetNotes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("https://bahi-khata.onrender.com/notes");
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`https://bahi-khata.onrender.com/notes/delete/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = () => {
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Box p={3} maxW="container.lg" mx="auto">
      <Heading mb={6} size="lg" textAlign="center">
        My Notes
      </Heading>
      <AddNote onNoteAdded={() => fetchNotes()} />
      <Divider my={6} />
      {notes.length === 0 ? (
        <Box> Please add a note.</Box>
      ) : (
        <Box display="flex" flexWrap={"wrap"} alignItems="center" justifyContent="center" bg={"gray.100"} p={4}>
          {notes.map((note) => (
            <Flex
              key={note._id}
              bg="white"
              p={4}
              borderRadius="md"
              m={2}
            >
              <UpdateNote
                note={note}
                onDelete={handleDeleteNote}
                onUpdate={handleUpdateNote}
              />
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default GetNotes;
