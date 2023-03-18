const { Events } = require("kazagumo");

module.exports = {
    name: Events.PlayerEmpty,
    /**
     * 
     * @param {import("kazagumo").KazagumoPlayer} player 
     */
    async execute(player) {
        player.data.get("message")?.delete();
        player.destroy();
    }
};
