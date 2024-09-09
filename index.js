import dotenv from 'dotenv';
import express from 'express';
import connectDB from './database/connect.js';
import NotesRoute from './routes/notesRoute.js';
import { corsMiddleware, jsonParser, urlEncodedParser } from './middlewares/middleware.js';
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON data
app.use(jsonParser);

// Middleware to parse URL-encoded form data
app.use(urlEncodedParser);

// Use CORS middleware
app.use(corsMiddleware);
// Use routes
app.use('/api/notes', NotesRoute);
// Home route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
