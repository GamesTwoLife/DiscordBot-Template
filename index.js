const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const mongoose = require("mongoose");
const { token, guildId, channelId, mongoURL } = require("./config.json");
const Event = require("./handlers/Event");
const Command = require("./handlers/Command");
const ContextMenuCommand = require("./handlers/ContextMenuCommand");
const SlashUpdate = require("./handlers/SlashUpdate");
const Button = require("./handlers/components/Button");
const Autocomplete = require("./handlers/components/Autocomplete");
const SelectMenu = require("./handlers/components/SelectMenu");
const Modal = require("./handlers/components/Modal");
const KazagumoClient = require("./handlers/managers/KazagumoClient");
const GuildDB = require("./db/guilds");
const UserDB = require("./db/users");

/**
 * @type {import("./typings").MainClient}
 * @description Основний клієнт програми
 */
const client = new Client({ 
	allowedMentions: { parse: [ "roles", "users", "everyone" ] }, 
	intents: [Object.keys(GatewayIntentBits)], 
	partials: [Partials],
	ws: {
		large_threshold: 250,
		properties: {
			browser: "Discord iOS"
		}
	}
});

client.commands = new Collection();
client.contextMenuCommands = new Collection();
client.cooldowns = new Collection();

client.dbguild = GuildDB;
client.dbuser = UserDB;

client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.autocompletes = new Collection();

client.manager = new KazagumoClient(client);

mongoose.Promise = Promise;
mongoose.connect(mongoURL);
mongoose.connection.on('error', (error) => console.log(error));

process.on('unhandledRejection', async (error) => {
	/**
	 * @type {import("discord.js").Guild}
	 */
	const guild = await client.guilds.cache.get(guildId);

	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = await guild.channels.cache.get(channelId);

	if (!guild || !guild) return console.error(error);

	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.find(wh => wh.owner === client.user);

		if (!webhook) {
			console.log(error)

			await channel.createWebhook({
				name: `${client.user.username} Logs`,
				avatar: client.user.avatarURL(),
			}).then(async (webhook) => {
				await webhook.send({
					embeds: [{
						color: 0xff0000,
						title: 'Unhandled Rejection',
						description: `\`\`\`js\n${error.stack}\n\`\`\``
					}],
				}).catch(() => {});
			})

			return;
		}

		console.log(error)

		await webhook.send({
			embeds: [{
				color: 0xff0000,
				title: 'Unhandled Rejection',
				description: `\`\`\`js\n${error.stack}\n\`\`\``
			}],
		}).catch(() => {});
	} catch (error) {
		console.error('Помилка при спробі надіслати повідомлення: ', error);
	}
});

process.on('uncaughtException', async (error) => {
	/**
	 * @type {import("discord.js").Guild}
	 */
	const guild = await client.guilds.cache.get(guildId);

	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = await guild.channels.cache.get(channelId);

	if (!guild || !guild) return console.error(error);

	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.find(wh => wh.owner === client.user);

		if (!webhook) {
			await channel.createWebhook({
				name: `${client.user.username} Logs`,
				avatar: client.user.avatarURL(),
			}).then(async (webhook) => {
				await webhook.send({
					embeds: [{
						color: 0xff0000,
						title: 'Uncaught Exception',
						description: `\`\`\`js\n${error.stack}\n\`\`\``
					}],
				}).catch(() => {});
			})

			return;
		}

		console.log(error)

		await webhook.send({
			embeds: [{
				color: 0xff0000,
				title: 'Uncaught Exception',
				description: `\`\`\`js\n${error.stack}\n\`\`\``
			}],
		}).catch(() => {});
	} catch (error) {
		console.error('Помилка при спробі надіслати повідомлення: ', error);
	}
});

process.on('rejectionHandled', async (error) => {
	/**
	 * @type {import("discord.js").Guild}
	 */
	const guild = await client.guilds.cache.get(guildId);

	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = await guild.channels.cache.get(channelId);

	if (!guild || !guild) return console.error(error);

	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.find(wh => wh.owner === client.user);

		if (!webhook) {
			await channel.createWebhook({
				name: `${client.user.username} Logs`,
				avatar: client.user.avatarURL(),
			}).then(async (webhook) => {
				await webhook.send({
					embeds: [{
						color: 0xff0000,
						title: 'Rejection Handled',
						description: `\`\`\`js\n${error.stack}\n\`\`\``
					}],
				}).catch(() => {});
			})

			return;
		}

		console.log(error)

		await webhook.send({
			embeds: [{
				color: 0xff0000,
				title: 'Rejection Handled',
				description: `\`\`\`js\n${error.stack}\n\`\`\``
			}],
		}).catch(() => {});
	} catch (error) {
		console.error('Помилка при спробі надіслати повідомлення: ', error);
	}
});

process.on('warning', async (warning) => {
	/**
	 * @type {import("discord.js").Guild}
	 */
	const guild = await client.guilds.cache.get(guildId);

	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = await guild.channels.cache.get(channelId);

	if (!guild || !guild) return console.error(error);

	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.find(wh => wh.owner === client.user);

		if (!webhook) {
			await channel.createWebhook({
				name: `${client.user.username} Logs`,
				avatar: client.user.avatarURL(),
			}).then(async (webhook) => {
				await webhook.send({
					embeds: [{
						color: 0xff0000,
						title: 'Warning',
						description: `\`\`\`js\n${error.stack}\n\`\`\``
					}],
				}).catch(() => {});
			})

			return;
		}

		console.log(warning)

		await webhook.send({
			embeds: [{
				color: 0xff0000,
				title: 'Warning',
				description: `\`\`\`js\n${warning.stack}\n\`\`\``
			}],
		}).catch(() => { null; });
	} catch (error) {
		console.error('Помилка при спробі надіслати повідомлення: ', error);
	}
});

client.login(token).then(() => {
    Event(client);
    Command(client);
    ContextMenuCommand(client)
    Button(client);
    Autocomplete(client);
    SelectMenu(client);
    Modal(client);
    SlashUpdate(client);
});
