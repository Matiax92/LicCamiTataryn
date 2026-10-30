---
name: revisar-seguridad
description: Auditoría de seguridad del sitio estático (index.html, GitHub Pages, CDN Tailwind, links WhatsApp). Usar cuando el usuario pida "revisar seguridad", "auditoría de seguridad", "está seguro esto", "security review" del sitio o del repo.
---

# Revisar Seguridad — sitio estático LicCamiTataryn

Sitio estático, sin base de datos ni JS de backend: la superficie de ataque es
pequeña, pero conviene auditar estos puntos en cada revisión. Ejecutar los
controles en orden, anotar hallazgos, proponer arreglos atómicos y, al final,
dejar registro en AGENTS.md (sección pendientes o un resumen de la auditoría).

## 1. Secretos e información sensible (grep en todo el repo)

- Buscar patrones: `api_key|apikey|token|secret|password|passwd|Bearer|sk-[a-zA-Z0-9]`
  con `grep -ri` (excluir `tools/node_modules` y `.design`).
- Nada de claves privadas SSH dentro del repo (`.gitignore` no cubre `$HOME`).
- Info personal esperada (telefono de WhatsApp, matrícula) es dato público de
  la práctica: OK. Cualquier dirección exacta o documento: revisar antes de pushear.

## 2. Enlaces externos (index.html)

- Todo `<a target="_blank">` debe llevar `rel="noopener noreferrer"`
  (GitHub tiene `noopener` implícito? NO confiar: verificar y ponerlo).
- Los wa.me y tel: no abren target en blanco sin target="_blank"; revisar igual.
- Sin `http://` en el HTML (solo `https://`): `grep -n "http://" index.html`.

## 3. Recursos externos / proveedores (supply chain)

- `cdn.tailwindcss.com` (script CDN): modo dev de Tailwind, sin Subresource
  Integrity (SRI). Riesgo aceptado HOY; mitigar cuando se precompile el CSS.
- Google Fonts: riesgo bajo; sin SRI tampoco.
- Proveedor seguro (vendor trust): proveedores aprobados hoy: `cdn.tailwindcss.com`, `fonts.googleapis.com`, `fonts.gstatic.com`, `wa.me`. Con el dominio vivo, TODO `og:url`/`og:image` debe apuntar a `https://fonocamitataryn.com.ar` (sin links muertos ni viejos del repo `fotos`).

## 4. Cabeceras / transport

- GitHub Pages no permite cabeceras custom, solo `meta` CSP (si se agrega, que sea
  `default-src 'self' https://cdn.tailwindcss.com 'unsafe-inline'` mínimo; ESTO
  requiere aprobarlo con el usuario antes).
- HTTPS: `curl -sI https://<url-en-vivo>` ⇒ `HTTP/2 200` + ausencia de
  mixed-content al compartir (verificar con `webfetch` la URL canónica).

## 5. HTML/JS inline

- Solo deben existir scripts inline: el `tailwind.config` y el pequeño JS del
  menú móvil + copyright. Nada de `eval`, `document.write` o `innerHTML` con datos.
- Verificar con: `grep -n "eval(\|document.write\|innerHTML" index.html`.

## 6. Repo / git higiene

- `git status` limpio antes de auditoría; historia no debe contener secretos
  (`git log -p --all -S "api_key" --oneline | head`).
- `CNAME` apuntando a la Raíz correcta; no forzar http en Pages (Enforce HTTPS on).

## Cierre

Resumir en una línea por hallazgo: `[riesgo bajo/medio/alto]` + fix propuesto.
Los fixes aceptados se aplican como commits atómicos y AGENTS.md queda
actualizado con la fecha de la auditoría.
