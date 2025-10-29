// src/hooks/useCart.js
import { useState, useEffect } from 'react';
import '../utils/UseCart.logic.js'; // <-- Importa la lógica antes de usarla

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Carga inicial del carrito desde localStorage usando lógica testeable
  useEffect(() => {
    const loaded = window.UseCartLogic.loadSavedCart(localStorage);
    setCart(loaded);
  }, []);

  // Agregar al carrito delegando en la lógica pura (inmutable) + persistencia
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const newCart = window.UseCartLogic.addItem(prevCart, product, quantity);
      window.UseCartLogic.persistCart(newCart, localStorage);
      return newCart;
    });
  };

  // Eliminar del carrito delegando en la lógica pura + persistencia
  const removeFromCart = (productTitle) => {
    setCart((prevCart) => {
      const newCart = window.UseCartLogic.removeItem(prevCart, productTitle);
      window.UseCartLogic.persistCart(newCart, localStorage);
      return newCart;
    });
  };

  // Abrir/cerrar el carrito con helpers testeables
  const toggleCart = () => {
    setIsCartOpen((prev) => window.UseCartLogic.toggleCartState(prev));
  };

  const closeCart = () => {
    setIsCartOpen(window.UseCartLogic.closeCartState());
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    isCartOpen,
    toggleCart,
    closeCart,
  };
};
