import { ShardingManager } from "discord.js";
import config from "./config.js";

const manager = new ShardingManager('./src/bot.js', {
	totalShards: "auto",
	autoSpawn: true,
	respawn: true,
	timeout: 60000,
	token: config.token,
	mode: 'process',
});

manager.on("shardCreate", (shard) => {
	console.log(`[ShardingManager] Shard ${shard.id} launched.`);
	shard.on('message', (message) => {
		if (message === 'respawn') {
			console.warn(`[ShardingManager] Shard ${shard.id} by requesting a restart.`);
			shard.respawn().then(() => {
				console.log(`[ShardingManager] Shard ${shard.id} successfully restarted.`);
			}).catch((err) => {
				console.error(`[ShardingManager] Error on restart shard ${shard.id}: ${err}`);
			});
		} else {
			console.log(`Shard[${shard.id}] : ${message._eval ?? message._fetchProp} : ${message._result}`);
		}
	});
});

manager.spawn({
	amount: "auto",
	delay: 1500,
	timeout: 30000,
}).then(async () => {
	console.log(`[ShardingManager] All shards were successfully launched.`);
}).catch((err) => {
	console.error(`[ShardingManager] Error when launching shards: ${err}`);
});
