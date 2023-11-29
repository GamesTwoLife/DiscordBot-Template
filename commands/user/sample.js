const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

/**
 * @type {import("../../typings").Command}
 */
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("sample")
        .setType(ApplicationCommandType.User)
        .setDMPermission(false),
    options: {
        ownerOnly: false,
        devGuildOnly: true,
        cooldown: 0,
        bot_permissions: ["ViewChannel", "SendMessages"],
    },
    
    async execute(interaction) {
        if (!interaction.isUserContextMenuCommand()) return;

        const { targetId, targetMember, targetUser} = interaction;

        await interaction.reply({ 
            content: `Це відповідь на команду контекстного меню користувача\nID користувача: ${targetId}\nУчасник/Користувач: ${targetMember} / ${targetUser}`, 
            ephemeral: true 
        });
    },
};
