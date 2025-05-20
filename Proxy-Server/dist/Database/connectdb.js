"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connectdb() {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL || 'mongodb://mongodb:27017/', {
            family: 4, // Force IPv4
            authSource: "admin" // Add this if using authentication
        });
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log("Failed to connect to MongoDB:" + error);
    }
}
exports.default = connectdb;
