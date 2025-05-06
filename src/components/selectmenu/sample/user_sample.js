import { MessageFlags } from "discord.js";

/**
 * @type {import("../../../../types/index").UserSelectMenu}
 */
export default {
	customId: "user_sample",
	type: "selectmenu",

	async execute(interaction) {
		if (!interaction.isUserSelectMenu()) return;

		return interaction.reply({ content: `<@${interaction.values[0]}> ${interaction.values[0]}`, flags: MessageFlags.Ephemeral });
	},
};
