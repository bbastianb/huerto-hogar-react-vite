// src/components/Cart.jsx
import React from 'react';
import { useCart } from '../pages/CartContext';
import { useNavigate } from 'react-router-dom';
const Cart = ({ isCartOpen, closeCart }) => {
    const { carrito, actualizarCantidad, eliminarProducto } = useCart(); 
    const navigate = useNavigate();
    const total = carrito.reduce((acc, producto) => 
        acc + producto.precio * producto.cantidad, 0
    );
    
    const totalProducts = carrito.reduce((acc, producto) => 
        acc + producto.cantidad, 0
    );

    const handleAumentarCantidad = (productoId) => {
        actualizarCantidad(productoId, 1);
    };

    const handleDisminuirCantidad = (productoId) => {
        const producto = carrito.find((item) => item.id === productoId);
        if (producto.cantidad > 1) {
            actualizarCantidad(productoId, -1);
        } else {
            eliminarProducto(productoId);
        }
    };
    const handleVerCarritoCompleto = () => {
        closeCart();
        navigate('/carrito'); 
    };

    return (
        <div className={`container-cart-producto ${isCartOpen ? '' : 'hidden-cart'}`}>
            {carrito.length === 0 ? (
                <p className="cart-empty">El carrito está vacío</p>
            ) : (
                <>
                    <div className="row-product">
                        {carrito.map((producto) => (
                            <div key={producto.id} className="cart-producto">
                                <div className="info-cart-product">
                                    <span className="cantidad-producto-carrito">
                                        {producto.cantidad}
                                    </span>
                                    <p className="titulo-producto-carrito">{producto.nombre}</p>
                                    <span className="precio-producto-carrito">
                                        ${producto.precio}
                                    </span>
                                </div>
                                
                                {/* Controles de cantidad */}
                                <div className="cart-quantity-controls">
                                    <button 
                                        className="quantity-btn-small"
                                        onClick={() => handleDisminuirCantidad(producto.id)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{producto.cantidad}</span>
                                    <button 
                                        className="quantity-btn-small"
                                        onClick={() => handleAumentarCantidad(producto.id)}
                                    >
                                        +
                                    </button>
                                </div>

                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="1.5"
                                    stroke="currentColor" 
                                    className="icon-close"
                                    onClick={() => eliminarProducto(producto.id)}
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>

                    <div className="cart-total">
                        <h3>Total:</h3>
                        <span className="total-pagar">${total}</span>
                    </div>

                    <button className="checkout-btn-floating">
                        PASAR POR LA CAJA
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;