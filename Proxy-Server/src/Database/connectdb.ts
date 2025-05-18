import mongoose from "mongoose";

async function connectdb() {
    try {
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://mongodb:27017/', {
            family: 4, // Force IPv4
            authSource: "admin" // Add this if using authentication
        }); console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB:" + error);
    }
}
export default connectdb;