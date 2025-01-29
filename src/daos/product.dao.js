import productModel from "../models/product.model.js";

export default class Product {
    constructor() {}

    async getById(id) {
        try {
            return await productModel.findById(id);
        } catch (error) {
            console.error("Error ", error.message);
            return null;
        }
    }

    async update(id, data) {
        try {
            return await productModel.updateOne({ _id: id }, { $set: data });
        } catch (error) {
            console.error("Error", error.message);
            return null;
        }
    }
    async getAll() {
        try {
            return await productModel.find(); 
        } catch (error) {
            console.error("Error", error.message);
            return [];
        }
    }
}
