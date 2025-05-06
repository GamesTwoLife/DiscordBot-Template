import { Events, Collection, MessageFlags } from "discord.js";
import { t } from "i18next";
import config from "./../../../config.js";

export default {
	name: Events.InteractionCreate,
	/**
	 * 
	 * @param {import('discord.js').AnySelectMenuInteraction & { client: import("../../types/index.d.ts").MainClient }} interaction 
	 */
	async execute(interaction) {
		const { client, user } = interaction;
		const { cooldowns } = client;

		if (!interaction.isAnySelectMenu()) return;

		try {
			const selectmenus = client.components.get(interaction.customId)?.filter(component => component.type === "selectmenu");

			if (!selectmenus) return;

			for (const selectmenu of selectmenus) {
				if (selectmenu.options && selectmenu.options?.ownerOnly && !config.developers.includes(user.id)) {
					return interaction.reply({
						content: t('common:events.Interaction.no_command', { lng: interaction.locale, member: user.toString() }),
						flags: MessageFlags.Ephemeral
					});
				}

				if (selectmenu.options && selectmenu.options?.bot_permissions && !guild.members.me.permissions.has(selectmenu.options?.bot_permissions)) {
					const permsBot = selectmenu.options?.bot_permissions?.map(x => x).join(', ');
	
					return interaction.reply({
						content: t('common:events.Interaction.missing_permissions', { lng: interaction.locale, member: user.toString(), permissions: permsBot }),
						flags: MessageFlags.Ephemeral
					});
				}
	
				if (!cooldowns.has(interaction.customId)) {
					cooldowns.set(interaction.customId, new Collection());
				}
	
				const now = Date.now();
				const timestamps = cooldowns.get(interaction.customId);
				const cooldownAmount = (selectmenu.options?.cooldown ?? 5) * 1000;
	
				if (timestamps.has(user.id)) {
					const expirationTime = timestamps.get(user.id) + cooldownAmount;
	
					if (now < expirationTime) {
						const expiredTimestamp = Math.round(expirationTime / 1000);
	
						if (interaction.deferred || interaction.replied) {
							return interaction.followUp({
								content: t('common:events.Interaction.cooldown_menu', { lng: interaction.locale, member: user.toString(), menuId: interaction.customId, expiredTimestamp }),
								flags: MessageFlags.Ephemeral
							});
						} else {
							return interaction.reply({
								content: t('common:events.Interaction.cooldown_menu', { lng: interaction.locale, member: user.toString(), menuId: interaction.customId, expiredTimestamp }),
								flags: MessageFlags.Ephemeral
							});
						}
					}
				}
	
				timestamps.set(user.id, now);
				setTimeout(() => timestamps.delete(user.id), cooldownAmount);
	
				return selectmenu.execute(interaction);
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
