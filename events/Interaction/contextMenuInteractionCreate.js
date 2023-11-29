const { Events, Collection } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {import('discord.js').ContextMenuCommandInteraction & { client: import('../../typings').MainClient }} interaction 
     */
    async execute(interaction) {
        const { client, guild, user } = interaction;

        if (!interaction.isContextMenuCommand()) return;

        if (interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
            try {
                const command = client.commands.get(interaction.commandName);

                if (!command) {
                    return interaction.reply({ content: "Нажаль, такої контекстної команди не існує!", ephemeral: true }).catch(() => {});
                }

                if (command.options && command.options?.ownerOnly && !developers.includes(user.id)) {
                    return interaction.reply({ content: "Ця контекстна команда лише для розробників бота!", ephemeral: true }).catch(() => {});
                }

                if (command.options && command.options?.bot_permissions && !guild.members.me.permissions.has(command.options?.bot_permissions)) {
                    const permsBot = command.options?.bot_permissions?.map(x => x).join(', ');
        
                    return interaction.reply({ 
                        content: `Мені не вистачає таких дозволів: ${permsBot}. Для виконання контекстної команди "${interaction.commandName}"`, 
                        ephemeral: true 
                    }).catch(() => {});
                }

                const { cooldowns } = client;

                if (!cooldowns.has(interaction.commandName)) {
                    cooldowns.set(interaction.commandName, new Collection());
                }
        
                const now = Date.now();
                const timestamps = cooldowns.get(interaction.commandName);
                const cooldownAmount = (command.options?.cooldown || 0) * 1000;
        
                if (timestamps.has(user.id)) {
                    const expirationTime = timestamps.get(user.id) + cooldownAmount;
        
                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now) / 1000;

                        if (interaction.deferred || interaction.replied) {
                            await interaction.followUp({
                                content: `Зачекайте **${timeLeft.toFixed(1)}** секунд(и), перед повторним використанням контекстної команди </${interaction.commandName}:${interaction.commandId}>`,
                                ephemeral: true,
                            }).catch(() => {});
                        } else {
                            await interaction.reply({
                                content: `Зачекайте **${timeLeft.toFixed(1)}** секунд(и), перед повторним використанням контекстної команди </${interaction.commandName}:${interaction.commandId}>`,
                                ephemeral: true,
                            }).catch(() => {});
                        }

                        return;
                    }
                }
        
                timestamps.set(user.id, now);
                setTimeout(() => timestamps.delete(user.id), cooldownAmount);

                await command.execute(interaction);
            } catch (error) {
                console.log(error);
                if (interaction.deferred || interaction.replied) {
                    await interaction.followUp({ content: `Виникла помилка при виконанні контекстної команди "${interaction.commandName}"`, ephemeral: true }).catch(() => {});
                } else {
                    await interaction.reply({ content: `Виникла помилка при виконанні контекстної команди "${interaction.commandName}"`, ephemeral: true }).catch(() => {});
                }
            }
        } else {
            if (interaction.deferred || interaction.replied) {
                await interaction.followUp({ content: "Щось дивне відбувається у контекстному меню. Отримано контекстне меню невідомого типу.", ephemeral: true }).catch(() => {});
            } else {
                await interaction.reply({ content: "Щось дивне відбувається у контекстному меню. Отримано контекстне меню невідомого типу.", ephemeral: true }).catch(() => {});
            }
        }
    },
};