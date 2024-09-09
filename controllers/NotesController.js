import mongoose from "mongoose";
import Notes from "../models/NotesModel.js";
export const getAllNotes = async (req, res) => {
    const { title } = req.query;
    let query = {}
    if (title) {
        query.title = new RegExp(title, "i");
    }
    try {
        const notesList = await Notes.find(query).sort({ createdAt: -1 })
        res.status(200).json({
            data: notesList,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const addNewNote = async (req, res) => {
    const { title, subNotes } = req.body;
    try {
        const NewNote = new Notes({
            title,
            subNotes,
        });
        const savedNote = await NewNote.save();
        res.status(201).json({
            message: "Note added successfully!",
            data: savedNote,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const viewNoteDetails = async (req, res) => {
    const { note_id: noteId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({ message: "Invalid Note ID" });
    }

    try {
        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({
            data: note,
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: "An error occurred while retrieving Note details" });
    }
};
export const updateNoteDetails = async (req, res) => {
    const { note_id: noteId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({ message: "Invalid Note ID" });
    }
    const { title, subNotes } = req.body;

    try {
        const existingNote = await Notes.findById(noteId);
        if (!existingNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        existingNote.title = title || existingNote.title;
        existingNote.subNotes = subNotes || existingNote.subNotes;
        const updatedNote = await existingNote.save();
        res.status(200).json({
            message: "Note updated successfully!",
            data: updatedNote,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const removeNote = async (req, res) => {
    const { note_id: noteId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return res.status(400).json({ message: "Invalid Note ID" });
    }
    try {
        const existingNote = await Notes.findByIdAndDelete(noteId);
        if (!existingNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json({ message: "Note deleted successfully!" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "An error occurred while deleting the Note" });
    }
};
