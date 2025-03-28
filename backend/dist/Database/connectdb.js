"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connectdb() {
    try {
        await mongoose_1.default.connect(process.env.DATA_BASE_URL ||
            "mongodb+srv://dilagow410:VGfngAWKyl5kDhFD@cluster0.x2rfp.mongodb.net/HostStream?retryWrites=true&w=majority&appName=Cluster0");
        //  await client.connect();
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log("Failed to connect to MongoDB:" + error);
    }
}
exports.default = connectdb;
