const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, UserSelectMenuBuilder, ChannelSelectMenuBuilder, MentionableSelectMenuBuilder, RoleSelectMenuBuilder } = require("discord.js");
const { t } = require("i18next");
const buttonPagination = require("../../utils/buttonPagination");
const buttonWrapper = require("../../utils/buttonWrapper");

/**
 * @type {import('../../typings').Command}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName("sample")
        .setDescription(t('commands:sample.sample.description', { lng: "en" }))
        .setDescriptionLocalizations({
            uk: t('commands:sample.sample.description', { lng: "uk" }),
            ru: t('commands:sample.sample.description', { lng: "ru" })
        })
        .addSubcommand(subcommand =>
            subcommand
                .setName("autocomplete")
                .setDescription(t('commands:sample.sample.autocomplete.description', { lng: "en" }))
                .setDescriptionLocalizations({
                    uk: t('commands:sample.sample.autocomplete.description', { lng: "uk" }),
                    ru: t('commands:sample.sample.autocomplete.description', { lng: "ru" })
                })
                .addStringOption(option =>
                    option
                        .setName("input")
                        .setDescription(t('commands:sample.sample.autocomplete.options.input', { lng: "en" }))
                        .setDescriptionLocalizations({
                            uk: t('commands:sample.sample.autocomplete.options.input', { lng: "uk" }),
                            ru: t('commands:sample.sample.autocomplete.options.input', { lng: "ru" })
                        })
                        .setAutocomplete(true)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("button")
                .setDescription(t('commands:sample.sample.button.description', { lng: "en" }))
                .setDescriptionLocalizations({
                    uk: t('commands:sample.sample.button.description', { lng: "uk" }),
                    ru: t('commands:sample.sample.button.description', { lng: "ru" })
                })
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("menu")
                .setDescription("Sample Menu")
                .setDescription(t('commands:sample.sample.menu.description', { lng: "en" }))
                .setDescriptionLocalizations({
                    uk: t('commands:sample.sample.menu.description', { lng: "uk" }),
                    ru: t('commands:sample.sample.menu.description', { lng: "ru" })
                })
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("modal")
                .setDescription(t('commands:sample.sample.modal.description', { lng: "en" }))
                .setDescriptionLocalizations({
                    uk: t('commands:sample.sample.modal.description', { lng: "uk" }),
                    ru: t('commands:sample.sample.modal.description', { lng: "ru" })
                })
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("pagination")
                .setDescription(t('commands:sample.sample.pagination.description', { lng: "en" }))
                .setDescriptionLocalizations({
                    uk: t('commands:sample.sample.pagination.description', { lng: "uk" }),
                    ru: t('commands:sample.sample.pagination.description', { lng: "ru" })
                })
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("buttonwrapper")
                .setDescription(t('commands:sample.sample.buttonwrapper.description', { lng: "en" }))
                .setDescriptionLocalizations({
                    uk: t('commands:sample.sample.buttonwrapper.description', { lng: "uk" }),
                    ru: t('commands:sample.sample.buttonwrapper.description', { lng: "ru" })
                })
        )
        .setDMPermission(false),
    options: {
        cooldown: 10,
        ownerOnly: false,
        devGuildOnly: true,
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
                    components: [row]
                });
            } break;

            case "menu": {
                const row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("string_sample")
                        .setOptions(
                            {
                                label: "sample option",
                                value: "sample_option"
                            },
                            {
                                label: "sample option_two",
                                value: "sample_option_two"
                            }
                        )
                );

                const row2 = new ActionRowBuilder().addComponents(
                    new UserSelectMenuBuilder().setCustomId("user_sample")
                );

                const row3 = new ActionRowBuilder().addComponents(
                    new MentionableSelectMenuBuilder().setCustomId("mentionable_sample")
                );

                const row4 = new ActionRowBuilder().addComponents(
                    new ChannelSelectMenuBuilder().setCustomId("channel_sample")
                );

                const row5 = new ActionRowBuilder().addComponents(
                    new RoleSelectMenuBuilder().setCustomId("role_sample")
                );

                await interaction.reply({
                    components: [row, row2, row3, row4, row5]
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
                let embeds = [];

                for (let i = 0; i < 5; i++) {
                    embeds.push(new EmbedBuilder().setColor(0x2b2d31).setDescription(`${t(`commands:sample.sample.pagination.pageStrings.${[i]}`, { lng: interaction.locale })}`));
                }

                await buttonPagination(interaction, embeds);
            } break;

            case "buttonwrapper": {
                const buttons = [
                    new ButtonBuilder()
                        .setCustomId("say_hello")
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel(t('commands:sample.sample.buttonwrapper.say_hello', { lng: interaction.locale })),
                    new ButtonBuilder()
                        .setLabel(t('commands:sample.sample.buttonwrapper.cool_template', { lng: interaction.locale }))
                        .setStyle(ButtonStyle.Link)
                        .setURL("https://github.com/GamesTwoLife/DiscordBot-Template"),
                ];

                await interaction.reply({ 
                    content: t('commands:sample.sample.buttonwrapper.content', { lng: interaction.locale }),
                    components: buttonWrapper(buttons)
                });
            } break;
        }
    },
};