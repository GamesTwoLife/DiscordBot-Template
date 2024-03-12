/**
 * @type {import("../../../typings").Modal}
 */
module.exports = {
    name: "sample",
    type: "modalSubmit",

    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;

        const { fields } = interaction;

        const input = fields.getTextInputValue('input');

        return interaction.reply({ content: `${input}`, ephemeral: true });
    },
};
