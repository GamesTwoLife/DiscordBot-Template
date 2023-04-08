const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

/**
 * @type {import("../../../typings").ContextMenuCommand}
 */
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("sample")
        .setType(ApplicationCommandType.Message)
        .setDMPermission(true),
    async execute(interaction) {
        if (!interaction.isMessageContextMenuCommand()) return;

        const { targetId, targetMessage } = interaction;

        await interaction.editReply({ content: `"Це відповідь на команду контекстного меню повідомлення\nID повідомлення: ${targetId}\nКонтент повідомлення: ${targetMessage}`, ephemeral: true });
    }
};
