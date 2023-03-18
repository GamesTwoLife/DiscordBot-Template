module.exports = {
    name: "error",
    async execute(name, error) {
        console.error(`Lavalink ${name}: Error Caught,`, error)
    }
};
