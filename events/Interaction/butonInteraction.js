const { Events } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {import('discord.js').ButtonInteraction & { client: import('../../typings').MainClient }} interaction 
     */
    async execute(interaction) {
        const { client } = interaction;

        if (!interaction.isButton()) return;

        const button = client.buttons.get(interaction.customId);

        if (!button) return;

        try {
            await button.execute(interaction);
            return;
        } catch (error) {
            console.log(error);
			if (interaction.deferred || interaction.replied) {
                await interaction.followUp({ content: `Виникла помилка \`${error.message}\` при виконанні цієї кнопки \`${interaction.customId}\``, ephemeral: true });
            } else {
                await interaction.reply({ content: `Виникла помилка \`${error.message}\` при виконанні цієї кнопки \`${interaction.customId}\``, ephemeral: true });
            }
        }
    }
};