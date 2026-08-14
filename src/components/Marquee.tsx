import { motion } from 'framer-motion';

const ITEMS = [
  'Nidos a medida',
  'Hechos a mano',
  'Tela suave',
  'Algodón natural',
  'Entrega a domicilio',
];

const Track = () => (
  <>
    {[...ITEMS, ...ITEMS].map((item, i) => (
      <span key={i}>✦ {item}</span>
    ))}
  </>
);

export default function Marquee() {
  return (
    <div className="marquee">
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <Track />
      </motion.div>
    </div>
  );
}