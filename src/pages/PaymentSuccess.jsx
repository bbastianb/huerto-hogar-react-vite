// src/pages/PaymentSuccess.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Checkout.css';

const PaymentSuccess = () => {
    const location = useLocation();
    const order = location.state?.order;

    return (
        <div className="payment-result-container">
            <div className="payment-result-content">
                <div className="success-animation">
                    <i className="fas fa-check-circle"></i>
                </div>
                
                <h1>¡Pago Exitoso!</h1>
                <p className="success-message">
                    Tu pedido ha sido procesado correctamente. Te hemos enviado un email de confirmación.
                </p>

                {order && (
                    <div className="order-details-summary">
                        <h3>Detalles de tu pedido:</h3>
                        <div className="order-info">
                            <p><strong>Número de pedido:</strong> #{order.id}</p>
                            <p><strong>Fecha:</strong> {new Date(order.fecha).toLocaleDateString()}</p>
                            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                            <p><strong>Dirección de envío:</strong> {order.shipping.direccion}, {order.shipping.comuna}</p>
                            <p><strong>Método de envío:</strong> {
                                order.shipping.metodoEnvio === 'express' 
                                    ? 'Express (1-2 días)' 
                                    : 'Estándar (3-5 días)'
                            }</p>
                        </div>

                        <div className="order-items-mini">
                            <h4>Productos:</h4>
                            {order.productos.map(producto => (
                                <div key={producto.id} className="mini-order-item">
                                    <span>{producto.nombre} x{producto.cantidad}</span>
                                    <span>${(producto.precio * producto.cantidad).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="success-actions">
                    <Link to="/" className="btn btn--primary">
                        Seguir Comprando
                    </Link>
                    <Link to="/productos" className="btn btn--secondary">
                        Ver Más Productos
                    </Link>
                </div>

                <div className="shipping-info">
                    <h4>¿Qué sigue?</h4>
                    <ul>
                        <li>📧 Recibirás un email de confirmación en los próximos minutos</li>
                        <li>🚚 Tu pedido será enviado en 1-2 días hábiles</li>
                        <li>📞 Te contactaremos si necesitamos más información</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;