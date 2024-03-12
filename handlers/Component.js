const { readdir } = require("fs/promises");
const path = require("path");

/**
 * 
 * @param {import("./../typings").MainClient} client 
 */
module.exports = async (client) => {
    const componentsBasePath = path.join(__dirname, "../components/");

    for (const module of ['autocomplete', 'buttons', 'modals', 'selectmenu']) {
        const modulePath = path.join(componentsBasePath, module);
        for (const folder of await readdir(modulePath)) {
            const files = await readdir(path.join(modulePath, folder))

            for (const file of files) {
                if (!file.endsWith('.js')) continue;
                try {
                    /** @type {import("./../typings").Component} */
                    const component = require(path.join(modulePath, folder, file));
    
                    if (!client.components.has(component.name)) {
                        client.components.set(component.name, [component]);
                    } else {
                        client.components.get(component.name).push(component)
                    }
                } catch (error) {
                    console.log(error)
                    console.error(`[ComponentHandler] Error loading component from a file ${file}: ${error.message}`);
                }
            }
        }
    }
};