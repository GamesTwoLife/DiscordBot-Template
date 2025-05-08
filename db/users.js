import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	guildID: { type: String, required: true },
	userID: { type: String, required: true },
}, { timestamps: true });
	
UserSchema.index({ guildID: 1, userID: 1 }, { unique: true });

export const UserModel = mongoose.model('User', UserSchema);
