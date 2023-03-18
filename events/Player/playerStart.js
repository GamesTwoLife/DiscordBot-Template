const { EmbedBuilder } = require("discord.js");
const { Events } = require("kazagumo");

module.exports = {
    name: Events.PlayerStart,
    /**
     * 
     * @param {import("kazagumo").KazagumoPlayer} player 
     * @param {import("kazagumo").KazagumoTrack} track 
     * @param {import("./../../typings").MainClient} client 
     */
    async execute(player, track, client) {
        if (player.playing) {
            const channel = await client.channels.cache.get(player.textId);

            await channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x2f3136)
                        .setThumbnail(`${track.thumbnail}`)
                        .setTitle(`${track.title}`)
                        .setURL(`${track.uri || track.realUri}`)
                        .addFields([
                            { name: `Замовник`, value: `${track.requester}`, inline: true },
                            { name: `Автор`, value: `${track.author}`, inline: true },
                        ])
                ],
                components: []
            }).then(x => player.data.set("message", x));
        }
    }
};
