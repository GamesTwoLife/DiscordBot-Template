import { ActivityType, Events } from "discord.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.join(__dirname, '../../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

export default {
	name: Events.ClientReady,
	once: true,
	
	/**
	 * 
	 * @param {import("../../../types/index.d.ts").MainClient} client 
	 */
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		
		const updatePresence = () => {
			const now = new Date();
			const timeString = now.toLocaleTimeString('en-US', { timeZone: "Europe/Kyiv", hour12: false, hour: "2-digit", minute: "2-digit" });
			const version = packageJson.version;

			client.user.setPresence({
				status: 'idle',
				activities: [
					{
						name: "custom",
						state: `v${version} | ${timeString}`,
						type: ActivityType.Custom,
					}
				],
			});
		};

		updatePresence();

		setInterval(updatePresence, 60_000);
	},
};
