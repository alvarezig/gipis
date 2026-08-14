import { useEffect } from 'react';
import { WHATSAPP_NUMBER, SITE_URL } from '../config';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: "Gipi's",
  description:
    'Nidos para bebés y set de cunas hechos a mano, con materiales nobles y diseño delicado.',
  image: `${SITE_URL}/images/logo.png`,
  priceRange: '$$',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
};

export default function Seo() {
  useEffect(() => {
    if (!SITE_URL) return;
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', `${SITE_URL}/images/logo.png`);
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', SITE_URL);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', SITE_URL);
  }, []);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}