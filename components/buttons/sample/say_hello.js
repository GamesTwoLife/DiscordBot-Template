/**
 * @type {import("../../../typings").Button}
 */
module.exports = {
	name: "say_hello",
	type: "button",

	async execute(interaction) {
		if (!interaction.isButton()) return;

		return interaction.reply({ content: `Hello, ${interaction.user}!`, ephemeral: true });
	},
};
