import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import { useUser } from "../pages/UserContext";
import "../assets/styles/style-Checkout.css";

import "../utils/Checkout.logic.js"; // <-- Importa la lógica antes de usarla

const Checkout = () => {
  const navigate = useNavigate();
  const { carrito } = useCart();
  const { user, isAuthenticated, updateUser } = useUser();

  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    email: user?.email || "",
    fono: user?.fono || "",
    direccion: user?.direccion || "",
    comuna: user?.comuna || "",
    metodoEnvio: "estandar",
    notas: "",
  });

  const [errors, setErrors] = useState({});
  const [saveAddress, setSaveAddress] = useState(isAuthenticated);

  // Calcular totales
  const subtotal = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  const costoEnvio = formData.metodoEnvio === "express" ? 20 : 10;
  const total = subtotal + costoEnvio;

  // Usar funciones desde la lógica externa
  const handleInputChange = (e) =>
    window.CheckoutLogic.handleInputChange(e, setFormData, errors, setErrors);

  const validateForm = () =>
    window.CheckoutLogic.validateForm(formData, setErrors);

  const handleSubmit = (e) =>
    window.CheckoutLogic.handleSubmit(
      e,
      formData,
      isAuthenticated,
      saveAddress,
      user,
      updateUser,
      navigate,
      validateForm,
      setErrors
    );

  // Si el carrito está vacío
  if (carrito.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-empty">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos antes de proceder al pago</p>
          <Link to="/productos" className="btn btn--primary">
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h1>Finalizar Compra</h1>

        <div className="checkout-layout">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <h2>Información de Envío</h2>

              {isAuthenticated && (
                <div className="user-authenticated-notice">
                  <i className="fas fa-user-check"></i>
                  Estás autenticado como {user.nombre} {user.apellido}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={errors.nombre ? "error" : ""}
                  />
                  {errors.nombre && (
                    <span className="error-text">{errors.nombre}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido *</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    className={errors.apellido ? "error" : ""}
                  />
                  {errors.apellido && (
                    <span className="error-text">{errors.apellido}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="fono">Teléfono *</label>
                  <input
                    type="tel"
                    id="fono"
                    name="fono"
                    value={formData.fono}
                    onChange={handleInputChange}
                    className={errors.fono ? "error" : ""}
                  />
                  {errors.fono && (
                    <span className="error-text">{errors.fono}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="direccion">Dirección de envío *</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Calle, número, departamento"
                  className={errors.direccion ? "error" : ""}
                />
                {errors.direccion && (
                  <span className="error-text">{errors.direccion}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="comuna">Comuna *</label>
                <input
                  type="text"
                  id="comuna"
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleInputChange}
                  className={errors.comuna ? "error" : ""}
                />
                {errors.comuna && (
                  <span className="error-text">{errors.comuna}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="metodoEnvio">Método de envío</label>
                <select
                  id="metodoEnvio"
                  name="metodoEnvio"
                  value={formData.metodoEnvio}
                  onChange={handleInputChange}
                >
                  <option value="estandar">
                    Envío Estándar (3-5 días) - $10
                  </option>
                  <option value="express">
                    Envío Express (1-2 días) - $20
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notas">Notas adicionales (opcional)</label>
                <textarea
                  id="notas"
                  name="notas"
                  value={formData.notas}
                  onChange={handleInputChange}
                  placeholder="Instrucciones especiales para la entrega..."
                  rows="3"
                />
              </div>

              {isAuthenticated && (
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                    />
                    Guardar esta dirección para futuras compras
                  </label>
                </div>
              )}

              <button type="submit" className="checkout-submit-btn">
                Continuar al Resumen
              </button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="checkout-summary-section">
            <div className="order-summary-card">
              <h3>Resumen del Pedido</h3>

              <div className="order-items">
                {carrito.map((producto) => (
                  <div key={producto.id} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{producto.nombre}</span>
                      <span className="item-quantity">
                        x{producto.cantidad}
                      </span>
                    </div>
                    <span className="item-price">
                      ${(producto.precio * producto.cantidad).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-line">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="total-line">
                  <span>Envío:</span>
                  <span>${costoEnvio.toFixed(2)}</span>
                </div>
                <div className="total-line grand-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link to="/carrito" className="back-to-cart">
              ← Volver al carrito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
