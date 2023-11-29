const { SlashCommandBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

/**
 * @type {import('../../typings').Command}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName("sample")
        .setDescription("Sample Autocomplete/Button/Menu/Modal.")
        .addSubcommand(subcommand =>
            subcommand
                .setName("autocomplete")
                .setDescription("Sample Autocomplete")
                .addStringOption(option =>
                    option
                        .setName("input")
                        .setDescription("Input")
                        .setAutocomplete(true)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("button")
                .setDescription("Sample Button")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("menu")
                .setDescription("Sample Menu")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("modal")
                .setDescription("Sample Modal")
        )
        .setDMPermission(false),
    options: {
        ownerOnly: false,
        devGuildOnly: true,
        cooldown: 0,
        bot_permissions: ["ViewChannel", "SendMessages"],
    },

    async execute(interaction) {
        const { options } = interaction;

        switch(options.getSubcommand()) {
            case "autocomplete": {
                const Input = options.getString("input", true);

                await interaction.reply({ 
                    content: `${Input}`,
                    ephemeral: true 
                });
            } break;

            case "button": {
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId("sample")
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel("sample button")
                );

                await interaction.reply({ 
                    content: "Кнопка",
                    components: [row],
                    ephemeral: true 
                });
            } break;

            case "menu": {
                const row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("sample")
                        .setOptions(
                            {
                                label: "sample option",
                                value: "sample_option"
                            }
                        )
                );

                await interaction.reply({ 
                    content: "Меню",
                    components: [row],
                    ephemeral: true 
                });
            } break;

            case "modal": {
                const modal = new ModalBuilder()
                    .setCustomId("sample")
                    .setTitle("Sample");

                const input = new TextInputBuilder()
                    .setCustomId("input")
                    .setStyle(TextInputStyle.Short)
                    .setLabel("Input Text")
                    .setRequired(true);

                const row = new ActionRowBuilder().addComponents([input]);

                modal.setComponents(row);

                await interaction.showModal(modal)
            } break;
        }
    },
};