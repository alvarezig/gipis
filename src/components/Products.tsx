import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import type { Product } from '../data/products';
import { waLink } from '../config';
import Reveal from './Reveal';

const SLIDES: (Product | { id: string })[] = [
  ...PRODUCTS,
  { id: 'mas' },
];

export default function Products() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 4500, stopOnInteraction: false })],
  );
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState<Product | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section products" id="productos">
      <div className="container">
        <div className="center">
          <Reveal>
            <p className="section-label">Nuestra colección</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>Nidos pensados para el descanso</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead">
              Confeccionamos nidos y set de cunas con telas de primera calidad y un
              diseño que abraza a tu bebé con calidez y seguridad. Desliza para
              conocerlos.
            </p>
          </Reveal>
        </div>

        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {SLIDES.map((slide) =>
                slide.id === 'mas' ? (
                  <div className="embla__slide" key="mas">
                    <div className="carousel-more">
                      <div className="carousel-more-media">
                        <span className="carousel-more-icon">🧸</span>
                      </div>
                      <div className="carousel-more-text">
                        <h3>Y muchos más…</h3>
                        <p>
                          Nidos y set de cunas a medida. Contanos qué soñás y lo
                          hacemos realidad.
                        </p>
                        <a
                          className="btn btn-primary carousel-more-btn"
                          href={waLink(
                            "Hola Gipi's! Quiero conocer más modelos de nidos y set de cunas.",
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Escríbenos
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="embla__slide" key={slide.id}>
                    <figure
                      className="carousel-slide"
                      onClick={() => setActive(slide as Product)}
                    >
                      <img
                        src={(slide as Product).image}
                        alt={(slide as Product).title}
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption>
                        <h3>{(slide as Product).title}</h3>
                        <p>{(slide as Product).desc}</p>
                      </figcaption>
                    </figure>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="carousel-nav">
            <button className="carousel-btn" onClick={scrollPrev} aria-label="Anterior">
              ‹
            </button>
            <div className="carousel-dots">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  className={`carousel-dot${i === selected ? ' active' : ''}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Ir a ${slide.id}`}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={scrollNext} aria-label="Siguiente">
              ›
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox"
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="lightbox-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={active.image}
                alt={active.title}
                decoding="async"
              />
              <div className="lightbox-text">
                <h3>{active.title}</h3>
                <p>{active.desc}</p>
              </div>
              <button
                className="lightbox-close"
                onClick={() => setActive(null)}
                aria-label="Cerrar imagen"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}