const { SlashCommandBuilder } = require("discord.js");
const { t } = require("i18next");

/**
 * @type {import('../../typings').Command}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription(t('commands:info.ping.description', { lng: "en-US" }))
        .setDescriptionLocalizations({
            'en-GB': t('commands:info.ping.description', { lng: "en-GB" }),
            uk: t('commands:info.ping.description', { lng: "uk" }),
            ru: t('commands:info.ping.description', { lng: "ru" })
        })
        .setDMPermission(false),
    options: {
        cooldown: 30,
        ownerOnly: false,
        devGuildOnly: true,
        bot_permissions: ["ViewChannel", "SendMessages"],
    },

    async execute(interaction) {
        const { client } = interaction;

        await interaction.deferReply()

        const reply = await interaction.fetchReply()
        
        await interaction.editReply({ content: t('commands:info.ping.content', { lng: interaction.locale, ping: Math.round(client.ws.ping), latency: Math.round(reply.createdTimestamp - interaction.createdTimestamp) }) });
    },
};
