import imgHuerto     from "../assets/img/huerto1.jpg";
import imgVegetales  from "../assets/img/vegetales.jpg";
import imgBolsa from "../assets/img/bolsa.jpg";

export default function Nosotros(){
  return (
    <main className="section">
      <div className="container">
        <h1 style={{color:'var(--title)'}}>Nosotros</h1>
        <p>
          En HuertoHogar conectamos pequeños productores con familias que buscan alimentos frescos, ricos y honestos.
          Nuestro compromiso es la estacionalidad, la trazabilidad y un servicio amable.
        </p>

        <div className="card-grid" style={{marginTop: 20}}>
          <article className="card">
            <img src={imgHuerto} alt="Productores locales" />
            <div className="card_body">
              <h3>Productores locales</h3>
              <p>Trabajamos directo con huertos de la zona para garantizar frescura y precio justo.</p>
            </div>
          </article>

          <article className="card">
            <img src={imgVegetales} alt="Temporada y calidad" />
            <div className="card_body">
              <h3>Temporada y calidad</h3>
              <p>Seleccionamos lo mejor de cada temporada: más sabor, menos desperdicio.</p>
            </div>
          </article>

          <article className="card">
            <img src={imgBolsa} alt="Entrega responsable" />
            <div className="card_body">
              <h3>Entrega responsable</h3>
              <p>Rutas optimizadas y empaques reutilizables para reducir la huella.</p>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
