import { MessageFlags } from "discord.js";

/**
 * @type {import("../../../../types/index.d.ts").MentionableSelectMenu}
 */
export default {
	customId: "mentionable_sample",
	type: "selectmenu",

	async execute(interaction) {
		if (!interaction.isMentionableSelectMenu()) return;

		return interaction.reply({ content: `${interaction.values[0]}`, flags: MessageFlags.Ephemeral });
	},
};
