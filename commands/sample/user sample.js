const { ContextMenuCommandBuilder, ApplicationCommandType, InteractionContextType } = require("discord.js");
const { t } = require("i18next");

/**
 * @type {import("../../typings").Command}
 */
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName(t('commands:sample.user_sample.description', { lng: "en" }).slice(0, 32))
        .setNameLocalizations({
            uk: t('commands:sample.user_sample.description', { lng: "uk" }).slice(0, 32),
            ru: t('commands:sample.user_sample.description', { lng: "ru" }).slice(0, 32)
        })
        .setType(ApplicationCommandType.User)
        .setContexts([InteractionContextType.Guild]),
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
