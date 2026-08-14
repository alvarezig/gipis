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
  const swipeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = swipeRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let resumeTimer: number | undefined;

    const pause = () => {
      track.style.animationPlayState = 'paused';
      window.clearTimeout(resumeTimer);
    };
    const resume = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        track.style.animationPlayState = 'running';
      }, 1500);
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

    return () => {
      window.clearTimeout(resumeTimer);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div className="marquee">
      <div className="marquee-swipe" ref={swipeRef} aria-label="Características">
        <div className="marquee-track" ref={trackRef}>
          <Track />
        </div>
      </div>
    </div>
  );
}