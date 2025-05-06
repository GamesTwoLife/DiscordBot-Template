import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

/**
 * Function for building buttons
 * @param {string[]} emojis 
 * @param {number} currentPage 
 * @param {number} totalPages
 * @param {boolean} forceDisable 
 * @returns {ActionRowBuilder<ButtonBuilder>}
 */
const buildButtons = (emojis, currentPage, totalPages, forceDisable = false) => {
	return new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId("prev")
			.setStyle(ButtonStyle.Secondary)
			.setEmoji(emojis[0])
			.setDisabled(forceDisable || currentPage === 0),
		
		new ButtonBuilder()
			.setCustomId("home")
			.setStyle(ButtonStyle.Secondary)
			.setEmoji(emojis[1])
			.setDisabled(forceDisable || currentPage === 0),
		
		new ButtonBuilder()
			.setCustomId("next")
			.setStyle(ButtonStyle.Secondary)
			.setEmoji(emojis[2])
			.setDisabled(forceDisable || currentPage === totalPages - 1),
	);
};

export default buildButtons;
