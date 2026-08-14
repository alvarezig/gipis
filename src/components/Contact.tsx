import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { waLink } from '../config';

export default function Contact() {
  return (
    <section className="section cta" id="contacto">
      <div className="container">
        <Reveal>
          <p className="section-label cta-label">Contacto</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2>¿Listos para el descanso perfecto?</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p>
            Escríbenos y hagamos realidad el nido ideal para tu bebé. Respondemos
            por WhatsApp en minutos.
          </p>
        </Reveal>
        <motion.div
          className="cta-actions"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light"
          >
            💬 Escribir por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}