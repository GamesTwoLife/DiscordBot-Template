const { readdirSync } = require("fs");
const path = require("path");

/**
 * 
 * @param {import("./../typings").MainClient} client 
 */
module.exports = (client) => {
    const commandsBasePath = path.join(__dirname, "../commands");

    for (const module of readdirSync(commandsBasePath)) {
        const modulePath = path.join(commandsBasePath, module);
        const commandFiles = readdirSync(modulePath).filter((file) => file.endsWith(".js"));

        commandFiles.forEach((commandFile) => {
            try {
                const commandPath = path.join(modulePath, commandFile);
                const command = require(commandPath);
                command.folder = module;
                client.commands.set(command.data.name, command);
                console.log(`[CommandHandler][${module}] Команда ${command.data.name} завантажена`);
            } catch (error) {
                console.error(`[CommandHandler] Помилка завантаження команди з файлу ${commandFile}: ${error.message}`);
            }
        });
    }
};