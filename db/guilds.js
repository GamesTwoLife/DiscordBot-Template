const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
	guildID: { type: String, required: true },
});

const GuildModel = mongoose.model('Guild', GuildSchema);

const getGuildById = (guildID) => GuildModel.findOne({ guildID });

const createGuild = (values) => new GuildModel(values).save().then((guild) => guild.toObject());
const deleteGuildById = (guildID) => GuildModel.findOneAndDelete({ guildID });
const updateGuildById = (guildID, values) => GuildModel.findOneAndUpdate(guildID, values);

module.exports = { GuildModel, getGuildById, createGuild, deleteGuildById, updateGuildById };
