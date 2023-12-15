const { readdirSync } = require("fs");
const path = require("path");

/**
 * 
 * @param {import("./../../typings").MainClient} client 
 */
module.exports = (client) => {
    const modalsBasePath = path.join(__dirname, "../../components/modals/");

    for (const module of readdirSync(modalsBasePath)) {
        const modulePath = path.join(modalsBasePath, module);
        const modalFiles = readdirSync(modulePath).filter(file => file.endsWith(".js"));

        for (const modalFile of modalFiles) {
            try {
                const modalPath = path.join(modulePath, modalFile);
                const modal = require(modalPath);
                client.modals.set(modal.id, modal);
                console.log(`[ModalHandler] Модальне вікно ${modal.id} завантажено`);
            } catch (error) {
                console.error(`[ModalHandler] Помилка завантаження модального вікна з файлу ${modalFile}: ${error.message}`);
            }
        }
    }
};
