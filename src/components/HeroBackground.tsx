import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BLOBS = [
  {
    className: 'hero-blob b1',
    wrap: { left: '-10%', top: '2%' },
    size: 460,
    duration: 17,
    drift: { y: [0, -34, 0], x: [0, 18, 0], scale: [1, 1.1, 1] },
    parallax: 0.5,
  },
  {
    className: 'hero-blob b2',
    wrap: { right: '-8%', top: '24%' },
    size: 400,
    duration: 21,
    drift: { y: [0, 26, 0], x: [0, -22, 0], scale: [1.08, 1, 1.08] },
    parallax: 0.3,
  },
  {
    className: 'hero-blob b3',
    wrap: { left: '12%', bottom: '-10%' },
    size: 340,
    duration: 19,
    drift: { y: [0, 22, 0], x: [0, 20, 0], scale: [1, 1.07, 1] },
    parallax: 0.6,
  },
  {
    className: 'hero-blob b4',
    wrap: { right: '10%', bottom: '4%' },
    size: 280,
    duration: 23,
    drift: { y: [0, -20, 0], x: [0, 14, 0], scale: [1.05, 1, 1.05] },
    parallax: 0.4,
  },
];

const SPARKLES = [
  { wrap: { left: '14%', top: '16%' }, size: 13, duration: 7, delay: 0 },
  { wrap: { left: '32%', top: '70%' }, size: 8, duration: 9, delay: 1.5 },
  { wrap: { right: '20%', top: '10%' }, size: 11, duration: 8, delay: 3 },
  { wrap: { right: '28%', top: '58%' }, size: 7, duration: 10, delay: 2 },
  { wrap: { left: '6%', bottom: '24%' }, size: 9, duration: 8.5, delay: 4 },
  { wrap: { right: '6%', bottom: '16%' }, size: 12, duration: 7.5, delay: 5 },
];

export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -BLOBS[0].parallax * 320]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -BLOBS[1].parallax * 320]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -BLOBS[2].parallax * 320]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -BLOBS[3].parallax * 320]);
  const parallaxY = isMobile ? [0, 0, 0, 0] : [y1, y2, y3, y4];

  const ringY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const ringY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="hero-bg" ref={ref}>
      <motion.div className="hero-ring-bg r1" style={{ y: isMobile ? 0 : ringY }}>
        <motion.div
          className="hero-ring-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
      <motion.div className="hero-ring-bg r2" style={{ y: isMobile ? 0 : ringY2 }}>
        <motion.div
          className="hero-ring-spin"
          animate={{ rotate: -360 }}
          transition={{ duration: 85, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {BLOBS.map((blob, i) => (
        <motion.div
          key={blob.className}
          className="hero-blob-wrap"
          style={{ ...blob.wrap, y: parallaxY[i] }}
        >
          <motion.div
            className={blob.className}
            style={{ width: blob.size, height: blob.size }}
            animate={isMobile ? { opacity: [0.75, 1, 0.75] } : blob.drift}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      ))}

      {SPARKLES.map((s, i) => (
        <motion.div
          key={i}
          className={`hero-sparkle${i % 2 === 0 ? ' sparkle-accent' : ''}`}
          style={s.wrap}
          animate={{
            y: [0, -26, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: s.delay,
          }}
        >
          <span style={{ width: s.size, height: s.size }} />
        </motion.div>
      ))}
    </div>
  );
}