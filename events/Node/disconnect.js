module.exports = {
    name: "disconnect",
    async execute(name, players, moved) {
        if (moved) return;
        players.map(player => player.connection.disconnect())
        console.warn(`Lavalink ${name}: відключено`);
    }
};
