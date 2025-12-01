// src/pages/CartPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import "../assets/styles/style-CarPage.css";
import { FaTrash } from "react-icons/fa";
import { getImageForProduct } from "../utils/products";

import "../utils/CartPage.logic.js";

const CartPage = () => {
  const { carrito, actualizarCantidad, eliminarProducto } = useCart();
  const navigate = useNavigate();

  // 🔔 Estado del modal de confirmación
  const [confirmData, setConfirmData] = useState({
    open: false,
    id: null,
    nombre: "",
  });

  const cantidadProd = carrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );

  const subTotal = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  const total = subTotal;

  // Funciones que usan la lógica externa
  const handleAumentarCantidad = (productoId) =>
    window.CartPageLogic.handleAumentarCantidad(actualizarCantidad, productoId);

  const handleDisminuirCantidad = (productoId) =>
    window.CartPageLogic.handleDisminuirCantidad(
      carrito,
      actualizarCantidad,
      eliminarProducto,
      productoId
    );

  // 🚮 Abrir modal (NO elimina todavía)
  const handleEliminarProducto = (producto) => {
    setConfirmData({
      open: true,
      id: producto.id,
      nombre: producto.nombre,
    });
  };

  // ✅ Cerrar modal sin hacer nada
  const cancelarEliminar = () => {
    setConfirmData({
      open: false,
      id: null,
      nombre: "",
    });
  };

  // ✅ Confirmar y eliminar
  const confirmarEliminar = () => {
    if (confirmData.id) {
      eliminarProducto(confirmData.id);
    }
    setConfirmData({
      open: false,
      id: null,
      nombre: "",
    });
  };

  const handleCheckout = () =>
    window.CartPageLogic.handleCheckout(carrito, navigate, window.alert);

  return (
    <div className="cart-page-container">
      <div className="cart-page-content">
        <h1>
          TU <span>CARRITO</span>
        </h1>

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

                  const imageSrc =
                    getImageForProduct(producto) ||
                    producto.img ||
                    producto.imagen ||
                    "https://via.placeholder.com/150?text=Sin+imagen";

                  return (
                    <div className="cart-item-card" key={producto.id}>
                      <div className="product-info">
                        <img
                          src={imageSrc}
                          alt={producto.nombre}
                          className="product-image"
                        />
                        <div className="product-details">
                          <h3>{producto.nombre}</h3>
                          <p className="product-category">
                            {producto.id.startsWith("FR")
                              ? "Fruta"
                              : producto.id.startsWith("VR")
                              ? "Verdura"
                              : "Otro"}
                          </p>
                        </div>
                      </div>

                      <div className="product-price">${producto.precio}</div>

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
                        onClick={() => handleEliminarProducto(producto)}
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
                  <span>Cantidad de Productos:</span>
                  <span>{cantidadProd}</span>
                </div>
                <div className="summary-line total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="checkout-btn" onClick={handleCheckout}>
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

      {/* 🌟 Modal de confirmación */}
      {confirmData.open && (
        <div className="cart-confirm-overlay">
          <div className="cart-confirm-modal">
            <h3>Eliminar producto</h3>
            <p>
              ¿Seguro que quieres eliminar{" "}
              <strong>{confirmData.nombre}</strong> del carrito?
            </p>

            <div className="cart-confirm-actions">
              <button className="btn-cancelar" onClick={cancelarEliminar}>
                Cancelar
              </button>
              <button className="btn-eliminar" onClick={confirmarEliminar}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
