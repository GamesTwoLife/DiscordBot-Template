const { SlashCommandBuilder, InteractionContextType, ApplicationIntegrationType } = require("discord.js");
const { t } = require("i18next");

/**
 * @type {import("../../types/typings").Command}
 */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription(t('commands:info.ping.description', { lng: "en" }))
		.setDescriptionLocalizations({
			uk: t('commands:info.ping.description', { lng: "uk" })
		})
		.setContexts(InteractionContextType.Guild)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall),
	options: {
		cooldown: 30,
		ownerOnly: false,
		devGuildOnly: true,
		bot_permissions: [],
	},

	async execute(interaction) {
		const { client } = interaction;

		await interaction.deferReply()

		const reply = await interaction.fetchReply()
		
		await interaction.editReply({ content: t('commands:info.ping.content', { lng: interaction.locale, ping: Math.round(client.ws.ping), latency: Math.round(reply.createdTimestamp - interaction.createdTimestamp) }) });
	},
};
