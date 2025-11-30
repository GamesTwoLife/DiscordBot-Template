# Discord.JS Bot Template — Clean, Scalable and Fully Customizable

![Version](https://img.shields.io/badge/version-v3.0.0-green.svg)
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

- All events are stored in the [events](https://github.com/GamesTwoLife/DiscordBot-Template/blob/master/src/events/) folder. You don't need to use `client.on()` in the main `index.js` file to handle events.
- Using a simple event scaffold, you can create as many event files as you want inside the events folder.

#### • **Dynamic Command Handler (for both Slash and Context Menu commands):**

- The template comes with a dynamic command handler that makes it very easy to set up and create commands.
- Commands inside the commands folder receive a [`ChatInputCommandInteraction`](https://discord.js.org/docs/packages/discord.js/14.25.1/ChatInputCommandInteraction:Class) or a [`ContextMenuCommandInteraction`](https://discord.js.org/docs/packages/discord.js/14.25.1/ContextMenuCommandInteraction:Class) object depending on the command type (slash or context menu).
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

The template is implemented using plain JavaScript without any external dependencies, making it straightforward to extend and adapt to your specific requirements. Its modular architecture allows for full customization based on your project’s needs.

#### • **Open-Source and Self-Hosted:**

> It's yours, you have full control.

## Installation

1. Clone the Repository and Move To Folder
```sh
git clone https://github.com/GamesTwoLife/DiscordBot-Template.git
```
```sh
cd DiscordBot-Template
```
2. Install Dependencies
```sh
npm install
```

## Configuration

- Rename `.env-sample` to `.env` and fill in the required environment variables inside it (e.g., database URI, API tokens, or secrets etc).
- Rename [`config-example.js`](https://github.com/GamesTwoLife/DiscordBot-Template/blob/master/config-example.js) to `config.js` and fill it with your bot's token, ID, and other values. Extend `config.js` according to your needs!
- **REQUIRED VARIABLES:**
- DISCORD_TOKEN=your_bot_token_here
- POSTGRES_URL=your_postgresql_url_connection
- REDIS_URL=your_postgresql_url_connection
- CLIENT_ID=your_bot_client_id
- DEV_GUILD_ID=your_guild_id_for_testing

## Run Your Bot

```sh
npm start
```

## Support

### Getting Help

- 📚 **Documentation**: [GitHub Wiki](https://github.com/GamesTwoLife/DiscordBot-Template/wiki)
- 💬 **Discord**: [Contact Developer](https://discord.gg/users/713064369705189446)
- 🐛 **Issues**: [GitHub Issues](https://github.com/GamesTwoLife/DiscordBot-Template/issues)

### Community Resources
- [Discord.js Guide](https://discordjs.guide/)
- [Discord.js Documentation](https://discord.js.org/)
- [Discord API Documentation](https://discord.com/developers/docs)
- [Sequelize Documentation](https://sequelize.org/)

---

## Author

**GamesTwoLife**
- GitHub: [@GamesTwoLife](https://github.com/GamesTwoLife)
- Discord: [GamesTwoLife](https://discord.gg/users/713064369705189446)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the repository

### Contribution Process

1. **Fork the Repository**
   ```bash
   git clone https://github.com/YourUsername/DiscordBot-Template.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit Your Changes**
   ```bash
   git commit -m "Add: Amazing new feature"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Ensure all tests pass

### Code Style Guidelines
- Follow existing code formatting
- Add JSDoc comments to functions
- Write clear commit messages
- Test your changes thoroughly

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

### Contributors

A huge thank you to everyone who has contributed to this project!

<!-- Contributors will be automatically added here -->
<a href="https://github.com/GamesTwoLife/DiscordBot-Template/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=GamesTwoLife/DiscordBot-Template" />
</a>

**Want to be featured here?** Check out our [contributing guidelines](CONTRIBUTING.md)!

---

## ⭐ Show Your Support

If this project helped you, please consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs and issues
- 💡 **Suggesting** new features
- 🔀 **Contributing** code improvements
- 📢 **Sharing** with other developers

Your support motivates continued development and maintenance!

---

## License

Copyright © 2025 [GamesTwoLife](https://github.com/GamesTwoLife)

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR:** You can use, modify, and distribute this template freely, even for commercial projects. Just include the original license and copyright notice.
