import "/src/assets/styles/Footer.css";
import "/src/App.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <h3>HuertoHogar</h3>
          <p>Fresco, local y sustentable. Del campo a tu mesa.</p>
        </div>

        <div className="footer-contact">
          <h4>Contacto</h4>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:huertohogar25@gmail.com">
                huertohogar25@gmail.com
              </a>
            </li>
            <li>
              WhatsApp: <a href="#">+56 9 1234 5678</a>
            </li>
            <li>
              Instagram:{" "}
              <a
                href="https://www.instagram.com/huertohogar.cl/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @huertohogar.cl
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container small">
          © {year} HuertoHogar — Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
