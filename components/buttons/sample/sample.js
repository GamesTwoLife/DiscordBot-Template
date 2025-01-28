const { MessageFlags } = require("discord.js");

/**
 * @type {import("../../../typings").Button}
 */
module.exports = {
	name: "sample",
	type: "button",

	async execute(interaction) {
		if (!interaction.isButton()) return;

		return interaction.reply({ content: `${interaction.customId}`, flags: MessageFlags.Ephemeral });
	},
};
