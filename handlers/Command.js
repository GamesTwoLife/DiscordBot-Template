const { readdir } = require("fs/promises");
const { join } = require("path");

/**
 * 
 * @param {import("../types/typings").MainClient} client 
 */
module.exports = async (client) => {
	const commandsBasePath = join(__dirname, "../commands");

	for (const module of await readdir(commandsBasePath)) {
		const modulePath = join(commandsBasePath, module);
		const commandFiles = await readdir(modulePath);

		for (const commandFile of commandFiles) {
			if (!commandFile.endsWith('.js')) continue;
			try {
				const commandPath = join(modulePath, commandFile);

				/** @type {import("../types/typings").Command} */
				const command = require(commandPath);

				command.folder = module;
				client.commands.set(command.data.name, command);
			} catch (error) {
				console.log(error)
				console.error(`[CommandHandler][${module}] Error loading a command from a file ${commandFile}: ${error.message}`);
			}
		}
	}
};
