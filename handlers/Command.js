const { readdirSync } = require("fs");

/**
 * 
 * @param {import("./../typings").MainClient} client 
 */
module.exports = (client) => {
    for (const module of readdirSync("./commands/")) {
        const commandFiles = readdirSync(`./commands/${module}`).filter(file => file.endsWith(".js"));

        for (const commandFile of commandFiles) {
            const command = require(`./../commands/${module}/${commandFile}`);
            command.folder = module;
            client.commands.set(command.data.name, command);
            console.log(`[CommandHandler] Команда ${command.data.name} завантажена`);
        }
    }
};
