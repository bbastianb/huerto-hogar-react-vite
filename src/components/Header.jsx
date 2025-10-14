import "/src/assets/styles/Header.css";
import "/src/App.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header-login">
      <nav className="navbar-login">
        <Link to="/" className="navbar-logo">
          <img
            src="/src/assets/img/logo.png"
            width="120"
            alt="Logo Huerto Hogar"
          />
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <Link to="/noticias">Noticias</Link>
          </li>
          <li>
            <Link to="/nosotros">Nosotros</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
          <li>
            <Link id="link-registro-login" to="/registro">
              Registrarme
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
