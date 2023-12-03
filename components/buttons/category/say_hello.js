/**
 * @type {import("../../../typings").ButtonInteraction}
 */
module.exports = {
    id: "say_hello",

    async execute(interaction) {
        await interaction.reply({ content: `Привіт, ${interaction.user}!`, ephemeral: true });

        return;
    },
};
