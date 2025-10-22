import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
import "./assets/styles/tokens.css";
import "./assets/styles/base.css";
import "./assets/styles/components.css";
import './assets/styles/style-listado.css';
import './assets/styles/style-detalle.css';
import { useCart } from './pages/CartContext.jsx';
import Cart from "./components/Cart";

import { Outlet } from 'react-router-dom';
function App() {
  const { isCartOpen, closeCart } = useCart();

  return (
    <div className="App">
      <Header />
      <Cart isCartOpen={isCartOpen} closeCart={closeCart} />
      <Outlet/>
      <Footer />
    </div>
  );
}

export default App;
