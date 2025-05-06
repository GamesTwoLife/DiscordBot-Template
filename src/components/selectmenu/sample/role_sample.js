import { MessageFlags } from "discord.js";

/**
 * @type {import("../../../../types/index.d.ts").RoleSelectMenu}
 */
export default {
	customId: "role_sample",
	type: "selectmenu",

	async execute(interaction) {
		if (!interaction.isRoleSelectMenu()) return;

		return interaction.reply({ content: `<@&${interaction.values[0]}> ${interaction.values[0]}`, flags: MessageFlags.Ephemeral });
	},
};
