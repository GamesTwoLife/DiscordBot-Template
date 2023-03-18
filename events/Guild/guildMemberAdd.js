const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    /**
     * 
     * @param {import("discord.js").GuildMember & { client: import('../../typings').MainClient }} member
     */
    async execute(member) {
        const { client } = member;

        const user = await client.dbuser.getUserById(member.id);

        if (!user) await client.dbuser.createUser({ userID: member.id });
    }
};
