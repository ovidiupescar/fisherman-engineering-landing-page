// Dev aid: render the BRAIN scene variants to PNG with headless Chrome (no server needed).
// Usage: node tools/brain-figure/render.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { brainScene } from "../../src/lib/brain-scene.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "out");
const PUBLIC = resolve(HERE, "../../public");
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
mkdirSync(OUT, { recursive: true });

const shots = [
  ["desktop", 1200, 880],
  ["mobile", 420, 1440],
  ["preview", 1200, 802],
];
for (const [variant, w, h] of shots) {
  const svg = brainScene(variant, variant).replaceAll('href="/brain/', `href="${pathToFileURL(PUBLIC).href}/brain/`);
  const html = join(OUT, `${variant}.html`);
  writeFileSync(html, `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#061525}svg{display:block;width:100vw;height:auto}</style>${svg}`);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--screenshot=${join(OUT, `${variant}.png`)}`, `--window-size=${w},${h}`, "--force-device-scale-factor=2", pathToFileURL(html).href], { stdio: "ignore" });
  console.log("rendered", variant, (svg.length / 1024).toFixed(0) + " KB svg");
}

// social image for /projects/brain (1200 x 630), written to public/brain/brain-og.png
{
  const svg = brainScene("preview", "og").replaceAll('href="/brain/', `href="${pathToFileURL(PUBLIC).href}/brain/`);
  const html = join(OUT, "og.html");
  writeFileSync(html, `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;width:1200px;height:630px;background:#061525;display:flex;justify-content:center;overflow:hidden}svg{height:630px;width:auto}</style>${svg}`);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--screenshot=${join(PUBLIC, "brain", "brain-og.png")}`, "--window-size=1200,630", pathToFileURL(html).href], { stdio: "ignore" });
  console.log("rendered og image");
}
