
import React, { useState, useEffect } from "react";

const productos = [
  { id:"FR001", nombre:"Manzana Fuji", precio:1200, unidad:"x kilo", stock:"150 kilos", img:"img/manzanas.jpg", desc:"Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule." },
  { id:"FR003", nombre:"Naranjas Valencia", precio:1000, unidad:"x kilo", stock:"200 kilos", img:"img/naranja.jpg", desc:"Jugosas y ricas en vitamina C, ideales para zumos frescos." },
  { id:"FR002", nombre:"Platano", precio:800, unidad:"x kilo", stock:"250 kilos", img:"img/platanos.jpg", desc:"Plátanos maduros y dulces, perfectos para el desayuno." },
  { id:"FR004", nombre:"Frutillas", precio:3990, unidad:"x 500gr", stock:"100 kilos", img:"img/frutillas.jpg", desc:"Bayas jugosas y vibrantes para postres y batidos." },
  { id:"FR005", nombre:"Kiwi", precio:2990, unidad:"x kilo", stock:"250 kilos", img:"img/kiwi.jpg", desc:"Dulce y ácido, ideal para ensaladas, postres y snacks." },
  { id:"VR001", nombre:"Zanahorias Orgánicas", precio:900, unidad:"x kilo", stock:"100 kilos", img:"img/zanahoria.jpg", desc:"Crujientes y sin pesticidas, excelentes para ensaladas o jugos." },
  { id:"VR002", nombre:"Espinacas Frescas", precio:700, unidad:"x bolsa de 500gr", stock:"80 bolsas", img:"img/espinaca.jpg", desc:"Frescas y nutritivas, perfectas para ensaladas y batidos." },
  { id:"VR003", nombre:"Pimientos Tricolor", precio:1500, unidad:"x kilo", stock:"120 kilos", img:"img/pimenton.jpg", desc:"Rojos, amarillos y verdes, ricos en vitaminas A y C." },
  { id:"VR004", nombre:"Limón", precio:1490, unidad:"x kilo", stock:"200 kilos", img:"img/limon.jpg", desc:"Jugoso y de acidez equilibrada, ideal para múltiples recetas." },
  { id:"VR005", nombre:"Cebolla Blanca", precio:1600, unidad:"x kilo", stock:"150 kilos", img:"img/cebolla.jpg", desc:"Versátil, perfecta para sofritos y ensaladas." },
  { id:"PO001", nombre:"Miel Orgánica", precio:5000, unidad:"x frasco de 500gr", stock:"50 frascos", img:"img/miel.jpg", desc:"Pura y local, rica en antioxidantes." }
];

function getCategoria(p) {
  if (p.categoria) {
    const c = p.categoria.trim().toLowerCase();
    if (c.startsWith('frut')) return 'frutas';
    if (c.startsWith('verdu')) return 'verduras';
    return 'otros';
  }
  const pref = String(p.id || '').slice(0, 2).toUpperCase();
  if (pref === 'FR') return 'frutas';
  if (pref === 'VR') return 'verduras';
  return 'otros';
}

export default function ListadoProd() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [productosFiltrados, setProductosFiltrados] = useState(productos);
  const [carrito, setCarrito] = useState(() => {
    // Carga carrito de localStorage o vacío
    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (categoriaActiva === 'todos') {
      setProductosFiltrados(productos);
    } else {
      setProductosFiltrados(productos.filter(p => getCategoria(p) === categoriaActiva));
    }
  }, [categoriaActiva]);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.title === producto.nombre);
      if (existe) {
        return prev.map(p => p.title === producto.nombre ? { ...p, quantity: p.quantity + 1 } : p);
      } else {
        return [...prev, { quantity: 1, title: producto.nombre, price: producto.precio }];
      }
    });
  };

  const eliminarDelCarrito = (title) => {
    setCarrito(prev => prev.filter(p => p.title !== title));
  };

  // Calculos para mostrar totales
  const totalProductos = carrito.reduce((acc, p) => acc + p.quantity, 0);
  const totalPrecio = carrito.reduce((acc, p) => acc + p.quantity * p.price, 0);

  return (
    <section>
      <title>Listado Producto</title>
      <h1>Productos</h1>

      {/* Icono carrito y contador */}
      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => {
          const elem = document.querySelector('.container-cart-producto');
          if(elem) elem.classList.toggle('hidden-cart');
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor" className="icon-cart">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <div className="count-producto">
            <span id="contador-productos">{totalProductos}</span>
          </div>
        </div>

        {/* Carrito desplegable */}
        <div className="container-cart-producto hidden-cart">
          <div className="row-product">
            {carrito.length === 0 && <p className="cart-empty">El carrito está vacío</p>}
            {carrito.map(p => (
              <div key={p.title} className="cart-producto">
                <div className="info-cart-product">
                  <span className="cantidad-producto-carrito">{p.quantity}</span>
                  <p className="titulo-producto-carrito">{p.title}</p>
                  <span className="precio-producto-carrito">${p.price}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="icon-close"
                  onClick={() => eliminarDelCarrito(p.title)}
                  style={{cursor: 'pointer'}}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            ))}
          </div>

          {carrito.length > 0 && (
            <div className="cart-total">
              <h3>Total:</h3>
              <span className="total-pagar">${totalPrecio}</span>
            </div>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="filters" data-filtros>
        {['todos', 'frutas', 'verduras', 'otros'].map(cat => (
          <button
            key={cat}
            className={`filtro ${categoriaActiva === cat ? 'active' : ''}`}
            data-cat={cat}
            onClick={() => setCategoriaActiva(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Listado de productos */}
      <div className="container-items">
        {productosFiltrados.map(p => (
          <div key={p.id} className="item">
            <a
              className="link-detalle"
              href={`detalle-producto.html?id=${encodeURIComponent(p.id)}`}
              aria-label={`Ver ${p.nombre}`}
            >
              <figure>
                <img src={p.img} alt={p.nombre} />
              </figure>
            </a>
            <div className="info-producto">
              <h2>
                <a href={`detalle-producto.html?id=${encodeURIComponent(p.id)}`}>
                  {p.nombre}
                </a>
              </h2>
              <p className="precio" data-precio={p.precio}>
                ${p.precio} {p.unidad ?? ''}
              </p>
              {p.stock && <p className="stock">{p.stock}</p>}
              <button
                className="btn-add-cart"
                onClick={() => agregarAlCarrito(p)}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
  /*return (

    <section>
      <title>Listado Producto</title>
      <h1>Productos</h1>
      <div class="container-icon">
        <div class="container-cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="icon-cart">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <div class="count-producto">
            <span id="contador-productos">0</span>
          </div>
        </div>
        <div class="container-cart-producto hidden-cart">
          <div class="row-product"></div>

          <div class="cart-total hidden">
            <h3>Total:</h3>
            <span class="total-pagar">$0</span>
          </div>

          <p class="cart-empty">El carrito está vacio</p>
        </div>

      </div>
      <div class="filters" data-filtros>
        <button class="filtro active" data-cat="todos">Todos</button>
        <button class="filtro" data-cat="frutas">Frutas</button>
        <button class="filtro" data-cat="verduras">Verduras</button>
        <button class="filtro" data-cat="otros">Otros</button>
      </div>
    </section>
  )*/

