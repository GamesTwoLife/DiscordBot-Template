const { MessageFlags } = require("discord.js");

/**
 * @type {import("../../../typings").ChannelSelectMenu}
 */
module.exports = {
	name: "channel_sample",
	type: "selectmenu",

	async execute(interaction) {
		if (!interaction.isChannelSelectMenu()) return;

		return interaction.reply({ content: `<#${interaction.values[0]}> ${interaction.values[0]}`, flags: MessageFlags.Ephemeral });
	},
};
