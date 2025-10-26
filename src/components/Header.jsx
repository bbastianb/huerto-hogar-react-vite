import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "../assets/styles/Header.css";
import { useCart } from "../pages/CartContext.jsx";
import { useUser } from "../pages/UserContext.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react"; 
export default function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useUser(); // 👈 lee el usuario desde el contexto
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);


  const handleLogout = () => {
    logout();               // limpia contexto y localStorage (ya lo hace tu UserContext)
    navigate("/");          // vuelve al inicio
  };
  const displayName =
  user?.nombre ||
  user?.name ||
  user?.username ||
  (user?.email ? user.email.split("@")[0] : "Mi cuenta");

  return (
    <header className="header-login">
      <nav className="navbar-login">
        <Link to="/" className="navbar-logo">
          <img src={logo} width="120" alt="Logo Huerto Hogar" />
        </Link>

        <ul className="navbar-links">
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
          <li><NavLink to="/noticias">Noticias</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/blog">Blog</NavLink></li>

          {/* 👉 Zona de usuario */}
          {!user ? (
            // Si NO hay usuario: muestra Iniciar sesión
            <li><NavLink to="/login">Iniciar Sesión</NavLink></li>
          ) : (
            <li className="user-menu">
              <button type="button" className="user-menu__button">
                {displayName}
                <span className="user-menu__chev">▾</span>
              </button>
              <div className="user-menu__dropdown">
                <span className="user-menu__hello">Hola, {displayName}</span>
                <button type="button" className="user-menu__logout" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            </li>
          )}

          {/* Carrito */}
          <li>
  <Link to="/carrito" className="container-cart-icon" aria-label="Abrir carrito">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon-cart"
      role="img"
      aria-hidden="true"
    >
      <path d="M2.25 3h1.386c.51 0 .957.344 1.09.836l.383 1.437M7.5 14.25h9M4.25 5.273 5.84 11.5A1 1 0 0 0 6.81 12.25H18a1 1 0 0 0 .97-.75l1.5-6A1 1 0 0 0 19.5 4.25H5.84a1 1 0 0 0-.97 1.023zM16.5 17.25a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
    </svg>

    <div className="count-producto">
      <span id="contador-productos">{cartCount}</span>
    </div>
  </Link>
</li>


        </ul>
      </nav>
    </header>
  );
}
