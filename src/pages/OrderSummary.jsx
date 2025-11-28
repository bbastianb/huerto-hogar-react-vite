import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import { useUser } from "../pages/UserContext";
import "../assets/styles/style-Checkout.css";
import { crearOrden } from "../services/OrdenService";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { carrito, eliminarProducto } = useCart();
  const { user, isAuthenticated } = useUser();

  const [isProcessing, setIsProcessing] = useState(false);

  // Obtener datos de envío del localStorage
  const shippingData = JSON.parse(localStorage.getItem("shippingData") || "{}");

  // Calcular totales
  const subtotal = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const costoEnvio = shippingData.metodoEnvio === "express" ? 20 : 10;
  const total = subtotal + costoEnvio;

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simular procesamiento de pago (2 segundos)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Para testing: 50% éxito, 50% fallo
      const isSuccess = Math.random() > 0.5;

      if (!isSuccess) {
        // Tipos de error para testing
        const errorTypes = [
          "Tarjeta rechazada",
          "Fondos insuficientes",
          "Error de conexión",
          "Tiempo de espera agotado",
        ];
        const randomError =
          errorTypes[Math.floor(Math.random() * errorTypes.length)];

        navigate("/pago-fallido", {
          state: {
            errorType: randomError,
            orderId: "ORD-" + Date.now().toString().slice(-6),
          },
        });
        return;
      }

      // Verificar que el usuario esté autenticado
      if (!isAuthenticated) {
        alert("Debes iniciar sesión para completar la compra.");
        navigate("/login");
        return;
      }

      const usuarioId = user?.id;
      let ordenBackend = null;

      if (usuarioId) {
        const fechaHoy = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

        const ordenPayload = {
          fecha_orden: fechaHoy,
          estado_orden: "Pendiente",
          usuario: {
            id: usuarioId,
          },
        };

        ordenBackend = await crearOrden(ordenPayload);
      } else {
        console.warn(
          "No se encontró id de usuario en el contexto, no se creará la orden en el backend."
        );
      }
      const order = {
        id:
          ordenBackend?.id_orden ||
          ordenBackend?.id ||
          "ORD-" + Date.now().toString().slice(-6),
        fecha: ordenBackend?.fecha_orden || new Date().toISOString(),
        productos: [...carrito],
        shipping: shippingData,
        total: total,
        estado: ordenBackend?.estado_orden || "completado",
      };

      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      // Limpiar carrito correctamente
      carrito.forEach((producto) => {
        eliminarProducto(producto.id);
      });

      // Redirigir a éxito
      navigate("/pago-exitoso", { state: { order } });
    } catch (error) {
      console.error("Error al procesar el pago / crear la orden:", error);

      navigate("/pago-fallido", {
        state: {
          errorType: "No se pudo registrar la orden en el servidor",
          orderId: "ORD-" + Date.now().toString().slice(-6),
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Manejo seguro si no hay carrito
  if (!carrito || carrito.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-empty">
          <h2>No hay productos en el carrito</h2>
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
        <h1>Resumen del Pedido</h1>

        <div className="order-summary-layout">
          {/* Detalles del pedido */}
          <div className="order-details-section">
            <div className="shipping-info-card">
              <h3>Información de Envío</h3>
              <div className="shipping-details">
                <p>
                  <strong>Nombre:</strong> {shippingData.nombre}{" "}
                  {shippingData.apellido}
                </p>
                <p>
                  <strong>Email:</strong> {shippingData.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {shippingData.fono}
                </p>
                <p>
                  <strong>Dirección:</strong> {shippingData.direccion}
                </p>
                <p>
                  <strong>Comuna:</strong> {shippingData.comuna}
                </p>
                <p>
                  <strong>Método de envío:</strong>{" "}
                  {shippingData.metodoEnvio === "express"
                    ? "Express (1-2 días)"
                    : "Estándar (3-5 días)"}
                </p>
                {shippingData.notas && (
                  <p>
                    <strong>Notas:</strong> {shippingData.notas}
                  </p>
                )}
              </div>
              <Link to="/checkout" className="edit-shipping-btn">
                Editar información de envío
              </Link>
            </div>

            <div className="order-items-card">
              <h3>Productos en el Pedido</h3>
              <div className="order-items-list">
                {carrito.map((producto) => (
                  <div key={producto.id} className="order-item-detailed">
                    <img
                      src={producto.img}
                      alt={producto.nombre}
                      className="item-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/60x60?text=Imagen";
                      }}
                    />
                    <div className="item-details">
                      <h4>{producto.nombre}</h4>
                      <p>Cantidad: {producto.cantidad}</p>
                      <p>Precio unitario: ${producto.precio}</p>
                    </div>
                    <div className="item-total">
                      ${(producto.precio * producto.cantidad).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumen de pago */}
          <div className="payment-summary-section">
            <div className="payment-summary-card">
              <h3>Resumen de Pago</h3>

              <div className="payment-totals">
                <div className="total-line">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="total-line">
                  <span>Envío:</span>
                  <span>${costoEnvio.toFixed(2)}</span>
                </div>
                <div className="total-line grand-total">
                  <span>Total a pagar:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="payment-methods">
                <h4>Método de Pago</h4>
                <div className="payment-option">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    defaultChecked
                  />
                  <label htmlFor="creditCard">
                    <i className="fas fa-credit-card"></i>
                    Tarjeta de Crédito/Débito
                  </label>
                </div>
                <div className="payment-option">
                  <input type="radio" id="paypal" name="paymentMethod" />
                  <label htmlFor="paypal">
                    <i className="fab fa-paypal"></i>
                    PayPal
                  </label>
                </div>
              </div>

              <button
                className="payment-btn"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Procesando pago...
                  </>
                ) : (
                  "Confirmar y Pagar"
                )}
              </button>

              <p className="secure-payment-note">
                <i className="fas fa-lock"></i>
                Pago 100% seguro y encriptado
              </p>
            </div>

            <Link to="/checkout" className="back-to-checkout">
              ← Volver a checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
