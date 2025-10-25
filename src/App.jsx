import Header from "./components/Header";
import Footer from "./components/Footer";
import "./assets/styles/tokens.css";
import "./assets/styles/base.css";
import "./assets/styles/components.css";
import { Outlet } from "react-router-dom";
import { useCart } from "./pages/CartContext.jsx";
import Cart from "./components/Cart";
import { useLocation } from "react-router-dom";

export default function App() {
  const { isCartOpen, closeCart } = useCart();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <div className="App">
      {!isAdminPage && <Header />}
      <Cart isOpen={isCartOpen} onClose={closeCart} />
      <Outlet />
      {!isAdminPage && <Footer />}
    </div>
  );
}
