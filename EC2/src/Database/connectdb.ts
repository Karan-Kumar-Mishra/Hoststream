import mongoose from 'mongoose';
import dotenv from "dotenv";

async function connectdb() {
dotenv.config();
    try {

        await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase", {
            family: 4,
            authSource: 'admin'
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

export default connectdb;