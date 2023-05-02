const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	guildID: { type: String, required: true },
    userID: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

const getUserById = (guildID, userID) => UserModel.findOne({ guildID, userID });

const createUser = (values) => new UserModel(values).save().then((user) => user.toObject());
const deleteUserById = (guildID, userID) => UserModel.findOneAndDelete({ guildID, userID });
const updateUserById = (guildID, userID, values) => UserModel.findOneAndUpdate(guildID, userID, values);

module.exports = { UserModel, getUserById, createUser, deleteUserById, updateUserById };
