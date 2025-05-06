import "dotenv/config";

if (!process.env.DISCORD_TOKEN) throw new Error("DISCORD_TOKEN is missing in .env");
if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing in .env");
if (!process.env.CLIENT_ID) throw new Error("CLIENT_ID is missing in .env");
if (!process.env.GUILD_ID) throw new Error("GUILD_ID is missing in .env");

export default {
	token: process.env.DISCORD_TOKEN,
	mongoUri: process.env.MONGO_URI,
	developers: process.env.DEVELOPERS || [],
	clientId: process.env.CLIENT_ID,
	guildId: process.env.GUILD_ID,
	channelId: process.env.CHANNEL_ID
};
