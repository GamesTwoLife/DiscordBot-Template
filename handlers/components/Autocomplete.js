const { readdirSync } = require("fs");
const path = require("path");

/**
 * 
 * @param {import("./../../typings").MainClient} client 
 */
module.exports = (client) => {
    const autocompletesBasePath = path.join(__dirname, "../../components/autocomplete/");

    for (const module of readdirSync(autocompletesBasePath)) {
        const modulePath = path.join(autocompletesBasePath, module);
        const autocompleteFiles = readdirSync(modulePath).filter(file => file.endsWith(".js"));

        for (const autocompleteFile of autocompleteFiles) {
            try {
                const modalPath = path.join(modulePath, autocompleteFile);
                const autocomplete = require(modalPath);
                client.autocompletes.set(autocomplete.name, autocomplete);
                console.log(`[AutocompleteHandler] Автозаповнення ${autocomplete.name} завантажено`);
            } catch (error) {
                console.error(`[AutocompleteHandler] Помилка завантаження автозаповнення з файлу ${autocompleteFile}: ${error.message}`);
            }
        }
    }
};
