import { site, categories, priceDisclaimer } from "../data/site.ts";
import { layout, pageHero, callBand, breadcrumbSchema } from "../lib/html.ts";

const rows = categories
  .map(
    (category) => `
<section class="price-block" id="${category.id}">
  <header class="price-block__head">
    <span class="price-block__letter" aria-hidden="true">${category.letter}</span>
    <div class="price-block__title">
      <h2>${category.title}</h2>
      <p>${category.intro}</p>
    </div>
    <span class="price-block__from">${category.from}</span>
  </header>
  <ul class="price-list">
    ${category.rows
      .map(
        (row) => `
    <li class="price-list__row">
      <span class="price-list__label">${row.label}${
        row.detail ? `<span class="price-list__detail">${row.detail}</span>` : ""
      }</span>
      <span class="price-list__price">${row.price}</span>
    </li>`,
      )
      .join("")}
  </ul>
</section>`,
  )
  .join("");

const body = `
${pageHero({
  eyebrow: "Prestations & tarifs",
  title: "Des soins précis, des tarifs clairs.",
  text: "Manucure, semi-permanent, faux ongles, beauté des pieds et épilation. Les prix ci-dessous sont indiqués « à partir de » : la longueur, la forme et l'état des ongles peuvent faire varier le tarif, toujours annoncé avant la prestation.",
  crumbs: [{ name: "Prestations & tarifs", path: "/prestations" }],
})}

<div class="shell section section--tight">
  <div class="price-note">
    <p>${priceDisclaimer}</p>
  </div>

  <nav class="anchor-nav" aria-label="Catégories de prestations">
    ${categories
      .map(
        (category) => `
    <a class="anchor-nav__item" href="#${category.id}">
      <span class="anchor-nav__letter" aria-hidden="true">${category.letter}</span>
      <span class="anchor-nav__label">${category.title}</span>
      <span class="anchor-nav__from">${category.from}</span>
    </a>`,
      )
      .join("")}
  </nav>

  <div class="price-sections">
    ${rows}
    <aside class="other-services" id="autres-prestations">
      <p class="eyebrow">Également au salon</p>
      <h2>Autres prestations</h2>
      <p>Au-delà des ongles, THE QUEEN propose l'épilation à la cire ainsi que des soins du regard et du visage. Ces prestations complètent un rendez-vous ou s'effectuent seules.</p>
      <ul class="other-services__list">
        <li><span>Épilation à la cire</span><span>dès 8 €</span></li>
        <li><span>Beauté du regard (rehaussement et teinture)</span><span>dès 79 €</span></li>
        <li><span>Teinture des cils</span><span>Nous consulter</span></li>
        <li><span>Soin du visage</span><span>Nous consulter</span></li>
      </ul>
      <p class="note">Les tarifs des zones d'épilation et des soins du visage sont confirmés par téléphone, selon la zone et la durée.</p>
    </aside>
  </div>

  <div class="price-help">
    <div>
      <h2>Une hésitation sur la prestation ?</h2>
      <p>Décrivez-nous vos ongles et ce que vous souhaitez : nous vous indiquons la prestation adaptée et sa durée, puis nous fixons le rendez-vous au téléphone.</p>
    </div>
    <a class="btn btn--solid btn--large" href="tel:${site.phone}">Appeler le ${site.phoneDisplay}</a>
  </div>
</div>

${callBand()}
`;

export const prestations = layout({
  title: "Prestations & tarifs — manucure et faux ongles | THE QUEEN",
  description:
    "Tarifs THE QUEEN Paris 14 : manucure dès 10 €, semi-permanent dès 20,70 €, faux ongles dès 25 €, beauté des pieds dès 28,80 €. Rendez-vous au 06 88 12 81 83.",
  path: "/prestations",
  active: "prestations",
  body,
  schema: [
    breadcrumbSchema([
      { name: "Prestations & tarifs", path: "/prestations" },
    ]),
  ],
});
