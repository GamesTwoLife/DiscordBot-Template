const { readdirSync } = require("fs");

const restEvents = ["restDebug", "handlerSweep", "hashSweep", "invalidRequestWarning", "rateLimited", "response"];

/**
 * 
 * @param {import("./../typings").MainClient} client 
 */
module.exports = (client) => {
    for (const folder of readdirSync("./events/")) {
        for (const file of readdirSync(`./events/${folder}`)) {
            const event = require(`./../events/${folder}/${file}`);

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
                console.log(`[ClientEventHandler] Подія ${event.name} (${file}) завантажена`);
            } else {
                if (restEvents.includes(event.name)) {
                    client.rest.on(event.name, (...args) => event.execute(...args));
                    console.log(`[RestEventHandler] Подія ${event.name} (${file}) завантажена`);
                } else {
                    client.on(event.name, (...args) => event.execute(...args));
                    console.log(`[EventHandler] Подія ${event.name} (${file}) завантажена`);
                }
            }
        }
    }
};