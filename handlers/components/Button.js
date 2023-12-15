const { readdirSync } = require("fs");
const path = require("path");

/**
 * 
 * @param {import("./../../typings").MainClient} client 
 */
module.exports = (client) => {
    const buttonsBasePath = path.join(__dirname, "../../components/buttons/");

    for (const module of readdirSync(buttonsBasePath)) {
        const modulePath = path.join(buttonsBasePath, module);
        const buttonFiles = readdirSync(modulePath).filter(file => file.endsWith(".js"));

        for (const buttonFile of buttonFiles) {
            try {
                const buttonPath = path.join(modulePath, buttonFile);
                const button = require(buttonPath);
                client.buttons.set(button.id, button);
                console.log(`[ButtonHandler] Кнопка ${button.id} завантажена`);
            } catch (error) {
                console.error(`[ButtonHandler] Помилка завантаження кнопки з файлу ${buttonFile}: ${error.message}`);
            }
        }
    }
};
