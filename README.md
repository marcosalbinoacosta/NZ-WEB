# Niza · Splash Page

Portal de marca que separa **Estudio de Diseño** y **Tienda de Muebles**. Astro + Tailwind + Sanity, deploy en Vercel.

## Scripts

```sh
npm install         # primera vez
npm run dev         # localhost:4321
npm run build       # build de producción
npm run preview     # servidor del build local
npm run check       # type-check con astro check
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar. Mientras `PUBLIC_SANITY_PROJECT_ID` esté vacío, la home muestra el contenido de `src/lib/fallback.ts`.

## Estructura

```
src/
  components/   # PortalCard, HeroVisual, SiteFooter
  layouts/      # BaseLayout (head/seo)
  lib/          # sanity client, queries, types, fallback, seo
  pages/        # index.astro
  styles/       # global.css (Tailwind v4)
public/         # estáticos (favicon, robots.txt)
docs/           # propuesta y notas internas
```

## Notas

- Splash estática: rebuild on Sanity webhook.
- JSON-LD `LocalBusiness` con dirección de Castro Barros 298, Córdoba.
- Imagen principal hero: pendiente envío del cliente (lunes 11/05).
