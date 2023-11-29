const { Events, Collection } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {import('discord.js').AnySelectMenuInteraction & { client: import('../../typings').MainClient }} interaction 
     */
    async execute(interaction) {
        const { client, user } = interaction;
        const { cooldowns } = client;

        if (!interaction.isAnySelectMenu()) return;

        try {
            const selectmenu = client.selectMenus.get(interaction.customId);

            if (!selectmenu) return;

            if (!cooldowns.has(interaction.customId)) {
                cooldowns.set(interaction.customId, new Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(interaction.customId);
            const cooldownAmount = (selectmenu.options?.cooldown || 0) * 1000;

            if (timestamps.has(user.id)) {
                const expirationTime = timestamps.get(user.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;

                    if (interaction.deferred || interaction.replied) {
                        await interaction.followUp({
                            content: `Зачекайте **${timeLeft.toFixed(1)}** секунд(и), перед повторним використанням меню ${interaction.customId}`,
                            ephemeral: true,
                        }).catch(() => {});
                    } else {
                        await interaction.reply({
                            content: `Зачекайте **${timeLeft.toFixed(1)}** секунд(и), перед повторним використанням меню ${interaction.customId}`,
                            ephemeral: true,
                        }).catch(() => {});
                    }
                    
                    return;
                }
            }

            timestamps.set(user.id, now);
            setTimeout(() => timestamps.delete(user.id), cooldownAmount);

            await selectmenu.execute(interaction);
        } catch (error) {
            console.log(error);
            if (interaction.deferred || interaction.replied) {
                await interaction.followUp({ 
                    content: `Виникла помилка \`${error.message}\` при виконанні меню вибору \`${interaction.customId}\``, 
                    ephemeral: true 
                }).catch(() => {});
            } else {
                await interaction.reply({ 
                    content: `Виникла помилка \`${error.message}\` при виконанні меню вибору \`${interaction.customId}\``, 
                    ephemeral: true 
                }).catch(() => {});
            }
        }
    },
};