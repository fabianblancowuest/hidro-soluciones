const sequelize = require("../db"); // Importa la instancia de sequelize
const Pool = require("./Pool");
const CleaningHistory = require("./CleaningHistory");

module.exports = { sequelize, Pool, CleaningHistory };
