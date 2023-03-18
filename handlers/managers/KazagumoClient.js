const { Kazagumo } = require("kazagumo");
const { Connectors } = require("shoukaku");
const Spotify = require('kazagumo-spotify');

module.exports = class KazagumoClient extends Kazagumo {
    constructor(client) {
        super({
            plugins: [
                new Spotify({
                    clientId: 'b157d9b2de1b4bb0a8d9e8df6e6ee9da',
                    clientSecret: 'b38e692a35e74756bd8932bae6f5f302',
                    playlistPageLimit: 1,
                    albumPageLimit: 1,
                    searchLimit: 25,
                    searchMarket: 'UA',
                })
            ],
            defaultSearchEngine: "youtube_music",
            send: (guildId, payload) => {
                const guild = client.guilds.cache.get(guildId);
                if (guild) guild.shard.send(payload);
            }
        }, new Connectors.DiscordJS(client), [{
            name: 'Node 1',
            url: 'localhost:2333',
            auth: 'musicserverforufamily',
            secure: false
        }], {
            moveOnDisconnect: false,
            resumable: false,
            resumableTimeout: 30,
            reconnectTries: 2,
            restTimeout: 10000
        });
    }
};
