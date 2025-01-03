const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Pool = sequelize.define("Pool", {
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	estado: {
		type: DataTypes.ENUM("limpia", "sucia", "en proceso"),
		defaultValue: "limpia",
	},
	frecuencia_limpieza: {
		type: DataTypes.INTEGER, // Días entre limpieza
		allowNull: true, // Permitimos que sea nulo
		defaultValue: 7, // Valor predeterminado (por ejemplo, cada 7 días)
	},
	ultima_limpieza: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
});

module.exports = Pool;
