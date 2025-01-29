const User = require('../models/user.model');

class UserDAO {
    
    async createUser(userData) {
        return await User.create(userData);
    }

    
    async findUserById(userId) {
        return await User.findById(userId).select('-password');
    }

   
    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

   
    async updateUserById(userId, updateData) {
        return await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    }

    
    async deleteUserById(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = new UserDAO();
