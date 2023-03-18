module.exports = {
    name: "close",
    async execute(name, code, reason) {
        console.warn(`Lavalink ${name}: закрито, код ${code}, причина ${reason || 'Немає причини'}`)
    }
};
