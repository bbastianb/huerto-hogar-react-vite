// src/components/ProductCard.jsx
import React,{useState,useEffect}from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../pages/CartContext';
import imagenDefault from "../assets/img/default.jpg";

import { getImageForProduct } from "../utils/products";

import '../utils/ProductCard.logic.js'; // <-- Importa la lógica antes de usarla

export const ProductCard = ({ product }) => {
  const { agregarAlCarrito } = useCart();

  const handleAddToCart = (e) => {
    window.ProductCardLogic.safeAddToCart(e, agregarAlCarrito, product);
    setAgregado(true)
  };

  const detailPath = window.ProductCardLogic.getProductDetailPath(product) ?? '#';

  const imageSrc =
  getImageForProduct(product) ||
  (product.img && product.img.trim() !== "" ? product.img : null) ||
  imagenDefault;
  const [agregado, setAgregado] = useState(false);
  useEffect(() => {
    if (!agregado) return;
    const timer = setTimeout(() => setAgregado(false), 2000);
    return () => clearTimeout(timer);
  }, [agregado]);

  return (
    <div className="item">
      <Link
        className="link-detalle"
        to={detailPath}
        aria-label={`Ver ${product?.nombre ?? 'producto'}`}
      >
        <figure>
          <img
            src={imageSrc}
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
        {agregado && <p className="mensaje-agregado">¡Producto agregado al carrito!</p>}
      </div>
    </div>
  );
};

export default ProductCard;
