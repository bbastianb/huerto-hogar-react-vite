// src/pages/ListadoProd.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../hook/useCart';
import { getProducts, getCategory } from '../utils/products';
import { ProductCard } from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import '../assets/styles/style-listado.css';

// 🔐 Importa la lógica pura ANTES de usarla (necesario para los tests)
import '../utils/ListadoProd.logic.js';

const ListadoProd = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('todos');

  useEffect(() => {
    // Cargar productos de forma segura usando la lógica externa
    const loadedProducts = window.ListadoProdLogic.loadProducts(getProducts);
    setProducts(loadedProducts);
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
