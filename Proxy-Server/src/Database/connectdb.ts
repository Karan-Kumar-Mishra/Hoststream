import mongoose from "mongoose";

async function connectdb() {
    try {
        await mongoose.connect(process.env.DATA_BASE_URL || "mongodb://localhost:27017/");//  await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB:" + error);
    }
}
export default connectdb;