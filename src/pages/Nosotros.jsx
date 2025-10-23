import imgHuerto     from "../assets/img/huerto1.jpg";
import imgVegetales  from "../assets/img/vegetales.jpg";
import imgBolsa      from "../assets/img/bolsa.jpg";
import MapaTiendas   from "../components/MapaTiendas";
import { TIENDAS }   from "../utils/tiendas";
console.log("TIENDAS (Nosotros):", TIENDAS); 
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

        {/* Mapa */}
        <section className="section" style={{ marginTop: 24 }}>
          <h2 style={{ color: "var(--title)" }}>Nuestras Tiendas</h2>
          <p style={{ color: "var(--text2)" }}>
            Haz clic en un pin para ver dirección y contacto.
          </p>
          <MapaTiendas height={420} />
        </section>

        {/* Lista debajo del mapa */}
        <section className="section" style={{ marginTop: 16 }}>
          <div className="card" style={{ padding: 12 }}>
            <h3 style={{ marginTop: 0 }}>Direcciones y horarios</h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {TIENDAS.map(t => {
                const telRaw  = t.phone || "";
                const telHref = telRaw.replace(/\s+/g, "");
                return (
                  <li
                    key={t.id || t.name}
                    style={{ padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,.08)", color: "var(--text)" }}
                  >
                    <strong>{t.name}</strong><br/>
                    {t.address && <>📍 {t.address}<br/></>}
                    {t.hours   && <>🕒 {t.hours}<br/></>}
                    {telRaw    && <>📞 <a href={`tel:${telHref}`}>{telRaw}</a></>}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
