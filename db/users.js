const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	guildID: { type: String, required: true },
    userID: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

const getUserById = (userID) => UserModel.findOne({ userID });

const createUser = (values) => new UserModel(values).save().then((user) => user.toObject());
const deleteUserById = (userID) => UserModel.findOneAndDelete({ userID });
const updateUserById = (userID, values) => UserModel.findOneAndUpdate(userID, values);

module.exports = { UserModel, getUserById, createUser, deleteUserById, updateUserById };
