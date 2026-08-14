import { useEffect, useRef } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let paused = false;
    let isDown = false;
    let resumeTimer: number | undefined;
    let last = performance.now();
    let startX = 0;
    let startScroll = 0;
    const SPEED = 28;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (paused || isDown) {
        last = now;
        return;
      }
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const dt = now - last;
      last = now;
      el.scrollLeft += (SPEED * dt) / 1000;
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
      }, 1200);
    };

    const onDown = (e: PointerEvent) => {
      isDown = true;
      pause();
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = () => {
      if (!isDown) return;
      isDown = false;
      resume();
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('wheel', pause, { passive: true });
    el.addEventListener('scroll', resume, { passive: true });

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('wheel', pause);
      el.removeEventListener('scroll', resume);
    };
  }, []);

  return (
    <div className="marquee">
      <div className="marquee-swipe" ref={ref} aria-label="Características">
        <Track />
      </div>
    </div>
  );
}