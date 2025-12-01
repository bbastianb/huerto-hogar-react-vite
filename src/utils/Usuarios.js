function leerJSONSeguro(key, fallback = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.warn(`Error al leer ${key} desde localStorage:`, err);
    return fallback;
  }
}

export const getUsuarioActual = () => {
  return leerJSONSeguro("usuarioActual");
};

export const setUsuarioActual = (u) => {
  if (u) {
    localStorage.setItem("usuarioActual", JSON.stringify(u));
  } else {
    localStorage.removeItem("usuarioActual");
  }
  window.dispatchEvent(new Event("usuarioActual:changed"));
};
