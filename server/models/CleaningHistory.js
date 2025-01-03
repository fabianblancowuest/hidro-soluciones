const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Correcta importación de sequelize
const Pool = require("./Pool"); // Asegúrate de que `Pool` esté correctamente importado

const CleaningHistory = sequelize.define("CleaningHistory", {
	fecha_limpieza: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
});

// Relación: Una piscina tiene múltiples registros de limpieza
CleaningHistory.belongsTo(Pool, { foreignKey: "piscina_id", as: "piscina" });
Pool.hasMany(CleaningHistory, { foreignKey: "piscina_id", as: "historial" });

module.exports = CleaningHistory;
