import {
  waLink,
  WHATSAPP_TEL_LINK,
  formatWhatsAppDisplay,
} from '../config';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './icons';

const INSTAGRAM_URL = 'https://www.instagram.com/gipis.deco';
const FACEBOOK_URL = 'https://www.facebook.com/gipis.deco';

const EXPLORE = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#productos', label: 'Nidos' },
  { href: '#envios', label: 'Envíos' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#inicio" className="logo">
              Gipi<span>'s</span>
            </a>
            <p>
              Nidos para bebés hechos a mano, con amor y los mejores materiales. El
              descanso perfecto para tu pequeñito.
            </p>
            <div className="socials">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Gipi's"
              >
                <InstagramIcon />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Gipi's"
              >
                <FacebookIcon />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Explora</h4>
            {EXPLORE.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <a href={`tel:${WHATSAPP_TEL_LINK}`}>{formatWhatsAppDisplay()}</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="copyright">© 2026 Gipi's · Hecho con 💛 para tu bebé</div>
      </div>
    </footer>
  );
}