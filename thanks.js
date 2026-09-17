/* ============================================================
   BINDER STUDIO — gracias.html
   Idioma sincronizado con la landing (clave localStorage compartida)
   ============================================================ */

const thanksTranslations = {
  es: {
    thanks_kicker: "Registro confirmado",
    thanks_title: "¡Ya estás dentro!",
    thanks_text: "Te avisaremos en cuanto Binder Studio esté disponible en Google Play.",
    thanks_text2: "Mientras tanto puedes conocer mejor la aplicación y seguir el proyecto.",
    thanks_back: "Volver a la web",
    thanks_know: "Conocer la aplicación",
    thanks_follow: "Sigue el proyecto aquí:",
    play_cta: "Prerregistrarme en Google Play",
    privacy_link: "Privacidad",
    footer_tagline: "Organiza. Diseña. Comparte.",
    footer_disclaimer: "Binder Studio es una herramienta independiente creada para coleccionistas. No está afiliada, patrocinada ni respaldada por The Pokémon Company, Nintendo, Game Freak o Creatures Inc."
  },
  en: {
    thanks_kicker: "Registration confirmed",
    thanks_title: "You’re in!",
    thanks_text: "We’ll notify you as soon as Binder Studio is available on Google Play.",
    thanks_text2: "In the meantime, you can get to know the app and follow the project.",
    thanks_back: "Back to the site",
    thanks_know: "Explore the app",
    thanks_follow: "Follow the project here:",
    play_cta: "Pre-register on Google Play",
    privacy_link: "Privacy",
    footer_tagline: "Organize. Design. Share.",
    footer_disclaimer: "Binder Studio is an independent tool made for collectors. It is not affiliated with, sponsored by or endorsed by The Pokémon Company, Nintendo, Game Freak or Creatures Inc."
  }
};

let currentLang = getSavedLang();

function renderThanks() {
  applyI18n(currentLang, thanksTranslations);
  document.getElementById("langToggle").textContent = currentLang === "es" ? "EN" : "ES";
  try { localStorage.setItem("binderStudioLang", currentLang); } catch (err) { /* sin almacenamiento */ }
}

document.getElementById("langToggle").addEventListener("click", () => {
  const from = currentLang;
  currentLang = currentLang === "es" ? "en" : "es";
  renderThanks();
  trackEvent("lang_change", { from: from, to: currentLang, page: "gracias" });
});

renderThanks();
trackEvent("page_view", { page: "gracias", lang: currentLang });

/* Mostrar la fila social solo si hay al menos una URL configurada en config.js */
document.addEventListener("DOMContentLoaded", () => {
  const socialButtons = Array.from(document.querySelectorAll(".social-btn"));
  const anyVisible = socialButtons.some(a => !a.hidden);
  document.getElementById("socialRow").hidden = !anyVisible;
  document.getElementById("thanksFollow").hidden = !anyVisible;
});
