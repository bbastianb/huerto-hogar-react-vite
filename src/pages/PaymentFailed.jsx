// src/pages/PaymentFailed.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';

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
                    Lo sentimos, no pudimos procesar tu pago. Por favor, intenta nuevamente.
                </p>

                <div className="error-suggestions">
                    <h3>Posibles causas:</h3>
                    <ul>
                        <li>❌ Fondos insuficientes en tu cuenta</li>
                        <li>❌ Datos de la tarjeta incorrectos</li>
                        <li>❌ Problemas temporales con el procesador de pagos</li>
                        <li>❌ Límite de la tarjeta excedido</li>
                    </ul>
                </div>

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
                    <Link to="/" className="btn btn--outline">
                        Seguir Comprando
                    </Link>
                </div>

                <div className="support-info">
                    <p>
                        ¿Necesitas ayuda? 
                        <Link to="/contacto" className="support-link">
                            Contáctanos
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;