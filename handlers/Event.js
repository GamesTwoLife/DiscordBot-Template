const { readdirSync } = require("fs");
const path = require("path");

const restEvents = ["restDebug", "handlerSweep", "hashSweep", "invalidRequestWarning", "rateLimited", "response"];

/**
 * @param {import("./../typings").MainClient} client 
 */
module.exports = (client) => {
    const eventsBasePath = path.join(__dirname, "../events");
    
    for (const folder of readdirSync(eventsBasePath)) {
        const folderPath = `${eventsBasePath}/${folder}`;

        for (const file of readdirSync(folderPath)) {
            try {
                const eventPath = path.join(folderPath, file);
                const event = require(eventPath);
    
                const eventHandler = event.once ? client.once : (restEvents.includes(event.name) ? client.rest.on : client.on);

                eventHandler(event.name, (...args) => event.execute(...args));
                console.log(`[EventHandler][${folder}] Подія ${event.name} (${file}) завантажена`);
            } catch (error) {
                console.error(`[EventHandler] Помилка завантаження події з файлу ${file}: ${error.message}`);
            }
        }
    }
};