const { Events } = require("kazagumo");

module.exports = {
    name: Events.PlayerDestroy,
    /**
     * 
     * @param {import("kazagumo").KazagumoPlayer} player 
     */
    async execute(player) {
        player.data.get("message")?.delete().catch(() => {});
    }
};
