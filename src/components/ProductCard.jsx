// En src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../pages/CartContext';

export const ProductCard = ({ product }) => {
    const { agregarAlCarrito } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        agregarAlCarrito(product);
    };

    // Debug: verifica que los datos lleguen correctamente
    console.log('Producto en ProductCard:', product);
    console.log('Imagen URL:', product.img);

    return (
        <div className="item">
            <Link 
                className="link-detalle" 
                to={`/productos/${product.id}`}
                aria-label={`Ver ${product.nombre}`}
            >
                <figure>
                    <img 
                        src={product.img} 
                        alt={product.nombre}
                        onError={(e) => {
                            console.log('Error cargando imagen:', product.img);
                            e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
                        }}
                    />
                </figure>
            </Link>
            
            <div className="info-producto">
                <h2>
                    <Link to={`/productos/${product.id}`}>{product.nombre}</Link>
                </h2>
                <p className="precio" data-precio={product.precio}>
                    ${product.precio} {product.unidad ?? ''}
                </p>
                {product.stock && <p className="stock">{product.stock}</p>}
                
                <button className="btn-add-cart" onClick={handleAddToCart}>
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;


