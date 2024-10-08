const { ContextMenuCommandBuilder, ApplicationCommandType, InteractionContextType, ApplicationIntegrationType } = require("discord.js");
const { t } = require("i18next");

/**
 * @type {import("../../typings").Command}
 */
module.exports = {
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
			ephemeral: true 
		});
	},
};
