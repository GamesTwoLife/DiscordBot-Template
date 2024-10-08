import * as Discord from "discord.js";
declare type i18next = typeof import("i18next");
declare type GuildDB = typeof import("./db/guilds");
declare type UserDB = typeof import("./db/users");

export type ComponentType = "button" | "selectmenu" | "autocomplete" | "modalSubmit"

/**
 * @description Modified built-in client with support for command/event handlers.
 */
export interface MainClient extends Discord.Client {
	commands: Discord.Collection<string, Command>;
	cooldowns: Discord.Collection<string, Discord.Collection<string, number>>;
	components: Discord.Collection<string, [Component]>;
	dbguild: GuildDB;
	dbuser: UserDB;
	i18n: i18next;
};

/**
 * @description Represents the program command.
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
 * @description Represents a component of the program.
 */
export interface Component {
	name: string;
	type: ComponentType;
	options: {
		cooldown?: number;
		ownerOnly?: boolean;
		devGuildOnly?: boolean;
		bot_permissions?: [Discord.PermissionResolvable] | [];
	};

	execute(interaction: Discord.ButtonInteraction | Discord.AnySelectMenuInteraction | Discord.ModalSubmitInteraction | Discord.AutocompleteInteraction): Promise<void>;
}

/**
 * @description Represents a button component of the program.
 */
export interface Button extends Component {
	execute(interaction: Discord.ButtonInteraction): Promise<void>;
}

/**
 * @description Represents a any select menu component of the program.
 */
export interface SelectMenu extends Component {
	execute(interaction: Discord.StringSelectMenuInteraction | Discord.UserSelectMenuInteraction | Discord.MentionableSelectMenuInteraction | Discord.ChannelSelectMenuInteraction | Discord.RoleSelectMenuInteraction): Promise<void>;
}

/**
 * @description Represents a string select menu component of the program.
 */
export interface StringSelectMenu extends SelectMenu {
	execute(interaction: Discord.StringSelectMenuInteraction): Promise<void>;
}

/**
 * @description Represents a user select menu component of the program.
 */
export interface UserSelectMenu extends SelectMenu {
	execute(interaction: Discord.UserSelectMenuInteraction): Promise<void>;
}

/**
 * @description Represents a mentionable select menu component of the program.
 */
export interface MentionableSelectMenu extends SelectMenu {
	execute(interaction: Discord.MentionableSelectMenuInteraction): Promise<void>;
}

/**
 * @description Represents a channel select menu component of the program.
 */
export interface ChannelSelectMenu extends SelectMenu {
	execute(interaction: Discord.ChannelSelectMenuInteraction): Promise<void>;
}

/**
 * @description Represents a role select menu component of the program.
 */
export interface RoleSelectMenu extends SelectMenu {
	execute(interaction: Discord.RoleSelectMenuInteraction): Promise<void>;
}

/**
 * @description Represents a modal submit component of the program.
 */
export interface Modal extends Component {
	execute(interaction: Discord.ModalSubmitInteraction): Promise<void>;
}

/**
 * @description Represents a autocomplete component of the program.
 */
export interface Autocomplete extends Component {
	execute(interaction: Discord.AutocompleteInteraction): Promise<void>;
}
