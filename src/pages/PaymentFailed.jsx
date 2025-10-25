// src/pages/PaymentFailed.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/style-Checkout.css';

const PaymentFailed = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-result-container">
            <div className="payment-result-content">
                <div className="error-animation">
                    <i className="fas fa-times-circle"></i>
                </div>
                
                <h1>Pago Fallido</h1>
                <p className="error-message">
                    Lo sentimos, no pudimos procesar tu pago.
                </p>

                <div className="failure-actions">
                    <button 
                        onClick={() => navigate('/resumen-pedido')}
                        className="btn btn--primary"
                    >
                        Reintentar Pago
                    </button>
                    <Link to="/carrito" className="btn btn--secondary">
                        Volver al Carrito
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;