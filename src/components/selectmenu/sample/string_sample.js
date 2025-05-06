import { MessageFlags } from "discord.js";

/**
 * @type {import("../../../../types/index.d.ts").StringSelectMenu}
 */
export default {
	customId: "string_sample",
	type: "selectmenu",

	async execute(interaction) {
		if (!interaction.isStringSelectMenu()) return;

		return interaction.reply({ content: `${interaction.values[0]}`, flags: MessageFlags.Ephemeral });
	},
};
