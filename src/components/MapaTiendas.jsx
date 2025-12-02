import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TIENDAS } from "../utils/tiendas";

// Fix íconos (Vite)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapaTiendas({ height = 420 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    console.log("TIENDAS (Mapa):", TIENDAS); //  debe mostrar address/hours/phone también

    const map = L.map(containerRef.current);
    const bounds = L.latLngBounds(TIENDAS.map((t) => [t.lat, t.lng]));
    map.fitBounds(bounds, { padding: [30, 30] });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    TIENDAS.forEach((t) => {
      // usa valores con fallback para NO ocultar nada
      const addr = t.address ?? "(sin dirección)";
      const hrs = t.hours ?? "(sin horario)";
      const tel = t.phone ?? "";
      const telHref = tel ? tel.replace(/\s+/g, "") : "";

      const html = `
        <div style="min-width:240px">
          <strong>${t.name}</strong><br/>
          📍 ${addr}<br/>
          🕒 ${hrs}<br/>
          ${tel ? `📞 <a href="tel:${telHref}">${tel}</a>` : ""}
        </div>
      `;

      L.marker([t.lat, t.lng]).addTo(map).bindPopup(html);
    });

    const invalidate = () => map.invalidateSize();
    const timer = setTimeout(invalidate, 300);
    window.addEventListener("resize", invalidate);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", invalidate);
      map.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height,
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        overflow: "hidden",
      }}
    />
  );
}
