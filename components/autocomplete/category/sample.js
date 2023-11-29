/**
 * @type {import("../../../typings").AutocompleteInteraction}
 */
module.exports = {
    name: "sample",

    async execute(interaction) {
        const { options } = interaction;

		const choices = ['Популярні теми: Потоки', 'Шардинг: Початок роботи', 'Бібліотека: Голосові з’єднання', 'Взаємодії: Відповідь на (/) команди', 'Популярні теми: Попередній перегляд для вставлення'];

		const focusedValue = options.getFocused();
		if (focusedValue.length === 0) {
			return interaction.respond(
				choices.map(choice => ({ name: choice, value: choice })),
			);
		}

		const filtered = choices.filter(choice => choice.startsWith(focusedValue));

		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
    },
};