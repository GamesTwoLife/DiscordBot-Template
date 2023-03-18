const { readdirSync } = require("fs");

/**
 * 
 * @param {import("./../../typings").MainClient} client 
 */
module.exports = (client) => {
    readdirSync("./components/modals/").forEach(async (module) => {
        const modalFiles = readdirSync(`./components/modals/${module}`).filter(file => file.endsWith(".js"));

        for (const modalFile of modalFiles) {
            const modal = require(`./../../components/modals/${module}/${modalFile}`);
            client.modals.set(modal.id, modal);
            console.log(`[ModalHandler] Модальне вікно ${modal.id} завантажено`);
        }
    });
};
