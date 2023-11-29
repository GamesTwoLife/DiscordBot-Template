const { readdirSync } = require("fs");

/**
 * 
 * @param {import("./../../typings").MainClient} client 
 */
module.exports = (client) => {
    for (const module of readdirSync("./components/buttons/")) {
        const buttonFiles = readdirSync(`./components/buttons/${module}`).filter(file => file.endsWith(".js"));

        for (const buttonFile of buttonFiles) {
            const button = require(`./../../components/buttons/${module}/${buttonFile}`);
            client.buttons.set(button.id, button);
            console.log(`[ButtonHandler] Кнопка ${button.id} завантажена`);
        }
    }
};
