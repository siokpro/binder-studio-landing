/* ============================================================
   BINDER STUDIO — Configuración central del sitio
   ============================================================
   Este es el ÚNICO archivo donde se editan los ajustes del sitio.
   No dupliques URLs ni ajustes en otros archivos.

   Pendiente de configurar (ver README.md):
   - PLAY_STORE_URL + SHOW_PLAY_STORE_CTA  (prerregistro Google Play)
   - SOCIAL_LINKS                          (TikTok / Instagram / YouTube)
   - Kit: crear custom fields para UTM (ver comentarios más abajo)
   - Kit: redirigir el formulario a gracias.html tras el alta
   - CONTACT_EMAIL                         (sustituir [PENDIENTE_EMAIL_CONTACTO])
   ============================================================ */

const SITE_CONFIG = {

  /* ---------- FASE 1 — Kit (kit.com), backend de suscripción ----------
     Formulario oficial de Kit: 9929062 (inline, badge desactivado).
     Se usa Kit SOLO como backend: el formulario visual de la landing
     se mantiene intacto y hace POST nativo al endpoint (sin script de Kit).
     La redirección post-alta a gracias.html se configura en el panel de Kit:
     Form → Settings → Success → Redirect to URL → .../gracias.html      */
  KIT: {
    enabled: true,
    formId: "9929062",
    uid: "bf6766a4a2",
    endpoint: "https://app.kit.com/forms/9929062/subscriptions",
    emailField: "email_address",
    /* FASE 4 — Campos personalizados de Kit para procedencia (UTM).
       Deben existir en Kit con EXACTAMENTE estos nombres:
       Kit → Settings → Custom Fields → New field (tipo texto) →
       utm_source, utm_medium, utm_campaign, utm_content
       Mientras no existan, Kit ignora estos campos sin romper el alta. */
    utmFields: ["utm_source", "utm_medium", "utm_campaign", "utm_content"]
  },

  /* ---------- FASE 2 — Redes sociales (gracias.html) ----------
     URL vacía = el botón correspondiente no se muestra.
     Pega aquí tus perfiles cuando existan, p. ej.:
     tiktok: "https://www.tiktok.com/@binderstudio"                */
  SOCIAL_LINKS: {
    tiktok: "",
    instagram: "",
    youtube: ""
  },

  /* ---------- FASE 5 — Analítica respetuosa con la privacidad ----------
     Sin proveedor conectado: trackEvent() no envía nada y no falla.
     Cuando elijas proveedor (p. ej. Plausible, sin cookies), cambia
     provider por una función: provider: (name, params) => plausible(name, params)
     Los eventos quedan encolados en window.binderAnalytics.queue.         */
  ANALYTICS: {
    provider: null,
    debug: false
  },

  /* ---------- FASE 6 — Datos legales pendientes ---------- */
  CONTACT_EMAIL: "[PENDIENTE_EMAIL_CONTACTO]"
};

/* ============================================================
   Analítica — FASE 5
   ============================================================ */
const binderAnalyticsQueue = [];

function trackEvent(name, params = {}) {
  const cfg = SITE_CONFIG.ANALYTICS;
  if (typeof cfg.provider === "function") {
    try {
      cfg.provider(name, params);
      return;
    } catch (err) {
      /* Un proveedor con errores nunca debe romper la web. */
    }
  }
  binderAnalyticsQueue.push({ name, params, ts: Date.now() });
  if (cfg.debug) console.debug("[binder-track]", name, params);
}

window.binderAnalytics = { trackEvent, queue: binderAnalyticsQueue, config: SITE_CONFIG };

/* ============================================================
   FASE 2 — Idioma y redes sociales (compartido por todas las páginas)
   ============================================================ */

function getSavedLang() {
  let lang = null;
  try { lang = localStorage.getItem("binderStudioLang"); } catch (err) { /* almacenamiento no disponible */ }
  return lang || (navigator.language && navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
}

function applyI18n(lang, dict) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[lang] && dict[lang][key]) el.textContent = dict[lang][key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.dataset.i18nHtml;
    if (dict[lang] && dict[lang][key]) el.innerHTML = dict[lang][key];
  });
}

function initSocialLinks() {
  document.querySelectorAll("[data-social]").forEach(a => {
    const url = SITE_CONFIG.SOCIAL_LINKS[a.dataset.social];
    if (url) {
      a.href = url;
      a.hidden = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSocialLinks();
});
