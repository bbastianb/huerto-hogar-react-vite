// src/utils/ListadoProd.logic.js
// Namespace global: window.ListadoProdLogic
// Evita redeclaraciones si el archivo se carga más de una vez.
(function (global) {
  if (!global.ListadoProdLogic) {
    global.ListadoProdLogic = {};
  }

  var ns = global.ListadoProdLogic;

  /**
   * loadProducts(getProductsFn)
   * Llama de forma segura a la función de obtención de productos (por ejemplo, getProducts)
   * y garantiza que retorne siempre un arreglo. Maneja funciones nulas, errores y
   * retornos no-arreglo devolviendo [] como valor seguro.
   *
   * @param {Function} getProductsFn - Función que retorna el arreglo de productos.
   * @returns {Array} Arreglo de productos o [] si hay error/entrada inválida.
   */
  ns.loadProducts = function loadProducts(getProductsFn) {
    try {
      if (typeof getProductsFn !== "function") return [];
      var result = getProductsFn();
      return Array.isArray(result) ? result : [];
    } catch (e) {
      // Si getProductsFn lanza error, devolvemos arreglo vacío seguro.
      return [];
    }
  };

  /**
   * filterByCategory(products, activeCategory, getCategoryFn)
   * Filtra los productos por categoría. Si la categoría es "todos" (o falsy),
   * retorna una copia superficial del arreglo original. Si faltan datos o la
   * función getCategoryFn no es válida, retorna [] de forma segura.
   *
   * @param {Array} products - Arreglo de productos.
   * @param {string} activeCategory - Categoría activa (e.g., 'frutas', 'verduras', 'todos').
   * @param {Function} getCategoryFn - Función que recibe (product) y retorna su categoría.
   * @returns {Array} Arreglo filtrado según la categoría.
   */
  ns.filterByCategory = function filterByCategory(products, activeCategory, getCategoryFn) {
    if (!Array.isArray(products)) return [];
    var cat = (activeCategory || "").toString().trim().toLowerCase();
    if (cat === "" || cat === "todos") return products.slice();

    if (typeof getCategoryFn !== "function") return [];

    var out = [];
    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      var c;
      try {
        c = getCategoryFn(p);
      } catch (e) {
        c = undefined;
      }
      if (c != null && c.toString().trim().toLowerCase() === cat) {
        out.push(p);
      }
    }
    return out;
  };

})(window);
