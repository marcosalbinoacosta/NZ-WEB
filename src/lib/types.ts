export interface PortalContent {
  label: string;
  title: string;
  description?: string;
  cta?: string;
  url: string;
}

export interface FooterContent {
  address: string;
  whatsapp: string;
  instagram: string;
  email: string;
}

export interface HeroImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number };
    };
  };
  alt: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SeoContent {
  title: string;
  description: string;
  ogImage?: { asset: { url: string } };
}

export interface SplashSettings {
  brand: string;
  tagline?: string;
  intro?: string;
  estudio: PortalContent;
  tienda: PortalContent;
  footer: FooterContent;
  hero?: HeroImage | null;
  seo: SeoContent;
}
