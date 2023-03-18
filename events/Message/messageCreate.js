const { Events, ChannelType } = require("discord.js")

module.exports = {
    name: Events.MessageCreate,
    /**
     * 
     * @param {import('discord.js').Message & { client: import('../../typings').MainClient }} message 
     */
    async execute(message) {
        const { client, author, guild, channel } = message;

        if (guild.id !== "1079879686076772394") return;
        if (author.bot) return;
        if (channel.type === ChannelType.DM || channel.type === ChannelType.GroupDM) return;

		const messageMention = message.content.match(new RegExp(`^<@!&${client.user.id}>`));

        if (!message.content.startsWith(messageMention) && message.content.includes(client.user.id)) {
            await message.react('👀');
        }

        const user = await client.dbuser.getUserById(author.id);

        if (!user) await client.dbuser.createUser({ userID: author.id });

        return;
    }
};
