/**
 * @type {import("../../../typings").UserSelectMenu}
 */
module.exports = {
	name: "user_sample",
	type: "selectmenu",

	async execute(interaction) {
		if (!interaction.isUserSelectMenu()) return;

		return interaction.reply({ content: `<@${interaction.values[0]}> ${interaction.values[0]}`, ephemeral: true });
	},
};
