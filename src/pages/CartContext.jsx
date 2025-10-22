// src/CartContext/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Cargar carrito desde localStorage al iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem('carrito');
        if (savedCart) {
            setCarrito(JSON.parse(savedCart));
        }
    }, []);

    // Guardar en localStorage cuando cambie el carrito
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        setCarrito((carritoAnterior) => {
            const yaExisteElProducto = carritoAnterior.findIndex(
                (articulo) => articulo.id === producto.id
            );
            
            if (yaExisteElProducto >= 0) {
                const carritoActualizado = [...carritoAnterior];
                carritoActualizado[yaExisteElProducto].cantidad += 1;
                return carritoActualizado;
            } else {
                return [...carritoAnterior, { 
                    ...producto, 
                    cantidad: 1,
                    // Asegurarnos de que tenga las propiedades necesarias
                    nombre: producto.nombre,
                    precio: producto.precio,
                    img: producto.img
                }];
            }
        });
    };

    const actualizarCantidad = (productoId, cantidad) => {
        setCarrito((carritoAnterior) => 
            carritoAnterior.map((producto) => 
                producto.id === productoId
                    ? { ...producto, cantidad: Math.max(0, producto.cantidad + cantidad) }
                    : producto
            ).filter(producto => producto.cantidad > 0) // Eliminar si cantidad es 0
        );
    };

    const eliminarProducto = (productoId) => {
        setCarrito((carritoAnterior) => 
            carritoAnterior.filter((producto) => producto.id !== productoId)
        );
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    // Calcular total de productos
    const cartCount = carrito.reduce((total, item) => total + item.cantidad, 0);

    return (
        <CartContext.Provider value={{
            carrito, 
            agregarAlCarrito, 
            actualizarCantidad, 
            eliminarProducto,
            isCartOpen,
            toggleCart,
            closeCart,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);