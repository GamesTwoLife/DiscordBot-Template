const { Events, Collection } = require("discord.js")

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

        const { cooldowns } = client;

		if (!cooldowns.has(interaction.customId)) {
			cooldowns.set(interaction.customId, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(interaction.customId);
		const cooldownAmount = (button.options?.cooldown || 3) * 1000;

		if (timestamps.has(member.id)) {
			const expirationTime = timestamps.get(member.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				await interaction.reply({
					content: `Зачекайте **${timeLeft.toFixed(1)}** секунд(и), перед повторним використанням кнопки ${interaction.customId}`,
					ephemeral: true,
				}).catch(() => {});
				return;
			}
		}

		timestamps.set(member.id, now);
		setTimeout(() => timestamps.delete(member.id), cooldownAmount);

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