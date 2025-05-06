import { MessageFlags } from "discord.js";

/**
 * @type {import("../../../../types/index.d.ts").ChannelSelectMenu}
 */
export default {
	customId: "channel_sample",
	type: "selectmenu",

	async execute(interaction) {
		if (!interaction.isChannelSelectMenu()) return;

		return interaction.reply({ content: `<#${interaction.values[0]}> ${interaction.values[0]}`, flags: MessageFlags.Ephemeral });
	},
};
