const { Events } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {import('discord.js').ModalSubmitInteraction & { client: import('../../typings').MainClient }} interaction 
     */
    async execute(interaction) {
        const { client } = interaction;

        if (!interaction.isModalSubmit()) return;

        const modal = client.modals.get(interaction.customId);

        if (!modal) return;

        try {
            await modal.execute(interaction);
        } catch (error) {
            console.log(error);
            if (interaction.deferred || interaction.replied) {
                await interaction.followUp({ content: `Виникла помилка \`${error.message}\` при виконанні модального вікна ${interaction.customId}`, ephemeral: true });
            } else {
                await interaction.reply({ content: `Виникла помилка \`${error.message}\` при виконанні модального вікна ${interaction.customId}`, ephemeral: true });
            }
        }

        return;
    }
};