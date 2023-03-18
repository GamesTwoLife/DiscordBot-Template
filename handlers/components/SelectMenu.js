const { readdirSync } = require("fs");

/**
 * 
 * @param {import("./../../typings").MainClient} client 
 */
module.exports = (client) => {
    readdirSync("./components/selectmenu/").forEach(async (module) => {
        const selectMenuFiles = readdirSync(`./components/selectmenu/${module}`).filter(file => file.endsWith(".js"));

        for (const selectMenuFile of selectMenuFiles) {
            const selectMenu = require(`./../../components/selectmenu/${module}/${selectMenuFile}`);
            client.selectMenus.set(selectMenu.id, selectMenu);
            console.log(`[SelectMenuHandler] Меню ${selectMenu.id} завантажено`);
        }
    });
};
