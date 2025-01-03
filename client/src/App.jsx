import React from "react";
import ListaPiscinas from "./ListaPiscinas"; // Importa el componente de la lista de piscinas
import CrearPiscina from "./CrearPiscina";
import "./App.css";
// import logo from "./assets/img/logo2.JPG";

function App() {
	return (
		<div className="appContainer">
			<h1>Bienvenido al Sistema de Piscinas de Hidro Soluciones</h1>
			{/* <img src={logo} alt="" /> */}
			<CrearPiscina></CrearPiscina>
			{/* <ListaPiscinas /> Muestra la lista de piscinas */}
		</div>
	);
}

export default App;
