import { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  SHIPPING_ZONES,
  STORE_COORDS,
  waLink,
  costLabel,
} from '../config';
import type { ShippingZone } from '../config';

type Result = { distKm: number; zone: ShippingZone | null };

const toRad = (deg: number) => (deg * Math.PI) / 180;

function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export default function ShippingMap() {
  const [result, setResult] = useState<Result | null>(null);
  const [address, setAddress] = useState('');
  const [query, setQuery] = useState('');
  const [notFound, setNotFound] = useState(false);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.CircleMarker | null>(null);
  const pickRef = useRef<(lat: number, lng: number, label?: string) => void>(
    () => {},
  );

  useEffect(() => {
    const el = mapDivRef.current;
    if (!el || mapRef.current) return;

    const map = L.map(el, {
      center: [STORE_COORDS.lat, STORE_COORDS.lng],
      zoom: 12,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map);

    SHIPPING_ZONES.forEach((z) => {
      L.circle([STORE_COORDS.lat, STORE_COORDS.lng], {
        radius: z.maxKm * 1000,
        color: '#a68b5f',
        weight: 1,
        opacity: 0.35,
        fillColor: '#c9b18c',
        fillOpacity: 0.1,
      }).addTo(map);
    });

    const handlePick = (lat: number, lng: number, label?: string) => {
      const distKm = haversineKm(STORE_COORDS, { lat, lng });
      const zone = SHIPPING_ZONES.find((z) => distKm <= z.maxKm) ?? null;
      if (markerRef.current) markerRef.current.remove();
      markerRef.current = L.circleMarker([lat, lng], {
        radius: 9,
        color: '#8a6b3f',
        weight: 2,
        fillColor: '#e0c394',
        fillOpacity: 1,
      })
        .addTo(map)
        .bindTooltip(label ?? 'Tu zona', { direction: 'top' })
        .openTooltip();
      map.panTo([lat, lng]);
      setResult({ distKm, zone });
      setAddress(label ?? '');
    };

    pickRef.current = handlePick;

    map.on('click', (e: L.LeafletMouseEvent) => {
      handlePick(e.latlng.lat, e.latlng.lng);
    });

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  const onSearch = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const q = query.trim();
    if (!q) return;
    setNotFound(false);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ar&q=${encodeURIComponent(q)}`,
        { headers: { 'Accept-Language': 'es' } },
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const p = data[0];
        pickRef.current(parseFloat(p.lat), parseFloat(p.lon), p.display_name);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  };

  return (
    <>
      <form className="shipping-search-form" onSubmit={onSearch}>
        <input
          className="shipping-search"
          type="text"
          placeholder="Buscá tu dirección o hacé clic en el mapa…"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="shipping-search-btn" type="submit" aria-label="Buscar dirección">
          🔍
        </button>
      </form>
      {notFound && (
        <p className="shipping-not-found">
          No encontramos esa dirección. Probá escribir la ciudad o hacé clic
          en el mapa.
        </p>
      )}
      <div className="shipping-map" ref={mapDivRef} />

      {result && (
        <div className="shipping-result">
          {result.zone ? (
            <>
              <p>
                <strong>{address || 'Tu zona'}:</strong>{' '}
                {result.zone.label} · ~{Math.round(result.distKm)} km
              </p>
              <p className="shipping-result-cost">
                Envío estimado:{' '}
                <strong>{costLabel(result.zone.cost)}</strong>
              </p>
            </>
          ) : (
            <p>
              Estás a ~{Math.round(result.distKm)} km de la tienda, fuera de
              nuestras zonas de entrega. Podés retirar gratis en tienda o
              consultarnos.
            </p>
          )}
          <div className="shipping-actions">
            {!result.zone && (
              <a
                className="btn btn-primary"
                href={waLink(
                  `Hola Gipi's! Quiero coordinar el envío de un nido. Mi dirección es ${address || 'mi zona'}, a unos ${Math.round(result.distKm)} km de la tienda. Quedo fuera de sus zonas de entrega. ¿Cómo podemos coordinar?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar por WhatsApp
              </a>
            )}
            <a
              className="btn btn-outline"
              href={waLink(
                `Hola Gipi's! Quiero organizar un punto de encuentro para el pedido. Mi dirección de referencia es ${address || 'mi zona'}, a unos ${Math.round(result.distKm)} km de la tienda. ¿Dónde coordinamos?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Punto de encuentro
            </a>
          </div>
        </div>
      )}
    </>
  );
}