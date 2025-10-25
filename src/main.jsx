import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

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
      //
      { path: "login", element: <Login /> },
      { path: "productos", element: <ListadoProd /> },
      { path: "registro", element: <Registro /> },
      { path: "admin", element: <HomeAdmin /> }, // Todas las que tiene admin no muestran el header ni el footer
      { path: "admin/usuarios", element: <Usuarios /> },
      { path: "admin/productos", element: <ProductosAdmin /> },
      { path: "admin/confiAdmin", element: <ConfiAdmin /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
