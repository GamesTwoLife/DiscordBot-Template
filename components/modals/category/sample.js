/**
 * @type {import("../../../typings").ModalInteraction}
 */
module.exports = {
    id: "sample",

    async execute(interaction) {
        const { client, fields } = interaction;

        const input = fields.getTextInputValue('input');

        await interaction.reply({ content: `${input}`, ephemeral: true });

        return;
    }
};
