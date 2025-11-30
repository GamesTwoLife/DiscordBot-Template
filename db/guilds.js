import { DataTypes } from "sequelize";

/**
 * 
 * @param {import("sequelize").Sequelize} sequelize 
 * @returns {import("sequelize").ModelCtor<import("sequelize").Model>}
 */
export const GuildModel = (sequelize) => {
	const Guild = sequelize.define('Guild', {
		guildId: {
			type: DataTypes.STRING,
			allowNull: false
		},
	}, {
		indexes: [
            {
                name: 'unique_guild',
                unique: true,
                fields: ['guildId']
            }
        ]
	});

	return Guild;
};
