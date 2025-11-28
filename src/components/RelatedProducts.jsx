import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProductos } from "../services/ProductoService.js";
import { getImageForProduct, getCategory } from "../utils/products";
import imagenDefault from "../assets/img/default.jpg";

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const cargarRelacionados = async () => {
      if (!currentProduct) {
        setRelatedProducts([]);
        return;
      }

      try {
        const products = await getProductos();

        const currentCategory = getCategory(currentProduct);

        const relacionados = products
          .filter(
            (p) =>
              p.id !== currentProduct.id &&
              getCategory(p) === currentCategory
          )
          .slice(0, 4);

        setRelatedProducts(relacionados);
      } catch (error) {
        console.error("Error cargando productos relacionados:", error);
        setRelatedProducts([]);
      }
    };

    cargarRelacionados();
  }, [currentProduct]);

  if (!currentProduct || relatedProducts.length === 0) return null;

  return (
    <section className="related-products">
      <h2>Productos relacionados</h2>

      <div className="related-grid">
        {relatedProducts.map((product) => {
          const imgFromMap = getImageForProduct(product);
          const cleanedImg = (product.img || "").trim();
          const customImg = cleanedImg !== "" ? cleanedImg : null;

          const imageSrc = imgFromMap || customImg || imagenDefault;

          return (
            <Link
              key={product.id}
              to={`/detalle/${product.id}`}
              className="related-item"
            >
              <article>
                <img
                  src={imageSrc}
                  alt={product.nombre}
                  className="related-products__image"
                  onError={(e) => {
                    e.target.src = imagenDefault;
                  }}
                />
                <h4>{product.nombre}</h4>
                <p>
                  ${product.precio} {product.unidad}
                </p>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedProducts;
