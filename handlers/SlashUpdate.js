const { REST, Routes } = require("discord.js");
const { token, clientId, guildId } = require("./../config.json");

/**
 * 
 * @param {import("./../typings").MainClient} client 
 */
module.exports = (client) => {
    const rest = new REST({ version: "10" }).setToken(token);

    const commandsJSONData = [
        ...Array.from(client.commands.values()).map((c) => c.data.toJSON()),
        ...Array.from(client.contextMenuCommands.values()).map((c) => c.data.toJSON()),
    ];

    (async () => {
        try {
            console.log(`Розпочато оновлення ${commandsJSONData.length} (/) команд програми.`);

            //const data = await rest.put(Routes.applicationCommands(clientId), { body: commandsJSONData });

            const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsJSONData });
    
            console.log(`Успішно перезавантажено ${data.length} (/) команди програми.`);
        } catch (error) {
            console.error(error);
        }
    })();
};
