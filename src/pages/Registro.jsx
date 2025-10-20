import { Link } from "react-router-dom";
import "../assets/styles/Registro.css";
import Carrusel from "../components/Carrusel";

import { useState } from "react";

import imgRegistro1 from "../assets/img/huerto_registro2.jpg";
import imgRegistro2 from "../assets/img/zanahorias.jpg";
import imgRegistro3 from "../assets/img/espinaca.jpg";

const slidesRegistro = [
  { image: imgRegistro1, caption: "Únete a nuestra comunidad" },
  { image: imgRegistro2, caption: "Productos frescos" },
  { image: imgRegistro3, caption: "Cultivados con cuidado" },
];

export default function Registro() {
  return (
    <main className="main-registro">
      <section className="carrusel-registro">
        <Carrusel slides={slidesRegistro} />
      </section>
      <section className="registro-section">
        <h1 className="registro-title">Crear Cuenta</h1>
        <form className="registro-form" action="">
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirm-password"
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="registro-btn">
            Registrarse
          </button>
        </form>
      </section>
    </main>
  );
}
