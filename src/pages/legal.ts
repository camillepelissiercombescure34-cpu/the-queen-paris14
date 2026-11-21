import { site, priceDisclaimer } from "../data/site.ts";
import { layout, pageHero, breadcrumbSchema, placeholderField } from "../lib/html.ts";

const updated = `<p class="note">Dernière mise à jour : ${site.reviewsDate}.</p>`;

const mentionsBody = `
${pageHero({
  eyebrow: "Informations légales",
  title: "Mentions légales",
  crumbs: [{ name: "Mentions légales", path: "/mentions-legales" }],
})}
<section class="section section--tight">
  <div class="shell prose">
    <h2>Éditeur du site</h2>
    <p>Le site présente l'activité de <strong>THE QUEEN</strong>, nail bar et institut de beauté.</p>
    <ul class="info-list">
      <li><span>Dénomination</span><span>THE QUEEN</span></li>
      <li><span>Adresse</span><span>${site.address.full}</span></li>
      <li><span>Téléphone</span><span><a href="tel:${site.phone}">${site.phoneDisplay}</a></span></li>
      <li><span>Forme juridique</span><span class="todo">À compléter</span></li>
      <li><span>SIREN / SIRET</span><span class="todo">À compléter</span></li>
      <li><span>Capital social</span><span class="todo">À compléter si applicable</span></li>
      <li><span>Directeur de la publication</span><span class="todo">À compléter : nom et prénom de la gérante</span></li>
      <li><span>Adresse e-mail</span><span class="todo">À compléter</span></li>
    </ul>

    <h2>Hébergement</h2>
    <p>Le site est hébergé par :</p>
    <ul class="info-list">
      <li><span>Hébergeur</span><span>${site.legal.host}</span></li>
      <li><span>Adresse</span><span>${placeholderField("adresse du siège de l'hébergeur", site.legal.hostAddress)}</span></li>
      <li><span>Site</span><span><a href="https://vercel.com" target="_blank" rel="noopener">vercel.com ↗</a></span></li>
    </ul>

    <h2>Propriété intellectuelle</h2>
    <p>L'ensemble des contenus présents sur ce site (textes, identité visuelle, éléments graphiques, mise en page) est protégé par le droit de la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite, à l'exception des courtes citations accompagnées d'un lien vers le site.</p>
    <p>Les photographies actuellement en ligne sont des visuels d'illustration provisoires. Elles ne représentent pas le salon et seront remplacées par des photographies authentiques, utilisées avec l'accord de la gérante.</p>

    <h2>Tarifs et informations</h2>
    <p>${priceDisclaimer}</p>
    <p>Les informations relatives aux horaires et aux prestations sont données à titre indicatif et peuvent évoluer, notamment les jours fériés. Seul un échange téléphonique permet de confirmer un rendez-vous, une durée ou un tarif.</p>

    <h2>Liens externes</h2>
    <p>Ce site contient des liens vers des services tiers (Treatwell, Google Maps, OpenStreetMap). THE QUEEN n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou à leurs pratiques en matière de données personnelles.</p>

    <h2>Médiation de la consommation</h2>
    <p>Conformément aux articles L.612-1 et suivants du Code de la consommation, le consommateur peut recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige.</p>
    <p>${placeholderField("nom et coordonnées du médiateur de la consommation", site.legal.mediator)}</p>

    <h2>Responsabilité</h2>
    <p>THE QUEEN s'efforce d'assurer l'exactitude des informations diffusées sur ce site, sans pouvoir garantir qu'elles soient exemptes d'erreurs. L'utilisation des informations et contenus se fait sous la responsabilité exclusive de l'utilisateur.</p>
    ${updated}
  </div>
</section>
`;

const privacyBody = `
${pageHero({
  eyebrow: "Informations légales",
  title: "Politique de confidentialité",
  crumbs: [{ name: "Confidentialité", path: "/confidentialite" }],
})}
<section class="section section--tight">
  <div class="shell prose">
    <h2>Une donnée collectée : aucune</h2>
    <p>Ce site est un site vitrine. Il ne comporte ni formulaire de contact, ni espace client, ni inscription à une newsletter, ni boutique. Aucune donnée personnelle n'y est collectée, enregistrée ou transmise par le site lui-même.</p>
    <p>Aucun outil de mesure d'audience, aucun pixel publicitaire et aucun réseau social intégré n'est utilisé.</p>

    <h2>Responsable du traitement</h2>
    <p>Le responsable du traitement est THE QUEEN, ${site.address.full}.</p>
    <p>Contact : ${placeholderField("adresse e-mail du responsable de traitement", site.legal.email)} — ou par téléphone au <a href="tel:${site.phone}">${site.phoneDisplay}</a>.</p>

    <h2>Le cas du rendez-vous téléphonique</h2>
    <p>Lorsque vous appelez le salon, les informations que vous communiquez (nom, numéro de téléphone, prestation souhaitée, éventuelles précisions utiles) sont utilisées uniquement pour organiser et honorer votre rendez-vous. Elles ne servent à aucune prospection commerciale et ne sont pas cédées à des tiers.</p>
    <p>Base légale : l'exécution de la prestation demandée et l'intérêt légitime du salon à gérer ses rendez-vous.</p>
    <p>Durée de conservation : ${placeholderField("durée de conservation des coordonnées de rendez-vous", site.legal.retention)}.</p>

    <h2>Sous-traitants et destinataires</h2>
    <p>Seul l'hébergeur du site, ${site.legal.host}, traite les données techniques de connexion (adresse IP, journaux serveur) nécessaires à la mise à disposition du site et à sa sécurité.</p>
    <p>Aucun transfert de données n'est réalisé à des fins commerciales.</p>

    <h2>Vos droits</h2>
    <p>Vous disposez des droits d'accès, de rectification, d'effacement, de limitation et d'opposition prévus par le RGPD. Pour les exercer, contactez le salon par téléphone ou par courriel à l'adresse indiquée ci-dessus.</p>
    <p>Vous pouvez également introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener">cnil.fr ↗</a> — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.</p>

    <h2>Délégué à la protection des données</h2>
    <p>${site.legal.dpo ? site.legal.dpo : "Aucun délégué à la protection des données n'a été désigné. Si une désignation intervient, ses coordonnées seront publiées sur cette page."}</p>

    <h2>Sécurité</h2>
    <p>Le site est servi en HTTPS. Les accès techniques sont limités au strict nécessaire. En cas d'incident affectant des données personnelles, les autorités compétentes seraient informées conformément aux obligations légales.</p>

    <h2>Modification de cette politique</h2>
    <p>Cette politique peut être mise à jour pour refléter une évolution du site ou de la réglementation. La date de dernière mise à jour figure en bas de page.</p>
    ${updated}
  </div>
</section>
`;

const cookiesBody = `
${pageHero({
  eyebrow: "Informations légales",
  title: "Cookies et traceurs",
  crumbs: [{ name: "Cookies", path: "/cookies" }],
})}
<section class="section section--tight">
  <div class="shell prose">
    <h2>Aucun cookie déposé par ce site</h2>
    <p>Ce site ne dépose aucun cookie et n'utilise aucun traceur : ni cookie de mesure d'audience, ni cookie publicitaire, ni cookie de réseau social. C'est pourquoi aucune bannière de consentement ne vous est présentée : il n'y a rien à consentir.</p>

    <h2>Polices d'écriture</h2>
    <p>Les polices Cormorant Garamond et Jost sont hébergées directement sur ce site. Votre navigateur ne contacte donc pas Google Fonts et aucune adresse IP n'est transmise à ce service lors de la consultation des pages.</p>

    <h2>La carte du salon</h2>
    <p>La carte du quartier est d'abord affichée sous forme de plan dessiné, sans appel extérieur. La carte interactive OpenStreetMap n'est chargée qu'après un clic sur « Afficher la carte interactive ». À ce moment-là, votre navigateur contacte les serveurs d'OpenStreetMap, qui peuvent recevoir votre adresse IP et déposer ses propres cookies techniques. Consultez la politique de confidentialité d'OpenStreetMap : <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener">osmfoundation.org ↗</a>.</p>

    <h2>Liens vers des services tiers</h2>
    <p>Les liens vers Treatwell et Google Maps ouvrent ces services dans un nouvel onglet. Ils ne chargent aucun contenu tiers tant que vous ne cliquez pas. Une fois sur ces sites, leurs propres politiques de cookies s'appliquent.</p>

    <h2>Gérer les cookies dans votre navigateur</h2>
    <p>Vous pouvez à tout moment supprimer ou bloquer les cookies depuis les réglages de votre navigateur (Chrome, Safari, Firefox, Edge). Le blocage des cookies n'affecte pas la consultation de ce site, qui fonctionne sans cookie.</p>

    <h2>Contact</h2>
    <p>Pour toute question relative aux cookies ou aux données personnelles : <a href="tel:${site.phone}">${site.phoneDisplay}</a> — ${placeholderField("adresse e-mail", site.legal.email)}.</p>
    ${updated}
  </div>
</section>
`;

export const mentions = layout({
  title: "Mentions légales | THE QUEEN Paris 14",
  description:
    "Mentions légales du site de THE QUEEN, nail bar au 4 rue Poinsot, 75014 Paris : éditeur, hébergement, propriété intellectuelle et médiation.",
  path: "/mentions-legales",
  active: "legal",
  body: mentionsBody,
  schema: [breadcrumbSchema([{ name: "Mentions légales", path: "/mentions-legales" }])],
});

export const privacy = layout({
  title: "Politique de confidentialité | THE QUEEN Paris 14",
  description:
    "Politique de confidentialité de THE QUEEN : aucun formulaire, aucun cookie, aucune donnée collectée par le site. Vos droits RGPD et contact du salon.",
  path: "/confidentialite",
  active: "legal",
  body: privacyBody,
  schema: [breadcrumbSchema([{ name: "Confidentialité", path: "/confidentialite" }])],
});

export const cookies = layout({
  title: "Cookies et traceurs | THE QUEEN Paris 14",
  description:
    "Ce site n'utilise aucun cookie ni traceur : polices auto-hébergées, carte OpenStreetMap chargée uniquement sur clic. Explications et gestion des cookies.",
  path: "/cookies",
  active: "legal",
  body: cookiesBody,
  schema: [breadcrumbSchema([{ name: "Cookies", path: "/cookies" }])],
});
