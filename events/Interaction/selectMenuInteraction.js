const { Events } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {import('discord.js').AnySelectMenuInteraction & { client: import('../../typings').MainClient }} interaction 
     */
    async execute(interaction) {
        const { client } = interaction;

        if (!interaction.isAnySelectMenu()) return;

        if (interaction.isStringSelectMenu()) {
            const selectmenu = client.selectMenus.get(interaction.customId);

            if (!selectmenu) return;
    
            try {
                await selectmenu.execute(interaction);
                return;
            } catch (error) {
                console.log(error);
                if (interaction.deferred || interaction.replied) {
                    await interaction.followUp({ content: `Виникла помилка \`${error.message}\` при виконанні меню вибору \`${interaction.customId}\``, ephemeral: true });
                } else {
                    await interaction.reply({ content: `Виникла помилка \`${error.message}\` при виконанні меню вибору \`${interaction.customId}\``, ephemeral: true });
                }
            }
        }
    }
};