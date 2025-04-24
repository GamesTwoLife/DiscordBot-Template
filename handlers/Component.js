const { readdir } = require("fs/promises");
const { join } = require("path");


/**
 * 
 * @param {import("../types/typings").MainClient} client 
 */
module.exports = async (client) => {
	const componentsBasePath = join(__dirname, "../components/");

	for (const module of ['buttons', 'modals', 'selectmenu']) {
		const modulePath = join(componentsBasePath, module);
		for (const folder of await readdir(modulePath)) {
			const files = await readdir(join(modulePath, folder))

			for (const file of files) {
				if (!file.endsWith('.js')) continue;
				try {
					/** @type {import("../types/typings").Component} */
					const component = require(join(modulePath, folder, file));
	
					if (!client.components.has(component.customId)) {
						client.components.set(component.customId, [component]);
					} else {
						client.components.get(component.customId).push(component)
					}
				} catch (error) {
					console.log(error)
					console.error(`[ComponentHandler] Error loading component from a file ${file}: ${error.message}`);
				}
			}
		}
	}
};
