import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import heroImg from "../assets/img/pimentones2.jpg";
import zanahorias from "../assets/img/zanahorias.jpg";
import manzanas from "../assets/img/manzanas-bolsas.jpg";
import pimenton from "../assets/img/pimenton.jpg";
import huertoimg from "../assets/img/huerto1.jpg";

export default function Home() {
  return (
    <main>
      {/* CARRUSEL */}
      <section className="section">
        <Carousel />
      </section>

      {/* HERO */}
      <section className="section">
        <div className="container hero">
          <div>
            <span className="chip">Frescura real</span>
            <h1>Del huerto a tu hogar, sin rodeos.</h1>
            <p>
              Frutas y verduras de temporada, seleccionadas a mano por
              productores locales. Compra simple, entrega rápida.
            </p>
            <div className="cta">
              <Link className="btn" to="/productos">
                Hacer pedido
              </Link>
              <Link className="btn secondary" to="/nosotros">
                Conócenos
              </Link>
            </div>
          </div>
          <div>
            <img
              src={huertoimg}
              alt="huerto"
              style={{
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow)",
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ color: "var(--title)" }}>Lo más pedido</h2>
          <div className="card-grid">
            {[
              { src: zanahorias, title: "Zanahorias" },
              { src: manzanas, title: "Manzanas" },
              { src: pimenton, title: "Pimentón" },
            ].map((p, i) => (
              <article className="card" key={i}>
                <img src={p.src} alt={p.title} />
                <div className="card_body">
                  <h3 style={{ marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ color: "var(--text2)" }}>
                    Disponible por temporada. Consulta stock en WhatsApp.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
