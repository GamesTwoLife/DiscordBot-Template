import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	guildID: { type: String, required: true },
	userID: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

const getUser = (guildID, userID) => UserModel.findOne({ guildID, userID });

const createUser = (values) => new UserModel(values).save().then((user) => user.toObject());
const deleteUser = (guildID, userID) => UserModel.findOneAndDelete({ guildID, userID });
const updateUser = (guildID, userID, values) => UserModel.findOneAndUpdate({ guildID, userID }, values);

export default { UserModel, getUser, createUser, deleteUser, updateUser };
