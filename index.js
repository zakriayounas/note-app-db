import dotenv from 'dotenv';
import express from 'express';
import connectDB from "./database/dbConnect.js"
import { corsMiddleware, jsonParser, urlEncodedParser } from './middlewares/middleware.js';
import NotesRouter from "./routes/notesRoute.js"
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
app.use('/api/notes', NotesRouter);
// Home route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 8080;
console.log(PORT);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
