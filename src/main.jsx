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
import Noticias from "./pages/Noticias.jsx"; // asegúrate de tenerlo


import Login from "./pages/Login.jsx";
import ListadoProd from "./pages/ListadoProd.jsx";
import Registro from "./pages/Registro.jsx";
import HomeAdmin from "./pages/admin/HomeAdmin.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App tiene <Header/><Outlet/><Footer/>
    children: [
      { index: true, element: <Home /> },

      { path: "nosotros", element: <Nosotros /> },
      { path: "contacto", element: <Contacto /> },
      { path: "blog", element: <Blog /> },
      { path: "noticias", element: <Noticias /> },

      { path: "login", element: <Login /> },
      { path: "productos", element: <ListadoProd /> },
      { path: "registro", element: <Registro /> },
      { path: "admin", element: <HomeAdmin /> },

    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
