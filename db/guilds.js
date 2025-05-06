import mongoose from "mongoose";

const GuildSchema = new mongoose.Schema({
	guildID: { type: String, required: true },
});

const GuildModel = mongoose.model('Guild', GuildSchema);

const getGuild = (guildID) => GuildModel.findOne({ guildID });

const createGuild = (values) => new GuildModel(values).save().then((guild) => guild.toObject());
const deleteGuild = (guildID) => GuildModel.findOneAndDelete({ guildID });
const updateGuild = (guildID, values) => GuildModel.findOneAndUpdate({ guildID }, values);

export default { GuildModel, getGuild, createGuild, deleteGuild, updateGuild };
