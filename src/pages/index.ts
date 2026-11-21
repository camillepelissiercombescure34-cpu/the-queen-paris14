import type { Page } from "../lib/types.ts";
import { home } from "./home.ts";
import { prestations } from "./prestations.ts";
import { salon } from "./salon.ts";
import { galerie } from "./galerie.ts";
import { contact } from "./contact.ts";
import { mentions, privacy, cookies } from "./legal.ts";

export const pages: Page[] = [
  { path: "/", file: "index.html", html: home, priority: "1.0", changefreq: "monthly" },
  { path: "/prestations", file: "prestations/index.html", html: prestations, priority: "0.9", changefreq: "monthly" },
  { path: "/le-salon", file: "le-salon/index.html", html: salon, priority: "0.8", changefreq: "yearly" },
  { path: "/galerie", file: "galerie/index.html", html: galerie, priority: "0.7", changefreq: "monthly" },
  { path: "/contact", file: "contact/index.html", html: contact, priority: "0.9", changefreq: "yearly" },
  { path: "/mentions-legales", file: "mentions-legales/index.html", html: mentions, priority: "0.2", changefreq: "yearly" },
  { path: "/confidentialite", file: "confidentialite/index.html", html: privacy, priority: "0.2", changefreq: "yearly" },
  { path: "/cookies", file: "cookies/index.html", html: cookies, priority: "0.2", changefreq: "yearly" },
];
