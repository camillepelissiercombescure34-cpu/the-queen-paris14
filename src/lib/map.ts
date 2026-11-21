import { site } from "../data/site.ts";

/**
 * Plan indicatif dessiné localement. L'iframe OpenStreetMap n'est injectée
 * qu'après un clic : aucun appel à un service tiers au chargement de la page.
 */
export function mapBlock() {
  const { lat, lng } = site.geo;
  const bbox = `${(lng - 0.006).toFixed(4)},${(lat - 0.004).toFixed(4)},${(lng + 0.006).toFixed(4)},${(lat + 0.004).toFixed(4)}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`;

  return `
<div class="map" data-map>
  <div class="map__placeholder">
    <svg class="map__plan" viewBox="0 0 480 340" role="img" aria-label="Plan indicatif du quartier Edgar-Quinet : le salon se situe au 4 rue Poinsot, entre le boulevard Edgar-Quinet et la gare Montparnasse.">
      <rect width="480" height="340" fill="#EFE8DD"/>
      <g fill="#F7F4EF" stroke="#DED2C1" stroke-width="1">
        <path d="M0 34h480v40H0z"/><path d="M0 246h480v44H0z"/>
        <path d="M42 0h34v340H42z"/><path d="M382 0h38v340h-38z"/>
      </g>
      <g stroke="#C9B79F" stroke-width="7" fill="none" stroke-linecap="round">
        <path d="M-10 200 240 176 500 150"/>
        <path d="M120 -10 160 120 200 340"/>
      </g>
      <g stroke="#DED2C1" stroke-width="2" fill="none">
        <path d="M0 120h480"/><path d="M0 290h480"/><path d="M300 0v340"/><path d="M240 0v340"/>
      </g>
      <g font-family="Jost, sans-serif" font-size="11" fill="#8A7862" letter-spacing="1">
        <text x="196" y="28">BD EDGAR-QUINET</text>
        <text x="300" y="266">RUE POINSOT</text>
        <text x="52" y="150" transform="rotate(-90 52 150)">RUE DE LA GAÎTÉ</text>
        <text x="392" y="150" transform="rotate(-90 392 150)">AV. DU MAINE</text>
      </g>
      <g>
        <circle cx="300" cy="196" r="22" fill="#B89B73" opacity=".18"/>
        <circle cx="300" cy="196" r="13" fill="#B89B73" opacity=".3"/>
        <circle cx="300" cy="196" r="6" fill="#332821"/>
        <text x="316" y="200" font-family="Jost, sans-serif" font-size="12" font-weight="500" fill="#332821">THE QUEEN</text>
      </g>
      <g transform="translate(408 300)" opacity=".7">
        <circle r="17" fill="#FCFBF8" stroke="#B89B73"/>
        <path d="M0 -11 4 3 0 0 -4 3Z" fill="#332821"/>
        <text y="15" text-anchor="middle" font-family="Jost, sans-serif" font-size="8" fill="#8A7862">N</text>
      </g>
    </svg>
    <div class="map__overlay">
      <p class="map__address"><strong>4 rue Poinsot</strong><br>75014 Paris — Edgar-Quinet</p>
      <button class="btn btn--solid btn--small" type="button" data-map-load>Afficher la carte interactive</button>
      <p class="map__note">Carte OpenStreetMap chargée uniquement si vous cliquez.</p>
    </div>
  </div>
  <template data-map-template>
    <iframe src="${src}" title="Carte — THE QUEEN, 4 rue Poinsot, 75014 Paris" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </template>
</div>`;
}
