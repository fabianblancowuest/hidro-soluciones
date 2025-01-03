const express = require("express");
const { Pool } = require("../models"); // Importa el modelo Pool

const router = express.Router();

// Ruta para obtener todas las piscinas
router.get("/", async (req, res) => {
	try {
		const piscinas = await Pool.findAll(); // Obtener todas las piscinas
		res.json(piscinas); // Enviar las piscinas como respuesta
	} catch (error) {
		console.error("Error al obtener las piscinas:", error);
		res.status(500).send("Hubo un problema al obtener las piscinas");
	}
});

// Ruta para crear una nueva piscina
router.post("/", async (req, res) => {
	const { nombre, ultimaLimpieza, tamaño, estado } = req.body; // Se espera el parámetro 'estado' también

	try {
		// Si no se proporciona 'estado', se usa 'limpia' como valor por defecto
		const nuevaPiscina = await Pool.create({
			nombre,
			profundidad,
			tamaño,
			ultima_limpieza: ultimaLimpieza,
			estado: estado || "limpia", // Asegura que 'estado' tenga un valor por defecto si no se pasa
		});
		res.status(201).json(nuevaPiscina); // Responde con la piscina creada
	} catch (error) {
		console.error("Error al crear la piscina:", error);
		res.status(500).send("Hubo un problema al crear la piscina");
	}
});

module.exports = router;
