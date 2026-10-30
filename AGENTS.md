# Contexto del Proyecto — Sitio Profesional (Lic. Camila Tataryn)

## Qué es
Sitio web de presentación profesional de **Lic. Camila Tataryn, Fonoaudióloga y Audióloga** (M.P. 1830/2).
Es un HTML estático con Tailwind (CDN), sin framework ni build. Página principal: `LicCamiTataryn.html`.

## Asociación con el repo de fotos (GitHub)
- Repo remoto: <https://github.com/Matiax92/fotos> (del usuario `Matiax92`)
- Clonado en: `fotos/` (sub-repositorio, ignorado por el git del sitio — `.gitignore`).
- El sitio referencia las imágenes vía `raw.githubusercontent.com/Matiax92/main/...`:
  - `fotos/Diseño sin título.png` (500×500) → logo/isotipo del header.
  - `fotos/foto profesional.jpeg` (960×1280) → foto profesional (hero + sección Sobre Mí).
- Flujo de imágenes: **editar/agregar en el repo `fotos` y hacer push**; el sitio se actualiza solo por la URL raw.
- Para usar imágenes optimizadas localmente: `node tools/optimize.mjs "./fotos/foto profesional.jpeg" 800` → genera `assets/web/*.webp|avif`.
- Para sincronizar el clon: `cd fotos && git pull`.

## Marca / tokens de diseño (ya definidos en el HTML)
- Colores (Tailwind `brand`): `beige #F7F1E5`, `sage #94B49F`, `sage-dark #7A9A85`, `rose #E8C9D6`, `bg #FAFAFA`, `text #2D3748`, `muted #64748B`. Acento auxiliar presente solo en CSS de respaldo: `#F5C2C1`.
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
1. Referencia visual: `./tools/screenshot.sh LicCamiTataryn.html desktop antes` (+ `mobile`).
2. Cambios en el HTML (un paso chico por vez, un objetivo por commit: tipografía, jerarquía, contraste, espaciado, etc.).
3. Captura **después**: `./tools/screenshot.sh LicCamiTataryn.html desktop despues` y comparar con la anterior.
4. Verificar accesibilidad/rendimiento básico: contraste AAA/AA, tamaños táctiles, `alt` de imágenes, peso de imágenes (si>200 KB → optimizar con `optimize.mjs`), no romper nada mobile.
5. Commits atómicos y descriptivos (español OK). Ej: `hero: aumenta jerarquía subtitulo`.

## Checklist de diseño al evaluar cada captura
- Hero: ¿comunicación profesional cálida, jerarquía clara (H1 → sub → texto)?
- Contraste texto/brand color suficiente en **mobile** (el modo hidden/key responsive siempre).
- Cards: alineación consistente, espaciados coherentes, sombras (delicado, no chato).
- Logo y foto con `object-cover` sin distorsión.
- Nada de emojis dentro de imágenes importantes / no mockups: el diseño va directo al HTML.

## Cosas pendientes / ideas para seguir mejorando (progresivamente)
- [ ] Reemplazar raw URLs por assets locales optimizados cuando hay deploy propio.
- [ ] Imágenes `loading="lazy"` (excepto logo/foto del hero).
- [ ] Google Maps real cuando haya dirección confirmada.
- [ ] `alt`/`aria-label` meta description + Open Graph (compartir por WhatsApp se ve mejor).
- [ ] Numerar secciones en móvil con `scroll-margin-top` (header sticky tapa anclas).

## Reglas de conversión
- Todo texto visible en español rioplatense; profesional y cálido.
- Las fotos e isotipo siempre provienen del repo `fotos` (no subir duplicados al repo del sitio).
