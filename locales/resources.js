const common_en = require("./en/common.json");
const common_uk = require("./uk/common.json");
const common_ru = require("./ru/common.json");
const commands_en = require("./en/commands.json");
const commands_uk = require("./uk/commands.json");
const commands_ru = require("./ru/commands.json");

module.exports = {
    en: {
        common: common_en,
        commands: commands_en
    },
    uk: {
        common: common_uk,
        commands: commands_uk
    },
    ru: {
        common: common_ru,
        commands: commands_ru
    }
}