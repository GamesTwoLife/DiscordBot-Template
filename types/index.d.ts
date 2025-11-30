import * as Discord from "discord.js";

import { GuildModel } from '../db/guilds';
import { UserModel } from '../db/users';

export type ComponentType = "button" | "selectmenu" | "modalSubmit";

/**
 * @description Modified built-in client with support for command/event handlers.
 */
export interface MainClient extends Discord.Client {
	commands: Discord.Collection<string, Command>;
	cooldowns: Discord.Collection<string, Discord.Collection<string, number>>;
	components: Discord.Collection<string, [Component]>;
	i18n: typeof import("i18next");
	redis: import("ioredis").Redis;
	db: {
		sequelize: import("sequelize").Sequelize;
		User: ReturnType<typeof UserModel>;
		Guild: ReturnType<typeof GuildModel>;
	};
	config: typeof import("../config").default;
}

/**
 * @description Represents the program command.
 */
export interface Command {
	data: Discord.SlashCommandBuilder | Discord.ContextMenuCommandBuilder;
	options: {
		cooldown?: number;
		ownerOnly?: boolean;
		devGuildOnly?: boolean;
		bot_permissions?: Discord.PermissionResolvable;
	};

	execute(
		interaction: (Discord.ChatInputCommandInteraction | Discord.ContextMenuCommandInteraction) & {
			client: MainClient;
		}
	): void | Promise<void>;
	autocomplete?(
		interaction: Discord.AutocompleteInteraction & {
			client: MainClient;
		}
	): void | Promise<void>;
}

/**
 * @description Represents a component of the program.
 */
export interface Component {
	customId: string;
	type: ComponentType;
	options: {
		cooldown?: number;
		ownerOnly?: boolean;
		devGuildOnly?: boolean;
		bot_permissions?: [Discord.PermissionResolvable] | [];
	};

	execute(
		interaction:
		| Discord.ButtonInteraction
		| Discord.AnySelectMenuInteraction
		| Discord.ModalSubmitInteraction
	): Promise<void>;
}

/**
 * @description Represents a button component of the program.
 */
export interface Button extends Component {
	execute(interaction: Discord.ButtonInteraction & { client: MainClient; }): Promise<void>;
}

/**
 * @description Represents a any select menu component of the program.
 */
export interface SelectMenu extends Component {
	execute(
		interaction:
		| Discord.StringSelectMenuInteraction
		| Discord.UserSelectMenuInteraction
		| Discord.MentionableSelectMenuInteraction
		| Discord.ChannelSelectMenuInteraction
		| Discord.RoleSelectMenuInteraction
	): Promise<void>;
}

/**
 * @description Represents a string select menu component of the program.
 */
export interface StringSelectMenu extends SelectMenu {
	execute(interaction: Discord.StringSelectMenuInteraction & { client: MainClient; }): Promise<void>;
}

/**
 * @description Represents a user select menu component of the program.
 */
export interface UserSelectMenu extends SelectMenu {
	execute(interaction: Discord.UserSelectMenuInteraction & { client: MainClient; }): Promise<void>;
}

/**
 * @description Represents a mentionable select menu component of the program.
 */
export interface MentionableSelectMenu extends SelectMenu {
	execute(interaction: Discord.MentionableSelectMenuInteraction & { client: MainClient; }): Promise<void>;
}

/**
 * @description Represents a channel select menu component of the program.
 */
export interface ChannelSelectMenu extends SelectMenu {
	execute(interaction: Discord.ChannelSelectMenuInteraction & { client: MainClient; }): Promise<void>;
}

/**
 * @description Represents a role select menu component of the program.
 */
export interface RoleSelectMenu extends SelectMenu {
	execute(interaction: Discord.RoleSelectMenuInteraction & { client: MainClient; }): Promise<void>;
}

/**
 * @description Represents a modal submit component of the program.
 */
export interface Modal extends Component {
	execute(interaction: Discord.ModalSubmitInteraction & { client: MainClient; }): Promise<void>;
}
