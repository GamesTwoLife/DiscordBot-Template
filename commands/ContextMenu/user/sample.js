const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

/**
 * @type {import("../../../typings").ContextMenuCommand}
 */
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("sample")
        .setType(ApplicationCommandType.User)
        .setDMPermission(true),
    async execute(interaction) {
        if (!interaction.isUserContextMenuCommand()) return;

        const { targetId, targetMember, targetUser} = interaction;

        await interaction.editReply({ content: `Це відповідь на команду контекстного меню користувача\nID користувача: ${targetId}\nУчасник або Користувач: ${targetMember} / ${targetUser}`, ephemeral: true });
    }
};
