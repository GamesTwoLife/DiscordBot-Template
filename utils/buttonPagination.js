const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require("discord.js");

/**
 * 
 * @param {import("discord.js").ChatInputCommandInteraction | import("discord.js").ContextMenuCommandInteraction} interaction Об'єкт ChatInputCommandInteraction або ContextMenuCommandInteraction
 * @param {EmbedBuilder[]} pages Масив ембедів для кожної сторінки
 * @param {Number} time Час дії кнопок в мілісекундах
 * @param {String[]} emojis Масив емодзі для кнопок
 * @returns 
 */
module.exports = async (interaction, pages, time = 30 * 1000, emojis = ["⏪", "🏠", "⏩"]) => {
    try {
        if (!interaction || !pages || pages.length === 0) throw new Error("Неправильні аргументи");
        if (emojis.length < 3 || emojis.length > 3) throw new Error("Вказано менше або більше 3 емодзі в масиві");

        await interaction.deferReply();
    
        if (pages.length === 1) {
            return interaction.editReply({
                embeds: pages,
                components: [],
                fetchReply: true
            });
        }
    
        const prev = new ButtonBuilder()
            .setCustomId("prev")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(emojis[0])
            .setDisabled(true);
        
        const home = new ButtonBuilder()
            .setCustomId("home")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(emojis[1])
            .setDisabled(true);
        
        const next = new ButtonBuilder()
            .setCustomId("next")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(emojis[2]);
        
        const buttons = new ActionRowBuilder().addComponents([prev, home, next]);
        let index = 0;
    
        const msg = await interaction.editReply({
            embeds: [pages[index].setFooter({ text: `Сторінка ${index + 1}/${pages.length}`  })],
            components: [buttons],
            fetchReply: true
        });
    
        const collector = msg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time
        });
    
        collector.on("collect", async (i) => {
            if (i.user.id !== interaction.user.id) return i.deferUpdate();
    
            await i.deferUpdate();

            if (i.customId === "prev" && index > 0) {
                index--;
            } else if (i.customId === "home") {
                index = 0;
            } else if (i.customId === "next" && index < pages.length - 1) {
                index++;
            }
        
            if (index === 0) {
                prev.setDisabled(true);
                home.setDisabled(true);
            } else {
                prev.setDisabled(false);
                home.setDisabled(false);
            }
        
            if (index === pages.length - 1) {
                next.setDisabled(true);
            } else {
                next.setDisabled(false);
            }
        
            await msg.edit({
                embeds: [pages[index].setFooter({ text: `Сторінка ${index + 1}/${pages.length}`  })],
                components: [buttons]
            });
        
            collector.resetTimer();
        });

        collector.on("end", async (collected, reason) => {
            if (collected.size === 0 || reason === "time") {
                if (msg.editable) {
                    prev.setDisabled(true);
                    home.setDisabled(true);
                    next.setDisabled(true);

                    await msg.edit({
                        components: [buttons]
                    });
                }
            }
        });
        
        return msg;
    } catch(err) {
        console.log(err);
        if (interaction.deferred || interaction.replied) {
            await interaction.followUp({
                content: `Виникла помилка: ${err.message}`,
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: `Виникла помилка: ${err.message}`,
                ephemeral: true
            });
        }
    }
};