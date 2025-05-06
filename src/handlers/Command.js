import { readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * 
 * @param {import("./../../types/index.d.ts").MainClient} client 
 */
export default async (client) => {
	const commandsBasePath = join(__dirname, "../commands");

	for (const module of await readdir(commandsBasePath)) {
		const modulePath = join(commandsBasePath, module);

		for (const commandFile of await readdir(modulePath)) {
			if (!commandFile.endsWith('.js')) continue;
			try {
				const commandPath = pathToFileURL(join(modulePath, commandFile));

				/** @type {import("./../../types/index.d.ts").Command} */
				const { default: command } = await import(commandPath);

				command.folder = module;
				client.commands.set(command.data.name, command);
			} catch (error) {
				console.log(error)
				console.error(`[CommandHandler][${module}] Error loading a command from a file ${commandFile}: ${error.message}`);
			}
		}
	}
};
