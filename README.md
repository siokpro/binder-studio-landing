# Binder Studio — Landing de prelanzamiento

Landing estática (HTML/CSS/JS, sin frameworks) para captación de emails antes del
lanzamiento de Binder Studio en Google Play. Desplegada en GitHub Pages.

- 🌐 URL: https://siokpro.github.io/binder-studio-landing/
- 📄 Páginas: `index.html` (ES/EN) · `gracias.html` (confirmación) · `privacidad.html` (legal)

## Configuración — TODO se centraliza en `config.js`

| Ajuste | Qué hace |
|---|---|
| `PLAY_STORE_URL` + `SHOW_PLAY_STORE_CTA` | Botón "Prerregistrarme en Google Play" en hero, sección final y gracias. Oculto mientras `SHOW_PLAY_STORE_CTA: false`. |
| `SOCIAL_LINKS` | URLs de TikTok / Instagram / YouTube para la página de gracias. Vacío = oculto. |
| `KIT` | Backend de suscripción (form 9929062). No cambiar sin saber. |
| `ANALYTICS` | `provider: null` → `trackEvent()` no envía nada y no falla. |
| `CONTACT_EMAIL` | Email de contacto mostrado en la política de privacidad (ahora `[PENDIENTE_EMAIL_CONTACTO]`). |

## Formulario (Kit / kit.com)

- El formulario visual es propio; Kit actúa **solo como backend** (POST nativo a
  `https://app.kit.com/forms/9929062/subscriptions`, campo `email_address`).
- No se carga ningún script de Kit.
- Requisito pendiente en el panel de Kit (ver "Pendientes").

## Pendientes

1. **Kit — redirección**: en Kit → `Forms` → formulario `9929062` → `Settings` →
   éxito del formulario → **Redirect to URL** →
   `https://siokpro.github.io/binder-studio-landing/gracias.html`
2. **Kit — custom fields UTM**: crear en Kit los campos de texto
   `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`
   (mientras no existan, Kit los ignora y el alta funciona igual).
3. **Email de contacto**: sustituir `[PENDIENTE_EMAIL_CONTACTO]` en `config.js`
   (`CONTACT_EMAIL`).
4. **Redes sociales**: pegar URLs en `SOCIAL_LINKS` (config.js).
5. **Google Play**: cuando exista la URL de prerregistro, ponerla en
   `PLAY_STORE_URL` y cambiar `SHOW_PLAY_STORE_CTA` a `true`.

## Estructura

```
index.html        Landing (diseño aprobado v1.1, no rediseñar)
gracias.html      Confirmación post-alta
privacidad.html   Política de privacidad ES/EN
styles.css        Estilos (reglas aprobadas + bloque "Añadidos de producción")
script.js         Landing: i18n ES/EN, animaciones, formulario
config.js         ⚙️ Configuración central + trackEvent + UTM + i18n compartido
thanks.js         gracias.html
privacy.js        privacidad.html
assets/           Imágenes y vídeo (los PNG originales se conservan como fallback)
robots.txt        Permite todo + sitemap
sitemap.xml       index + privacidad
```

## Probar en local

```bash
python -m http.server 8000
# http://localhost:8000
```

## Tracking (sin proveedor conectado)

`trackEvent(nombre, params)` encola en `window.binderAnalytics.queue` sin enviar
nada. Eventos: `page_view`, `form_click`, `email_sent`, `form_error`,
`tiktok_click`, `instagram_click`, `youtube_click`, `play_store_click`,
`video_play`, `lang_change`. Sin cookies publicitarias ni banner.
