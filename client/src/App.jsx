import React from "react";
import ListaPiscinas from "./ListaPiscinas"; // Importa el componente de la lista de piscinas
import CrearPiscina from "./CrearPiscina";
import "./App.css";
import imgSubtitulo from "./assets/img/mantenimiento-de-piscinas.png";

function App() {
	return (
		<div className="appContainer">
			<h1 className="titulo">Sistema de Limpieza de Piscinas</h1>
			<div className="contenedor-subtitulo">
				<h2 className="subtitulo">Hidro Soluciones</h2>
				<img
					className="img-subtitulo"
					src={imgSubtitulo}
					alt="Imagen Piscina"
				/>
			</div>
			<CrearPiscina></CrearPiscina>
			{/* <ListaPiscinas /> Muestra la lista de piscinas */}
		</div>
	);
}

export default App;
