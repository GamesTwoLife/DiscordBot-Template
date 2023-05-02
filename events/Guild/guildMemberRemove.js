const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberRemove,
    /**
     * 
     * @param {import("discord.js").GuildMember & { client: import('../../typings').MainClient }} member
     */
    async execute(member) {
        const { client, guild } = member;

        const user = await client.dbuser.getUserById(guild.id, member.id);

        if (user) await client.dbuser.deleteUserById(guild.id, member.id);
    }
};
