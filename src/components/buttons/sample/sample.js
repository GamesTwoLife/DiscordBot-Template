import { MessageFlags } from "discord.js";

/**
 * @type {import("../../../../types/index.d.ts").Button}
 */
export default {
	customId: "sample",
	type: "button",

	async execute(interaction) {
		if (!interaction.isButton()) return;

		return interaction.reply({ content: `${interaction.customId}`, flags: MessageFlags.Ephemeral });
	},
};
