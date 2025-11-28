// src/pages/DetalleProd.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../pages/CartContext';
import { getProductoPorId } from "../services/ProductoService.js";
import RelatedProducts from '../components/RelatedProducts';
import '../assets/styles/style-detalle.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import '../utils/DetalleProd.logic.js'; // <-- Importa la lógica antes de usarla
import { getImageForProduct } from "../utils/products";
import imagenDefault from "../assets/img/default.jpg";



const DetalleProd = () => {
    const { id } = useParams();
    const { agregarAlCarrito } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                const data = await getProductoPorId(id);
                setProduct(data);
            } catch (error) {
                console.error("Error cargando producto:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        cargarProducto();
    }, [id]);

    if (loading) {
        return (
            <div className="content-all">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h2>Cargando producto...</h2>
                </div>
            </div>
        );
    }

    if (!product) {
        const descripcion = product.descripcion ?? product.desc ?? "Sin descripción disponible.";

        return (
            <div className="content-all">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h2>Producto no encontrado</h2>
                    <p>El producto con ID "{id}" no existe.</p>
                    <Link to="/productos">Volver a productos</Link>
                </div>
            </div>
        );
    }

const imageSrc =
  getImageForProduct(product) ||
  (product.img && product.img.trim() !== "" ? product.img : null) ||
  imagenDefault;

  const descripcion = product.descripcion ?? "";
    return (
        <div className="content-all">
            <section id="prodetails" className="section-p1">
                <div className="single-pro-image">
                    <img src={imageSrc} alt={product.nombre} id="MainImg" />
                </div>

                <div className="single-pro-details">
                    <h6>
                        <Link to="/">Home</Link> / <Link to="/productos">Productos</Link>
                    </h6>
                    <div className="stard">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfAlt />
                    </div>
                    <h4 id="nombre">{product.nombre}</h4>

                    <h2 id="precio" data-precio={product.precio}>
                        ${product.precio} {product.unidad}
                    </h2>

                    <input
                        id="qty"
                        type="number"
                        value={quantity}
                        min="1"
                        onChange={(e) => window.DetalleProdLogic.handleQuantityChange(e, setQuantity)}
                    />

                    <button
                        className={`btn-add-cart2 ${addedToCart ? 'added' : ''}`}
                        onClick={() => window.DetalleProdLogic.handleAddToCart(product, quantity, agregarAlCarrito, setAddedToCart)}
                        disabled={addedToCart}
                    >
                        {addedToCart ? '¡Añadido!' : 'Añadir al carrito'}
                    </button>

                    <h4>Detalle:</h4>
                    <span id="descripcion">{descripcion}</span>
                </div>
            </section>

            <RelatedProducts
                currentProduct={product}
            />
        </div>
    );
};

export default DetalleProd;
