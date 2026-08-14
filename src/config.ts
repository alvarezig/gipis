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

export const SITE_URL = 'https://gipis.vercel.app';

export const STORE_COORDS = { lat: -34.73849, lng: -58.42443 };