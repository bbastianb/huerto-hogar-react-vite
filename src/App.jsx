import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
import "./assets/styles/tokens.css";
import "./assets/styles/base.css";
import "./assets/styles/components.css";
import { Outlet, useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="App">
      {!isAdminPage && <Header />}

      <Outlet />

      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
