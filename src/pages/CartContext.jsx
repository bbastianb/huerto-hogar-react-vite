// src/CartContext/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 🔧 CORRECCIÓN: Cargar inicialmente desde localStorage
    const [carrito, setCarrito] = useState(() => {
        try {
            const savedCart = localStorage.getItem('carrito');
            if (savedCart) {
                const parsed = JSON.parse(savedCart);
                console.log('🔄 Carrito cargado al iniciar:', parsed);
                return Array.isArray(parsed) ? parsed : [];
            }
        } catch (error) {
            console.error('❌ Error cargando carrito inicial:', error);
        }
        return [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // 🔧 CORRECCIÓN: Guardar automáticamente después de cada cambio
    useEffect(() => {
        console.log('💾 Guardando carrito en localStorage:', carrito);
        try {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } catch (error) {
            console.error('❌ Error guardando carrito:', error);
        }
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        console.log('➕ Agregando producto:', producto);
        
        setCarrito((carritoAnterior) => {
            // 🔧 CORRECCIÓN: Validar que carritoAnterior sea array
            const carritoActual = Array.isArray(carritoAnterior) ? carritoAnterior : [];
            
            const productoExistenteIndex = carritoActual.findIndex(
                item => item.id === producto.id
            );

            let nuevoCarrito;

            if (productoExistenteIndex >= 0) {
                // Producto ya existe, aumentar cantidad
                nuevoCarrito = [...carritoActual];
                nuevoCarrito[productoExistenteIndex] = {
                    ...nuevoCarrito[productoExistenteIndex],
                    cantidad: nuevoCarrito[productoExistenteIndex].cantidad + 1
                };
            } else {
                // Producto nuevo, agregar al carrito
                nuevoCarrito = [
                    ...carritoActual,
                    {
                        id: producto.id,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        img: producto.img,
                        cantidad: 1
                    }
                ];
            }

            console.log('🛒 Nuevo carrito:', nuevoCarrito);
            return nuevoCarrito;
        });
    };

    const actualizarCantidad = (productoId, cantidad) => {
        console.log('🔄 Actualizando cantidad:', productoId, cantidad);
        
        setCarrito((carritoAnterior) => {
            const carritoActual = Array.isArray(carritoAnterior) ? carritoAnterior : [];
            
            const nuevoCarrito = carritoActual
                .map((producto) => 
                    producto.id === productoId
                        ? { 
                            ...producto, 
                            cantidad: Math.max(0, producto.cantidad + cantidad) 
                        }
                        : producto
                )
                .filter(producto => producto.cantidad > 0);
            
            console.log('📊 Carrito actualizado:', nuevoCarrito);
            return nuevoCarrito;
        });
    };

    const eliminarProducto = (productoId) => {
        console.log('🗑️ Eliminando producto:', productoId);
        
        setCarrito((carritoAnterior) => {
            const carritoActual = Array.isArray(carritoAnterior) ? carritoAnterior : [];
            const nuevoCarrito = carritoActual.filter((producto) => producto.id !== productoId);
            console.log('🛒 Carrito después de eliminar:', nuevoCarrito);
            return nuevoCarrito;
        });
    };

    const limpiarCarrito = () => {
        console.log('🧹 Limpiando todo el carrito');
        setCarrito([]);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    // Calcular total de productos para el contador
    const cartCount = carrito.reduce((total, item) => total + (item.cantidad || 0), 0);

    console.log('🔢 Total de productos en carrito:', cartCount);

    const value = {
        carrito, 
        agregarAlCarrito, 
        actualizarCantidad, 
        eliminarProducto,
        limpiarCarrito,
        isCartOpen,
        toggleCart,
        closeCart,
        cartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};