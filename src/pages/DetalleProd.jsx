// src/pages/DetalleProd.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../pages/CartContext';
import { getProducts } from '../utils/products'; // ✅ Importar la función
import RelatedProducts from '../components/RelatedProducts';
import '../assets/styles/style-detalle.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import '../utils/DetalleProd.logic.js'; // <-- Importa la lógica antes de usarla

const DetalleProd = () => {
    const { id } = useParams();
    const { agregarAlCarrito } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const productos = getProducts();
        const productoEncontrado = productos.find(p => p.id === id);
        setProduct(productoEncontrado);
        setLoading(false);
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

    return (
        <div className="content-all">
            <section id="prodetails" className="section-p1">
                <div className="single-pro-image">
                    <img src={product.img} alt={product.nombre} id="MainImg" />
                </div>
                
                <div className="single-pro-details">
                    <h6>
                        <Link to="/">Home</Link> / <Link to="/productos">Productos</Link>
                    </h6>
                    <div className="stard">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfAlt/>
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
                    <span id="descripcion">{product.desc}</span>
                </div>
            </section>

            <RelatedProducts 
                currentProduct={product}
            />
        </div>
    );
};

export default DetalleProd;
