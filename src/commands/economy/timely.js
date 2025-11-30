import { SlashCommandBuilder, InteractionContextType, ApplicationIntegrationType, MessageFlags, ContainerBuilder, SectionBuilder, TextDisplayBuilder, MediaGalleryBuilder, time } from "discord.js";
import { t } from "i18next";

/**
 * @type {import("../../../types/index.d.ts").Command}
 */
export default {
	data: new SlashCommandBuilder()
		.setName("timely")
		.setDescription(t('commands:economy.timely.description', { lng: "en" }))
		.setDescriptionLocalizations({
			uk: t('commands:economy.timely.description', { lng: "uk" })
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
		const { client, member, guild } = interaction;

		await interaction.deferReply()

		const { User } = client.db;

		const DAILY_REWARD_AMOUNT = Math.floor(Math.random() * 500) + 250;
		const DAILY_COOLDOWN_MS = 12 * 60 * 60 * 1000;

		const now = Date.now();

		const [user] = await User.findOrCreate({
			where: { guildId: guild.id, userId: member.id },
			defaults: {}
		});

		if (user.lastTimely) {
			const lastTimelyTimestamp = user.lastTimely.getTime();
			const timeElapsed = now - lastTimelyTimestamp;

			if (timeElapsed < DAILY_COOLDOWN_MS) {
				const timeLeft = DAILY_COOLDOWN_MS - timeElapsed;
				const nextTimelyTime = new Date(now + timeLeft);

				const relativeTime = time(nextTimelyTime, 'R');

				return interaction.editReply({
					flags: MessageFlags.IsComponentsV2,
					components: [
						new ContainerBuilder().addSectionComponents(
							new SectionBuilder().addTextDisplayComponents(
								new TextDisplayBuilder().setContent(`### Регулярний бонус\n${member}, ви зможете отримати бонус через ${relativeTime}`),
							).setThumbnailAccessory(thumbnail => thumbnail.setURL(member.displayAvatarURL())),
						).addMediaGalleryComponents(
							new MediaGalleryBuilder()
								.addItems(
									mediaGalleryItem => mediaGalleryItem.setURL(client.config.transparent_line),
								)
						)
					],
					allowedMentions: { parse: [] }
				});
			}
		}

		user.balance += DAILY_REWARD_AMOUNT;
		user.lastTimely = new Date(now);
		await user.save();

		await interaction.editReply({
			flags: MessageFlags.IsComponentsV2,
			components: [
				new ContainerBuilder().addSectionComponents(
					new SectionBuilder().addTextDisplayComponents(
						new TextDisplayBuilder().setContent(`### Регулярний бонус\n${member}, ви отримали **${DAILY_REWARD_AMOUNT}** 💵\nНаступна нагорода <t:${Math.floor((user.lastTimely + DAILY_COOLDOWN_MS) / 1000)}:R>`),
					).setThumbnailAccessory(thumbnail => thumbnail.setURL(member.displayAvatarURL())),
				).addMediaGalleryComponents(
					new MediaGalleryBuilder()
						.addItems(
							mediaGalleryItem => mediaGalleryItem.setURL(client.config.transparent_line),
						)
				)
			],
			allowedMentions: { parse: [] },
			withComponents: true
		});
	},
};
