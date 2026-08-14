import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right' | 'none';
  delay?: number;
  className?: string;
};

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
}: RevealProps) {
  const offset = 50;
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? offset : 0,
      x: direction === 'left' ? -offset : direction === 'right' ? offset : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
