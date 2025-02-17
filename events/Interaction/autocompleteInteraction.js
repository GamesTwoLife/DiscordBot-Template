const { Events } = require("discord.js");
const { developers } = require("../../config.json");

module.exports = {
	name: Events.InteractionCreate,
	/**
	 * 
	 * @param {import('discord.js').AutocompleteInteraction & { client: import('../../typings').MainClient }} interaction
	 */
	async execute(interaction) {
		const { client, user } = interaction;

		if (!interaction.isAutocomplete()) return;

		try {
			const command = client.commands.get(interaction.commandName);

			if (!command) return interaction.respond([]);

			if (command.options && command.options?.ownerOnly && !developers.includes(user.id)) {
				return interaction.respond([]);
			}

			await command.autocomplete(interaction);
		} catch (error) {
			console.log(error);
			return interaction.respond([]);
		}
	},
};
