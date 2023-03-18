const { readdirSync } = require("fs");

/**
 * 
 * @param {import("./../typings").MainClient} client 
 */
module.exports = (client) => {
    readdirSync("./commands/").forEach(async (module) => {
        if (module === "ContextMenu") return;
        const commandFiles = readdirSync(`./commands/${module}`).filter(file => file.endsWith(".js"));

        for (const commandFile of commandFiles) {
            const command = require(`./../commands/${module}/${commandFile}`);
            client.commands.set(command.data.name, command);
            console.log(`[CommandHandler] Команда ${command.data.name} завантажена`);
        }
    });
};
