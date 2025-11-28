// src/pages/ListadoProd.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../hook/useCart';
import { getCategory } from '../utils/products';
import { getProductos } from '../services/ProductoService.js';
import { ProductCard } from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import '../assets/styles/style-listado.css';

import '../utils/ListadoProd.logic.js';

const ListadoProd = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('todos');

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getProductos();
        console.log("Productos desde API:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos desde API:", error);
      }
    };

    cargarProductos();
  }, []);
  // Filtrado delegando en la lógica externa (testeable con Jasmine)
  const filteredProducts = window.ListadoProdLogic.filterByCategory(
    products,
    activeCategory,
    getCategory
  );

  return (
    <div className="content-all">
      <header>
        <h1 className="titulo">Productos</h1>
      </header>

      <FilterBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="container-items">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ListadoProd;
