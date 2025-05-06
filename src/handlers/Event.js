import { readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const restEvents = ["restDebug", "handlerSweep", "hashSweep", "invalidRequestWarning", "rateLimited", "response"];

/**
 * @param {import("./../../types/index.d.ts").MainClient} client 
 */
export default async (client) => {
	const eventsBasePath = join(__dirname, "../events");
	
	for (const folder of await readdir(eventsBasePath)) {
		const folderPath = join(eventsBasePath, folder);

		for (const file of await readdir(folderPath)) {
			try {
				const eventPath = pathToFileURL(join(folderPath, file));
				const { default: event } = await import(eventPath);

				if (event.once) {
					client.once(event.name, (...args) => event.execute(...args))
				} else if (restEvents.includes(event.name)) {
					client.rest.on(event.name, (...args) => event.execute(...args, client))
				} else {
					client.on(event.name, (...args) => event.execute(...args, client))
				}
			} catch (error) {
				console.error(`[EventHandler] Error loading an event from a file ${file}: ${error.message}`);
			}
		}
	}
};
