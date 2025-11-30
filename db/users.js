import { DataTypes } from "sequelize";

/**
 * 
 * @param {import("sequelize").Sequelize} sequelize 
 * @returns {import("sequelize").ModelCtor<import("sequelize").Model>}
 */
export const UserModel = (sequelize) => {
	const User = sequelize.define('User', {
		guildId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		userId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		balance: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		lastTimely: {
			type: DataTypes.DATE,
			allowNull: true
		},
	}, {
		indexes: [
			{
				name: 'unique_user_in_guild',
				unique: true,
				fields: ['guildId', 'userId']
			}
		]
	});

	return User;
};
