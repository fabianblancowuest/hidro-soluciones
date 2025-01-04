const express = require("express");
const { Pool } = require("../models"); // Importa el modelo Pool

const router = express.Router();

// Función para validar fechas
const validarFecha = (fecha) => {
	if (!fecha) return null; // Permite fechas nulas
	const date = new Date(fecha);
	return isNaN(date.getTime()) ? null : date; // Devuelve null si no es una fecha válida
};

// Ruta para obtener todas las piscinas
router.get("/", async (req, res) => {
	try {
		const piscinas = await Pool.findAll(); // Obtiene todas las piscinas
		res.json(piscinas);
	} catch (error) {
		console.error("Error al obtener las piscinas:", error);
		res.status(500).send("Hubo un problema al obtener las piscinas");
	}
});

// Ruta para crear una nueva piscina
router.post("/", async (req, res) => {
	const { nombre, ultimaLimpieza, estado } = req.body;

	// Validar y convertir la fecha
	const ultimaLimpiezaDate = validarFecha(ultimaLimpieza);

	if (ultimaLimpieza && !ultimaLimpiezaDate) {
		return res
			.status(400)
			.json({ error: "La fecha de última limpieza es inválida" });
	}

	try {
		// Si no se proporciona 'estado', se usa 'Limpia' como valor por defecto
		const nuevaPiscina = await Pool.create({
			nombre,
			ultima_limpieza: ultimaLimpiezaDate,
			estado: estado || "Limpia", // Valor predeterminado
		});
		res.status(201).json(nuevaPiscina); // Responde con la piscina creada
	} catch (error) {
		console.error("Error al crear la piscina:", error);
		res.status(500).send("Hubo un problema al crear la piscina");
	}
});

module.exports = router;
