import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ListadoProd from "./pages/ListadoProd.jsx";
import Registro from "./pages/Registro.jsx";
import HomeAdmin from "./pages/admin/HomeAdmin.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
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
