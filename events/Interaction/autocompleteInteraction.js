const { Events } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {import('discord.js').AutocompleteInteraction & { client: import('../../typings').MainClient }} interaction
     */
    async execute(interaction) {
        const { client } = interaction;

        if (!interaction.isAutocomplete()) return;

        const autocomplete = client.autocompletes.get(interaction.commandName);

        if (!autocomplete) return interaction.respond([]);

        try {
            await autocomplete.execute(interaction);
        } catch (error) {
            console.log(error);
            return interaction.respond([]);
        }
        return;
    }
};