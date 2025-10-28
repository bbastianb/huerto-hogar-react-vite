import naranja from "../assets/img/naranja.jpg";
import platanos from "../assets/img/platanos.jpg";
import frutillas from "../assets/img/frutillas.jpg";
import kiwi from "../assets/img/kiwi.jpg";
import zanahoria from "../assets/img/zanahoria.jpg";
import espinaca from "../assets/img/espinaca.jpg";
import pimenton from "../assets/img/pimenton.jpg";
import limon from "../assets/img/limon.jpg";
import cebolla from "../assets/img/cebolla.jpg";
import miel from "../assets/img/miel.jpg";
import manzanas from "../assets/img/manzanas.jpg";
export const products = [
  {
    id: "FR001",
    nombre: "Manzana Fuji",
    precio: 1200,
    unidad: "x kilo",
    stock: "150 kilos",
    img: manzanas,
    desc: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.",
  },
  {
    id: "FR003",
    nombre: "Naranjas Valencia",
    precio: 1000,
    unidad: "x kilo",
    stock: "200 kilos",
    img: naranja,
    desc: "Jugosas y ricas en vitamina C, ideales para zumos frescos.",
  },
  {
    id: "FR002",
    nombre: "Platano",
    precio: 800,
    unidad: "x kilo",
    stock: "250 kilos",
    img: platanos,
    desc: "Plátanos maduros y dulces, perfectos para el desayuno.",
  },
  {
    id: "FR004",
    nombre: "Frutillas",
    precio: 3990,
    unidad: "x 500gr",
    stock: "100 kilos",
    img: frutillas,
    desc: "Bayas jugosas y vibrantes para postres y batidos.",
  },
  {
    id: "FR005",
    nombre: "Kiwi",
    precio: 2990,
    unidad: "x kilo",
    stock: "250 kilos",
    img: kiwi,
    desc: "Dulce y ácido, ideal para ensaladas, postres y snacks.",
  },
  {
    id: "VR001",
    nombre: "Zanahorias Orgánicas",
    precio: 900,
    unidad: "x kilo",
    stock: "100 kilos",
    img: zanahoria,
    desc: "Crujientes y sin pesticidas, excelentes para ensaladas o jugos.",
  },
  {
    id: "VR002",
    nombre: "Espinacas Frescas",
    precio: 700,
    unidad: "x bolsa de 500gr",
    stock: "80 bolsas",
    img: espinaca,
    desc: "Frescas y nutritivas, perfectas para ensaladas y batidos.",
  },
  {
    id: "VR003",
    nombre: "Pimientos Tricolor",
    precio: 1500,
    unidad: "x kilo",
    stock: "120 kilos",
    img: pimenton,
    desc: "Rojos, amarillos y verdes, ricos en vitaminas A y C.",
  },
  {
    id: "VR004",
    nombre: "Limón",
    precio: 1490,
    unidad: "x kilo",
    stock: "200 kilos",
    img: limon,
    desc: "Jugoso y de acidez equilibrada, ideal para múltiples recetas.",
  },
  {
    id: "VR005",
    nombre: "Cebolla Blanca",
    precio: 1600,
    unidad: "x kilo",
    stock: "150 kilos",
    img: cebolla,
    desc: "Versátil, perfecta para sofritos y ensaladas.",
  },
  {
    id: "PO001",
    nombre: "Miel Orgánica",
    precio: 5000,
    unidad: "x frasco de 500gr",
    stock: "50 frascos",
    img: miel,
    desc: "Pura y local, rica en antioxidantes.",
  },
];

export const getCategory = (product) => {
  if (!product || !product.id) return "otros";

  const pref = String(product.id).slice(0, 2).toUpperCase();
  if (pref === "FR") return "frutas";
  if (pref === "VR") return "verduras";
  if (pref === "PO") return "otros";
  return "otros";
};

// Función para obtener todas las categorías
export const getCategories = () => {
  const products = getProducts();
  const categorias = [...new Set(products.map((p) => getCategory(p)))];
  return ["todos", ...categorias];
};
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(products));
}

export const getProducts = () => {
  const storedProducts = localStorage.getItem("products");
  return storedProducts ? JSON.parse(storedProducts) : products;
};

export const setProducts = (arr) => {
  localStorage.setItem("products", JSON.stringify(arr));
};

// products.js - FUNCIONES ADICIONALES
export const resetToDefault = () => {
  localStorage.removeItem("products");
  return products; // Retorna los productos por defecto
};

export const exportProducts = () => {
  const currentProducts = getProducts();
  const dataStr = JSON.stringify(currentProducts, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  return URL.createObjectURL(dataBlob);
};

export const importProducts = (jsonData) => {
  try {
    const importedProducts = JSON.parse(jsonData);
    setProducts(importedProducts);
    return true;
  } catch (error) {
    console.error("Error importing products:", error);
    return false;
  }
};
