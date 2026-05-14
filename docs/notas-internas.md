# Notas internas · Niza Splash

> Para uso interno LOOM.IA. No compartir con cliente.

## Pendientes externos

- [x] **Imagen principal** del hero — recibida e incorporada (12/05/2026). Estudio usa video MP4, tienda imagen webp.
- [ ] **Sanity project ID** — crear proyecto en https://www.sanity.io/manage cuando confirmemos cuenta.
- [ ] **Acceso al panel del dominio** `nizainteriores.com.ar` — pedir en kickoff.
- [ ] **Revisión del cliente sobre `docs/copy-opciones.md`** — confirma la línea de copy.

## Decisiones técnicas tomadas

- Astro 6 + Tailwind v4 (vía `@tailwindcss/vite`).
- Sanity como CMS (autogestión 100%).
- Sitio estático (`output: static` por defecto en Astro). Rebuild en Vercel disparado por webhook de Sanity.
- Fuentes: Inter (sans) y Fraunces (display). Servidas vía Google Fonts con `preconnect` para perf.
- Idioma de la splash: solo español (es-AR).
- `hreflang`: no necesario por ahora (un solo idioma).

## Decisiones técnicas pendientes

- **Dónde hostear Sanity Studio:**
  - Opción 1: hosted en `niza.sanity.studio` (gratis, no toca el repo). **Probable elegida** por simplicidad.
  - Opción 2: embebido en el mismo deploy en `/admin` (requiere `sanity-astro` o un sub-package). Más control, más complejidad.
- **Webhook de rebuild:** Vercel deploy hook + Sanity GROQ-powered webhook. Configurar después de tener proyecto Sanity creado.

## Riesgos

- **Imagen tarde:** si la imagen no llega el lunes, podemos seguir con build, deploy y todo. Sólo queda el placeholder visual del hero. La diseñadora puede subirla directo a Sanity al final.
- **Cliente cambia de idea sobre dominios:** la asesoría está en `docs/asesoria-dominios.md`. Si arman otra opción inesperada (ej. dominio nuevo), recalcular trabajo de DNS.
- **SEO pierde tráfico:** mover el dominio principal de la tienda a la splash puede caer rankings de la tienda por unas semanas. Mitigación: 301s bien hechos.

## Cronograma propuesto (14 días)

```
Día 1-2 · Kickoff, copy elegido, dominios confirmados, Sanity creado
Día 3-7 · Diseño visual final con imagen real, ajustes hero, Sanity Studio listo
Día 8-10 · Conexión real a Sanity, contenido cargado por cliente, QA
Día 11-12 · DNS propagation, redirects en Tienda Nube/Squarespace
Día 13 · Deploy producción, capacitación
Día 14 · Buffer / ajustes
```
