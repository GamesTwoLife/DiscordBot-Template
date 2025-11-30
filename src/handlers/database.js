import { Sequelize } from "sequelize";
import config from "../../config.js";

/**
 * @type {Sequelize | undefined}
 */
let sequelize;

if (config.postgresUri) {
    // Production: PostgreSQL
    sequelize = new Sequelize(config.postgresUri, {
        dialect: "postgres",
        logging: false
    });
} else {
    // Development: SQLite
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite',
        logging: false
    });
}

export default sequelize;
