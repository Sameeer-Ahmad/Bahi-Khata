const express = require("express");
const Note = require("../model/notes.model");
const noteRouter = express.Router();

noteRouter.post("/add", async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).send({ message: "Note created", note: newNote });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).send({ message: "Failed to create note", error });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).send( notes );
  } catch (err) {
    res.status(500).send({ msg: "Failed to fetch notes", err });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await Note.findByIdAndDelete(id);
    res.status(200).send({ msg: "Note deleted", note: deleteNote });
  } catch (err) {
    res.status(500).send({ msg: "Failed to delete note", err });
  }
});

noteRouter.put("/update/:id", async (req, res) => {
  try {
    const {id}=req.params;
    const {title,content}=req.body;
    const updateNote=await Note.findByIdAndUpdate(id,{title,content},{new:true});
    res.status(200).send({ message: 'Note updated', note: updateNote });
  } catch (err) {
    res.status(500).send({ msg: "Failed to update note", err });
  }
});

module.exports = noteRouter;
