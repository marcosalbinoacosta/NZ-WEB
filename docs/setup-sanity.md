# Setup de Sanity (interno · LOOM.IA)

> Pasos para provisionar el CMS. Hacer cuando confirme el cliente.

## 1. Crear proyecto

```bash
npx sanity@latest init --env

# En el wizard:
# - Project name: Niza Splash
# - Dataset: production (default)
# - Output path: . (mismo repo, usa sanity.config.ts existente)
# - Use TypeScript: yes
```

Esto crea un archivo `.env` con `SANITY_STUDIO_PROJECT_ID` y `SANITY_STUDIO_DATASET`. Copiar también esos valores a las vars del frontend (`PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`).

## 2. Levantar Studio en local

```bash
npx sanity dev    # http://localhost:3333
```

Cargar el documento singleton "Splash · Portal de marca" con el copy elegido.

## 3. Deploy del Studio

Dos opciones:

### Opción A · Hosted en sanity.io (recomendado, gratis)

```bash
npx sanity deploy
# Pide subdomain, sugerir: niza
# Resultado: https://niza.sanity.studio
```

El cliente entra a esa URL con el email que sumemos en *Manage*.

### Opción B · Embebido en mismo deploy (Vercel)

Requiere agregar `sanity-astro` (https://github.com/sanity-io/sanity-astro). Más complejo, mismo deploy. Decidir según preferencia del cliente.

## 4. Webhook de rebuild

Para que cambios en Sanity disparen rebuild en Vercel:

1. Vercel → Project → Settings → Git → Deploy Hooks → crear hook "sanity-content".
2. Sanity Manage → API → Webhooks → crear:
   - Name: `vercel-rebuild`
   - URL: el deploy hook de Vercel
   - Trigger: `Create / Update / Delete` en filter `_type == "splash"`
   - Method: `POST`
   - HTTP body: empty

Después de cargar contenido en Studio, Vercel rebuilds y la splash se actualiza en ~30s.

## 5. Permisos del cliente

En Sanity Manage → Members → Invite:
- Email del cliente (a confirmar)
- Role: `Editor` (puede editar contenido pero no schema)
