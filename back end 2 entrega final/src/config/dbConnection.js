import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from "./config.js";

dotenv.config();

class DbConnection {
    static instance;

    constructor() {
        if (!DbConnection.instance) {
            const mongoUri = process.env.MONGO_URI || config.MONGO_URI;

            if (!mongoUri) {
                console.error("URI is missing.");
                process.exit(1); 
            }

            mongoose.connect(mongoUri)
                .then(() => console.log(" MongoDB connected"))
                .catch((err) => {
                    console.error(" MongoDB connection error:", err);
                    process.exit(1); 
                });

            DbConnection.instance = this;
        }
        return DbConnection.instance;
    }

    static getInstance() {
        if (!DbConnection.instance) {
            new DbConnection();
        }
        return DbConnection.instance;
    }
}

export default DbConnection;
