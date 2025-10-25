import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "leaflet/dist/leaflet.css";




// Páginas de TU parte
import Home from "./pages/Home.jsx";

import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Blog from "./pages/Blog.jsx";
import Noticias from "./pages/Noticias.jsx";

import Login from "./pages/Login.jsx";
import ListadoProd from "./pages/ListadoProd.jsx";
import Registro from "./pages/Registro.jsx";
import HomeAdmin from "./pages/admin/HomeAdmin.jsx";
import Usuarios from "./pages/admin/Usuarios.jsx";
import ProductosAdmin from "./pages/admin/ProductosAdmin.jsx";
import ConfiAdmin from "./pages/admin/ConfiAdmin.jsx";

import DetalleProd from "./pages/DetalleProd.jsx";
import { CartProvider } from "./pages/CartContext.jsx";
import CartPage from "./pages/CartPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSummary from "./pages/OrderSummary.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailed from "./pages/PaymentFailed.jsx";
import { UserProvider } from "./pages/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      { path: "nosotros", element: <Nosotros /> },
      { path: "contacto", element: <Contacto /> },
      { path: "blog", element: <Blog /> },
      { path: "noticias", element: <Noticias /> },
      { path: "login", element: <Login /> },
      { path: "productos", element: <ListadoProd /> },
      { path: "registro", element: <Registro /> },
      { path: "admin", element: <HomeAdmin /> }, // Todas las que tiene admin no muestran el header ni el footer
      { path: "admin/usuarios", element: <Usuarios /> },
      { path: "admin/productos", element: <ProductosAdmin /> },
      { path: "admin/confiAdmin", element: <ConfiAdmin /> },
      { path: "productos/:id", element: <DetalleProd /> },
      { path: "carrito", element: <CartPage /> },
      { path: "checkout", element: <Checkout /> },
      { path: "resumen-pedido", element: <OrderSummary /> },
      { path: "pago-exitoso", element: <PaymentSuccess /> },
      { path: "pago-fallido", element: <PaymentFailed /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
