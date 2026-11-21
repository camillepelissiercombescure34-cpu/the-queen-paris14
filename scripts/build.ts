import { mkdir, writeFile, cp, readFile, rm, readdir, access } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { pages } from "../src/pages/index.ts";
import { site } from "../src/data/site.ts";
import { layout, pageHero, callBand } from "../src/lib/html.ts";

const root = join(import.meta.dirname, "..");
const dist = join(root, "dist");
const today = new Date().toISOString().slice(0, 10);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const page of pages) {
  const output = join(dist, page.file);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, page.html, "utf8");
}

await cp(join(root, "src/assets"), join(dist, "assets"), { recursive: true });

const notFoundBody = `
${pageHero({
  eyebrow: "Erreur 404",
  title: "Cette page n'existe pas.",
  text: "Le lien que vous avez suivi est peut-être ancien, ou l'adresse comporte une erreur. Vous pouvez rejoindre l'accueil ou nous appeler directement.",
})}
<section class="section section--tight">
  <div class="shell">
    <div class="split__actions">
      <a class="btn btn--solid" href="/">Retour à l'accueil</a>
      <a class="btn btn--ghost" href="/prestations">Voir les prestations</a>
    </div>
  </div>
</section>
${callBand()}
`;

await writeFile(
  join(dist, "404.html"),
  layout({
    title: "Page introuvable (404) | THE QUEEN Paris 14",
    description: "La page demandée n'existe pas. Retrouvez THE QUEEN, nail bar au 4 rue Poinsot, Paris 14e.",
    path: "/404",
    active: "",
    body: notFoundBody,
    noindex: true,
  }),
  "utf8",
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${site.url}${page.path === "/" ? "/" : page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap, "utf8");

await writeFile(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
  "utf8",
);

/* --- Audit ---------------------------------------------------------------- */

const failures: string[] = [];
const warnings: string[] = [];
const htmlFiles: string[] = [];

async function walk(dir: string): Promise<void> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}

const exists = async (path: string) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

await walk(dist);

let telCount = 0;
let imageCount = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const name = file.slice(dist.length + 1);

  const title = html.match(/<title>([^<]*)<\/title>/i);
  const description = html.match(/<meta name="description" content="([^"]*)"/i);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/i);
  const h1 = html.match(/<h1[\s>]/gi);
  const lang = html.match(/<html lang="fr"/i);

  if (!title) failures.push(`${name}: <title> manquant`);
  else if (title[1].length > 72) warnings.push(`${name}: titre long (${title[1].length} car.)`);

  if (!description) failures.push(`${name}: meta description manquante`);
  else if (description[1].length < 70 || description[1].length > 175)
    warnings.push(`${name}: description ${description[1].length} car.`);

  if (!canonical) failures.push(`${name}: canonique manquante`);
  if (!lang) failures.push(`${name}: attribut lang="fr" manquant`);
  if (!h1 || h1.length !== 1) failures.push(`${name}: ${h1 ? h1.length : 0} <h1> (1 attendu)`);

  if (/<form[\s>]/i.test(html)) failures.push(`${name}: formulaire détecté`);
  if (/add[-_]?to[-_]?cart|panier|acheter|commander|mon compte|paiement/i.test(html))
    failures.push(`${name}: vocabulaire de vente détecté`);

  const images = html.match(/<img\b[^>]*>/gi) ?? [];
  imageCount += images.length;
  for (const img of images) {
    if (!/\balt="/i.test(img)) failures.push(`${name}: image sans alt`);
    if (!/\bwidth="/i.test(img) || !/\bheight="/i.test(img))
      warnings.push(`${name}: image sans dimensions`);
  }

  for (const match of html.matchAll(/href="(tel:[^"]+)"/g)) {
    telCount += 1;
    if (!match[1].includes(site.phone)) failures.push(`${name}: numéro inattendu ${match[1]}`);
  }

  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const target = match[1];
    let candidate = join(dist, target);
    if (target.endsWith("/")) candidate = join(candidate, "index.html");
    else if (!extname(target)) candidate = join(candidate, "index.html");
    if (!(await exists(candidate))) failures.push(`${name}: lien mort ${target}`);
  }
}

const requiredAssets = [
  "assets/styles.css",
  "assets/fonts.css",
  "assets/main.js",
  "assets/favicon.svg",
  "assets/fonts/cormorant-var.woff2",
  "assets/fonts/jost-var.woff2",
  "assets/img/hero-salon.avif",
  "sitemap.xml",
  "robots.txt",
  "404.html",
];
for (const asset of requiredAssets) {
  if (!(await exists(join(dist, asset)))) failures.push(`asset manquant : ${asset}`);
}

console.log("— Build THE QUEEN —");
console.log(`${pages.length} pages générées + 404, sitemap et robots.txt`);
console.log(`${htmlFiles.length} fichiers HTML audités`);
console.log(`${telCount} liens téléphoniques (${site.phoneDisplay})`);
console.log(`${imageCount} images avec attribut alt vérifié`);
if (warnings.length) {
  console.log(`\n${warnings.length} avertissement(s) :`);
  warnings.forEach((warning) => console.log(`  · ${warning}`));
}
if (failures.length) {
  console.error(`\n${failures.length} erreur(s) :`);
  failures.forEach((failure) => console.error(`  ✗ ${failure}`));
  process.exit(1);
}
console.log("\nAudit OK : liens internes, téléphone, formulaires, alt et vente.");
