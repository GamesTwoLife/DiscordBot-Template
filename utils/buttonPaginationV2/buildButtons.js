const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

/**
 * Function for building buttons
 * @param {string[]} emojis 
 * @param {number} currentPage 
 * @param {boolean} forceDisable 
 * @returns {ActionRowBuilder<ButtonBuilder>}
 */
const buildButtons = (emojis, currentPage, forceDisable = false) => {
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
			.setDisabled(forceDisable),
	);
};

module.exports = buildButtons;
