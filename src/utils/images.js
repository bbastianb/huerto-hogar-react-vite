// Carga TODAS las imágenes que existan en src/assets/img (jpg/png/webp/svg/gif)
const modules = import.meta.glob("../assets/img/*", { eager: true });

export const images = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const filename = path.split("/").pop(); // ej: "pimentones2.jpg"
    return [filename, mod.default];         // { "pimentones2.jpg": "/assets/...hash.jpg" }
  })
);

// (Opcional) ver en consola qué nombres tienes realmente:
// console.log("IMÁGENES DISPONIBLES:", Object.keys(images));
