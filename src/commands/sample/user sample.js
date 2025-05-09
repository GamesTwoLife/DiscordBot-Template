import { ContextMenuCommandBuilder, ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, MessageFlags } from "discord.js";
import { t } from "i18next";

/**
 * @type {import("../../../types/index").Command}
 */
export default {
	data: new ContextMenuCommandBuilder()
		.setName("User Sample")
		.setType(ApplicationCommandType.User)
		.setContexts(InteractionContextType.Guild)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall),
	options: {
		cooldown: 10,
		ownerOnly: false,
		devGuildOnly: true,
		bot_permissions: [],
	},
	
	async execute(interaction) {
		if (!interaction.isUserContextMenuCommand()) return;

		const { targetId, targetMember, targetUser} = interaction;
		
		await interaction.reply({ 
			content: t('commands:sample.user_sample.content', { lng: interaction.locale, id: targetId, member: targetMember.toString(), user: targetUser.toString() }), 
			flags: MessageFlags.Ephemeral
		});
	},
};
