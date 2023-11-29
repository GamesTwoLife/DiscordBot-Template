const { REST, Routes } = require("discord.js");
const { token, clientId, guildId } = require("./../config.json");

/**
 * 
 * @param {import("./../typings").MainClient} client 
 */
module.exports = (client) => {
    const rest = new REST({ version: "10" }).setToken(token);

    const commandsOnlyTestGuildJSONData = client.commands.filter(cmd => cmd.options.devGuildOnly === true).map(c => c.data.toJSON());
    const commandsJSONData = client.commands.filter(cmd => cmd.options.devGuildOnly === false).map(c => c.data.toJSON());

    (async () => {
        try {
            if (commandsJSONData.length === 0 && commandsOnlyTestGuildJSONData.length > 0) {
                console.log(`Розпочато оновлення ${commandsOnlyTestGuildJSONData.length} серверних команд програми.`);

                const [data_test_guild] = await Promise.all([
                    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsOnlyTestGuildJSONData })
                ]);

                console.log(`Успішно перезавантажено ${data_test_guild.length} серверних команд програми.`);
            } else if (commandsOnlyTestGuildJSONData.length === 0 && commandsJSONData.length > 0) {
                console.log(`Розпочато оновлення ${commandsJSONData.length} глобальних серверних команд програми.`);

                const [data] = await Promise.all([
                    rest.put(Routes.applicationCommands(clientId), { body: commandsJSONData })
                ]);

                console.log(`Успішно перезавантажено ${data.length} глобальних команд програми.`);
            } else {
                console.log(`Розпочато оновлення ${commandsJSONData.length} глобальних та ${commandsOnlyTestGuildJSONData.length} серверних команд програми.`);

                const [data_test_guild, data] = await Promise.all([
                    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsOnlyTestGuildJSONData }),
                    rest.put(Routes.applicationCommands(clientId), { body: commandsJSONData })
                ]);

                console.log(`Успішно перезавантажено ${data.length} глобальних та ${data_test_guild.length} серверних команд програми.`);
            }
        } catch (error) {
            console.error(error);
        }
    })();
};
