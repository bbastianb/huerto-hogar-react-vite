import "../assets/styles/TarjetaEstadistica.css";

export default function TarjetaEstadistica({
  titulo,
  valor,
  icono,
  color = "verde",
}) {
  return (
    <div className={`tarjeta-estadistica tarjeta-${color}`}>
      <div className="encabezado-tarjeta">
        <span className="icono-tarjeta">{icono}</span>
        <h3 className="titulo-tarjeta">{titulo}</h3>
      </div>
      <p className="valor-tarjeta">{valor}</p>
    </div>
  );
}
