import type { SplashSettings } from './types';

export interface BuildJsonLdInput {
  data: SplashSettings;
  siteUrl: string;
  ogImageUrl: string | null;
}

export function buildLocalBusinessJsonLd({ data, siteUrl, ogImageUrl }: BuildJsonLdInput) {
  const phone = data.footer.whatsapp.replace(/\s+/g, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}#niza`,
    name: 'Niza Interiores',
    url: siteUrl,
    image: ogImageUrl ?? undefined,
    description: data.seo.description,
    telephone: phone,
    email: data.footer.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Castro Barros 298',
      addressLocality: 'Córdoba',
      addressRegion: 'Córdoba',
      postalCode: '5008',
      addressCountry: 'AR',
    },
    sameAs: [
      data.estudio.url,
      data.tienda.url,
      `https://instagram.com/${data.footer.instagram.replace(/^@/, '')}`,
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '15:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:30',
        closes: '13:30',
      },
    ],
  };
}
