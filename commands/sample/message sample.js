const { ContextMenuCommandBuilder, ApplicationCommandType, InteractionContextType } = require("discord.js");
const { t } = require("i18next");

/**
 * @type {import("../../typings").Command}
 */
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName(t('commands:sample.message_sample.description', { lng: "en" }).slice(0, 32))
        .setNameLocalizations({
            uk: t('commands:sample.message_sample.description', { lng: "uk" }).slice(0, 32),
            ru: t('commands:sample.message_sample.description', { lng: "ru" }).slice(0, 32)
        })
        .setType(ApplicationCommandType.Message)
        .setContexts([InteractionContextType.Guild]),
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
            ephemeral: true 
        });
    },
};
