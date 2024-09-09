import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connectionURI = process.env.MONGO_URI
const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(connectionURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default dbConnection;
