const { Kazagumo } = require("kazagumo");
const { Connectors } = require("shoukaku");
const Spotify = require('kazagumo-spotify');
const Deezer = require('stone-deezer');

const { spotifyClientId, spotifyClientSecret } = require("./../../config-example.json")

module.exports = class KazagumoClient extends Kazagumo {
    /**
     * 
     * @param {import("./../../typings").MainClient} client 
     */
    constructor(client) {
        super({
            plugins: [
                new Spotify({
                    clientId: spotifyClientId,
                    clientSecret: spotifyClientSecret,
                    playlistPageLimit: 1,
                    albumPageLimit: 1,
                    searchLimit: 25,
                    searchMarket: 'UA',
                }),
                new Deezer({
                    playlistLimit: 25
                }),
            ],
            defaultSearchEngine: "spotify",
            send: (guildId, payload) => {
                const guild = client.guilds.cache.get(guildId);
                if (guild) guild.shard.send(payload);
            }
        }, new Connectors.DiscordJS(client), [{
            name: "Node DіscordBotTemplate",
            url: 'localhost:2333',
            auth: 'passwordlavalinkserver',
            secure: false
        }], {
            moveOnDisconnect: false,
            resume: false,
            resumeKey: "DіscordBotTemplateResumeKey",
            resumeTimeout: 30,
            reconnectTries: 5,
            restTimeout: 10000
        });
    }
};
