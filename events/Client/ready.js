const { Events, ActivityType } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * 
     * @param {import('../../typings').MainClient} client 
     */
    execute(client) {
        console.log(`Готовий! Увійшли як ${client.user.tag}`);

        client.user.setPresence({ 
            activities: [{ name: "DiscordBotTemplate by GamesTwoLife", type: ActivityType.Watching }], 
            status: 'idle' 
        });
    }
};
