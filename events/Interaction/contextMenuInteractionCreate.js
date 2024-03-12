const { Events, Collection } = require("discord.js");
const { developers } = require("../../config.json");
const { t } = require("i18next");

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {import('discord.js').ContextMenuCommandInteraction & { client: import('../../typings').MainClient }} interaction 
     */
    async execute(interaction) {
        const { client, guild, user } = interaction;

        if (!interaction.isContextMenuCommand()) return;

        if (interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
            try {
                const command = client.commands.get(interaction.commandName);

                if (!command) {
                    return interaction.reply({ content: t('common:events.Interaction.no_command', { lng: interaction.locale, member: user.toString() }), ephemeral: true });
                }
    
                if (command.options && command.options?.ownerOnly && !developers.includes(user.id)) {
                    return interaction.reply({ content: t('common:events.Interaction.only_developer', { lng: interaction.locale, member: user.toString() }), ephemeral: true });
                }
    
                if (command.options && command.options?.bot_permissions && !guild.members.me.permissions.has(command.options?.bot_permissions)) {
                    const permsBot = command.options?.bot_permissions?.map(x => x).join(', ');
    
                    return interaction.reply({ content: t('common:events.Interaction.missing_permissions', { lng: interaction.locale, member: user.toString(), permissions: permsBot }), ephemeral: true });
                }

                const { cooldowns } = client;

                if (!cooldowns.has(interaction.commandName)) {
                    cooldowns.set(interaction.commandName, new Collection());
                }
        
                const now = Date.now();
                const timestamps = cooldowns.get(interaction.commandName);
                const cooldownAmount = (command.options?.cooldown ?? 5) * 1000;
        
                if (timestamps.has(user.id)) {
                    const expirationTime = timestamps.get(user.id) + cooldownAmount;
        
                    if (now < expirationTime) {
                        const expiredTimestamp = Math.round(expirationTime / 1000);

                        if (interaction.deferred) {
                            return interaction.editReply({
                                content: t('common:events.Interaction.cooldown_command', { lng: interaction.locale, member: user.toString(), commandName: interaction.commandName, expiredTimestamp }),
                            });
                        } else if (interaction.replied) {
                            return interaction.followUp({
                                content: t('common:events.Interaction.cooldown_command', { lng: interaction.locale, member: user.toString(), commandName: interaction.commandName, expiredTimestamp }),
                                ephemeral: true
                            });
                        } else {
                            return interaction.reply({
                                content: t('common:events.Interaction.cooldown_command', { lng: interaction.locale, member: user.toString(), commandName: interaction.commandName, expiredTimestamp }),
                                ephemeral: true
                            });
                        }
                    }
                }
        
                timestamps.set(user.id, now);
                setTimeout(() => timestamps.delete(user.id), cooldownAmount);

                await command.execute(interaction);
            } catch (error) {
                console.log(error);
                if (interaction.deferred) {
                    return interaction.editReply({ 
                        content: t('common:events.Interaction.error_occured', { lng: interaction.locale, member: user.toString() }), 
                        ephemeral: true 
                    });
                } else if (interaction.replied) {
                    return interaction.followUp({
                        content: t('common:events.Interaction.error_occured', { lng: interaction.locale, member: user.toString() }),
                        ephemeral: true
                    });
                } else {
                    return interaction.reply({ 
                        content: t('common:events.Interaction.error_occured', { lng: interaction.locale, member: user.toString() }), 
                        ephemeral: true 
                    });
                }
            }
        } else {
            if (interaction.deferred) {
                return interaction.editReply({ 
					content: t('common:events.Interaction.something_strange', { lng: interaction.locale, member: user.toString() })
				});
            } else if (interaction.replied) {
				return interaction.followUp({
					content: t('common:events.Interaction.something_strange', { lng: interaction.locale, member: user.toString() }),
					ephemeral: true
				});
			} else {
                return interaction.reply({ 
					content: t('common:events.Interaction.something_strange', { lng: interaction.locale, member: user.toString() }), 
					ephemeral: true 
				});
            }
        }
    },
};