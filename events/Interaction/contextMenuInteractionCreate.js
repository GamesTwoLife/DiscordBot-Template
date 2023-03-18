const { Events } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {import('discord.js').ContextMenuCommandInteraction & { client: import('../../typings').MainClient }} interaction 
     */
    async execute(interaction) {
        const { client } = interaction;

        if (!interaction.isContextMenuCommand()) return;

        if (interaction.isUserContextMenuCommand()) {
            const command = client.contextMenuCommands.get("USER " + interaction.commandName);

            if (!command) return interaction.reply({ content: "Нажаль, такої контекстної команди не існує!", ephemeral: true });
    
            try {
                await command.execute(interaction);
            } catch (error) {
                console.log(error);
                if (interaction.deferred || interaction.replied) {
                    await interaction.followUp({ content: `Виникла помилка при виконанні контекстної команди </${interaction.commandName}:${interaction.commandId}>`, ephemeral: true });
                } else {
                    await interaction.reply({ content: `Виникла помилка при виконанні контекстної команди </${interaction.commandName}:${interaction.commandId}>`, ephemeral: true });
                }
            }
        } else if (interaction.isMessageContextMenuCommand()) {
            const command = client.contextMenuCommands.get("MESSAGE " + interaction.commandName);

            if (!command) return interaction.reply({ content: "Нажаль, такої контекстної команди не існує!", ephemeral: true });
    
            try {
                await command.execute(interaction);
            } catch (error) {
                console.log(error);
                if (interaction.deferred || interaction.replied) {
                    await interaction.followUp({ content: `Виникла помилка \`${error.message}\` при виконанні контекстної команди </${interaction.commandName}:${interaction.commandId}>`, ephemeral: true });
                } else {
                    await interaction.reply({ content: `Виникла помилка \`${error.message}\` при виконанні контекстної команди </${interaction.commandName}:${interaction.commandId}>`, ephemeral: true });
                }
            }
        } else {
            return console.log("Щось дивне відбувається у контекстному меню. Отримано контекстне меню невідомого типу.");
        }
    }
};