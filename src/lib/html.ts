import { site, nav, hours, categories } from "../data/site.ts";

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const json = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

export function salonSchema() {
  return json({
    "@context": "https://schema.org",
    "@type": "NailSalon",
    "@id": `${site.url}/#salon`,
    name: site.name,
    alternateName: "The Queen Paris 14",
    description:
      "Nail bar et institut de beauté à Paris 14e : manucure, vernis semi-permanent, faux ongles en gel ou résine, beauté des pieds et épilation, au 4 rue Poinsot, quartier Edgar-Quinet.",
    url: `${site.url}/`,
    image: `${site.url}/assets/img/hero-salon.avif`,
    telephone: site.phone,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: site.mapsUrl,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Paris 14e arrondissement" },
      { "@type": "Place", name: "Montparnasse" },
      { "@type": "Place", name: "Edgar-Quinet" },
    ],
    openingHoursSpecification: hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.open,
      closes: h.close,
    })),
    sameAs: [site.treatwellUrl, site.mapsUrl],
  });
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return json({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${site.url}${item.path}`,
      })),
    ],
  });
}

function header(active: string) {
  const links = nav
    .map(
      (item) =>
        `<li><a class="nav__link${item.key === active ? " is-active" : ""}" href="${item.href}"${
          item.key === active ? ' aria-current="page"' : ""
        }>${item.label}</a></li>`,
    )
    .join("");

  return `
<a class="skip-link" href="#contenu">Aller au contenu</a>
<header class="site-header" data-header>
  <div class="shell header__inner">
    <a class="brand" href="/" aria-label="THE QUEEN, retour à l'accueil">
      <span class="brand__name">The Queen</span>
      <span class="brand__meta">Nail bar · Paris 14</span>
    </a>
    <nav class="nav" id="nav-principal" aria-label="Navigation principale">
      <ul class="nav__list">${links}</ul>
      <div class="nav__actions">
        <span class="status" data-status><span class="status__dot" aria-hidden="true"></span><span data-status-text>Horaires</span></span>
        <a class="nav__phone" href="tel:${site.phone}">${site.phoneDisplay}</a>
        <a class="btn btn--solid nav__cta" href="tel:${site.phone}">Réserver</a>
      </div>
    </nav>
    <button class="burger" type="button" aria-expanded="false" aria-controls="nav-principal" aria-label="Ouvrir le menu" data-burger>
      <span class="burger__bar"></span><span class="burger__bar"></span><span class="burger__bar"></span>
    </button>
  </div>
</header>`;
}

function footer() {
  return `
<footer class="site-footer">
  <div class="shell footer__grid">
    <div class="footer__brand">
      <p class="footer__name">The Queen</p>
      <p class="footer__tagline">Nail bar &amp; beauté des pieds<br>4 rue Poinsot, 75014 Paris</p>
      <a class="footer__phone" href="tel:${site.phone}">${site.phoneDisplay}</a>
      <a class="btn btn--ghost btn--small" href="tel:${site.phone}">Réserver par téléphone</a>
    </div>
    <nav class="footer__col" aria-label="Pages du site">
      <p class="footer__title">Le site</p>
      <ul class="footer__list">
        ${nav.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
      </ul>
    </nav>
    <div class="footer__col">
      <p class="footer__title">Prestations</p>
      <ul class="footer__list">
        ${categories
          .map(
            (category) =>
              `<li><a href="/prestations#${category.id}">${category.title}</a></li>`,
          )
          .join("")}
      </ul>
    </div>
    <div class="footer__col">
      <p class="footer__title">Informations</p>
      <ul class="footer__list">
        ${hours
          .map(
            (h) =>
              `<li class="footer__hours"><span>${h.short}</span><span>${h.open} – ${h.close}</span></li>`,
          )
          .join("")}
      </ul>
      <p class="footer__notice">${site.legal.photoCredit}</p>
    </div>
  </div>
  <div class="shell footer__bottom">
    <p>© <span data-year>2026</span> THE QUEEN — Tous droits réservés.</p>
    <ul class="footer__legal">
      <li><a href="/mentions-legales">Mentions légales</a></li>
      <li><a href="/confidentialite">Confidentialité</a></li>
      <li><a href="/cookies">Cookies</a></li>
    </ul>
  </div>
</footer>
<a class="callbar" href="tel:${site.phone}" aria-label="Appeler THE QUEEN au ${site.phoneDisplay}">
  <span class="callbar__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6.6 3.5h2.2l1.5 3.6-1.8 1.4a12.5 12.5 0 0 0 5.9 5.9l1.4-1.8 3.6 1.5v2.2a2.2 2.2 0 0 1-2.4 2.2C10.4 18 5.9 13.5 4.4 5.9A2.2 2.2 0 0 1 6.6 3.5Z"/></svg>
  </span>
  <span class="callbar__text"><strong>Réserver</strong> — ${site.phoneDisplay}</span>
</a>`;
}

export function layout(options: {
  title: string;
  description: string;
  path: string;
  active: string;
  body: string;
  schema?: string[];
  image?: string;
  noindex?: boolean;
}) {
  const canonical = `${site.url}${options.path === "/" ? "/" : options.path}`;
  const image = `${site.url}${options.image ?? "/assets/img/hero-salon.avif"}`;

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(options.title)}</title>
<meta name="description" content="${esc(options.description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${options.noindex ? "noindex,follow" : "index,follow,max-image-preview:large"}">
<meta name="theme-color" content="#F7F4EF">
<meta name="format-detection" content="telephone=yes">
<meta property="og:type" content="website">
<meta property="og:site_name" content="THE QUEEN">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${esc(options.title)}">
<meta property="og:description" content="${esc(options.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/favicon.svg">
<link rel="preload" href="/assets/fonts/cormorant-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/jost-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/fonts.css">
<link rel="stylesheet" href="/assets/styles.css">
<script>document.documentElement.classList.add('js');</script>
${salonSchema()}
${(options.schema ?? []).join("\n")}
</head>
<body>
${header(options.active)}
<main id="contenu" tabindex="-1">
${options.body}
</main>
${footer()}
<script src="/assets/main.js" defer></script>
</body>
</html>`;
}

export function pageHero(options: {
  eyebrow: string;
  title: string;
  text?: string;
  crumbs?: { name: string; path: string }[];
  compact?: boolean;
}) {
  const crumbs = options.crumbs ?? [];
  return `
<section class="page-hero${options.compact ? " page-hero--compact" : ""}">
  <div class="shell">
    ${
      crumbs.length
        ? `<nav class="breadcrumbs" aria-label="Fil d'Ariane"><ol>${[
            `<li><a href="/">Accueil</a></li>`,
            ...crumbs.map(
              (c) =>
                `<li><a href="${c.path}" aria-current="page">${c.name}</a></li>`,
            ),
          ].join("")}</ol></nav>`
        : ""
    }
    <p class="eyebrow">${options.eyebrow}</p>
    <h1>${options.title}</h1>
    ${options.text ? `<p class="page-hero__text">${options.text}</p>` : ""}
  </div>
</section>`;
}

export function callBand(options?: { title?: string; text?: string }) {
  return `
<section class="callband">
  <div class="shell callband__inner">
    <div>
      <p class="eyebrow">Prise de rendez-vous</p>
      <h2>${options?.title ?? "Un rendez-vous ? Un appel suffit."}</h2>
      <p class="callband__text">${
        options?.text ??
        "Nous répondons du lundi au samedi de 10h30 à 19h45 et le dimanche de 12h à 19h45. Le rendez-vous est confirmé directement au téléphone."
      }</p>
    </div>
    <div class="callband__actions">
      <a class="btn btn--solid btn--large" href="tel:${site.phone}">Appeler le ${site.phoneDisplay}</a>
      <p class="callband__note">Appel direct — pas de formulaire, pas de calendrier en ligne.</p>
    </div>
  </div>
</section>`;
}

export function galleryFigure(
  item: { src: string; alt: string; caption: string; category: string },
  index: number,
  options?: { hidden?: boolean },
) {
  return `
<figure class="gallery__item" data-category="${item.category}"${options?.hidden ? " hidden" : ""}>
  <button class="gallery__button" type="button" data-lightbox="${index}" aria-label="Agrandir : ${item.caption}">
    <img src="${item.src}" alt="${item.alt}" width="1100" height="818" loading="lazy" decoding="async">
    <span class="gallery__caption">${item.caption}</span>
  </button>
</figure>`;
}

export function placeholderField(label: string, value: string) {
  return value
    ? `<span>${value}</span>`
    : `<span class="todo" title="Information à compléter avant la mise en ligne">À compléter : ${label}</span>`;
}
