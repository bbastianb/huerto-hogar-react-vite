// src/pages/CartPage.jsx
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useCart } from '../pages/CartContext';
import '../assets/styles/style-CarPage.css'
import { FaTrash } from 'react-icons/fa';
const CartPage = () => {
    const { carrito, actualizarCantidad, eliminarProducto } = useCart(); 
    const navigate = useNavigate(); // ← Agregar esto

    const costoDeEnvio = 10;
    const subTotal = carrito.reduce((acc, producto) => 
        acc + producto.precio * producto.cantidad, 0
    );
    const total = subTotal + costoDeEnvio;

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

    const handleEliminarProducto = (productoId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
            eliminarProducto(productoId);
        }
    };

    const handleCheckout = () => {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
            return;
        }
        navigate('/checkout'); // ← Esta es la función importante
    };

    return (
        <div className="cart-page-container">
            <div className="cart-page-content">
                <h1>TU <span>CARRITO</span></h1>
                
                {carrito.length === 0 ? (
                    <div className="cart-empty-state">
                        <h2>Tu carrito está vacío</h2>
                        <p>¡Descubre nuestros productos frescos!</p>
                        <Link to="/productos" className="btn btn--primary">
                            Ver Productos
                        </Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        {/* Lista de productos */}
                        <div className="cart-items-section">
                            <div className="cart-header">
                                <span>Producto</span>
                                <span>Precio</span>
                                <span>Cantidad</span>
                                <span>Total</span>
                                <span>Acción</span>
                            </div>
                            
                            <div className="cart-items-list">
                                {carrito.map((producto) => {
                                    const totalPrecio = producto.precio * producto.cantidad;
                                    return (
                                        <div className="cart-item-card" key={producto.id}>
                                            <div className="product-info">
                                                <img 
                                                    src={producto.img || producto.imagen || "https://via.placeholder.com/150"} 
                                                    alt={producto.nombre}
                                                    className="product-image"
                                                />
                                                <div className="product-details">
                                                    <h3>{producto.nombre}</h3>
                                                    <p className="product-category">
                                                        {producto.id.startsWith('FR') ? 'Fruta' : 
                                                         producto.id.startsWith('VR') ? 'Verdura' : 'Otro'}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="product-price">
                                                ${producto.precio}
                                            </div>

                                            <div className="quantity-controls">
                                                <button 
                                                    className="quantity-btn"
                                                    onClick={() => handleDisminuirCantidad(producto.id)}
                                                >
                                                    -
                                                </button>
                                                <span className="quantity-display">
                                                    {producto.cantidad}
                                                </span>
                                                <button 
                                                    className="quantity-btn"
                                                    onClick={() => handleAumentarCantidad(producto.id)}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="product-total">
                                                ${totalPrecio.toFixed(2)}
                                            </div>

                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleEliminarProducto(producto.id)}
                                                title="Eliminar producto"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Resumen del pedido */}
                        <div className="cart-summary-section">
                            <div className="summary-card">
                                <h2>RESUMEN DEL PEDIDO</h2>
                                
                                <div className="summary-line">
                                    <span>Subtotal:</span>
                                    <span>${subTotal.toFixed(2)}</span>
                                </div>
                                
                                <div className="summary-line">
                                    <span>Tarifa de envío:</span>
                                    <span>${costoDeEnvio.toFixed(2)}</span>
                                </div>
                                
                                <div className="summary-line total">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                {/* BOTÓN CORREGIDO */}
                                <button 
                                    className="checkout-btn"
                                    onClick={handleCheckout} // ← Usar la función handleCheckout
                                >
                                    PROCEDER AL PAGO
                                </button>
                            </div>

                            <Link to="/productos" className="continue-shopping">
                                ← Seguir comprando
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;