import express from 'express';
import { addNewNote, getAllNotes, removeNote, updateNoteDetails, viewNoteDetails } from '../controllers/notesController.js';
const NotesRoute = express.Router();
NotesRoute.get('/', getAllNotes);
NotesRoute.post('/add-new-note', addNewNote);
NotesRoute.get('/view-note-details/:note_id', viewNoteDetails);
NotesRoute.post('/update-note/:note_id', updateNoteDetails);
NotesRoute.delete('/delete-note/:note_id', removeNote);

export default NotesRoute;
