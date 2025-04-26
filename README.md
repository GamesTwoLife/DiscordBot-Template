# Welcome to the Discord Bot Template

![Version](https://img.shields.io/badge/version-v1.5.0-blue.svg)
[![npm version](https://img.shields.io/npm/v/discord.js.svg)](https://www.npmjs.com/package/discord.js)
[![Documentation](https://img.shields.io/badge/Documentation-yes-brightgreen.svg)](https://github.com/GamesTwoLife/DiscordBot-Template#readme)
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/GamesTwoLife/DiscordBot-Template/graphs/commit-activity)

> An **open-source** `discord.js` bot template based on the official [discord.js guide](https://discordjs.guide/) to help you start building your own personal Discord bot!

## [Homepage](https://github.com/GamesTwoLife/DiscordBot-Template#readme)

## Introduction

The Discord Bot Template is an open-source `discord.js` bot template designed to kickstart your new bot project.  
It's a classic JavaScript template that doesn't require any external dependencies, unlike many popular frameworks. (This is **not** a framework!)
With this template, you can scale any bot project (whether for one or multiple servers). It all depends on your creativity!

### Features

This template includes many built-in, useful, and flexible features such as:

#### • **Dynamic Event Handler:**

- All events are stored in the [events](https://github.com/GamesTwoLife/DiscordBot-Template/blob/master/events/) folder. You don't need to use `client.on()` in the main `index.js` file to handle events.
- Using a simple event scaffold, you can create as many event files as you want inside the events folder.

#### • **Dynamic Command Handler (for both Slash and Context Menu commands):**

- The template comes with a dynamic command handler that makes it very easy to set up and create commands.
- Commands inside the commands folder receive a [`ChatInputCommandInteraction`](https://discord.js.org/docs/packages/discord.js/14.19.1/ChatInputCommandInteraction:Class) or a [`ContextMenuCommandInteraction`](https://discord.js.org/docs/packages/discord.js/14.19.1/ContextMenuCommandInteraction:Class) object depending on the command type (slash or context menu).
- **IMPORTANT:** In this template, we register commands to Discord in only **one guild**. This is because there are two types of commands: guild and global. Guild commands are restricted to one server but update instantly, while global commands can take up to an hour to update. So, use guild commands during development and global commands in production. (You can change this by setting the `devGuildOnly` option in each command file: `true` for guild-only, `false` for global.)

#### • **Dynamic Button Interaction Handler:**

- This template includes a dynamic button interaction handler to capture and process button interactions.
- Buttons can be organized into different folders.

#### • **Dynamic Select Menu Interaction Handler:**

- This template includes a dynamic select menu interaction handler to capture and process select menu interactions.
- Menus can be organized into different folders.

#### • **Dynamic Modal Submit Interaction Handler:**

- Easily handle incoming modal submissions using the template's handler!
- Modals can be organized into different folders.

#### • **Dynamic Autocomplete Interaction Handler:**

- Easily handle incoming autocomplete requests using the template's handler!
- Fully dynamic for all your needs!

#### • **Highly Customizable:**

Using the template is easy and fun — you'll see!  
Since the template is written purely in JavaScript with no external dependencies, you can customize it however you want. Your creativity is the limit!

#### • **Open-Source and Self-Hosted:**

> It's yours, you have full control.

## Installation

```sh
npm install
```

## Configuration

- Rename [`config-example.json`](https://github.com/GamesTwoLife/DiscordBot-Template/blob/master/config-example.json) to `config.json` and fill it with your bot's token, ID, and other values. Extend `config.json` according to your needs!

## Run Your Bot

```sh
npm start
```

## Support and Documentation

The template is actively maintained. If you encounter any issues or have questions about the template, feel free to reach out to [me on Discord](https://discord.gg/users/713064369705189446).

## Author

### GamesTwoLife

- Github: [@GamesTwoLife](https://github.com/GamesTwoLife)

### Contributors

Everyone is welcome to contribute and be featured here!

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/GamesTwoLife/DiscordBot-Template/issues). You can also refer to the [contribution guide](https://github.com/GamesTwoLife/DiscordBot-Template/blob/master/CONTRIBUTING.md).

## Show Your Support

Give a ⭐️ if this project helped you! Your support encourages me to keep maintaining it.

## License

Copyright © 2023 [GamesTwoLife](https://github.com/GamesTwoLife).
This project is licensed under the [MIT License](LICENSE).
