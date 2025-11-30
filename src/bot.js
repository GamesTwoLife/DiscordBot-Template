import { Client, Partials, Collection, PermissionsBitField } from "discord.js";
import config from "../config.js";
import sequelize from "./handlers/database.js";
import Event from "./handlers/Event.js";
import Command from "./handlers/Command.js";
import Component from "./handlers/Component.js";
import SlashUpdate from "./handlers/SlashUpdate.js";
import { db } from "../db/index.js";
import Redis from "ioredis";

import { init } from "i18next";
import { resources } from "./../locales/resources.js";

/**
 * @type {import("./../types/index.d.ts").MainClient}
 * @description The main client of the program
 */
const client = new Client({
	failIfNotExists: false,
	allowedMentions: { parse: [ "roles", "users", "everyone" ] }, 
	intents: [53608447],
	partials: [
		Partials.Channel,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Message,
		Partials.Reaction,
		Partials.ThreadMember,
		Partials.User
	],
	ws: { large_threshold: 100 },
	presence: {
		status: "idle",
	}
});

client.i18n = init({
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

client.db = db;
client.config = config;

client.commands = new Collection();
client.cooldowns = new Collection();
client.components = new Collection();

client.redis = new Redis({
	host: config.redisUri ? new URL(config.redisUri).hostname : 'localhost',
	port: config.redisUri ? Number(new URL(config.redisUri).port) : 6379,
	password: config.redisUri ? new URL(config.redisUri).password?.slice(0) : undefined,
	db: config.redisUri ? Number(new URL(config.redisUri).pathname.slice(1)) : 0,
	retryStrategy: (times) => {
		const delay = Math.min(times * 50, 2000);
		return delay;
	}
});

client.redis.on('ready', () => {
	console.log('Connected to Redis');
});

client.redis.on('error', (error) => {
	console.error('Error Redis:', error);
});

process.on('unhandledRejection', async (error) => {
	if (!config.channelId) return console.error(error);
	
	const channel = client.channels.cache.get(config.channelId);

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
	if (!config.channelId) return console.error(error);
	
	const channel = client.channels.cache.get(config.channelId);

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
	if (!config.channelId) return console.error(error);
	
	const channel = client.channels.cache.get(config.channelId);

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
	if (!config.channelId) return console.warn(warning);
	
	const channel = client.channels.cache.get(config.channelId);

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

await sequelize.authenticate()
	.then(() => console.log('Database connected.'))
	.catch(err => console.log('Error: ' + err));

await sequelize.sync({ alter: true });

await Event(client);
await Command(client);
await Component(client);
await SlashUpdate(client);

void client.login(config.token);
