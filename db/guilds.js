import mongoose from "mongoose";

const GuildSchema = new mongoose.Schema({
	guildID: { type: String, required: true, unique: true },
}, { timestamps: true });
	
GuildSchema.index({ guildID: 1 }, { unique: true });

export const GuildModel = mongoose.model('Guild', GuildSchema);
