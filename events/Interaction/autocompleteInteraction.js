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

        try {
            const autocomplete = client.autocompletes.get(interaction.commandName);

            if (!autocomplete) return interaction.respond([]).catch(() => {});

            await autocomplete.execute(interaction);
        } catch (error) {
            console.log(error);
            return interaction.respond([]).catch(() => {});
        }
    },
};