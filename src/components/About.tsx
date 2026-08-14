import { motion } from 'framer-motion';
import Reveal from './Reveal';

const FEATURES = [
  'Telas suaves y certificadas para bebés',
  'Confección artesanal pieza por pieza',
  'Diseños delicados que acompañan su crecimiento',
];

function FloatingBadge({
  className,
  text,
  delay,
}: {
  className: string;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`badge-float ${className}`}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {text}
    </motion.div>
  );
}

export default function About() {
  return (
    <section className="section" id="nosotros">
      <div className="container featured">
        <Reveal direction="left">
          <div className="featured-visual">
            <img
              src="/images/nosotros.jpg"
              alt="Nidos hechos a mano por Gipi's"
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <FloatingBadge className="bf1" text="🧵 Hecho a mano" delay={0} />
            <FloatingBadge className="bf2" text="💛 Hecho con amor" delay={2.5} />
          </div>
        </Reveal>

        <div className="featured-text">
          <Reveal>
            <p className="section-label">Sobre Gipi's</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>Un nido que abraza, un emprendimiento con alma</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              En Gipi's creemos que el descanso de un bebé es un momento sagrado.
              Por eso cada nido nace de nuestras manos, con dedicación, materiales
              nobles y un diseño que cuida cada detalle.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="feature-list">
              {FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.4}>
            <a href="#contacto" className="btn btn-outline">
              Conoce más
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}