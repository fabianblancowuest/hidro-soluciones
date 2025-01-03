const checkPiscinas = async () => {
	const piscinas = await Pool.findAll();
	piscinas.forEach((piscina) => {
		const diasDesdeLimpieza = Math.floor(
			(new Date() - new Date(piscina.ultima_limpieza)) / (1000 * 60 * 60 * 24),
		);
		if (diasDesdeLimpieza > piscina.frecuencia_limpieza) {
			Pool.update({ estado: "sucia" }, { where: { id: piscina.id } });
		}
	});
};

setInterval(checkPiscinas, 86400000); // Revisa cada 24 horas
