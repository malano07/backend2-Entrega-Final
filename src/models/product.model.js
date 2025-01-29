import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 }, 
    stock: { type: Number, required: true, min: 0 }, 
    category: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("products", productSchema);
