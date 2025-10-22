import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "../assets/styles/Header.css";
import "../App.css";

export default function Header() {
  return (
    <header className="header-login">
      <nav className="navbar-login">
        <Link to="/" className="navbar-logo">
          <img src={logo} width="120" alt="Logo Huerto Hogar" />
        </Link>

        <ul className="navbar-links">
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
          <li><NavLink to="/noticias">Noticias</NavLink></li>
          <li><NavLink to="/blog">Blog</NavLink></li>
          {/* 🔒 Rutas de otros equipos — no mostrar:
          <li><NavLink to="/login">Iniciar Sesión</NavLink></li>
          <li><NavLink to="/registro" id="link-registro-login">Registrarme</NavLink></li>
          <li><NavLink to="/productos">Productos</NavLink></li>
          */}
        </ul>
      </nav>
    </header>
  );
}
