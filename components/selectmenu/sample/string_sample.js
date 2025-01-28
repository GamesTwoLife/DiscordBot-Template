const { MessageFlags } = require("discord.js");

/**
 * @type {import("../../../typings").StringSelectMenu}
 */
module.exports = {
	name: "string_sample",
	type: "selectmenu",

	async execute(interaction) {
		if (!interaction.isStringSelectMenu()) return;

		return interaction.reply({ content: `${interaction.values[0]}`, flags: MessageFlags.Ephemeral });
	},
};
