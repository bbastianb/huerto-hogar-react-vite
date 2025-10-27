// src/pages/ListadoProd.jsx
import React, { useState,useEffect } from 'react';
import { useCart } from '../hook/useCart';
import { getProducts, getCategories,getCategory } from '../utils/products';
import {ProductCard} from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import '../assets/styles/style-listado.css';
const ListadoProd = () => {
  const { addToCart } = useCart();

     const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('todos');
    useEffect(() => {
    // Cargar productos desde localStorage
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
  }, []);

  const filteredProducts = activeCategory === 'todos' 
    ? products 
    : products.filter(product => getCategory(product) === activeCategory);
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
        {filteredProducts.map(product => (
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