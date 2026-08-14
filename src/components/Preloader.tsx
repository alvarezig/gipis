import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Coords = { x: number; y: number; scale: number };

export default function Preloader() {
  const [phase, setPhase] = useState<'loading' | 'fly' | 'done'>(() => {
    try {
      return localStorage.getItem('gipis_visited') ? 'done' : 'loading';
    } catch {
      return 'loading';
    }
  });
  const [coords, setCoords] = useState<Coords | null>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const logo = new Image();
    const logoLoaded = new Promise<void>((resolve) => {
      logo.onload = () => resolve();
      logo.onerror = () => resolve();
      logo.src = '/images/logo.png';
    });
    const minShown = new Promise<void>((resolve) => setTimeout(resolve, 900));
    const cap = new Promise<void>((resolve) => setTimeout(resolve, 2400));

    const startFly = () => {
      if (cancelled || firedRef.current) return;
      firedRef.current = true;
      const wrap = logoWrapRef.current;
      const hero = document.querySelector<HTMLElement>('.photo-front');
      if (!wrap || !hero) {
        setPhase('done');
        return;
      }
      const wr = wrap.getBoundingClientRect();
      const hr = hero.getBoundingClientRect();
      const scale = hr.width / wr.width;
      const x = hr.left + hr.width / 2 - (wr.left + wr.width / 2);
      const y = hr.top + hr.height / 2 - (wr.top + wr.height / 2);
      setCoords({ x, y, scale });
      setPhase('fly');
    };

    Promise.all([
      logoLoaded,
      document.fonts ? document.fonts.ready : Promise.resolve(),
      minShown,
    ]).then(startFly);
    cap.then(startFly);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === 'done' ? '' : 'hidden';
  }, [phase]);

  useEffect(() => {
    if (phase === 'done') {
      try {
        localStorage.setItem('gipis_visited', '1');
      } catch {
        /* noop */
      }
    }
  }, [phase]);

  const fly = phase === 'fly';

  return (
    <>
      {phase !== 'done' && (
        <motion.div
          className="preloader-bg"
          animate={
            fly
              ? { opacity: [1, 0.55, 0.55, 0] }
              : { opacity: 1 }
          }
          transition={
            fly
              ? { duration: 0.85, times: [0, 0.15, 0.75, 1], ease: 'easeInOut' }
              : { duration: 0.3 }
          }
        />
      )}

      {phase !== 'done' && (
        <div className="preloader-logo-anchor">
          <motion.div
            ref={logoWrapRef}
            className="preloader-logo-wrap"
            animate={
              coords
                ? { x: coords.x, y: coords.y, scale: coords.scale, rotate: 2 }
                : { x: 0, y: 0, scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              if (fly) setPhase('done');
            }}
          >
            <motion.div
              className="preloader-logo-content"
              animate={{ opacity: fly ? 0 : 1 }}
              transition={{ duration: 0.25, delay: fly ? 0.6 : 0, ease: 'easeInOut' }}
            >
              <img
                className="preloader-logo"
                src="/images/logo.png"
                alt=""
                width="128"
                height="128"
              />
            </motion.div>
          </motion.div>
        </div>
      )}

      {phase !== 'done' && (
        <div className="preloader-text">
          <motion.div
            className="preloader-text-inner"
            animate={fly ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <motion.p
              className="preloader-brand"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
            >
              Gipi<span>'s</span>
            </motion.p>
            <div className="preloader-bar">
              <motion.div
                className="preloader-bar-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.05, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}