const { ContainerBuilder, TextDisplayBuilder } = require("discord.js");
const buildButtons = require("./buildButtons");
const { t } = require("i18next");

/**
 * Function for building a container
 * @param {string} content 
 * @param {string[]} emojis 
 * @param {number} currentPage 
 * @param {number} totalPages 
 * @param {Locale} locale 
 * @param {boolean} forceDisable 
 * @returns {ContainerBuilder}
 */
const renderPage = (content, emojis, currentPage, totalPages, locale, forceDisable = false) => {
	const container = new ContainerBuilder();

	container.addTextDisplayComponents(
		new TextDisplayBuilder().setContent(content)
	);

	container.addActionRowComponents(buildButtons(emojis, currentPage, forceDisable));

	container.addTextDisplayComponents(
		new TextDisplayBuilder().setContent(
			t('commands:sample.sample.pagination.footer', {
				lng: locale,
				currentPage: currentPage + 1,
				totalPages,
			})
		)
	);

	return container;
};

module.exports = renderPage;
