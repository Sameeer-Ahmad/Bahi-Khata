import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const UpdateNote = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);
  
  const handleUpdate = async () => {
    try {
      await axios.put(`https://bahi-khata.onrender.com/notes/update/${note._id}`, {
        title: newTitle,
        content: newContent,
      });
      onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={5}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          {isEditing ? (
            <Editable defaultValue={note.title} onChange={setNewTitle}>
              <EditablePreview />
              <EditableInput />
            </Editable>
          ) : (
            <Box fontWeight="bold" mb={2}>
              {note.title}
            </Box>
          )}
        </Box>
        <Box mr={-4} mt={-4}>
          <IconButton
            icon={<EditIcon />}
            onClick={() => setIsEditing(!isEditing)}
            mr={2}
            ml={8}
            aria-label="Edit note"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => onDelete(note._id)}
            aria-label="Delete note"
          />
        </Box>
      </Box>
      {isEditing ? (
        <Box>
          <Textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Enter note content"
            mb={4}
          />
          <Button colorScheme="blue" onClick={handleUpdate}>
            Update Note
          </Button>
        </Box>
      ) : (
        <Box  >{note.content}</Box>
      )}
    </Box>
  );
};

export default UpdateNote;
