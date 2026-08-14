import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Reveal from './Reveal';
import { SHIPPING_ZONES, MAX_SHIPPING_KM, costLabel } from '../config';

const ShippingMap = lazy(() => import('./ShippingMap'));

function LazyOnView({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          obs.disconnect();
        }
      },
      { rootMargin: '500px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shown]);

  return <div className="shipping-lazy" ref={ref}>{shown ? children : null}</div>;
}

function MapSkeleton() {
  return (
    <div className="shipping-map-skeleton" role="status">
      <span>Cargando mapa…</span>
    </div>
  );
}

export default function Shipping() {
  return (
    <section className="section shipping" id="envios">
      <div className="container">
        <div className="center">
          <Reveal>
            <p className="section-label">Envíos y entregas</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>¿A dónde te lo llevamos?</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead">
              Elegí tu zona en el mapa y calculamos el costo de envío al instante.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="shipping-map-wrap">
            <LazyOnView>
              <Suspense fallback={<MapSkeleton />}>
                <ShippingMap />
              </Suspense>
            </LazyOnView>
          </div>

          <div className="shipping-legend">
            {SHIPPING_ZONES.map((z) => (
              <div className="shipping-legend-item" key={z.id}>
                <span className={`zone-dot z-${z.id}`} />
                <span className="shipping-legend-label">{z.label}</span>
                <span className="shipping-legend-cost">{costLabel(z.cost)}</span>
              </div>
            ))}
            <p className="shipping-note">
              Costos orientativos · hasta {MAX_SHIPPING_KM} km desde nuestra
              tienda. Hacé clic en el mapa para calcular tu envío. También podés
              retirar gratis en tienda.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}