// src/components/RelatedProducts.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../pages/CartContext';
import { products, getCategory } from '../utils/products';
import { FaStar } from 'react-icons/fa';
import{FaStarHalfAlt} from 'react-icons/fa';
const RelatedProducts = ({ currentProduct, addToCart }) => {
    const { agregarAlCarrito } = useCart();

    const getRelatedProducts = () => {
        const category = getCategory(currentProduct);
        return products
            .filter(product => product.id !== currentProduct.id && getCategory(product) === category)
            .slice(0, 4);
    };

    const relatedProducts = getRelatedProducts();

    const handleAddRelatedToCart = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        agregarAlCarrito(product);
        
        // Feedback visual opcional
        const button = e.target;
        const originalText = button.textContent;
        button.textContent = '¡Añadido!';
        button.style.backgroundColor = '#3CB371';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 1500);
    };

    if (relatedProducts.length === 0) return null;

    return (
        <section id="product1" className="container-related-products">
            <h2>Productos Relacionados</h2>
            <div className="cart-list-products" id="relacionados">
                {relatedProducts.map(product => (
                    <div key={product.id} className="pro">
                        <Link 
                            to={`/productos/${product.id}`} 
                            aria-label={`Ver ${product.nombre}`}
                            className="product-link"
                        >
                            <img src={product.img} alt={product.nombre} />
                        </Link>
                        
                        <div className="des">
                            <span>{getCategory(product)}</span>
                            <h5>
                                <Link to={`/productos/${product.id}`}>
                                    {product.nombre}
                                </Link>
                            </h5>
                            <div className="star">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalfAlt/>
                            </div>
                            <h4>${product.precio} {product.unidad ?? ''}</h4>
                            <div className="carr">
                                <button 
                                    className="btn-add-cart" 
                                    onClick={(e) => handleAddRelatedToCart(product, e)}
                                    aria-label={`Añadir ${product.nombre} al carrito`}
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RelatedProducts;