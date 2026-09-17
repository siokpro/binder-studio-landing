/* ============================================================
   BINDER STUDIO — privacidad.html
   Idioma sincronizado con la landing (clave localStorage compartida)
   ============================================================ */

const privacyTranslations = {
  es: {
    priv_kicker: "Legal",
    priv_title: "Política de Privacidad",
    priv_updated: "Última actualización: septiembre de 2026.",
    priv_intro: "Esta política explica, de forma sencilla, qué hacemos con los datos que nos facilitas en esta web.",
    priv_s1_t: "1. Responsable",
    priv_s1: "Binder Studio es una aplicación independiente para coleccionistas de cartas. Para cualquier consulta sobre privacidad puedes escribir a:",
    priv_s2_t: "2. Qué datos recogemos",
    priv_s2: "Recogemos únicamente tu dirección de email y el consentimiento que marcas en la casilla del formulario. Además, de forma opcional, guardamos parámetros técnicos de procedencia (utm_source, utm_medium, utm_campaign, utm_content) para saber qué canal te trajo hasta la web.",
    priv_s3_t: "3. Para qué los usamos",
    priv_s3: "Usamos tu email exclusivamente para avisarte del lanzamiento de Binder Studio en Google Play y para aquellas comunicaciones para las que hayas dado consentimiento. No te enviaremos publicidad de terceros.",
    priv_s4_t: "4. Quién gestiona los emails",
    priv_s4: "Los envíos de email y el almacenamiento de las suscripciones los gestiona Kit (kit.com), que actúa como encargado de tratamiento.",
    priv_s5_t: "5. Cuánto tiempo conservamos tus datos",
    priv_s5: "Conservamos tu email mientras no pidas la baja o mientras exista la finalidad para la que te suscribiste.",
    priv_s6_t: "6. Tus derechos",
    priv_s6: "Puedes darte de baja en cualquier momento desde el enlace que incluye cada email, o escribiéndonos a",
    priv_s6b: ". También puedes solicitar el acceso, la rectificación o la eliminación de tus datos.",
    priv_s7_t: "7. No vendemos tus datos",
    priv_s7: "No vendemos, alquilamos ni cedemos tus datos personales a terceros con fines comerciales. Nunca.",
    priv_s8_t: "8. Cookies y analítica",
    priv_s8: "Esta web no utiliza cookies publicitarias ni rastreadores de terceros con fines publicitarios; por eso no verás un banner de cookies. Si en el futuro activamos una herramienta de analítica, será una solución respetuosa con la privacidad y esta política se actualizará.",
    play_cta: "Prerregistrarme en Google Play",
    footer_tagline: "Organiza. Diseña. Comparte.",
    footer_disclaimer: "Binder Studio es una herramienta independiente creada para coleccionistas. No está afiliada, patrocinada ni respaldada por The Pokémon Company, Nintendo, Game Freak o Creatures Inc."
  },
  en: {
    priv_kicker: "Legal",
    priv_title: "Privacy Policy",
    priv_updated: "Last updated: September 2026.",
    priv_intro: "This policy explains, in plain language, what we do with the data you share on this website.",
    priv_s1_t: "1. Data controller",
    priv_s1: "Binder Studio is an independent app for trading card collectors. For any privacy question, write to:",
    priv_s2_t: "2. What data we collect",
    priv_s2: "We only collect your email address and the consent you give in the form checkbox. Optionally, we also store technical source parameters (utm_source, utm_medium, utm_campaign, utm_content) to know which channel brought you to the site.",
    priv_s3_t: "3. What we use it for",
    priv_s3: "We use your email exclusively to notify you when Binder Studio launches on Google Play and for the communications you have consented to. We will never send you third-party advertising.",
    priv_s4_t: "4. Who manages the emails",
    priv_s4: "Email delivery and subscription storage are managed by Kit (kit.com), acting as data processor.",
    priv_s5_t: "5. How long we keep your data",
    priv_s5: "We keep your email until you unsubscribe or until the purpose you subscribed for no longer exists.",
    priv_s6_t: "6. Your rights",
    priv_s6: "You can unsubscribe at any time using the link included in every email, or by writing to",
    priv_s6b: ". You can also request access, rectification or deletion of your data.",
    priv_s7_t: "7. We do not sell your data",
    priv_s7: "We do not sell, rent or share your personal data with third parties for commercial purposes. Ever.",
    priv_s8_t: "8. Cookies and analytics",
    priv_s8: "This website uses no advertising cookies and no third-party ad trackers, which is why you see no cookie banner. If we ever enable analytics, it will be a privacy-friendly solution and this policy will be updated.",
    play_cta: "Pre-register on Google Play",
    footer_tagline: "Organize. Design. Share.",
    footer_disclaimer: "Binder Studio is an independent tool made for collectors. It is not affiliated with, sponsored by or endorsed by The Pokémon Company, Nintendo, Game Freak or Creatures Inc."
  }
};

let currentLang = getSavedLang();

function renderPrivacy() {
  applyI18n(currentLang, privacyTranslations);
  document.getElementById("langToggle").textContent = currentLang === "es" ? "EN" : "ES";
  document.querySelectorAll("[data-contact-email]").forEach(el => {
    el.textContent = SITE_CONFIG.CONTACT_EMAIL;
  });
  try { localStorage.setItem("binderStudioLang", currentLang); } catch (err) { /* sin almacenamiento */ }
}

document.getElementById("langToggle").addEventListener("click", () => {
  const from = currentLang;
  currentLang = currentLang === "es" ? "en" : "es";
  renderPrivacy();
  trackEvent("lang_change", { from: from, to: currentLang, page: "privacidad" });
});

renderPrivacy();
trackEvent("page_view", { page: "privacidad", lang: currentLang });
