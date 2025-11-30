import { MessageFlags } from "discord.js";

/**
 * @type {import("../../../../types/index.d.ts").Modal}
 */
export default {
	customId: "sample",
	type: "modalSubmit",

	async execute(interaction) {
		if (!interaction.isModalSubmit()) return;

		const { fields } = interaction;

		const input = fields.getTextInputValue('sample_input');

		return interaction.reply({ content: `${input}`, flags: MessageFlags.Ephemeral });
	},
};
