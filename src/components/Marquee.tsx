import { useEffect, useRef } from 'react';
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
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches;
  const swipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile) return;
    const el = swipeRef.current;
    if (!el) return;

    let raf = 0;
    let paused = false;
    let resumeTimer: number | undefined;

    const step = () => {
      raf = requestAnimationFrame(step);
      if (paused) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      el.scrollLeft += 0.8;
      if (el.scrollLeft >= max) el.scrollLeft = 0;
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };
    const resume = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, 1500);
    };

    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('wheel', pause, { passive: true });
    el.addEventListener('touchend', resume, { passive: true });
    el.addEventListener('scroll', resume, { passive: true });

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('wheel', pause);
      el.removeEventListener('touchend', resume);
      el.removeEventListener('scroll', resume);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div
        className="marquee marquee-swipe"
        ref={swipeRef}
        aria-label="Características"
      >
        <Track />
      </div>
    );
  }

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