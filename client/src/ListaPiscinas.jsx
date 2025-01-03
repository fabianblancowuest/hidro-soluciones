import React, { useState, useEffect } from "react";

function ListaPiscinas() {
	const [piscinas, setPiscinas] = useState([]);

	useEffect(() => {
		// Función para obtener las piscinas del backend
		const obtenerPiscinas = async () => {
			try {
				const respuesta = await fetch("http://localhost:3001/routes/piscinas");
				if (respuesta.ok) {
					const data = await respuesta.json();
					setPiscinas(data); // Guardamos las piscinas en el estado
				} else {
					alert("Error al obtener las piscinas");
				}
			} catch (error) {
				console.error("Error al obtener las piscinas:", error);
				alert("Hubo un problema al conectar con el servidor");
			}
		};

		obtenerPiscinas(); // Llamamos a la función al cargar el componente
	}, []); // El array vacío asegura que la solicitud se haga solo una vez cuando el componente se monta

	return (
		<div>
			{/* <h2>Lista de Piscinas</h2> */}
			<ul>
				{piscinas.length > 0 ? (
					piscinas.map((piscina) => (
						<li key={piscina.id}>
							<h3>{piscina.nombre}</h3>
							<p>Estado: {piscina.estado}</p>
							<p>Frecuencia de limpieza: {piscina.frecuencia_limpieza} días</p>
							<p>Última limpieza: {piscina.ultima_limpieza}</p>
						</li>
					))
				) : (
					<p>No hay piscinas creadas</p>
				)}
			</ul>
		</div>
	);
}

export default ListaPiscinas;
