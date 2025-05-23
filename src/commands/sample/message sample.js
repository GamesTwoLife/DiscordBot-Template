import { ContextMenuCommandBuilder, ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, MessageFlags } from "discord.js";
import { t } from "i18next";

/**
 * @type {import("../../../types/index.d.ts").Command}
 */
export default {
	data: new ContextMenuCommandBuilder()
		.setName("Message Sample")
		.setType(ApplicationCommandType.Message)
		.setContexts(InteractionContextType.Guild)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall),
	options: {
		cooldown: 10,
		ownerOnly: false,
		devGuildOnly: true,
		bot_permissions: [],
	},

	async execute(interaction) {
		if (!interaction.isMessageContextMenuCommand()) return;

		const { targetId, targetMessage } = interaction;
		
		await interaction.reply({ 
			content: t('commands:sample.message_sample.content', { lng: interaction.locale, id: targetId, message: targetMessage.content }), 
			flags: MessageFlags.Ephemeral
		});
	},
};
