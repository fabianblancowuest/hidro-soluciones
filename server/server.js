const express = require("express");
const cors = require("cors");
const { sequelize, Pool, CleaningHistory } = require("./models"); // Asegúrate de que `sequelize` esté correctamente importado
const piscinasRoutes = require("./routes/piscinas");

const app = express();

// Configuración de CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/routes/piscinas", piscinasRoutes);

// Sincronización de la base de datos y datos iniciales
const PORT = 3001;

const initDatabase = async () => {
	try {
		await sequelize.authenticate(); // Aquí debe funcionar correctamente
		console.log("Conexión a la base de datos establecida correctamente.");

		await sequelize.sync({ force: true });
		console.log("Base de datos sincronizada.");

		await Pool.create({
			nombre: "Piscina Principal",
			frecuencia_limpieza: 7,
		});

		console.log("Datos iniciales insertados.");
	} catch (error) {
		console.error(
			"Error durante la sincronización o la inserción de datos:",
			error,
		);
	}
};

sequelize
	.authenticate()
	.then(async () => {
		console.log("Base de datos autenticada correctamente.");
		await initDatabase();
		app.listen(PORT, () => {
			console.log(`Servidor corriendo en http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error al autenticar la base de datos:", error);
	});
