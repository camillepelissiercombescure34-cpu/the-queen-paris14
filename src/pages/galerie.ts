import { site, gallery, galleryCategories } from "../data/site.ts";
import { layout, pageHero, callBand, galleryFigure, breadcrumbSchema } from "../lib/html.ts";

const body = `
${pageHero({
  eyebrow: "Galerie",
  title: "Des finitions à regarder de près.",
  text: "Nudes, French, traits dorés, beauté des pieds : une sélection de gestes et d'ambiances. Les visuels ci-dessous sont des illustrations provisoires, en attendant les photographies du salon.",
  crumbs: [{ name: "Galerie", path: "/galerie" }],
})}

<section class="section section--tight">
  <div class="shell">
    <div class="filters" role="group" aria-label="Filtrer la galerie par catégorie" data-filters>
      ${galleryCategories
        .map(
          (category, index) =>
            `<button class="filter${index === 0 ? " is-active" : ""}" type="button" data-filter="${category}" aria-pressed="${index === 0}">${category}</button>`,
        )
        .join("")}
    </div>
    <p class="note note--live" aria-live="polite" data-gallery-count>${gallery.length} visuels affichés</p>

    <div class="gallery gallery--full" data-gallery>
      ${gallery
        .map(
          (item, index) => `
      <figure class="gallery__item" data-category="${item.category}">
        <button class="gallery__button" type="button" data-lightbox="${index}" data-src="${item.src}" data-alt="${item.alt}" data-caption="${item.caption}" aria-label="Agrandir : ${item.caption}">
          <img src="${item.src}" alt="${item.alt}" width="1100" height="818" loading="lazy" decoding="async">
          <span class="gallery__caption">${item.caption}</span>
        </button>
      </figure>`,
        )
        .join("")}
    </div>

    <p class="disclaimer">${site.legal.photoCredit} Aucune de ces images ne représente le salon : elles seront remplacées dès réception des photographies authentiques, avec l'accord de la gérante.</p>
  </div>
</section>

<dialog class="lightbox" data-lightbox-dialog aria-label="Galerie photo">
  <button class="lightbox__close" type="button" data-lightbox-close aria-label="Fermer la galerie">×</button>
  <button class="lightbox__nav lightbox__nav--prev" type="button" data-lightbox-prev aria-label="Image précédente">‹</button>
  <figure class="lightbox__figure">
    <img data-lightbox-img src="/assets/img/mains-nude.avif" alt="" width="1100" height="818">
    <figcaption class="lightbox__caption">
      <span data-lightbox-caption></span>
      <span class="lightbox__count" data-lightbox-count></span>
    </figcaption>
  </figure>
  <button class="lightbox__nav lightbox__nav--next" type="button" data-lightbox-next aria-label="Image suivante">›</button>
</dialog>

<section class="section section--sand">
  <div class="shell gallery-cta">
    <div>
      <p class="eyebrow">Votre tour</p>
      <h2>Une envie précise en tête ?</h2>
      <p>Apportez une photo ou décrivez-nous le rendu souhaité : nous vous dirons ce qui est possible avec vos ongles, et sous quel délai.</p>
    </div>
    <a class="btn btn--solid btn--large" href="tel:${site.phone}">Réserver au ${site.phoneDisplay}</a>
  </div>
</section>

${callBand()}
`;

export const galerie = layout({
  title: "Galerie — manucure, French, nail art | THE QUEEN Paris 14",
  description:
    "Galerie de THE QUEEN, nail bar à Paris 14 : manucure nude, French, nail art doré, beauté des pieds et ambiance du salon. Visuels d'illustration provisoires.",
  path: "/galerie",
  active: "galerie",
  body,
  image: "/assets/img/mains-nude.avif",
  schema: [breadcrumbSchema([{ name: "Galerie", path: "/galerie" }])],
});
