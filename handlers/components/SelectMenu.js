const { readdirSync } = require("fs");
const path = require("path");

/**
 * 
 * @param {import("./../../typings").MainClient} client 
 */
module.exports = (client) => {
    const selectMenusBasePath = path.join(__dirname, "../../components/selectmenu/");

    for (const module of readdirSync(selectMenusBasePath)) {
        const modulePath = path.join(selectMenusBasePath, module);
        const selectMenuFiles = readdirSync(modulePath).filter(file => file.endsWith(".js"));

        for (const selectMenuFile of selectMenuFiles) {
            try {
                const selectMenuPath = path.join(modulePath, selectMenuFile);
                const selectMenu = require(selectMenuPath);
                client.selectMenus.set(selectMenu.id, selectMenu);
                console.log(`[SelectMenuHandler] Меню ${selectMenu.id} завантажено`);
            } catch (error) {
                console.error(`[SelectMenuHandler] Помилка завантаження меню вибору з файлу ${selectMenuFile}: ${error.message}`);
            }
        }
    }
};
