const { readdirSync } = require("fs");

/**
 * 
 * @param {import("./../typings").MainClient} client 
 */
module.exports = (client) => {
    readdirSync("./commands/ContextMenu").forEach(async (module) => {
        const contextMenuCommandFiles = readdirSync(`./commands/ContextMenu/${module}`).filter(file => file.endsWith(".js"));

        for (const contextMenuCommandFile of contextMenuCommandFiles) {
            const contextMenuCommand = require(`./../commands/ContextMenu/${module}/${contextMenuCommandFile}`);
            const keyName = `${module.toUpperCase()} ${contextMenuCommand.data.name}`;
            contextMenuCommand.folder = module;
            client.contextMenuCommands.set(keyName, contextMenuCommand);
            console.log(`[ContextMenuCommandHandler] Команда контектного меню ${contextMenuCommand.data.name} (${module.toUpperCase()}) завантажена`);
        }
    });
};
