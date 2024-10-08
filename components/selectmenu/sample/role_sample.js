/**
 * @type {import("../../../typings").RoleSelectMenu}
 */
module.exports = {
	name: "role_sample",
	type: "selectmenu",

	async execute(interaction) {
		if (!interaction.isRoleSelectMenu()) return;

		return interaction.reply({ content: `<@&${interaction.values[0]}> ${interaction.values[0]}`, ephemeral: true });
	},
};
