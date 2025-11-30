import "dotenv/config";

if (!process.env.DISCORD_TOKEN) throw new Error("DISCORD_TOKEN is missing in .env");
if (!process.env.CLIENT_ID) throw new Error("CLIENT_ID is missing in .env");
if (!process.env.GUILD_ID) throw new Error("GUILD_ID is missing in .env");

export default {
	token: process.env.DISCORD_TOKEN,
	postgresUri: process.env.POSTGRES_URL,
	redisUri: process.env.REDIS_URL,
	developers: process.env.DEVELOPERS || [],
	clientId: process.env.CLIENT_ID,
	guildId: process.env.GUILD_ID,
	channelId: process.env.CHANNEL_ID,
	color: 3092790,
	transparent_line: "https://cdn.discordapp.com/attachments/772218365413818428/1079003352408543302/11112.png",
};
