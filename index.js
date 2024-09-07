const { Client, Partials, Collection, ActivityType, PermissionsBitField } = require("discord.js");
const { token, channelId } = require("./config.json");
const Mongo = require("./handlers/Mongo");
const Event = require("./handlers/Event");
const Command = require("./handlers/Command");
const Component = require("./handlers/Component");
const SlashUpdate = require("./handlers/SlashUpdate");
const GuildDB = require("./db/guilds");
const UserDB = require("./db/users");

const i18next = require("i18next");
const resources = require("./locales/resources");

/**
 * @type {import("./typings").MainClient}
 * @description The main client of the program
 */
const client = new Client({ 
	allowedMentions: { parse: [ "roles", "users", "everyone" ] }, 
	intents: [3276799 | 1 << 24 | 1 << 25], // 1 << 24 = GUILD_MESSAGE_POLLS; 1 << 25 = DIRECT_MESSAGE_POLLS;
	partials: [
		Partials.Channel,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Message,
		Partials.Reaction,
		Partials.ThreadMember,
		Partials.User
	],
	ws: { large_threshold: 250 },
	presence: {
		activities: [{
			name: "custom",
			state: "by GamesTwoLife",
			type: ActivityType.Custom,
		}]
	}
});

client.i18n = i18next.init({
	fallbackLng: 'en',
	defaultNS: 'common',
	interpolation: {
		escapeValue: false,
	},
	resources: {
		en: resources.en,
		uk: resources.uk
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
	const channel = client.channels.cache.get(channelId);

	if (!channel || channel && !channel.permissionsFor(client.user?.id).has([PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageWebhooks])) return console.error(error);

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
	const channel = client.channels.cache.get(channelId);

	if (!channel || channel && !channel.permissionsFor(client.user?.id).has([PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageWebhooks])) return console.error(error);

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
	const channel = client.channels.cache.get(channelId);

	if (!channel || channel && !channel.permissionsFor(client.user?.id).has([PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageWebhooks])) return console.error(error);

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
	const channel = client.channels.cache.get(channelId);

	if (!channel || channel && !channel.permissionsFor(client.user?.id).has([PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageWebhooks])) return console.error(warning);

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

(async () => {
	await Event(client);
	await Command(client);
	await Component(client);
	await SlashUpdate(client);
})()

client.login(token);
