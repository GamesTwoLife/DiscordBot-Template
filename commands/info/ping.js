const { SlashCommandBuilder, ApplicationCommandType } = require("discord.js");

/**
 * @type {import('../../typings').Command}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping Pong.")
        .setDMPermission(false),
    options: {
        ownerOnly: false,
        devGuildOnly: true,
        cooldown: 0,
        bot_permissions: ["ViewChannel", "SendMessages"],
    },

    async execute(interaction) {
        const { client } = interaction;

        await interaction.reply({ content: `Pong!\nWebsocket ping: **${client.ws.ping}**ms`, ephemeral: true });
    },
};
