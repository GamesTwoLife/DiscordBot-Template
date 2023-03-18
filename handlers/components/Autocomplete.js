const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync("./components/autocomplete/").forEach(async (module) => {
        const autocompleteFiles = readdirSync(`./components/autocomplete/${module}`).filter(file => file.endsWith(".js"));

        for (const autocompleteFile of autocompleteFiles) {
            const autocomplete = require(`./../../components/autocomplete/${module}/${autocompleteFile}`);
            client.autocompletes.set(autocomplete.name, autocomplete);
            console.log(`[AutocompleteHandler] Автозаповнення ${autocomplete.name} завантажено`);
        }
    });
};
