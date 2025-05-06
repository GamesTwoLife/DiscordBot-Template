import { Events } from "discord.js";

export default {
	name: Events.ClientReady,
	once: true,
	
	/**
	 * 
	 * @param {import("../../types/index.d.ts").MainClient} client 
	 */
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
