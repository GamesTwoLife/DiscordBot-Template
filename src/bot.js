import { Client, Partials, Collection, ActivityType, PermissionsBitField } from "discord.js";
import config from "../config.js";
import Mongo from "./handlers/Mongo.js";
import Event from "./handlers/Event.js";
import Command from "./handlers/Command.js";
import Component from "./handlers/Component.js";
import SlashUpdate from "./handlers/SlashUpdate.js";
import GuildDB from "./../db/guilds.js";
import UserDB from "./../db/users.js";

import { init } from "i18next";
import { resources } from "./../locales/resources.js";

/**
 * @type {import("./../types/index.d.ts").MainClient}
 * @description The main client of the program
 */
const client = new Client({
	failIfNotExists: false,
	allowedMentions: { parse: [ "roles", "users", "everyone" ] }, 
	intents: [53608447], // All Intents
	partials: [
		Partials.Channel,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Message,
		Partials.Reaction,
		Partials.ThreadMember,
		Partials.User
	],
	presence: {
		activities: [{
			name: "custom",
			state: "by GamesTwoLife",
			type: ActivityType.Custom,
		}]
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

client.commands = new Collection();
client.cooldowns = new Collection();
client.components = new Collection();

client.dbguild = GuildDB;
client.dbuser = UserDB;

// Anti-crash
process.on('unhandledRejection', async (error) => {
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

await Mongo();
await Event(client);
await Command(client);
await Component(client);
await SlashUpdate(client);

void client.login(config.token);
