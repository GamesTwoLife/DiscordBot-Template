const { Events, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: Events.VoiceStateUpdate,
    /**
     * 
     * @param {import('discord.js').VoiceState & { client: import('../../typings').MainClient } oldState 
     * @param {import('discord.js').VoiceState & { client: import('../../typings').MainClient } newState 
     */
    async execute(oldState, newState) {
        const { client, guild, member } = oldState || newState;

		// Бот покидає канал, якщо в ньому нема учасників
        if (guild.members.cache.get(client.user.id)?.voice?.channel) {
            let player = client.manager.getPlayer(guild.id)

            if (guild.members.cache.get(client.user.id).voice.channel && guild.members.cache.get(client.user.id).voice.channel.members.size <= 1 && player) {
                player.destroy();
            }
        } 

		// Приватні кімнати
        let voiceChanneId = "0";
		let voiceParentChanneId = "0";
        if (member.voice?.channel?.id === voiceChanneId) {
            await guild.channels.create({
                name: `🔴 ${member.user.discriminator}`,
                type: ChannelType.GuildVoice,
                parent: voiceParentChanneId,
            }).then(async (newChannel) => {
                await newState.setChannel(newChannel);

                const channel = guild.channels.cache.get(newChannel.id);

				channel.lockPermissions();

				await channel.permissionOverwrites.edit(member.id, {
					ViewChannel: true,
					Speak: true,
					Connect: true,
					SendMessages: true,
					ReadMessageHistory: true,
					UseVAD: true,
				});

                const controls = new ActionRowBuilder().addComponents([
					new ButtonBuilder()
						.setCustomId('edit_name')
						.setEmoji(':rename:1036764520162537473')
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId('set_limit')
						.setEmoji(':limit:1036764518702919760')
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId('kick_user')
						.setEmoji(':kick:1036764509035036705')
                        .setDisabled(true)
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId('access_user')
						.setEmoji(':access:1036764512654741514')
						.setDisabled(true)
						.setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
						.setCustomId('access_speak_user')
						.setEmoji(':permsTospeak:1036764517381714000')
						.setDisabled(true)
						.setStyle(ButtonStyle.Secondary),
				]);

				// Повідомлення відправляеться у голосовий чат щойно створенного каналу
                await newChannel.send({
					content: `||${member}||`,
					embeds: [{
						color: 0x2f3136,
						title: 'Керування приватною кімнатою',
						description: "<:rename:1036764520162537473> — змінити назву\n" +
                        "<:limit:1036764518702919760> — встановити ліміт користувачів\n" +
                        "<:kick:1036764509035036705> — вигнати користувача\n" +
                        "<:access:1036764512654741514> — забрати/видати доступ\n" +
                        "<:permsTospeak:1036764517381714000> — забрати/видати право говорити"
					}],
					components: [controls]
				});
            });
        }

        if (oldState.channel?.id !== voiceChanneId && oldState.channel?.parent?.id === voiceParentChanneId && oldState.channel?.members.size == 0) {
			return oldState.channel.delete();
		}
    }
};
