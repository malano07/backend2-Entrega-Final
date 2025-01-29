import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    firstName: { type: String, required: true },  
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "business" },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products", 
        }
    ]
});

export default mongoose.model("business", businessSchema);
