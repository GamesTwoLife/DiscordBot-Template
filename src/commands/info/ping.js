import { SlashCommandBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import { t } from "i18next";

/**
 * @type {import("../../../types/index.d.ts").Command}
 */
export default {
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
		
		const dbStart = Date.now();
		try {
			await client.db.sequelize.query('SELECT 1', { raw: true }); 
		} catch (error) {
			console.error('Помилка запиту до БД:', error);
		}
		const dbLatency = Date.now() - dbStart;
		
		const redisStart = Date.now();
		await client.redis.ping();
		const redisLatency = Date.now() - redisStart;

		const reply = await interaction.fetchReply()
		
		await interaction.editReply({
			content: t('commands:info.ping.content',
			{
				lng: interaction.locale, 
				ping: Math.round(client.ws.ping), 
				latency: Math.round(reply.createdTimestamp - interaction.createdTimestamp),
				dbLatency: dbLatency,
				redisLatency: redisLatency
			})
		});
	},
};
