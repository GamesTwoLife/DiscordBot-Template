import { RESTEvents } from "discord.js";

export default {
	name: RESTEvents.RateLimited,

	/**
	 * 
	 * @param {import('discord.js').RateLimitData} rateLimitInfo 
	 */
	execute(rateLimitInfo) {
		console.log(`
Global: ${rateLimitInfo.global}
Hash: ${rateLimitInfo.hash}
Limit: ${rateLimitInfo.limit}
MajorParameter: ${rateLimitInfo.majorParameter}
Method: ${rateLimitInfo.method}
Route: ${rateLimitInfo.route}
TimeToReset: ${rateLimitInfo.timeToReset}
URL: ${rateLimitInfo.url}
		`);
	},
};
