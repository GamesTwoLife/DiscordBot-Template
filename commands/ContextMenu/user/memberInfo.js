const { profileImage } = require("discord-arts");
const { ContextMenuCommandBuilder, AttachmentBuilder, EmbedBuilder, ApplicationCommandType } = require("discord.js");

/**
 * @type {import("./../../../typings").ContextMenuCommand}
 */
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Інформація про користувача")
        .setType(ApplicationCommandType.User)
        .setDMPermission(true),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const { guild, targetId } = interaction;

            const fetchMembers = await guild.members.fetch();

            const member = await guild.members.cache.get(targetId) || await interaction.member;

            await member.user.fetch();

            if (member.user.bot) return interaction.editReply({
                content: "Наразі не можна подивитись інформацію бота!",
                ephemeral: true
            });

            const profileBuffer = await profileImage(member.id);
            const imageAttachment = new AttachmentBuilder(profileBuffer, { name: "profile.png" });

            const joinPosition = Array.from(fetchMembers
                .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                .keys())
                .indexOf(member.id) + 1;

            const topRoles = member.roles.cache
                .sort((a, b) => a.position - b.position)
                .filter(r => r.name !== '@everyone')
                .map(role => role)
                .slice(0, 3);

            const userBadges = member.user.flags.toArray();

            const joinTime = parseInt(member.joinedTimestamp / 1000);
            const createdTime = parseInt(member.user.createdTimestamp / 1000);

            const Booster = member.premiumSince ? "<:discordboost7:1085644561499570277>" : "Ні";

            const extention = member.user.banner.startsWith('a_') ? '.gif' : '.png';

            const url = `https://cdn.discordapp.com/banners/${member.id}/${member.user.banner}${extention}?size=2048`;

            const Embed = new EmbedBuilder()
                .setAuthor({ name: `${member.user.tag} | Загальна Інформація`, iconURL: member.displayAvatarURL() })
                .setColor(member.user.accentColor || member.accentColor || member.displayColor)
                .setDescription(`<t:${joinTime}:D> ${member.displayName} приєднався(-лася) як ${addSuffics(joinPosition)} учасник сервера`)
                .setImage("attachment://profile.png")
                .addFields([
                    { name: "Значки", value: `${addBadges(userBadges).join(" ")}`, inline: true },
                    { name: "Бустер", value: `${Booster}`, inline: true },
                    { name: "Найкращі ролі", value: `${topRoles.join(" ").replace(`<@${interaction.guildId}>`)}`, inline: false },
                    { name: "Створено", value: `<t:${createdTime}:R>`, inline: true },
                    { name: "Приєднався", value: `<t:${joinTime}:R>`, inline: true },
                    { name: "Ідентифікатор", value: `${member.id}`, inline: false },
                    { name: "Аватар", value: `[Посилання](${member.displayAvatarURL()})`, inline: true },
                    { name: "Банер", value: `[Посилання](${url})`, inline: true }
                ]);

            interaction.editReply({ embeds: [Embed], files: [imageAttachment] });
        } catch (error) {
            interaction.editReply({ content: `Виникла помилка **\`${error.message}\`**, [__зв'яжіться з розробником__](<https://discord.com/users/713064369705189446>)`, ephemeral: true });
            throw error;
        }
    }
};

function addSuffics(number) {
    if (number % 100 >= 11 && number % 100 <= 13) return number + "-й";

    switch (number % 10) {
        case 1: return number + "-й";
        case 2: return number + "-й";
        case 3: return number + "-й";
    }

    return number + "-й";
};


function addBadges(badgeNames) {
    if (!badgeNames.length) return ["Немає"];
    const badgeMap = {
        "ActiveDeveloper": "<:activedeveloper:1085644558777458688>",
        "BugHunterLevel1": "<:discordbughunter1:1085644565375098930>",
        "BugHunterLevel2": "<:discordbughunter2:1085644566813741086>",
        "PremiumEarlySupporter": "<:discordearlysupporter:1085644568269172788>",
        "Partner": "<:discordpartner:1085644575760191508>",
        "Staff": "<:discordstaff:1085644577416941568>",
        "HypeSquadOnlineHouse1": "<:hypesquadbravery:1085644586560524418>", // bravery
        "HypeSquadOnlineHouse2": "<:hypesquadbrilliance:1085644588204699689>", // brilliance
        "HypeSquadOnlineHouse3": "<:hypesquadbalance:1085644579501518940> ", // balance
        "Hypesquad": "<:hypesquadevents:1085644591107162183>",
        "CertifiedModerator": "<:discordmod:1085644570672517200>",
        "VerifiedDeveloper": "<:discordbotdev:1085644562959192084>",
    };
  
    return badgeNames.map(badgeName => badgeMap[badgeName] || '❔');
};
