import common_en from "./en/common.json" with { type: "json" };
import common_uk from "./uk/common.json" with { type: "json" };
import commands_en from "./en/commands.json" with { type: "json" };
import commands_uk from "./uk/commands.json" with { type: "json" };

export const resources = {
	en: {
		common: common_en,
		commands: commands_en
	},
	uk: {
		common: common_uk,
		commands: commands_uk
	}
}
