import Header from "./components/Header";
import Footer from "./components/Footer";
import "./assets/styles/tokens.css";
import "./assets/styles/base.css";
import "./assets/styles/components.css";
import "./assets/styles/hotfix-scope.css";

import { Outlet } from "react-router-dom";
import { useCart } from "./pages/CartContext.jsx";
import Cart from "./components/Cart";

export default function App() {
  const { isCartOpen, closeCart } = useCart();

  return (
    <div className="App hh-scope">
      <Header />
      <Cart isOpen={isCartOpen} onClose={closeCart} />
      <Outlet />      
      <Footer />
    </div>
);
}