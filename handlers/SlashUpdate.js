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

            /**
             * await rest.put(Routes.applicationCommands(clientId), { body: commandsJSONData }); - реєструє глобальні команди, котрі з'являться на всіх серверах на протязі 1 години
             * await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsJSONData }); - реєструє команди тільки на одному сервері, з'являються миттєво
             */

            const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsJSONData });
    
            console.log(`Успішно перезавантажено ${data.length} (/) команд програми.`);
        } catch (error) {
            console.error(error);
        }
    })();
};
