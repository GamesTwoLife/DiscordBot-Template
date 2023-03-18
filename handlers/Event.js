const { readdirSync } = require("fs");

/**
 * 
 * @param {import("./../typings").MainClient} client 
 */
module.exports = (client) => {
    readdirSync("./events/").forEach(async (folder) => {
        readdirSync(`./events/${folder}`).forEach(async (file) => {
            switch (folder) {
                case 'Client': {
                    const event = require(`./../events/Client/${file}`);

                    if (event.once) {
                        client.once(event.name, (...args) => event.execute(...args));
                        console.log(`[ClientEventHandler] Подія ${event.name} (${file}) завантажена`);
                    } else {
                        client.on(event.name, (...args) => event.execute(...args));
                        console.log(`[ClientEventHandler] Подія ${event.name} (${file}) завантажена`);
                    }
                } break;

                case 'Player': {
                    const event = require(`./../events/Player/${file}`);

                    client.manager.on(event.name, (...args) => event.execute(...args, client));
                    console.log(`[PlayerEventHandler] Подія ${event.name} (${file}) завантажена`);
                } break;

                case 'Node': {
                    const event = require(`./../events/Node/${file}`);

                    client.manager.shoukaku.on(event.name, (...args) => event.execute(...args, client));
                    console.log(`[NodeEventHandler] Подія ${event.name} (${file}) завантажена`);
                } break;

                case 'Interaction': {
                    const event = require(`./../events/Interaction/${file}`);

                    client.on(event.name, (...args) => event.execute(...args));
                    console.log(`[InteractionEventHandler] Подія ${event.name} (${file}) завантажена`);
                } break;

                case 'Message': {
                    const event = require(`./../events/Message/${file}`);

                    client.on(event.name, (...args) => event.execute(...args));
                    console.log(`[MessageEventHandler] Подія ${event.name} (${file}) завантажена`);
                } break;
            
                case 'Guild': {
                    const event = require(`./../events/Guild/${file}`);

                    client.on(event.name, (...args) => event.execute(...args));
                    console.log(`[GuildEventHandler] Подія ${event.name} (${file}) завантажена`);
                } break;

                case 'Voice': {
                    const event = require(`./../events/Voice/${file}`);

                    client.on(event.name, (...args) => event.execute(...args));
                    console.log(`[VoiceEventHandler] Подія ${event.name} (${file}) завантажена`);
                } break;
            }
        });
    });
};
