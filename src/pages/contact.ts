import { site, hours } from "../data/site.ts";
import { layout, pageHero, breadcrumbSchema } from "../lib/html.ts";
import { mapBlock } from "../lib/map.ts";

const body = `
${pageHero({
  eyebrow: "Contact",
  title: "Un appel, et le rendez-vous est pris.",
  text: "La prise de rendez-vous se fait uniquement par téléphone, pour vérifier ensemble la durée et la disponibilité. Vous trouverez ici l'adresse, les horaires et comment venir.",
  crumbs: [{ name: "Contact", path: "/contact" }],
})}

<section class="section section--tight">
  <div class="shell contact-grid">
    <div class="contact-card contact-card--phone">
      <p class="eyebrow">Téléphone</p>
      <a class="contact-phone" href="tel:${site.phone}">${site.phoneDisplay}</a>
      <p>Du lundi au samedi de 10h30 à 19h45, le dimanche de 12h à 19h45.</p>
      <a class="btn btn--solid btn--large" href="tel:${site.phone}">Appeler maintenant</a>
      <button class="copy-phone" type="button" data-copy="${site.phoneDisplay}">Copier le numéro</button>
      <p class="copy-note" aria-live="polite" data-copy-note></p>
    </div>

    <div class="contact-card">
      <p class="eyebrow">Adresse</p>
      <address class="contact-address">
        <strong>THE QUEEN</strong><br>
        ${site.address.street}<br>
        ${site.address.postalCode} ${site.address.city}
      </address>
      <p class="contact-meta">${site.metro}</p>
      <a class="btn btn--ghost" href="${site.itineraryUrl}" target="_blank" rel="noopener">Ouvrir l'itinéraire <span aria-hidden="true">↗</span></a>
      <p class="note">Le salon se trouve à quelques pas du métro Edgar-Quinet et à quelques minutes à pied de la gare Montparnasse.</p>
    </div>

    <div class="contact-card contact-card--hours">
      <p class="eyebrow">Horaires</p>
      <table class="hours-table">
        <caption class="sr-only">Horaires d'ouverture de THE QUEEN</caption>
        <tbody>
          ${hours
            .map(
              (h) =>
                `<tr><th scope="row">${h.day}</th><td>${h.open} – ${h.close}</td></tr>`,
            )
            .join("")}
        </tbody>
      </table>
      <p class="note">Les horaires peuvent évoluer les jours fériés. Un appel permet de confirmer la disponibilité.</p>
    </div>

    <div class="contact-card contact-card--mail">
      <p class="eyebrow">Écrire</p>
      <h2>Une question à poser ?</h2>
      <p>Le téléphone reste le moyen le plus direct pour un rendez-vous. Pour une demande écrite, l'adresse électronique du salon sera ajoutée ici prochainement.</p>
      <p class="todo">À compléter : adresse e-mail du salon</p>
      <p class="note">Il n'y a ni formulaire de contact, ni inscription à une newsletter sur ce site : aucune donnée n'y est collectée.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="shell">
    <div class="section__head">
      <p class="eyebrow">Nous trouver</p>
      <h2>4 rue Poinsot, Paris 14e.</h2>
    </div>
    ${mapBlock()}
    <div class="access">
      <article>
        <h3>En métro</h3>
        <p>Ligne 6, station Edgar-Quinet. Lignes 4, 6, 12 et 13, station Montparnasse-Bienvenüe, puis quelques minutes à pied.</p>
      </article>
      <article>
        <h3>En train</h3>
        <p>Gare Montparnasse à proximité immédiate. Sortie côté rue de l'Arrivée, puis direction rue Poinsot.</p>
      </article>
      <article>
        <h3>En voiture</h3>
        <p>Stationnement payant dans le quartier. Les parkings publics de la gare Montparnasse sont les plus proches.</p>
      </article>
    </div>
  </div>
</section>

<section class="section section--sand section--tight">
  <div class="shell contact-reminder">
    <h2>Rappel utile</h2>
    <p>Merci de prévenir par téléphone en cas d'empêchement. Pour une première pose de gel ou de résine, comptez un temps de rendez-vous un peu plus long : nous vous le confirmons lors de l'appel.</p>
    <a class="link-arrow" href="/prestations">Consulter les prestations et tarifs <span aria-hidden="true">→</span></a>
  </div>
</section>
`;

export const contact = layout({
  title: "Contact & accès — 4 rue Poinsot, Paris 14 | THE QUEEN",
  description:
    "Contacter THE QUEEN : 06 88 12 81 83, 4 rue Poinsot, 75014 Paris. Horaires, accès métro Edgar-Quinet et Montparnasse, carte du quartier et prise de rendez-vous par téléphone.",
  path: "/contact",
  active: "contact",
  body,
  schema: [breadcrumbSchema([{ name: "Contact", path: "/contact" }])],
});
