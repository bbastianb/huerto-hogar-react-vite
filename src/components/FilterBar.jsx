// src/components/FilterBar.jsx
import React from 'react';

const FilterBar = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { key: 'todos', label: 'Todos' },
    { key: 'frutas', label: 'Frutas' },
    { key: 'verduras', label: 'Verduras' },
    { key: 'otros', label: 'Otros' }
  ];

  return (
    <div className="filters" data-filtros>
      {categories.map(category => (
        <button
          key={category.key}
          className={`filtro ${activeCategory === category.key ? 'active' : ''}`}
          data-cat={category.key}
          onClick={() => setActiveCategory(category.key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;