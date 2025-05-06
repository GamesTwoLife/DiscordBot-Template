import { readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * 
 * @param {import("./../../types/index.d.ts").MainClient} client 
 */
export default async (client) => {
	const componentsBasePath = join(__dirname, "../components");

	for (const module of ['buttons', 'modals', 'selectmenu']) {
		const modulePath = join(componentsBasePath, module);
		
		for (const folder of await readdir(modulePath)) {
			const files = await readdir(join(modulePath, folder))

			for (const file of files) {
				if (!file.endsWith('.js')) continue;
				try {
					const componentPath = pathToFileURL(join(modulePath, folder, file));
					
					/** @type {import("./../../types/index.d.ts").Component} */
					const { default: component } = await import(componentPath);
	
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
