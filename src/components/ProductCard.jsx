// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../pages/CartContext';
import '../utils/ProductCard.logic.js'; // <-- Importa la lógica antes de usarla

export const ProductCard = ({ product }) => {
  const { agregarAlCarrito } = useCart();

  const handleAddToCart = (e) => {
    window.ProductCardLogic.safeAddToCart(e, agregarAlCarrito, product);
  };

  const detailPath = window.ProductCardLogic.getProductDetailPath(product) ?? '#';

  return (
    <div className="item">
      <Link
        className="link-detalle"
        to={detailPath}
        aria-label={`Ver ${product?.nombre ?? 'producto'}`}
      >
        <figure>
          <img
            src={product?.img}
            alt={product?.nombre ?? 'Producto'}
            onError={(e) =>
              window.ProductCardLogic.onImageError(
                e,
                'https://via.placeholder.com/300x200?text=Imagen+no+disponible'
              )
            }
          />
        </figure>
      </Link>

      <div className="info-producto">
        <h2>
          <Link to={detailPath}>{product?.nombre}</Link>
        </h2>
        <p className="precio" data-precio={product?.precio}>
          ${product?.precio} {product?.unidad ?? ''}
        </p>
        {product?.stock && <p className="stock">{product.stock}</p>}

        <button className="btn-add-cart" onClick={handleAddToCart}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
