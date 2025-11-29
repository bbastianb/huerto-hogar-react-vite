import React, { createContext, useContext, useState, useEffect } from "react";

import "../utils/CartContext.logic.js";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ Carga inicial del carrito usando la lógica externa
  const [carrito, setCarrito] = useState(() => {
    const inicial = window.CartContextLogic.cargarCarritoInicial();
    console.log("🔄 Carrito cargado al iniciar:", inicial);
    return inicial;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Guardar automáticamente en localStorage usando lógica externa
  useEffect(() => {
    console.log("💾 Guardando carrito en localStorage:", carrito);
    window.CartContextLogic.guardarCarrito(carrito);
  }, [carrito]);

  // ✅ Agregar producto al carrito (usa lógica externa)
  const agregarAlCarrito = (producto) => {
    console.log("➕ Agregando producto:", producto);
    setCarrito((carritoAnterior) =>
      window.CartContextLogic.agregarAlCarrito(carritoAnterior, producto)
    );
  };

  // ✅ Actualizar cantidad de un producto (usa lógica externa)
  const actualizarCantidad = (productoId, cantidad) => {
    console.log("🔄 Actualizando cantidad:", productoId, cantidad);
    setCarrito((carritoAnterior) =>
      window.CartContextLogic.actualizarCantidad(
        carritoAnterior,
        productoId,
        cantidad
      )
    );
  };

  // ✅ Eliminar un producto (usa lógica externa)
  const eliminarProducto = (productoId) => {
    console.log("🗑️ Eliminando producto:", productoId);
    setCarrito((carritoAnterior) =>
      window.CartContextLogic.eliminarProducto(carritoAnterior, productoId)
    );
  };

  // ✅ Limpiar todo el carrito (usa lógica externa)
  const limpiarCarrito = () => {
    console.log("🧹 Limpiando todo el carrito");
    setCarrito(window.CartContextLogic.limpiarCarrito());
  };

  // ✅ Control de apertura del carrito (interfaz)
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  // ✅ Calcular total de productos (usa lógica externa)
  const cartCount = window.CartContextLogic.calcularTotalProductos(carrito);
  console.log("🔢 Total de productos en carrito:", cartCount);

  const value = {
    carrito,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarProducto,
    limpiarCarrito,
    isCartOpen,
    toggleCart,
    closeCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook personalizado
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
