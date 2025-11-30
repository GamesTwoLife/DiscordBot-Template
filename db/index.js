import sequelize from "./../src/handlers/database.js";
import { GuildModel } from "./guilds.js";
import { UserModel } from "./users.js";

export const db = {
    sequelize: sequelize,
    User: UserModel(sequelize),
    Guild: GuildModel(sequelize)
};
