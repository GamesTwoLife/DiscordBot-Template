const { Events, Collection, MessageFlags } = require("discord.js");
const { developers } = require("../../config.json");
const { t } = require("i18next");

module.exports = {
	name: Events.InteractionCreate,
	/**
	 * 
	 * @param {import('discord.js').ModalSubmitInteraction & { client: import("../../types/typings").MainClient }} interaction 
	 */
	async execute(interaction) {
		const { client, guild, user } = interaction;

		if (!interaction.isModalSubmit()) return;

		try {
			const modals = client.components.get(interaction.customId)?.filter(component => component.type === "modalSubmit");

			if (!modals) return;

			for (const modal of modals) {
				if (modal.options && modal.options?.ownerOnly && !developers.includes(user.id)) {
					return interaction.reply({
						content: t('common:events.Interaction.no_command', { lng: interaction.locale, member: user.toString() }),
						flags: MessageFlags.Ephemeral
					});
				}
	
				if (modal.options && modal.options?.bot_permissions && !guild.members.me.permissions.has(modal.options?.bot_permissions)) {
					const permsBot = modal.options?.bot_permissions?.map(x => x).join(', ');
	
					return interaction.reply({
						content: t('common:events.Interaction.missing_permissions', { lng: interaction.locale, member: user.toString(), permissions: permsBot }),
						flags: MessageFlags.Ephemeral
					});
				}
	
				const { cooldowns } = client;
	
				if (!cooldowns.has(interaction.customId)) {
					cooldowns.set(interaction.customId, new Collection());
				}
	
				const now = Date.now();
				const timestamps = cooldowns.get(interaction.customId);
				const cooldownAmount = (modal.options?.cooldown ?? 5) * 1000;
	
				if (timestamps.has(user.id)) {
					const expirationTime = timestamps.get(user.id) + cooldownAmount;
	
					if (now < expirationTime) {
						const expiredTimestamp = Math.round(expirationTime / 1000);
	
						if (interaction.deferred || interaction.replied) {
							return interaction.followUp({
								content: t('common:events.Interaction.cooldown_modal', { lng: interaction.locale, member: user.toString(), modalId: interaction.customId, expiredTimestamp }),
								flags: MessageFlags.Ephemeral
							});
						} else {
							return interaction.reply({
								content: t('common:events.Interaction.cooldown_modal', { lng: interaction.locale, member: user.toString(), modalId: interaction.customId, expiredTimestamp }),
								flags: MessageFlags.Ephemeral
							});
						}
					}
				}
	
				timestamps.set(user.id, now);
				setTimeout(() => timestamps.delete(user.id), cooldownAmount);
	
				return modal.execute(interaction);
			}
		} catch (error) {
			console.log(error);
			if (interaction.deferred || interaction.replied) {
				return interaction.followUp({ 
					content: t('common:events.Interaction.error_occured', { lng: interaction.locale, member: user.toString() }),
					flags: MessageFlags.Ephemeral
				});
			} else {
				return interaction.reply({ 
					content: t('common:events.Interaction.error_occured', { lng: interaction.locale, member: user.toString() }), 
					flags: MessageFlags.Ephemeral
				});
			}
		}
	},
};
