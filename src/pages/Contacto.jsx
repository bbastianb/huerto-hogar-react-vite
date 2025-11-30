import { useState } from "react";
import { enviarContacto } from "../services/ContactoService";
import "../assets/styles/Contacto.css";

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSent(false);
    setLoading(true);

    const payload = {
      nombre: form.nombre,
      email: form.email,
      asunto: form.asunto || null,
      mensaje: form.mensaje,
    };

    try {
      await enviarContacto(payload);
      setSent(true);
      setForm({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
      });
    } catch (err) {
      console.error("Error al enviar contacto:", err);
      setError("Ocurrió un error al enviar el formulario. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1 className="contact-title">Hablemos 🌿</h1>
        <p className="contact-subtitle">
          ¿Tienes dudas sobre Huerto Hogar, productos o tu pedido?
          Escríbenos y te respondemos lo antes posible.
        </p>
      </div>

      <div className="contact-layout">
        {/* LADO IZQUIERDO: INFO */}
        <section className="contact-info-card">
          <h2>¿Por qué escribirnos?</h2>
          <ul className="contact-list">
            <li>
              <span className="contact-bullet">•</span>
              Consultas sobre productos, stock y pedidos.
            </li>
            <li>
              <span className="contact-bullet">•</span>
              Sugerencias para mejorar tu experiencia.
            </li>
            <li>
              <span className="contact-bullet">•</span>
              Problemas con el despacho o pago.
            </li>
          </ul>

          <div className="contact-highlight-box">
            <p>
              <strong>Horario de respuesta:</strong> Lunes a viernes, 10:00 a
              18:00 hrs.
            </p>
            <p>Te respondemos siempre con amor de huertito 🥕💚</p>
          </div>
        </section>

        {/* LADO DERECHO: FORMULARIO */}
        <section className="contact-form-card">
          <h2>Envíanos tu mensaje</h2>

          <form onSubmit={onSubmit} className="contact-form">
            <div className="form-row">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                placeholder="Tu nombre y apellido"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="asunto">Asunto (opcional)</label>
              <input
                id="asunto"
                type="text"
                name="asunto"
                value={form.asunto}
                onChange={onChange}
                placeholder="Ej: Consulta por mi pedido"
              />
            </div>

            <div className="form-row">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={onChange}
                placeholder="Cuéntanos en qué te ayudamos"
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="contact-submit-btn"
            >
              {loading ? "Enviando..." : "Enviar mensaje"}
            </button>

            {/* TOASTS */}
            <div className="contact-toast-container">
              {sent && !error && (
                <div className="contact-toast success">
                  <span>🎉</span>
                  <p>¡Gracias! Tu mensaje fue enviado correctamente.</p>
                </div>
              )}

              {error && (
                <div className="contact-toast error">
                  <span>⚠️</span>
                  <p>{error}</p>
                </div>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
