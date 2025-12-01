import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import { useUser } from "../pages/UserContext";
import "../assets/styles/style-Checkout.css";
import { crearOrden } from "../services/OrdenService";
import { getImageForProduct } from "../utils/products";
import imagenDefault from "../assets/img/default.jpg";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { carrito, eliminarProducto, limpiarCarrito } = useCart();
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
    if (!carrito || carrito.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }

    if (!isAuthenticated || !user || user.id == null) {
      alert("Debes iniciar sesión para confirmar el pedido.");
      navigate("/login");
      return;
    }

    if (
      !shippingData ||
      !shippingData.nombre ||
      !shippingData.apellido ||
      !shippingData.direccion ||
      !shippingData.comuna ||
      !shippingData.region ||
      !shippingData.metodoEnvio
    ) {
      alert("Faltan datos de envío. Vuelve al paso anterior.");
      navigate("/checkout");
      return;
    }

    setIsProcessing(true);

    try {
      const ordenPayload = {
        total,
        fecha_orden: new Date().toISOString().slice(0, 10),
        usuario: {
          id: user.id,
        },
        detalles: carrito.map((item) => ({
          idProducto: String(item.id),
          nombreProducto: item.nombre,
          precioUnitario: item.precio,
          cantidad: item.cantidad,
        })),
        detalleEnvio: {
          direccion: shippingData.direccion,
          comuna: shippingData.comuna,
          region: shippingData.region,
          metodo_envio: shippingData.metodoEnvio,
          estado_envio: "Pendiente",
        },
      };

      const ordenCreada = await crearOrden(ordenPayload);
      console.log("Orden creada:", ordenCreada);

      localStorage.removeItem("shippingData");
      limpiarCarrito();
      alert(
        `Compra realizada con éxito.\n\nTu orden ha sido registrada correctamente.`
      );
      navigate("/productos");
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert(
        error?.response?.data?.message ||
          "Ocurrió un error al procesar el pago. Intenta nuevamente."
      );
    } finally {
      setIsProcessing(false);
    }
  };

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
                {carrito.map((producto) => {
                  const cleanedImg = (producto.img || "").trim();
                  const customImg = cleanedImg !== "" ? cleanedImg : null;

                  const imageSrc =
                    getImageForProduct(producto) || // FR001, VR001, etc.
                    customImg || // URL que venga desde la BD
                    imagenDefault; // fallback

                  return (
                    <div key={producto.id} className="order-item-detailed">
                      <img
                        src={imageSrc}
                        alt={producto.nombre ?? "Producto"}
                        className="item-image"
                        onError={(e) => {
                          e.target.src = imagenDefault;
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
                  );
                })}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
