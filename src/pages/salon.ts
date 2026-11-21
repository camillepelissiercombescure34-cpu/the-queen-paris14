import { site, hours } from "../data/site.ts";
import { layout, pageHero, callBand, breadcrumbSchema } from "../lib/html.ts";
import { mapBlock } from "../lib/map.ts";

const body = `
${pageHero({
  eyebrow: "Le salon",
  title: "Un nail bar à taille humaine, dans le 14e.",
  text: "THE QUEEN réunit la précision d'un travail d'onglerie et la douceur d'un institut de quartier. Un lieu où l'on vient pour un rendez-vous, et où l'on revient pour l'attention.",
  crumbs: [{ name: "Le salon", path: "/le-salon" }],
})}

<section class="section section--tight">
  <div class="shell split">
    <div class="split__media">
      <img src="/assets/img/interieur-detail.avif" alt="Coin d'accueil du salon, mur crème et applique de laiton — visuel d'illustration" width="880" height="1184" loading="lazy" decoding="async">
      <span class="media-note">Visuel d'illustration</span>
    </div>
    <div class="split__body">
      <p class="eyebrow">Notre approche</p>
      <h2>Prendre le temps, faire juste.</h2>
      <p>Le salon est installé au 4 rue Poinsot, dans le quartier Edgar-Quinet, à quelques minutes de la gare Montparnasse. Derrière la vitrine, un espace lumineux aux teintes claires, pensé pour rester calme même aux heures les plus fréquentées.</p>
      <p>Ici, la manucure n'est pas un geste pressé. On regarde la forme naturelle de l'ongle, on prépare la cuticule avec douceur, on adapte la longueur et la teinte. Pour une pose de gel ou de résine, on valide ensemble la forme, la longueur et le rendu avant de commencer.</p>
      <p>L'équipe, menée par Yan et Xiangyu, travaille avec des produits professionnels, dont la gamme O.P.I., et applique les règles d'hygiène attendues dans un institut : matériel désinfecté, plan de travail nettoyé entre chaque cliente et usage unique pour ce qui doit l'être.</p>
      <a class="link-arrow" href="/prestations">Voir les prestations et tarifs <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>

<section class="section section--sand">
  <div class="shell">
    <div class="section__head">
      <p class="eyebrow">Ce qui guide nos gestes</p>
      <h2>Trois principes simples.</h2>
    </div>
    <div class="values">
      <article class="value">
        <span class="value__number" aria-hidden="true">01</span>
        <h3>L'écoute d'abord</h3>
        <p>La forme, la longueur, la teinte, la tenue souhaitée : rien n'est décidé à votre place. Si une pose ne convient pas à l'état de vos ongles, nous vous le disons.</p>
      </article>
      <article class="value">
        <span class="value__number" aria-hidden="true">02</span>
        <h3>La précision du geste</h3>
        <p>Une manucure nette, une French régulière, une pose sans surépaisseur. Le détail compte, y compris dans les finitions que l'on ne voit qu'en regardant de près.</p>
      </article>
      <article class="value">
        <span class="value__number" aria-hidden="true">03</span>
        <h3>L'hygiène sans exception</h3>
        <p>Matériel désinfecté, poste de travail préparé pour chaque rendez-vous, produits professionnels. C'est la base, pas un argument.</p>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="shell split split--reverse">
    <div class="split__body">
      <p class="eyebrow">Informations pratiques</p>
      <h2>Venir au salon.</h2>
      <p>${site.address.full}<br>${site.metro}</p>
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
      <p class="note">Le salon accueille uniquement sur rendez-vous téléphonique, afin de consacrer à chacune le temps nécessaire.</p>
      <div class="split__actions">
        <a class="btn btn--solid" href="tel:${site.phone}">Réserver au ${site.phoneDisplay}</a>
        <a class="btn btn--ghost" href="${site.itineraryUrl}" target="_blank" rel="noopener">Itinéraire <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <div class="split__media">${mapBlock()}</div>
  </div>
</section>

${callBand()}
`;

export const salon = layout({
  title: "Le salon — nail bar à Edgar-Quinet, Paris 14 | THE QUEEN",
  description:
    "Découvrez THE QUEEN, nail bar et institut de beauté au 4 rue Poinsot, Paris 14e : approche, hygiène, produits professionnels et informations pratiques.",
  path: "/le-salon",
  active: "salon",
  body,
  schema: [breadcrumbSchema([{ name: "Le salon", path: "/le-salon" }])],
});
