# Contexto del Proyecto — Sitio Profesional (Lic. Camila Tataryn)

## Qué es
Sitio web de presentación profesional de **Lic. Camila Tataryn, Fonoaudióloga y Audióloga** (M.P. 1830/2).
Es un HTML estático con Tailwind (CDN), sin framework ni build. Página principal: `index.html`.

## Repo (GitHub) — renombrado a `LicCamiTataryn`
- Este directorio ES el repo `github.com/Matiax92/LicCamiTataryn` (remote `origin`, SSH: `git@github.com:Matiax92/LicCamiTataryn.git`).
- ANTIGUO: repo `fotos` antes de ser renombrado (2026-10-30). GitHub redirige push/raw URLs del nombre viejo por un tiempo, pero usar siempre el nuevo.
- El sitio (`index.html`), `tools/` y las imágenes comparten historia en `main`; se pushea todo desde acá.
- Imágenes en la RAÍZ del repo:
  - `Diseño sin título.png` (500×500) → logo/isotipo del header.
  - `foto profesional.jpeg` (960×1280) → foto profesional (hero + sección Sobre Mí).
- El sitio referencia las imágenes vía `raw.githubusercontent.com/Matiax92/LicCamiTataryn/main/...` (siempre vigente aunque el repo contenga el sitio).
- Push: `git push` (SSH ya autentica como `Matiax92`). Sincronizar desde otro equipo: `git pull`.
- Deploy: GitHub Pages (Settings → Pages → branch `main`, carpeta root) → `https://matiax92.github.io/LicCamiTataryn/`. El archivo debe llamarse `index.html` para que la raíz sirva el sitio (por eso NO usar otro nombre como `LicCamiTataryn.html`).

## Marca / tokens de diseño (ya definidos en el HTML)
- Colores (Tailwind `brand`): `beige #F7F1E5`, `sage #94B49F`, `sage-dark #7A9A85`, `sage-ink #4A6B58` (texto/botones con AA), `sage-ink-dark #3E5949` (hover), `rose #E8C9D6`, `bg #FAFAFA`, `text #2D3748`, `muted #5B6C80`. Acento auxiliar presente solo en CSS de respaldo: `#F5C2C1`.
- Regla de contraste: texto o botón con contenido importante → `sage-ink`/`sage-ink-dark` sobre claros y blanco sobre `sage-ink`; `sage` claro solo para decoración (chips, bordes, puntos).
- Tipografías: **League Spartan** (títulos, `font-heading`) + **Plus Jakarta Sans** (cuerpo, Google Fonts).
- Estilo: clínico-cálido, tarjetas redondeadas (`rounded-2xl/3xl`), sombras suaves verdosas (`card-shadow`), gradientes beige→blanco→rosa.
- Contacto fijo: WhatsApp `5493471319597` (+54 9 3471 31-9597). Turnos por WhatsApp. Ubicación: mapa placeholder (se pide por WhatsApp).

## Secciones (en orden)
1. Header sticky + menú responsive (`#mobile-menu`)
2. Hero `#inicio` (badge, H1 subtítulo, CTAs WhatsApp/ubicación, 3 badges rápidos, card con foto + matrícula)
3. `#fonoaudiologia` — Área clínica "Lenguaje" (una card: lenguaje y habla, niños/adolescentes)
4. `#audiologia` — Audiología & Estudios Auditivos (4 cards numeradas: evaluación audiológica, estudios, audífonos, prevención)
5. `#sobre-mi` — Perfil profesional + formación académica + matrícula
6. `#contacto` — WhatsApp card, teléfono, horarios, placeholder de ubicación
7. Footer + JS pequeño (menú móvil, año del copyright)

## Tools (instalados para diseño y mejora progresiva)
- `tools/` — `npm install` dentro del folder (usa `sharp`, procesamiento de imágenes).
- `node tools/optimize.mjs <imagen> [ancho]` — optimiza a WebP/AVIF redimensionado → `assets/web/`.
- `./tools/screenshot.sh <html|url> [desktop|mobile] [etiqueta]` — captura con Chrome headless → `.design/shot-<viewport>-<etiqueta>.png` (leer la imagen para **evaluar el diseño mirando**, no suponer).
- `./tools/dev.sh [puerto]` — servidor local `python3 -m http.server` (útil porque file:// y CDN funcionan igualmente).
- Requisito: si falta `node_modules`, ejecutar `npm i sharp` dentro de `tools/`.

## Flujo de mejora progresiva (usar SIEMPRE al hacer cambios de diseño)
1. Referencia visual: `./tools/screenshot.sh index.html desktop antes` (+ `mobile`).
2. Cambios en el HTML (un paso chico por vez, un objetivo por commit: tipografía, jerarquía, contraste, espaciado, etc.).
3. Captura **después**: `./tools/screenshot.sh index.html desktop despues` y comparar con la anterior.
4. Verificar accesibilidad/rendimiento básico: contraste AAA/AA, tamaños táctiles, `alt` de imágenes, peso de imágenes (si>200 KB → optimizar con `optimize.mjs`), no romper nada mobile.
5. Commits atómicos y descriptivos (español OK). Ej: `hero: aumenta jerarquía subtitulo`.

## Checklist de diseño al evaluar cada captura
- Hero: ¿comunicación profesional cálida, jerarquía clara (H1 → sub → texto)?
- Contraste texto/brand color suficiente en **mobile** (el modo hidden/key responsive siempre).
- Cards: alineación consistente, espaciados coherentes, sombras (delicado, no chato).
- Logo y foto con `object-cover` sin distorsión.
- Nada de emojis dentro de imágenes importantes / no mockups: el diseño va directo al HTML.

## Cosas pendientes / ideas para seguir mejorando (progresivamente)
- [x] Contraste AA/AAA en textos y botones (tokens `sage-ink`, `muted` más oscura).
- [x] Imágenes `loading="lazy"` (Sobre Mí; logo/foto del hero quedan eager por estar arriba del pliegue).
- [x] Repo con remote y push por SSH (`origin` = Matiax92/LicCamiTataryn, antes `fotos`).
- [x] Raw URLs → rutas relativas (las imágenes viven en la raíz del mismo repo que sirve el sitio; funciona local y en Pages).
- [ ] Google Maps real cuando haya dirección confirmada.
- [x] Meta description + Open Graph (compartir por WhatsApp se ve mejor). `og:image` apunta a la foto en Pages; cambiar a `fonocamitataryn.com.ar` cuando el dominio esté en vivo.
- [x] `scroll-margin-top` para anclas en móvil (`scroll-mt-24` en las 5 secciones).
- [x] GitHub Pages deploy activado → https://matiax92.github.io/LicCamiTataryn/ (branch `main`, carpeta root).
- [ ] Dominio custom `fonocamitataryn.com.ar` (comprado en nic.ar) — EN CURSO:
  - [x] `CNAME` en raíz del repo con `fonocamitataryn.com.ar` (commit 741060b).
  - [ ] Cloudflare (gratis): agregar la zona del dominio → anotar los 2 nameservers que asigna.
  - [ ] DNS en Cloudflare: `A @` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 (todos *DNS only* / nube gris) + `CNAME www` → `matiax92.github.io` (*DNS only*).
  - [ ] nic.ar → Delegación: poner los 2 nameservers de Cloudflare.
  - [ ] GitHub → Settings → Pages → Custom domain `fonocamitataryn.com.ar` → Save; cuando el check pase, tildar **Enforce HTTPS**.
  - [ ] Al estar en vivo: actualizar `og:url`/`og:image` al dominio y esta URL canónica en AGENTS.md.

## Reglas de conversión
- Todo texto visible en español rioplatense; profesional y cálido.
- Las fotos e isotipo viven en la raíz de este repo (este repo ES el repo de imágenes renombrado `LicCamiTataryn`); no duplicar imágenes en subcarpetas del sitio.
