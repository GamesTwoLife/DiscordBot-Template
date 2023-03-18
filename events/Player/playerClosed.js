const { Events } = require("kazagumo");

module.exports = {
    name: Events.PlayerClosed,
    /**
     * 
     * @param {import("kazagumo").KazagumoPlayer} player 
     */
    async execute(player, data) {
        player.data.get("message")?.delete();
    }
};
