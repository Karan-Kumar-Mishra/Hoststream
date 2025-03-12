import mongoose from "mongoose";

async function connectdb() {
    try {
        await mongoose.connect("mongodb+srv://dilagow410:VGfngAWKyl5kDhFD@cluster0.x2rfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        //  await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB:" + error);
    }
}
export default connectdb;