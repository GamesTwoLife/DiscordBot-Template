const { Events, Collection } = require("discord.js")
const { developers } = require("../../config.json");

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {import('discord.js').CommandInteraction & { client: import('../../typings').MainClient }} interaction 
     */
    async execute(interaction) {
        const { client, guild, user } = interaction;

        if (!interaction.isChatInputCommand()) return;

		try {
			const command = client.commands.get(interaction.commandName);

			if (!command) {
				return interaction.reply({ content: "Нажаль, такої команди не існує або виникла якась неочікувана помилка!", ephemeral: true });
			}

			if (command.options && command.options?.ownerOnly && !developers.includes(user.id)) {
				return interaction.reply({ content: "Ця команда лише для розробників бота!", ephemeral: true });
			}

			if (command.options && command.options?.bot_permissions && !guild.members.me.permissions.has(command.options?.bot_permissions)) {
				const permsBot = command.options?.bot_permissions?.map(x => x).join(', ');

				return interaction.reply({ content: `Мені не вистачає таких дозволів: ${permsBot}. Для виконання команди </${interaction.commandName}:${interaction.commandId}>`, ephemeral: true });
			}

			const { cooldowns } = client;

			if (!cooldowns.has(interaction.commandName)) {
				cooldowns.set(interaction.commandName, new Collection());
			}

			const now = Date.now();
			const timestamps = cooldowns.get(interaction.commandName);
			const cooldownAmount = (command.options?.cooldown || 3) * 1000;

			if (timestamps.has(user.id)) {
				const expirationTime = timestamps.get(user.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;

					if (interaction.deferred || interaction.replied) {
						await interaction.followUp({
							content: `Зачекайте **${timeLeft.toFixed(1)}** секунд(и), перед повторним використанням команди </${interaction.commandName}:${interaction.commandId}>`,
							ephemeral: true,
						}).catch(() => {});
					} else {
						await interaction.reply({
							content: `Зачекайте **${timeLeft.toFixed(1)}** секунд(и), перед повторним використанням команди </${interaction.commandName}:${interaction.commandId}>`,
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
                await interaction.followUp({ 
					content: `Виникла помилка \`${error.message}\` при виконанні команди </${interaction.commandName}:${interaction.commandId}>`, 
					ephemeral: true 
				}).catch(() => {});
            } else {
                await interaction.reply({ 
					content: `Виникла помилка \`${error.message}\` при виконанні команди </${interaction.commandName}:${interaction.commandId}>`, 
					ephemeral: true 
				}).catch(() => {});
            }
        }
    },
};