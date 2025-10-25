import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "../assets/styles/Header.css";
import "../App.css";
import { useCart } from '../pages/CartContext.jsx';

export default function Header() {
  const { cartCount, toggleCart } = useCart();

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
        
      {/* Icono del carrito */}
            <div className="container-icon">
                 <Link to="/carrito" className="container-cart-icon">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        className="icon-cart"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                    </svg>
                    <div className="count-producto">
                        <span id="contador-productos">{cartCount}</span>
                    </div>
                    </Link>
                </div>
                </ul>
      </nav>
    </header>
  );
}
