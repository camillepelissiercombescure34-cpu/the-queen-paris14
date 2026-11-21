export type Page = {
  /** Chemin public, sans slash final (sauf la racine). */
  path: string;
  /** Nom du fichier de sortie, relatif à dist/. */
  file: string;
  html: string;
  priority: string;
  changefreq: "weekly" | "monthly" | "yearly";
};
