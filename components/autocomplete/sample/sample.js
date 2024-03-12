/**
 * @type {import("../../../typings").Autocomplete}
 */
module.exports = {
    name: "sample",
	type: "autocomplete",

    async execute(interaction) {
		if (!interaction.isAutocomplete()) return;
		
        const { options } = interaction;

		const choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview'];

		const focusedValue = options.getFocused();
		if (focusedValue.length === 0) {
			return interaction.respond(
				choices.map(choice => ({ name: choice, value: choice })),
			);
		}

		const filtered = choices.filter(choice => choice.startsWith(focusedValue));

		return interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
    },
};