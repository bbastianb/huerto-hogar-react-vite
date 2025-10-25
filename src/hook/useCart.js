// src/hooks/useCart.js
import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.title === product.nombre);
      let newCart;
      
      if (existing) {
        newCart = prevCart.map(item =>
          item.title === product.nombre 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prevCart, {
          quantity,
          title: product.nombre,
          price: product.precio,
          id: product.id
        }];
      }
      
      localStorage.setItem('carrito', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productTitle) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.title !== productTitle);
      localStorage.setItem('carrito', JSON.stringify(newCart));
      return newCart;
    });
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return { 
    cart, 
    addToCart, 
    removeFromCart, 
    isCartOpen, 
    toggleCart, 
    closeCart 
  };
};