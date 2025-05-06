import { ComponentType, MessageFlags } from "discord.js";
import renderPage from "./renderPage.js";
  
/**
 * 
 * @param {import("discord.js").ChatInputCommandInteraction | import("discord.js").ContextMenuCommandInteraction} interaction
 * @param {string[]} contentPages Array of lines of text for each page
 * @param {number} time Collector operation time in milliseconds
 * @param {string[]} emojis Emoji array
 */
export default async (interaction, contentPages, time = 30_000, emojis = ["⏪", "🏠", "⏩"]) => {
	try {
		if (!interaction || !contentPages || contentPages.length === 0) throw new Error("Wrong arguments");
		if (emojis.length !== 3) throw new Error("Exactly 3 emojis must be provided");

		await interaction.deferReply();

		let index = 0;

		const msg = await interaction.editReply({
			flags: MessageFlags.IsComponentsV2,
			components: [renderPage(contentPages[index], emojis, index, contentPages.length, interaction.locale)],
			fetchReply: true
		});

		const collector = msg.createMessageComponentCollector({
			componentType: ComponentType.Button,
			time
		});

		collector.on("collect", async (i) => {
			if (i.user.id !== interaction.user.id) return i.deferUpdate();

			await i.deferUpdate();

			if (i.customId === "prev" && index > 0) index--;
			else if (i.customId === "home") index = 0;
			else if (i.customId === "next" && index < contentPages.length - 1) index++;

			await msg.edit({
				flags: MessageFlags.IsComponentsV2,
				components: [renderPage(contentPages[index], emojis, index, contentPages.length, interaction.locale)]
			});

			collector.resetTimer();
		});

		collector.on("end", async (collected, reason) => {
			if (msg.editable && (collected.size === 0 || reason === "time")) {
				await msg.edit({
					flags: MessageFlags.IsComponentsV2,
					components: [
						renderPage(
							contentPages[index],
							emojis,
							index,
							contentPages.length,
							interaction.locale,
							true
						)
					]
				});
			}
		});

		return msg;
	} catch (err) {
		console.error(err);
		if (interaction.deferred || interaction.replied) {
			return interaction.followUp({
				content: `❌ ${err.message}`,
				flags: MessageFlags.Ephemeral
			});
		} else {
			return interaction.reply({
				content: `❌ ${err.message}`,
				flags: MessageFlags.Ephemeral
			});
		}
	}
};  
