import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import "leaflet/dist/leaflet.css";

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
import OrdenesAdmin from "./pages/admin/OrdenesAdmin.jsx";
import ContactosAdmin from "./pages/admin/ContactosAdmin.jsx";

import DetalleProd from "./pages/DetalleProd.jsx";
import { CartProvider } from "./pages/CartContext.jsx";
import CartPage from "./pages/CartPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSummary from "./pages/OrderSummary.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailed from "./pages/PaymentFailed.jsx";

import { UserProvider, useUser } from "./pages/UserContext";
import RecuperarContrasenna from "./pages/RecuperarContrasenna.jsx";
import ActualizarContrasenna from "./pages/ActualizarContrasenna.jsx";

const AdminRoute = ({ children }) => {
  const { isLoading, isAuthenticated, isAdmin } = useUser();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const UsuarioRoute = ({ children }) => {
  const { isLoading, isAuthenticated, isUsuario } = useUser();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isUsuario) {
    return <Navigate to="/" replace />;
  }

  return children;
};

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

      // Rutas admin (rol "admin")
      {
        path: "admin",
        element: (
          <AdminRoute>
            <HomeAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "admin/usuarios",
        element: (
          <AdminRoute>
            <Usuarios />
          </AdminRoute>
        ),
      },
      {
        path: "admin/productos",
        element: (
          <AdminRoute>
            <ProductosAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "admin/ordenes",
        element: (
          <AdminRoute>
            <OrdenesAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "admin/contactos",
        element: (
          <AdminRoute>
            <ContactosAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "admin/confiAdmin",
        element: (
          <AdminRoute>
            <ConfiAdmin />
          </AdminRoute>
        ),
      },

      { path: "detalle/:id", element: <DetalleProd /> },
      { path: "carrito", element: <CartPage /> },

      // Rutas de compra → rol "usuario"
      {
        path: "checkout",
        element: (
          <UsuarioRoute>
            <Checkout />
          </UsuarioRoute>
        ),
      },
      {
        path: "resumen-pedido",
        element: (
          <UsuarioRoute>
            <OrderSummary />
          </UsuarioRoute>
        ),
      },
      {
        path: "pago-exitoso",
        element: (
          <UsuarioRoute>
            <PaymentSuccess />
          </UsuarioRoute>
        ),
      },
      {
        path: "pago-fallido",
        element: (
          <UsuarioRoute>
            <PaymentFailed />
          </UsuarioRoute>
        ),
      },

      { path: "recuperar-contrasenna", element: <RecuperarContrasenna /> },
      { path: "actualizar-contrasenna", element: <ActualizarContrasenna /> },
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
