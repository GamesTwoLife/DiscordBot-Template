const { Events, ChannelType } = require("discord.js")

module.exports = {
    name: Events.MessageCreate,
    /**
     * 
     * @param {import('discord.js').Message & { client: import('../../typings').MainClient }} message 
     */
    async execute(message) {
        const { client, author, guild, channel } = message;

        if (author.bot) return;
        if (channel.type === ChannelType.DM || channel.type === ChannelType.GroupDM) return;

		const messageMention = message.content.match(new RegExp(`^<@!&${client.user.id}>`));

        if (!message.content.startsWith(messageMention) && message.content.includes(client.user.id)) {
            await message.react('👀');
        }

        const guild_data = await client.dbguild.getGuild(guild.id);
        const user_data = await client.dbuser.getUser(guild.id, author.id);

        if (!guild_data) await client.dbguild.createGuild({ guildID: guild.id });
        if (!user_data) await client.dbuser.createUser({ guildID: guild.id, userID: author.id });
    },
};
