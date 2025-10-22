import { useState } from "react";

export default function Contacto(){
  const [form, setForm] = useState({ nombre:"", email:"", mensaje:"" });
  const [sent, setSent] = useState(false);

  function onChange(e){
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  }

  function onSubmit(e){
    e.preventDefault();
    // TODO: conectar a EmailJS / Formspree / backend propio
    setSent(true);
  }

  return (
    <main className="section">
      <div className="container" style={{maxWidth: 760}}>
        <h1 style={{color:'var(--title)'}}>Contacto</h1>
        <p>¿Tienes dudas, quieres cotizar o hacer un pedido? Escríbenos y te respondemos.</p>

        {sent ? (
          <div className="card" style={{padding: 16}}>
            <p>
              ¡Gracias por escribirnos, {form.nombre || "amiga/o"}! Te contactaremos pronto al correo{" "}
              <strong>{form.email}</strong>.
            </p>
          </div>
        ) : (
          <form className="card" onSubmit={onSubmit} style={{padding: 16}}>
            <div className="field">
              <label>Nombre</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                required
                placeholder="Tu nombre"
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
                placeholder="tucorreo@ejemplo.cl"
              />
            </div>

            <div className="field">
              <label>Mensaje</label>
              <textarea
                name="mensaje"
                rows={5}
                value={form.mensaje}
                onChange={onChange}
                required
                placeholder="Cuéntanos qué necesitas"
              />
            </div>

            <button className="btn" type="submit">Enviar</button>
          </form>
        )}
      </div>
    </main>
  );
}
