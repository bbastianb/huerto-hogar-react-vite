// components/RelatedProducts.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategory } from '../utils/products';

const RelatedProducts = ({ currentProduct }) => {
    const products = getProducts();
    const currentCategory = getCategory(currentProduct);
    
    const relatedProducts = products
        .filter(p => p.id !== currentProduct.id && getCategory(p) === currentCategory)
        .slice(0, 4);

    if (relatedProducts.length === 0) return null;

    return (
        <section className="related-products">
            <h2>Productos Relacionados</h2>
            <div className="related-grid">
                {relatedProducts.map(product => (
                    <Link 
                        key={product.id} 
                        to={`/productos/${product.id}`}
                        className="related-item"
                    >
                        <img src={product.img} alt={product.nombre} />
                        <h3>{product.nombre}</h3>
                        <p>${product.precio} {product.unidad}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RelatedProducts;