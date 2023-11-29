import * as Discord from "discord.js";
declare type GuildDB = typeof import("./db/guilds");
declare type UserDB = typeof import("./db/users");

/**
 * Модифікований вбудований клієнт із підтримкою обробників команд/подій.
 */
export interface MainClient extends Discord.Client {
    commands: Discord.Collection<string, Command>;
    cooldowns: Discord.Collection<string, Discord.Collection<string, number>>;
    buttons: Discord.Collection<string, ButtonInteraction>;
    selectMenus: Discord.Collection<string, SelectMenuInteraction>;
    modals: Discord.Collection<string, ModalInteraction>;
    autocompletes: Discord.Collection<string, AutocompleteInteraction>;
    dbguild: GuildDB;
    dbuser: UserDB;
};

/**
 * Представляє команду програми.
 */
export interface Command {
    data: Discord.SlashCommandBuilder | Discord.ContextMenuCommandBuilder;
    options: {
        cooldown?: number,
        ownerOnly?: boolean,
        devGuildOnly?: boolean,
        bot_permissions?: Discord.PermissionResolvable
    };

    execute(interaction: (Discord.ChatInputCommandInteraction | Discord.ContextMenuCommandInteraction) & { client: MainClient }): void | Promise<void>;
};

/**
 * Представляє кнопки програми.
 */
export interface ButtonInteraction {
    id: string;
    options: {
        cooldown?: number,
        ownerOnly?: boolean
    };

    execute(interaction: Discord.ButtonInteraction & { client: MainClient }): void | Promise<void>;
};

/**
 * Представляє меню вибору програми.
 */
export interface SelectMenuInteraction {
    id: string;
    options: {
        cooldown?: number,
        ownerOnly?: boolean
    };

    execute(interaction: Discord.AnySelectMenuInteraction & { client: MainClient }): void | Promise<void>;
};

/**
 * Представляє модальні вікна програми.
 */
export interface ModalInteraction {
    id: string;

    execute(interaction: Discord.ModalSubmitInteraction & { client: MainClient }): void | Promise<void>;
};

/**
 * Представляє автозаповнення програми.
 */
export interface AutocompleteInteraction {
    name: string;

    execute(interaction: Discord.AutocompleteInteraction & { client: MainClient }): void | Promise<void>;
};
