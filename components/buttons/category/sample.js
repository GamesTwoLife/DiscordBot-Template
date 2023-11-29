/**
 * @type {import("../../../typings").ButtonInteraction}
 */
module.exports = {
    id: "sample",

    async execute(interaction) {
        await interaction.reply({ content: `${interaction.customId}`, ephemeral: true });

        return;
    },
};
