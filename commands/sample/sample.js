const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require("discord.js");
const buttonPagination = require("../../utils/buttonPagination");
const buttonWrapper = require("../../utils/buttonWrapper");

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
        .addSubcommand(subcommand =>
            subcommand
                .setName("pagination")
                .setDescription("Sample Pagination")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("buttonwrapper")
                .setDescription("Sample Button Wrapper")
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
                    content: `${Input}`
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
                    components: [row]
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
                    components: [row]
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

            case "pagination": {
                let pageStrings = [
                    "Котики найкращі :)", 
                    "Песики найкращі :)", 
                    "Україна понад усе!", 
                    "Слава Україні! Героям Слава!", 
                    "Крутий шаблон бота"
                ];
                let embeds = [];

                for (let i = 0; i < 4; i++) {
                    embeds.push(new EmbedBuilder().setColor(0x2b2d31).setDescription(`${pageStrings[i]}`));
                }

                await buttonPagination(interaction, embeds);
            } break;

            case "buttonwrapper": {
                const buttons = [
                    new ButtonBuilder()
                        .setCustomId("say_hello")
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel("Натисни на мене"),
                    new ButtonBuilder()
                        .setLabel("Найкращий шаблон Discord бота")
                        .setStyle(ButtonStyle.Link)
                        .setURL("https://github.com/GamesTwoLife/DiscordBot-Template"),
                ];

                await interaction.reply({ 
                    content: "Натискайте на кнопки знизу:",
                    components: buttonWrapper(buttons)
                });
            } break;
        }
    },
};