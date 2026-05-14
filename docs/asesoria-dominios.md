# Asesoría de dominios · Niza

> Pieza incluida en la propuesta. Te dejo la recomendación y las dos alternativas, con pros y contras de cada una. Decidimos juntos en la llamada de kickoff.

## Estado actual

| Sitio | URL hoy | Plataforma | Dominio propio |
| --- | --- | --- | --- |
| Tienda | `nizainteriores.com.ar` | Tienda Nube | ✅ |
| Estudio | `seabass-algae-z8ax.squarespace.com` | Squarespace | ❌ (URL default) |
| Splash | — | (a desarrollar) | — |

**Problema 1:** el dominio principal `nizainteriores.com.ar` está apuntando a la Tienda. Al lanzar la splash hay que decidir qué pasa con ese dominio: ¿se queda en la tienda o pasa a la splash?

**Problema 2:** el Estudio vive en una URL default de Squarespace (`seabass-algae-z8ax`). Eso es malo para SEO, malo para que el cliente la recuerde, y malo para "marca". Hay que asignarle un dominio propio.

---

## Recomendación: subdominios bajo el dominio principal

```
nizainteriores.com.ar              → Splash (puerta de entrada)
estudio.nizainteriores.com.ar      → Squarespace (Estudio)
tienda.nizainteriores.com.ar       → Tienda Nube (Tienda)
```

**Por qué es la mejor opción:**

- **SEO:** todo el "peso" SEO se construye bajo un solo dominio (`nizainteriores.com.ar`). Hoy la tienda ya tiene autoridad construida ahí — la mantenemos.
- **Marca:** quien escribe `nizainteriores.com.ar` llega a la splash y elige. Quien escribe la URL completa de un subdominio entra directo. Las dos vías funcionan.
- **Mental model:** "uno es el portal, los otros dos son las dos casas". Es el mismo modelo que usan Google con `mail.google.com` / `drive.google.com`.

**Lo que hay que hacer (alta nivel):**

1. En el panel del dominio (donde está hoy `nizainteriores.com.ar`), crear dos registros DNS tipo `CNAME`:
   - `tienda` → apunta al servidor de Tienda Nube (lo dan ellos en su panel: típicamente `stores.tiendanube.com` o un CNAME con instrucciones).
   - `estudio` → apunta al servidor de Squarespace (Squarespace lo provee: típicamente `ext-cust.squarespace.com`).
2. En **Tienda Nube** → cambiar el dominio principal a `tienda.nizainteriores.com.ar`. Activar redirect del antiguo dominio raíz (la tienda no se rompe, los links viejos siguen andando porque hacen 301).
3. En **Squarespace** → ir a *Settings → Domains → Use a domain I own* → conectar `estudio.nizainteriores.com.ar`. Squarespace gestiona el SSL solo.
4. **Vercel** (splash) → conectar `nizainteriores.com.ar` apex y `www.nizainteriores.com.ar`. Vercel gestiona SSL automáticamente.
5. Cargar **301 redirects** en Tienda Nube desde URLs viejas a las nuevas (Tienda Nube tiene panel de redirecciones nativo).

> Tiempo estimado de propagación DNS: 1-24 hs. Lo planificamos para el viernes anterior al go-live.

---

## Alternativa A: paths bajo el mismo dominio

```
nizainteriores.com.ar              → Splash
nizainteriores.com.ar/tienda       → Tienda Nube (vía rewrite/redirect)
nizainteriores.com.ar/estudio      → Squarespace (vía rewrite/redirect)
```

**Pros:** Visualmente más limpio en URLs ("una sola dirección").

**Contras:**
- Tienda Nube y Squarespace **no soportan correr en un path**, sólo en su dominio. La única forma es usar redirects (`/tienda` → `tienda.nizainteriores.com.ar`), con lo cual el path "lindo" desaparece apenas hace clic. Es estética sin sustancia.
- Fragmenta SEO porque cada redirect rompe la cadena.

**No la recomiendo.** Solo válida si el cliente está obsesionado con que la URL "se vea más corta".

## Alternativa B: dominios diferentes por unidad

```
nizainteriores.com.ar              → Splash
nizadiseno.com.ar                  → Squarespace
tiendaniza.com.ar                  → Tienda Nube
```

**Pros:** cada unidad tiene su propia identidad de dominio, fuerte para sub-marcas independientes.

**Contras:**
- **Costo:** 3 dominios en lugar de 1 (~USD 36/año vs USD 12/año).
- **SEO:** cada dominio empieza de cero. Perdemos la autoridad acumulada de `nizainteriores.com.ar`.
- **Confusión:** "¿cuál era el del estudio?" — en la práctica, los clientes escriben siempre el principal igual.

**Solo tiene sentido** si el plan estratégico es separar las marcas en el largo plazo (ej. franchising la tienda, vender el estudio aparte). No parece el caso.

---

## Acción concreta para vos

Antes del kickoff, confirmar:

1. **¿Tenés acceso al panel del dominio `nizainteriores.com.ar`?** (NIC.ar, Nominalia, Hostinger, Donweb, etc. — necesito saber cuál y tener acceso para los DNS).
2. **¿El dominio se renueva pronto?** Para no jugar con vencimientos durante el lanzamiento.
3. **¿Estás de acuerdo con el plan de subdominios** (recomendado) o querés discutir alguna alternativa?

Con esos tres datos, en la llamada de kickoff (15-30 min según propuesta) cerramos los nombres y pasamos a desarrollo.
