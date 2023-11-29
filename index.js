const { Client, Partials, Collection, ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const { token, channelId, mongoURL } = require("./config.json");
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
 * @description Основний клієнт програми
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
			state: "DiscordBotTemplate by GamesTwoLife",
			type: ActivityType.Custom,
		}]
	}
});

client.commands = new Collection();
client.cooldowns = new Collection();

client.dbguild = GuildDB;
client.dbuser = UserDB;

client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.autocompletes = new Collection();

mongoose.Promise = Promise;
mongoose.connect(mongoURL);

// Обробка помилок підключення
mongoose.connection.on('error', (error) => {
    console.error(`Помилка підключення до MongoDB: ${error.message}`);
});

// Обробка відключення
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB відключено. Спроба перепідключення...');

    // Спроба перепідключення
	mongoose.connect(mongoURL);
});

// Обробка успішного підключення
mongoose.connection.on('connected', () => {
    console.log(`MongoDB успішно підключено до кластеру ${mongoose.connection.name}`);
});

// Обробка закриття
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

// Анти-аварія
process.on('unhandledRejection', async (error) => {
	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = client.channels.cache.get(channelId);

	if (!channel) return console.error(error);

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
		console.error('Помилка при спробі надіслати повідомлення: ', err);
	}
});
process.on('uncaughtException', async (error) => {
	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = client.channels.cache.get(channelId);

	if (!channel) return console.error(error);

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
		console.error('Помилка при спробі надіслати повідомлення: ', err);
	}
});
process.on('rejectionHandled', async (error) => {
	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = client.channels.cache.get(channelId);

	if (!channel) return console.error(error);

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
		console.error('Помилка при спробі надіслати повідомлення: ', err);
	}
});
process.on('warning', async (warning) => {
	/**
	 * @type {import("discord.js").TextChannel}
	 */
	const channel = client.channels.cache.get(channelId);

	if (!channel) return console.error(warning);

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
		console.error('Помилка при спробі надіслати повідомлення: ', err);
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