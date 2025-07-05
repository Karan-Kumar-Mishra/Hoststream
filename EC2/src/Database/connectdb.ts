import mongoose from 'mongoose';

async function connectdb() {
    try {
        console.log('MONGO_URL:', process.env.MONGO_URL); // Debug log
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