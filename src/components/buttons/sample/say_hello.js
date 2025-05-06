import { MessageFlags } from "discord.js";

/**
 * @type {import("../../../../types/index.d.ts").Button}
 */
export default {
	customId: "say_hello",
	type: "button",

	async execute(interaction) {
		if (!interaction.isButton()) return;

		return interaction.reply({ content: `Hello, ${interaction.user}!`, flags: MessageFlags.Ephemeral });
	},
};
