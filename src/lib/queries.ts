import { sanity, isSanityConfigured } from './sanity';
import type { SplashSettings } from './types';
import { fallbackSplash } from './fallback';

const splashQuery = /* groq */ `
  *[_type == "splash"][0]{
    "brand": brand,
    "tagline": tagline,
    "intro": intro,
    "estudio": {
      "label": estudio.label,
      "title": estudio.title,
      "description": estudio.description,
      "cta": estudio.cta,
      "url": estudio.url
    },
    "tienda": {
      "label": tienda.label,
      "title": tienda.title,
      "description": tienda.description,
      "cta": tienda.cta,
      "url": tienda.url
    },
    "footer": {
      "address": footer.address,
      "whatsapp": footer.whatsapp,
      "instagram": footer.instagram,
      "email": footer.email
    },
    "hero": hero{
      asset->{ _id, url, metadata{ lqip, dimensions } },
      alt,
      hotspot,
      crop
    },
    "seo": {
      "title": seo.title,
      "description": seo.description,
      "ogImage": seo.ogImage{ asset->{ url } }
    }
  }
`;

export async function getSplash(): Promise<SplashSettings> {
  if (!isSanityConfigured) return fallbackSplash;
  const data = await sanity.fetch<SplashSettings | null>(splashQuery);
  return data ?? fallbackSplash;
}
