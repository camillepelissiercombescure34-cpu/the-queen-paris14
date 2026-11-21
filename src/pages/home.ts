import { site, categories, gallery, reviews, facts, priceDisclaimer, hours } from "../data/site.ts";
import { layout, callBand, galleryFigure, breadcrumbSchema } from "../lib/html.ts";
import { mapBlock } from "../lib/map.ts";

const body = `
<section class="hero">
  <div class="shell hero__grid">
    <div class="hero__content">
      <p class="eyebrow">Nail bar · Edgar-Quinet, Paris 14</p>
      <h1>Des mains soignées,<br><em>une parenthèse</em> pour vous.</h1>
      <p class="hero__text">Manucure, vernis semi-permanent, faux ongles et beauté des pieds, au 4 rue Poinsot. Un salon lumineux à deux pas du métro Edgar-Quinet et de la gare Montparnasse.</p>
      <div class="hero__actions">
        <a class="btn btn--solid btn--large" href="tel:${site.phone}">Réserver par téléphone</a>
        <a class="btn btn--ghost" href="#prestations">Découvrir nos prestations</a>
      </div>
      <dl class="hero__facts">
        ${facts
          .map(
            (fact) =>
              `<div class="hero__fact"><dt>${fact.label}</dt><dd>${fact.value}</dd></div>`,
          )
          .join("")}
      </dl>
    </div>
    <div class="hero__media">
      <img src="/assets/img/hero-salon.avif" alt="Intérieur clair aux murs ivoire, miroir cintré et mobilier en chêne — visuel d'illustration" width="1392" height="752" fetchpriority="high" decoding="async">
      <span class="media-note">Visuel d'illustration</span>
    </div>
  </div>
</section>

<section class="section" id="prestations">
  <div class="shell">
    <div class="section__head">
      <p class="eyebrow">Nos prestations</p>
      <h2>Le geste juste, du bout des doigts.</h2>
      <p class="section__intro">Six familles de soins, une même exigence : prendre le temps, écouter la forme de vos ongles et choisir ensemble la finition qui vous ressemble.</p>
    </div>
    <div class="service-grid">
      ${categories
        .map(
          (category) => `
      <a class="service-card" href="/prestations#${category.id}">
        <span class="service-card__letter" aria-hidden="true">${category.letter}</span>
        <h3>${category.title}</h3>
        <p>${category.short}</p>
        <span class="service-card__foot">
          <span class="service-card__from">${category.from}</span>
          <span class="service-card__more">Voir les tarifs <span aria-hidden="true">→</span></span>
        </span>
      </a>`,
        )
        .join("")}
    </div>
    <p class="disclaimer">${priceDisclaimer}</p>
  </div>
</section>

<section class="section section--sand" id="salon">
  <div class="shell split">
    <div class="split__media">
      <img src="/assets/img/interieur-detail.avif" alt="Coin d'accueil crème, applique de laiton et fleurs séchées — visuel d'illustration" width="880" height="1184" loading="lazy" decoding="async">
      <span class="media-note">Visuel d'illustration</span>
    </div>
    <div class="split__body">
      <p class="eyebrow">Le salon</p>
      <h2>Un lieu calme, une attention réelle.</h2>
      <p>THE QUEEN est un nail bar et institut de beauté du quartier Edgar-Quinet. Les teintes claires, la lumière naturelle et le mobilier sobre composent un cadre volontairement discret, pensé pour souffler le temps d'un rendez-vous.</p>
      <p>Manucure, semi-permanent, pose de gel ou de résine, beauté des pieds : chaque prestation commence par un temps d'échange sur l'état de vos ongles et le résultat souhaité.</p>
      <ul class="ticks">
        <li>Hygiène et matériel préparés pour chaque rendez-vous</li>
        <li>Produits professionnels, dont la gamme O.P.I.</li>
        <li>Une équipe qui prend le temps de vous conseiller</li>
      </ul>
      <a class="link-arrow" href="/le-salon">Découvrir le salon <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>

<section class="section" id="galerie-apercu">
  <div class="shell">
    <div class="section__head section__head--row">
      <div>
        <p class="eyebrow">Galerie</p>
        <h2>Quelques gestes, en images.</h2>
      </div>
      <a class="link-arrow" href="/galerie">Voir toute la galerie <span aria-hidden="true">→</span></a>
    </div>
    <div class="gallery gallery--preview">
      ${gallery.slice(0, 5).map((item, index) => galleryFigure(item, index)).join("")}
    </div>
    <p class="disclaimer">${site.legal.photoCredit} Elles ne représentent pas encore le salon et seront remplacées par des photos authentiques.</p>
  </div>
</section>

<section class="section section--sand" id="avis">
  <div class="shell">
    <div class="section__head">
      <p class="eyebrow">Elles en parlent</p>
      <h2>La confiance se mesure aussi en étoiles.</h2>
    </div>
    <div class="reviews">
      <a class="review-score" href="${reviews.google.url}" target="_blank" rel="noopener">
        <span class="review-score__label">${reviews.google.label}</span>
        <span class="review-score__value">${reviews.google.rating}<span aria-hidden="true">/5</span></span>
        <span class="review-score__count">${reviews.google.count}</span>
        <span class="review-score__link">Lire les avis <span aria-hidden="true">↗</span></span>
      </a>
      <a class="review-score" href="${reviews.treatwell.url}" target="_blank" rel="noopener">
        <span class="review-score__label">${reviews.treatwell.label}</span>
        <span class="review-score__value">${reviews.treatwell.rating}<span aria-hidden="true">/5</span></span>
        <span class="review-score__count">${reviews.treatwell.count}</span>
        <span class="review-score__link">Lire les avis <span aria-hidden="true">↗</span></span>
      </a>
      <div class="quotes">
        ${reviews.quotes
          .map(
            (quote) => `
        <blockquote class="quote">
          <p>« ${quote.text} »</p>
          <footer>${quote.author} — ${quote.service}</footer>
        </blockquote>`,
          )
          .join("")}
      </div>
    </div>
    <p class="note">Notes et avis publiés sur Google et Treatwell, relevés en ${site.reviewsDate}. Les avis sont accessibles directement sur chaque plateforme.</p>
  </div>
</section>

<section class="section" id="acces">
  <div class="shell split split--reverse">
    <div class="split__body">
      <p class="eyebrow">Nous trouver</p>
      <h2>Au cœur du 14e, entre Edgar-Quinet et Montparnasse.</h2>
      <p>${site.address.full}. Le salon se trouve à quelques pas du métro Edgar-Quinet (ligne 6) et à quelques minutes à pied de la gare Montparnasse (lignes 4, 6, 12 et 13).</p>
      <table class="hours-table">
        <caption>Horaires d'ouverture</caption>
        <tbody>
          ${hours
            .map(
              (h) =>
                `<tr><th scope="row">${h.day}</th><td>${h.open} – ${h.close}</td></tr>`,
            )
            .join("")}
        </tbody>
      </table>
      <div class="split__actions">
        <a class="btn btn--solid" href="tel:${site.phone}">Réserver au ${site.phoneDisplay}</a>
        <a class="btn btn--ghost" href="${site.itineraryUrl}" target="_blank" rel="noopener">Itinéraire <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <div class="split__media">
      ${mapBlock()}
    </div>
  </div>
</section>

${callBand()}
`;

export const home = layout({
  title: "THE QUEEN — Nail bar à Paris 14, Edgar-Quinet & Montparnasse",
  description:
    "Nail bar au 4 rue Poinsot, Paris 14e : manucure, vernis semi-permanent, faux ongles, beauté des pieds et épilation. Rendez-vous au 06 88 12 81 83.",
  path: "/",
  active: "accueil",
  body,
  schema: [
    breadcrumbSchema([]),
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: `${site.url}/`,
      inLanguage: "fr-FR",
    }),
  ].map((data) =>
    typeof data === "string" && data.startsWith("{")
      ? `<script type="application/ld+json">${data}</script>`
      : data,
  ),
});
