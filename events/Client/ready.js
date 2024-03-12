const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    
    /**
     * 
     * @param {import('../../typings').MainClient} client 
     */
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};
