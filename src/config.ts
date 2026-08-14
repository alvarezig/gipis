export const WHATSAPP_NUMBER = '5491168979533';

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola Gipi\'s! 👋 Me gustaría información sobre sus nidos para bebés.';

export const waLink = (message: string = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_TEL_LINK = `+${WHATSAPP_NUMBER}`;

export function formatWhatsAppDisplay(number: string = WHATSAPP_NUMBER): string {
  if (number.length === 12 && number.startsWith('549')) {
    return `+54 9 11 ${number.slice(5, 9)} ${number.slice(9)}`;
  }
  return `+${number}`;
}

export const SITE_URL = '';

export const costLabel = (cost: number) =>
  cost === 0 ? 'Gratis' : `$ ${cost.toLocaleString('es-AR')}`;

export type ShippingZone = {
  id: string;
  maxKm: number;
  cost: number;
  label: string;
};

export const SHIPPING_ZONES: ShippingZone[] = [
  { id: 'retiro', maxKm: 5, cost: 0, label: 'Retiro en tienda' },
  { id: 'cercana', maxKm: 12, cost: 4000, label: 'Zona cercana' },
  { id: 'media', maxKm: 25, cost: 6500, label: 'Zona media' },
  { id: 'lejana', maxKm: 40, cost: 9000, label: 'Zona lejana' },
];

export const MAX_SHIPPING_KM = 40;

export const STORE_COORDS = { lat: -34.73849, lng: -58.42443 };