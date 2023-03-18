const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync("./components/buttons/").forEach(async (module) => {
        const buttonFiles = readdirSync(`./components/buttons/${module}`).filter(file => file.endsWith(".js"));

        for (const buttonFile of buttonFiles) {
            const button = require(`./../../components/buttons/${module}/${buttonFile}`);
            client.buttons.set(button.id, button);
            console.log(`[ButtonHandler] Кнопка ${button.id} завантажена`);
        }
    });
};
