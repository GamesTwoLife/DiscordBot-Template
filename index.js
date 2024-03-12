const { Client, Partials, Collection, ActivityType, PermissionsBitField } = require("discord.js");
const { token, channelId } = require("./config.json");
const Mongo = require("./handlers/Mongo");
const Event = require("./handlers/Event");
const Command = require("./handlers/Command");
const SlashUpdate = require("./handlers/SlashUpdate");
const Button = require("./handlers/components/Button");
const Autocomplete = require("./handlers/components/Autocomplete");
const SelectMenu = require("./handlers/components/SelectMenu");
const Modal = require("./handlers/components/Modal");
const GuildDB = require("./db/guilds");
const UserDB = require("./db/users");

/**
 * @type {import("./typings").MainClient}
 * @description The main client of the program
 */
const client = new Client({ 
	allowedMentions: { parse: [ "roles", "users", "everyone" ] }, 
	intents: [3276799], // Використовуйте сайт, наприклад https://discord-intents-calculator.vercel.app/
	partials: [
		Partials.Channel,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Message,
		Partials.Reaction,
		Partials.ThreadMember,
		Partials.User
	],
	ws: { 
		large_threshold: 250,
	},
	presence: {
		activities: [{
			name: "custom",
			state: "by GamesTwoLife",
			type: ActivityType.Custom,
		}]
	}
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.components = new Collection();

client.dbguild = GuildDB;
client.dbuser = UserDB;

Mongo();

// Anti-crash
process.on('unhandledRejection', async (error) => {
	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = client.channels.cache.get(channelId);

	if (!channel || channel && !channel.permissionsFor(client.user.id).has([PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageWebhooks])) return console.error(error);

	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.find(wh => wh.owner === client.user);

		if (!webhook) {
			await channel.createWebhook({
				name: `${client.user?.username} Logs`,
				avatar: client.user?.avatarURL(),
			}).then(async (webhook) => {
				await webhook.send({
					embeds: [{
						color: 0xff0000,
						title: 'Unhandled Rejection',
						description: `\`\`\`js\n${error.stack}\n\`\`\``
					}],
				}).catch(() => {});
			}).catch(() => {});

			return;
		}

		await webhook.send({
			embeds: [{
				color: 0xff0000,
				title: 'Unhandled Rejection',
				description: `\`\`\`js\n${error.stack}\n\`\`\``
			}],
		}).catch(() => {});
	} catch (err) {
		console.error(error);
		console.error('Error trying to send a message: ', err);
	}
});
process.on('uncaughtException', async (error) => {
	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = client.channels.cache.get(channelId);

	if (!channel || channel && !channel.permissionsFor(client.user.id).has([PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageWebhooks])) return console.error(error);

	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.find(wh => wh.owner === client.user);

		if (!webhook) {
			await channel.createWebhook({
				name: `${client.user?.username} Logs`,
				avatar: client.user?.avatarURL(),
			}).then(async (webhook) => {
				await webhook.send({
					embeds: [{
						color: 0xff0000,
						title: 'Uncaught Exception',
						description: `\`\`\`js\n${error.stack}\n\`\`\``
					}],
				}).catch(() => {});
			}).catch(() => {});

			return;
		}

		await webhook.send({
			embeds: [{
				color: 0xff0000,
				title: 'Uncaught Exception',
				description: `\`\`\`js\n${error.stack}\n\`\`\``
			}],
		}).catch(() => {});
	} catch (err) {
		console.error(error);
		console.error('Error trying to send a message: ', err);
	}
});
process.on('rejectionHandled', async (error) => {
	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = client.channels.cache.get(channelId);

	if (!channel || channel && !channel.permissionsFor(client.user.id).has([PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageWebhooks])) return console.error(error);

	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.find(wh => wh.owner === client.user);

		if (!webhook) {
			await channel.createWebhook({
				name: `${client.user?.username} Logs`,
				avatar: client.user?.avatarURL(),
			}).then(async (webhook) => {
				await webhook.send({
					embeds: [{
						color: 0xff0000,
						title: 'Rejection Handled',
						description: `\`\`\`js\n${error.stack}\n\`\`\``
					}],
				}).catch(() => {});
			}).catch(() => {});

			return;
		}

		await webhook.send({
			embeds: [{
				color: 0xff0000,
				title: 'Rejection Handled',
				description: `\`\`\`js\n${error.stack}\n\`\`\``
			}],
		}).catch(() => {});
	} catch (err) {
		console.error(error);
		console.error('Error trying to send a message: ', err);
	}
});
process.on('warning', async (warning) => {
	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = client.channels.cache.get(channelId);

	if (!channel || channel && !channel.permissionsFor(client.user.id).has([PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageWebhooks])) return console.error(warning);

	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.find(wh => wh.owner === client.user);

		if (!webhook) {
			await channel.createWebhook({
				name: `${client.user?.username} Logs`,
				avatar: client.user?.avatarURL(),
			}).then(async (webhook) => {
				await webhook.send({
					embeds: [{
						color: 0xff0000,
						title: 'Warning',
						description: `\`\`\`js\n${warning.stack}\n\`\`\``
					}],
				}).catch(() => {});
			}).catch(() => {});

			return;
		}

		await webhook.send({
			embeds: [{
				color: 0xff0000,
				title: 'Warning',
				description: `\`\`\`js\n${warning.stack}\n\`\`\``
			}],
		}).catch(() => {});
	} catch (err) {
		console.error(warning);
		console.error('Error trying to send a message: ', err);
	}
});

client.login(token).then(() => {
    Event(client);
    Command(client);
    Button(client);
    Autocomplete(client);
    SelectMenu(client);
    Modal(client);
    SlashUpdate(client);
});