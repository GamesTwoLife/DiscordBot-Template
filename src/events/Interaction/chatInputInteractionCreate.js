import { Events, Collection, MessageFlags } from "discord.js";
import { t } from "i18next";
import config from "./../../../config.js";

export default {
	name: Events.InteractionCreate,
	/**
	 * 
	 * @param {import('discord.js').CommandInteraction & { client: import("../../types/index.d.ts").MainClient }} interaction 
	 */
	async execute(interaction) {
		const { client, guild, user } = interaction;

		if (!interaction.isChatInputCommand()) return;

		try {
			const command = client.commands.get(interaction.commandName);

			if (!command) {
				return interaction.reply({
					content: t('common:events.Interaction.no_command', { lng: interaction.locale, member: user.toString() }),
					flags: MessageFlags.Ephemeral
				});
			}

			if (command.options && command.options?.ownerOnly && !config.developers.includes(user.id)) {
				return interaction.reply({
					content: t('common:events.Interaction.only_developer', { lng: interaction.locale, member: user.toString() }),
					flags: MessageFlags.Ephemeral
				});
			}

			if (command.options && command.options?.bot_permissions && !guild.members.me.permissions.has(command.options?.bot_permissions)) {
				const permsBot = command.options?.bot_permissions?.map(x => x).join(', ');

				return interaction.reply({
					content: t('common:events.Interaction.missing_permissions', { lng: interaction.locale, member: user.toString(), permissions: permsBot }),
					flags: MessageFlags.Ephemeral
				});
			}

			const { cooldowns } = client;

			const subCommandNames = interaction.options?.data?.filter(sub => sub.type === 1).map(sub => sub.name);
			const commandName = subCommandNames.length > 0 ? `${interaction.commandName} ${subCommandNames[0]}` : interaction.commandName

			if (!cooldowns.has(commandName)) {
				cooldowns.set(commandName, new Collection());
			}

			const now = Date.now();
			const timestamps = cooldowns.get(commandName);
			const cooldownAmount = (command.options?.cooldown ?? 5) * 1000;

			if (timestamps.has(user.id)) {
				const expirationTime = timestamps.get(user.id) + cooldownAmount;
				
				if (now < expirationTime) {
					const expiredTimestamp = Math.round(expirationTime / 1000);

					if (interaction.deferred || interaction.replied) {
						return await interaction.followUp({
							content: t('common:events.Interaction.cooldown_command', { lng: interaction.locale, member: user.toString(), commandName: interaction.commandName, expiredTimestamp }),
							flags: MessageFlags.Ephemeral
						});
					} else {
						return await interaction.reply({
							content: t('common:events.Interaction.cooldown_command', { lng: interaction.locale, member: user.toString(), commandName: interaction.commandName, expiredTimestamp }),
							flags: MessageFlags.Ephemeral
						});
					}
				}
			}

			timestamps.set(user.id, now);
			setTimeout(() => timestamps.delete(user.id), cooldownAmount);

			await command.execute(interaction);
		} catch (error) {
			console.log(error);
			if (interaction.deferred || interaction.replied) {
				return await interaction.followUp({ 
					content: t('common:events.Interaction.error_occured', { lng: interaction.locale, member: user.toString() }), 
					flags: MessageFlags.Ephemeral
				});
			} else {
				return await interaction.reply({ 
					content: t('common:events.Interaction.error_occured', { lng: interaction.locale, member: user.toString() }), 
					flags: MessageFlags.Ephemeral
				});
			}
		}
	},
};
