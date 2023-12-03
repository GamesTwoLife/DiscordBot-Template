const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

/**
 * @type {import("../../typings").Command}
 */
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("message sample")
        .setType(ApplicationCommandType.Message)
        .setDMPermission(false),
    options: {
        cooldown: 0,
        ownerOnly: false,
        devGuildOnly: true,
        bot_permissions: ["ViewChannel", "SendMessages"],
    },

    async execute(interaction) {
        if (!interaction.isMessageContextMenuCommand()) return;

        const { targetId, targetMessage } = interaction;

        await interaction.reply({ 
            content: `Це відповідь на команду контекстного меню повідомлення\nID повідомлення: ${targetId}\nКонтент повідомлення: ${targetMessage}`, 
            ephemeral: true 
        });
    },
};
