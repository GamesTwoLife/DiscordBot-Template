const { REST, Routes } = require("discord.js");
const { token, clientId, guildId } = require("./../config.json");

/**
 * 
 * @param {import("../types/typings").MainClient} client 
 */
module.exports = async (client) => {
	try {
		const rest = new REST({ version: "10" }).setToken(token);

		const commandsOnlyTestGuildJSONData = client.commands.filter(cmd => cmd.options.devGuildOnly === true).map(c => c.data.toJSON());
		const commandsJSONData = client.commands.filter(cmd => cmd.options.devGuildOnly === false).map(c => c.data.toJSON());

		if (commandsJSONData.length === 0 && commandsOnlyTestGuildJSONData.length > 0) {
			console.log(`Updating ${commandsOnlyTestGuildJSONData.length} of the program's guild commands has started.`);

			const [data_test_guild] = await Promise.all([
				rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsOnlyTestGuildJSONData }),
				rest.put(Routes.applicationCommands(clientId), { body: [] })
			]);

			console.log(`Successfully updated ${data_test_guild.length} of the program's guild commands.`);
		} else if (commandsOnlyTestGuildJSONData.length === 0 && commandsJSONData.length > 0) {
			console.log(`Updating ${commandsJSONData.length} of the program's global commands has started.`);

			const [data] = await Promise.all([
				rest.put(Routes.applicationCommands(clientId), { body: commandsJSONData }),
				rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
			]);

			console.log(`Successfully updated ${data.length} of the program's global commands.`);
		} else {
			console.log(`Updating ${commandsJSONData.length} global and ${commandsOnlyTestGuildJSONData.length} guild commands of the program.`);

			const [data_test_guild, data] = await Promise.all([
				rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsOnlyTestGuildJSONData }),
				rest.put(Routes.applicationCommands(clientId), { body: commandsJSONData })
			]);

			console.log(`Successfully updated ${data.length} global and ${data_test_guild.length} guild commands of the program.`);
		}
	} catch (error) {
		console.error(error);
	}
};
