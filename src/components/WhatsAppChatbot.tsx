import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { waLink, WHATSAPP_DEFAULT_MESSAGE } from '../config';

const QUICK_REPLIES = [
  'Quiero ver los nidos',
  '¿Cuánto cuesta un nido?',
  '¿Hacen envíos?',
  'Quiero un nido personalizado',
];

const GREETING =
  '¡Hola! 💛 Soy el asistente de Gipi\u2019s. Escríbeme tu consulta y te responderé por WhatsApp directamente.';

export default function WhatsAppChatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setSent(true);
    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(message);
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => setSent(false), 300);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            className="chat-label"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, delay: 1.4, ease: 'easeOut' }}
            onClick={() => setOpen(true)}
            role="button"
          >
            <span>Escribinos por WhatsApp!</span>
            <span className="chat-label-arrow" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chat-fab"
        aria-label="Abrir chat de WhatsApp"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.2 }}
      >
        {open ? '✕' : '💬'}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="chat-header">
              <div className="chat-header-logo">
                <span className="chat-avatar">G</span>
                <div>
                  <strong>Gipi's</strong>
                  <small>
                    <span className="chat-online" /> En línea
                  </small>
                </div>
              </div>
              <button className="chat-close" onClick={close} aria-label="Cerrar chat">
                ✕
              </button>
            </div>

            <div className="chat-body">
              {!sent ? (
                <>
                  <div className="chat-bubble bot">
                    {GREETING}
                    <div className="chat-quick">
                      {QUICK_REPLIES.map((reply) => (
                        <button key={reply} onClick={() => send(reply)}>
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="chat-bubble bot">
                  ¡Gracias! Abrí WhatsApp para enviar tu mensaje a Gipi&apos;s 💛 Si
                  no se abrió, usá el botón verde.
                </div>
              )}

              <AnimatePresence>
                {sent && (
                  <motion.a
                    className="chat-send-btn"
                    href={waLink(message || WHATSAPP_DEFAULT_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Abrir WhatsApp
                  </motion.a>
                )}
              </AnimatePresence>
            </div>

            <form className="chat-input" onSubmit={onSubmit}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                aria-label="Tu mensaje"
              />
              <button type="submit" aria-label="Enviar a WhatsApp">
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}