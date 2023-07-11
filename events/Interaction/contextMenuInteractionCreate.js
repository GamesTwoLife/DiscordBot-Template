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

            if (command.options && command.options?.ownerOnly && !developers.includes(member.id)) {
                return interaction.reply({ content: "Ця контекстна команда лише для розробників бота!", ephemeral: true });
            }

            if (command.options && command.options?.bot_permissions && !guild.members.me.permissions.has(command.options?.bot_permissions)) {
                const permsBot = command.options?.bot_permissions?.map(x => perm[x]).join(', ');
    
                return interaction.reply({ content: `Мені не вистачає таких дозволів: ${permsBot}. Для виконання контекстної команди </${interaction.commandName}:${interaction.commandId}>`, ephemeral: true });
            }

            const { cooldowns } = client;

            if (!cooldowns.has("USER " + interaction.commandName)) {
                cooldowns.set("USER " + interaction.commandName, new Collection());
            }
    
            const now = Date.now();
            const timestamps = cooldowns.get("USER " + interaction.commandName);
            const cooldownAmount = (command.options?.cooldown || 3) * 1000;
    
            if (timestamps.has(member.id)) {
                const expirationTime = timestamps.get(member.id) + cooldownAmount;
    
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    await interaction.reply({
                        content: `Зачекайте **${timeLeft.toFixed(1)}** секунд(и), перед повторним використанням контекстної команди </${interaction.commandName}:${interaction.commandId}>`,
                        ephemeral: true,
                    }).catch(() => {});
                    return;
                }
            }
    
            timestamps.set(member.id, now);
            setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    
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

            if (command.options && command.options?.ownerOnly && !developers.includes(member.id)) {
                return interaction.reply({ content: "Ця контекста команда лише для розробників бота!", ephemeral: true });
            }
            
            if (command.options && command.options?.bot_permissions && !guild.members.me.permissions.has(command.options?.bot_permissions)) {
                const permsBot = command.options?.bot_permissions?.map(x => perm[x]).join(', ');
    
                return interaction.reply({ content: `Мені не вистачає таких дозволів: ${permsBot}. Для виконання контекстної команди </${interaction.commandName}:${interaction.commandId}>`, ephemeral: true });
            }

            const { cooldowns } = client;

            if (!cooldowns.has("MESSAGE " + interaction.commandName)) {
                cooldowns.set("MESSAGE " + interaction.commandName, new Collection());
            }
    
            const now = Date.now();
            const timestamps = cooldowns.get("MESSAGE " + interaction.commandName);
            const cooldownAmount = (command.options?.cooldown || 3) * 1000;
    
            if (timestamps.has(member.id)) {
                const expirationTime = timestamps.get(member.id) + cooldownAmount;
    
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    await interaction.reply({
                        content: `Зачекайте **${timeLeft.toFixed(1)}** секунд(и), перед повторним використанням контекстної команди </${interaction.commandName}:${interaction.commandId}>`,
                        ephemeral: true,
                    }).catch(() => {});
                    return;
                }
            }
    
            timestamps.set(member.id, now);
            setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    
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