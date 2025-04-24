const { MessageFlags } = require("discord.js");

/**
 * @type {import("../../../types/typings").Button}
 */
module.exports = {
	name: "say_hello",
	type: "button",

	async execute(interaction) {
		if (!interaction.isButton()) return;

		return interaction.reply({ content: `Hello, ${interaction.user}!`, flags: MessageFlags.Ephemeral });
	},
};
