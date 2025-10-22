import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
import "./assets/styles/tokens.css";
import "./assets/styles/base.css";
import "./assets/styles/components.css";
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Header />
      <Outlet/>
      <Footer />
    </div>
  );
}

export default App;
