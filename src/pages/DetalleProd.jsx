// src/pages/DetalleProd.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../pages/CartContext';
import { products } from '../utils/products';
import RelatedProducts from '../components/RelatedProducts';
import '../assets/styles/style-detalle.css';
import { FaStar } from 'react-icons/fa';
import{FaStarHalfAlt} from 'react-icons/fa';

const DetalleProd = () => {
    const { id } = useParams();
    const { agregarAlCarrito } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return (
            <div className="content-all">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h2>Producto no encontrado</h2>
                    <Link to="/productos">Volver a productos</Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        // Agregar la cantidad seleccionada
        for (let i = 0; i < quantity; i++) {
            agregarAlCarrito(product);
        }
        setAddedToCart(true);
        
        setTimeout(() => {
            setAddedToCart(false);
        }, 1200);
    };

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
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    />
                    
                    <button 
                        className={`btn-add-cart2 ${addedToCart ? 'added' : ''}`} 
                        onClick={handleAddToCart}
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