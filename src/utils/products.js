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

const imageMapById = {
  FR001: manzanas,
  FR003: naranja,
  FR002: platanos,
  FR004: frutillas,
  FR005: kiwi,
  VR001: zanahoria,
  VR002: espinaca,
  VR003: pimenton,
  VR004: limon,
  VR005: cebolla,
  PO001: miel,
};

export const getCategory = (product) => {
  if (!product || !product.id) return "otros";

  const pref = String(product.id).slice(0, 2).toUpperCase();
  if (pref === "FR") return "frutas";
  if (pref === "VR") return "verduras";
  if (pref === "PO") return "otros";
  return "otros";
};

export const getImageForProduct = (productOrId) => {
  if (!productOrId) return null;

  const id =
    typeof productOrId === "string"
      ? productOrId
      : productOrId.id;

  if (!id) return null;

  const cleanId = id.toString().trim().toUpperCase();
  return imageMapById[cleanId] || null;
};