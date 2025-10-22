import "../assets/styles/Noticias.css";

// Usa imágenes que SÍ existen en src/assets/img
import portada1 from "../assets/img/manzanas-arbol.jpg";
import portada2 from "../assets/img/miel5.jpg";
import portada3 from "../assets/img/frutillas.jpg";

const items = [
  {
    id: 1,
    title: "Temporada de manzanas: sabores al máximo",
    date: "2025-09-28",
    cover: portada1,
    excerpt:
      "Llegaron nuevas partidas de manzana de huertos locales. Ideas para almacenarlas y recetas fáciles.",
    tags: ["Temporada", "Local"],
  },
  {
    id: 2,
    title: "Miel cruda certificada: lote recién envasado",
    date: "2025-09-15",
    cover: portada2,
    excerpt:
      "Miel multifloral filtrada en frío, producción responsable. Te contamos cómo reconocer una miel de calidad.",
    tags: ["Miel", "Productores"],
  },
  {
    id: 3,
    title: "Frutillas de primavera: tips para conservar",
    date: "2025-10-01",
    cover: portada3,
    excerpt:
      "Consejos prácticos para mantener frutillas frescas por más tiempo sin perder dulzor.",
    tags: ["Consejos", "Frescos"],
  },
];

export default function Noticias() {
  return (
    <main className="section">
      <div className="container">
        <div className="news-header">
          <span className="chip">Novedades</span>
          <h1>Noticias</h1>
          <p className="news-subtitle">
            Actualizaciones de productos, temporada y datos útiles del huerto.
          </p>
        </div>

        <div className="card-grid">
          {items.map((n) => (
            <article className="card" key={n.id}>
              <img src={n.cover} alt={n.title} />
              <div className="card_body">
                <div className="news-meta">
                  <time>
                    {new Date(n.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </time>
                  <div className="news-tags">
                    {n.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="news-title">{n.title}</h3>
                <p className="news-excerpt">{n.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
