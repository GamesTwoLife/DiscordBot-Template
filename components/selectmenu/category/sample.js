/**
 * @type {import("../../../typings").SelectMenuInteraction}
 */
module.exports = {
	id: "sample",

	async execute(interaction) {
		if (!interaction.isStringSelectMenu()) return;
		
		await interaction.reply({ content: `${interaction.values[0]}`, ephemeral: true });
	},
};