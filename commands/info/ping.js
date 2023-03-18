const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

/**
 * @type {import('../../typings').Command}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping Pong.")
        .setDMPermission(true),
    options: {
        ownerOnly: false,
        cooldown: 0,
        bot_permissions: [PermissionsBitField.Flags.ViewChannel],
    },

    async execute(interaction) {
        const { client } = interaction;

        await interaction.reply({ content: `Pong!\nWebsocket ping: **${client.ws.ping}**ms`, ephemeral: true });

        return;
    }
};
