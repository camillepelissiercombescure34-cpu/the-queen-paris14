import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const root = join(import.meta.dirname, "..", "dist");
const port = Number(process.env.PORT) || 4173;
const host = process.env.HOST || "127.0.0.1";

const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    let pathname = decodeURIComponent(url.pathname);
    let filePath = join(root, normalize(pathname).replace(/^(\.\.[/\\])+/, ""));

    try {
      const info = await stat(filePath);
      if (info.isDirectory()) filePath = join(filePath, "index.html");
    } catch {
      if (!extname(pathname)) filePath = join(filePath, "index.html");
    }

    let body: Buffer;
    try {
      body = await readFile(filePath);
    } catch {
      body = await readFile(join(root, "404.html"));
      response.writeHead(404, { "Content-Type": types[".html"] });
      response.end(body);
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[extname(filePath)] ?? "application/octet-stream",
      "Cache-Control": extname(filePath) === ".html" ? "no-cache" : "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(body);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Erreur serveur");
    console.error(error);
  }
});

server.listen(port, host, () => {
  console.log(`THE QUEEN — http://${host}:${port}`);
});
