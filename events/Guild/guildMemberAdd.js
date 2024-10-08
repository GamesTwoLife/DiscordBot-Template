const { Events } = require("discord.js");

module.exports = {
	name: Events.GuildMemberAdd,
	/**
	 * 
	 * @param {import("discord.js").GuildMember & { client: import('../../typings').MainClient }} member
	 */
	async execute(member) {
		const { client, guild } = member;

		const user = await client.dbuser.getUser(guild.id, member.id);

		if (!user) await client.dbuser.createUser({ guildID: guild.id, userID: member.id });
	},
};
