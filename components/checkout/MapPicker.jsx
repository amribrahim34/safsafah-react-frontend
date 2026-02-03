import React, { useEffect, useRef, useState } from "react";

/**
 * Leaflet via CDN (no build deps):
 * - Loads leaflet CSS/JS from unpkg on demand
 * - Renders a map centered on Cairo
 * - Click to drop/move a marker
 * - Reverse geocodes with Nominatim to show human-readable label
 */
export default function MapPickerLite({ lang, brand, onPick }) {
  const mapRef = useRef(null);
  const mapInst = useRef(null);
  const markerRef = useRef(null);
  const [label, setLabel] = useState("");

  // lazy load leaflet
  useEffect(() => {
    const ensureLeaflet = async () => {
      // if (window.L) return;
      await new Promise((res) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.onload = res;
        document.head.appendChild(link);
      });
      await new Promise((res) => {
        const s = document.createElement("script");
        s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        s.onload = res;
        document.body.appendChild(s);
      });
    };

    ensureLeaflet().then(() => {
      // const L = window.L;
      if (!mapRef.current) return;

      // Check if map is already initialized
      if (mapInst.current) return;

      mapInst.current = L.map(mapRef.current, { zoomControl: true, attributionControl: false }).setView([30.0444, 31.2357], 12);
      // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(mapInst.current);

      const setPoint = async (latlng) => {
        if (!markerRef.current) {
          markerRef.current = L.marker(latlng, { draggable: true }).addTo(mapInst.current);
          markerRef.current.on("dragend", () => setPoint(markerRef.current.getLatLng()));
        } else {
          markerRef.current.setLatLng(latlng);
        }
        // reverse geocode
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json&accept-language=${lang === "ar" ? "ar" : "en"}`;
          const res = await fetch(url, { headers: { "User-Agent": "safsafah-checkout" } });
          const json = await res.json();
          const display = json.display_name || "";
          setLabel(display);
          onPick?.({ coords: { lat: latlng.lat, lng: latlng.lng }, label: display });
        } catch {
          setLabel(lang === "ar" ? "تم تحديد الموقع" : "Location pinned");
          onPick?.({ coords: { lat: latlng.lat, lng: latlng.lng }, label: "" });
        }
      };

      mapInst.current.on("click", (e) => setPoint(e.latlng));

      // geolocate helper
      const tryLocate = () => {
        mapInst.current.locate({ setView: true, maxZoom: 15 });
      };
      mapInst.current.on("locationfound", (e) => setPoint(e.latlng));

      // small locate button
      const btn = L.control({ position: "topleft" });
      btn.onAdd = () => {
        const div = L.DomUtil.create("div", "leaflet-bar");
        const a = L.DomUtil.create("a", "", div);
        a.href = "#";
        a.title = lang === "ar" ? "استخدم موقعي" : "Use my location";
        a.innerHTML = "◎";
        a.style.padding = "8px";
        a.onclick = (ev) => { ev.preventDefault(); tryLocate(); };
        return div;
      };
      btn.addTo(mapInst.current);
    });

    return () => {
      // Clean up map instance on unmount
      if (mapInst.current) {
        mapInst.current.remove();
        mapInst.current = null;
      }
    };
  }, []); // Remove lang and onPick from dependencies to prevent re-initialization

  return (
    <div className="mt-2">
      <div className="text-sm font-semibold mb-1">{lang === "ar" ? "حدّد موقعك على الخريطة (اختياري)" : "Pin your location (optional)"}</div>
      <div ref={mapRef} className="w-full h-64 rounded-2xl overflow-hidden border border-neutral-200" />
      <div className="text-xs text-neutral-600 mt-2">
        {label
          ? (lang === "ar" ? `الموقع: ${label}` : `Location: ${label}`)
          : (lang === "ar" ? "اضغط على الخريطة لاختيار موقعك." : "Tap the map to choose your exact spot.")}
      </div>
    </div>
  );
}
