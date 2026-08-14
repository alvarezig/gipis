import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <HeroBackground />
      <div className="container hero-inner">
        <div className="hero-text">
          <motion.span
            className="hero-badge"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="dot"></span> Hecho con amor
          </motion.span>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible">
            El descanso <em>perfecto</em> para tu bebé
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible">
            Nidos suaves, seguros y cuidadosamente hechos a mano, para que tu
            pequeñito duerma envuelto en tranquilidad.
          </motion.p>

          <motion.div
            className="hero-ctas"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <a href="#productos" className="btn btn-primary">
              Ver productos
            </a>
            <a href="#contacto" className="btn btn-outline">
              Contactar
            </a>
          </motion.div>
        </div>

        <div className="hero-visual">
          <motion.div
            className="hero-deco-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            className="photo-stack"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="photo-back" />
            <div className="photo-front">
              <img
                src="/images/logo.png"
                alt="Logo de Gipi's"
                width="512"
                height="512"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <motion.div
              className="photo-badge pb1"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="icon">⭐</span>
              <div>
                <strong>5/5</strong>
                <small>En familias felices</small>
              </div>
            </motion.div>

            <motion.div
              className="photo-badge pb2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              <span className="icon">🧵</span>
              <span>Hecho a mano</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}