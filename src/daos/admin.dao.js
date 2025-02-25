import adminModel from "../models/admin.model.js";

export default class Admin {
    constructor() {}

    getByEmail = async (email) => {
        try {
            const admin = await adminModel.findOne({ email })
            return admin
        } catch (error) {
            console.log(error)
            return { error: "error" }
        }
    }

    save = async (admin) => {
        try {
            const result = await adminModel.create(admin)
            return result
        } catch (error) {
            console.log(error)
            return { error: "error" }
        }
    }
}