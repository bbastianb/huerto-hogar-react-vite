// src/pages/PaymentSuccess.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/style-Checkout.css';

// src/pages/PaymentSuccess.jsx

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
                            <p><strong>Número de pedido:</strong> {order.id}</p>
                            <p><strong>Total:</strong> ${order.total?.toFixed(2)}</p>
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
            </div>
        </div>
    );
};

export default PaymentSuccess;