import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Reveal from './Reveal';

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
              Buscá tu dirección o hacé clic en el mapa y consultanos por
              WhatsApp cuánto cuesta tu envío
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

          <p className="shipping-note">
            Coordinamos la entrega por WhatsApp. También podés retirar gratis
            en tienda o pactar un punto de encuentro.
          </p>
        </Reveal>
      </div>
    </section>
  );
}