import React, { useState, useEffect } from "react";
import "./index.css"; // Asegúrate de que el archivo CSS esté importado

function CrearPiscina() {
	const [nombre, setNombre] = useState("");
	const [estado, setEstado] = useState("limpia"); // Inicializamos el estado como "limpia"
	const [ultimaLimpieza, setUltimaLimpieza] = useState(new Date());
	const [piscinas, setPiscinas] = useState([]);

	// Función para obtener todas las piscinas
	const obtenerPiscinas = async () => {
		try {
			const respuesta = await fetch("http://localhost:3001/routes/piscinas");
			if (respuesta.ok) {
				const datosPiscinas = await respuesta.json();
				setPiscinas(datosPiscinas);
			} else {
				alert("Error al obtener las piscinas");
			}
		} catch (error) {
			console.error("Error al obtener las piscinas:", error);
			alert("Hubo un problema al conectar con el servidor");
		}
	};

	useEffect(() => {
		obtenerPiscinas();
	}, []);

	const manejarEnvio = async (e) => {
		e.preventDefault();

		try {
			const respuesta = await fetch("http://localhost:3001/routes/piscinas", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ nombre, estado }),
			});

			if (respuesta.ok) {
				const nuevaPiscina = await respuesta.json();
				alert("Piscina creada exitosamente:", nuevaPiscina.nombre);
				setNombre("");
				setEstado("limpia"); // Restablecemos el estado a "limpia"

				// Obtener las piscinas nuevamente después de crear una nueva
				obtenerPiscinas();
			} else {
				alert("Error al crear la piscina");
			}
		} catch (error) {
			console.error("Error al crear la piscina:", error);
			alert("Hubo un problema al conectar con el servidor");
		}
	};

	return (
		<div className="agregar-piscina">
			<form onSubmit={manejarEnvio}>
				<div>
					<label htmlFor="nombre">Nombre de la Piscina:</label>
					<input
						type="text"
						id="nombre"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="estado">Estado:</label>
					<select
						id="estado"
						value={estado}
						onChange={(e) => setEstado(e.target.value)}
						required
					>
						<option value="limpia">Limpia</option>
						<option value="sucia">Sucia</option>
					</select>
				</div>
				<div>
					<label htmlFor="fecha">Última Limpieza</label>
					<input
						id="ultima_limpieza"
						type="date"
						value={ultimaLimpieza}
						onChange={(e) => setUltimaLimpieza(e.target.value)}
					></input>
				</div>
				<button type="submit">Agregar Piscina</button>
			</form>

			{/* Mostrar las piscinas */}
			<h2>Lista de Piscinas</h2>
			<div className="piscinas">
				<>
					{piscinas.map((piscina) => (
						<div
							key={piscina.id}
							className={
								piscina.estado === "limpia" ? "piscina-limpia" : "piscina-sucia"
							}
						>
							<div>Nombre: {piscina.nombre}</div>
							<div>Estado: {piscina.estado}</div>
							<div>Ultima Limpieza: {piscina.ultimaLimpieza}</div>
						</div>
					))}
				</>
			</div>
		</div>
	);
}

export default CrearPiscina;
