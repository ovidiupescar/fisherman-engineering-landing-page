// BRAIN — "A Living Memory for AI Agents". Pure SVG components shared by the BRAIN page (interactive,
// desktop + mobile layouts) and the homepage preview (static). No runtime dependencies.
//
// Characters: Grok-Bot-style placeholders (flat organic shape + two white capsule eyes), drawn for this
// site; not xAI's avatar assets, and no endorsement is implied. Hermes Agent uses the official dark icon
// from github.com/NousResearch/hermes-agent, rendered unmodified to /brain/hermes-agent.png.
// Everything shown is synthetic: no BRAIN data, endpoints or project names.

const f = (n) => Math.round(n * 10) / 10;

export const ACC = {
  amber: { a: "#ffd2a3", b: "#f59a4c", c: "#c4611f", glow: "#ff9d52", deep: "#7a3a10" },
  teal: { a: "#a6efe3", b: "#43c3b2", c: "#1f7d72", glow: "#53e3cf", deep: "#0f4f49" },
  steel: { a: "#e8f3fd", b: "#9cc3e4", c: "#4f7fae", glow: "#a8cdef", deep: "#1f4a73" },
  violet: { a: "#e0daff", b: "#9d92f2", c: "#5b4fc4", glow: "#a99ff6", deep: "#352c85" },
};
const INK = "#dfe9f3";
const FONT = "Inter, system-ui, sans-serif";

// ------------------------------------------------------------------ defs (ids are prefixed per SVG)
function defs(p) {
  const g = (n, c) => `
    <linearGradient id="${p}card-${n}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.a}"/><stop offset="1" stop-color="${c.b}"/></linearGradient>
    <radialGradient id="${p}aura-${n}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${c.glow}" stop-opacity=".30"/><stop offset=".55" stop-color="${c.glow}" stop-opacity=".08"/><stop offset="1" stop-color="${c.glow}" stop-opacity="0"/></radialGradient>
    <linearGradient id="${p}rimline-${n}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.glow}" stop-opacity=".15"/><stop offset=".5" stop-color="${c.glow}" stop-opacity=".75"/><stop offset="1" stop-color="${c.glow}" stop-opacity=".15"/></linearGradient>
    <linearGradient id="${p}side-${n}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.deep}" stop-opacity=".55"/><stop offset="1" stop-color="#050f1c" stop-opacity=".95"/></linearGradient>
    <radialGradient id="${p}top-${n}" cx=".5" cy=".35" r=".75"><stop offset="0" stop-color="${c.glow}" stop-opacity=".22"/><stop offset=".6" stop-color="#14385c"/><stop offset="1" stop-color="#0d2943"/></radialGradient>`;
  return `<defs>
    ${Object.entries(ACC).map(([n, c]) => g(n, c)).join("")}
    <linearGradient id="${p}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#081c33"/><stop offset="1" stop-color="#051220"/></linearGradient>
    <radialGradient id="${p}bgglow" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#18406a" stop-opacity=".35"/><stop offset="1" stop-color="#18406a" stop-opacity="0"/></radialGradient>
    <linearGradient id="${p}glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".11"/><stop offset="1" stop-color="#fff" stop-opacity=".03"/></linearGradient>
    <linearGradient id="${p}gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".32"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <radialGradient id="${p}flathi" cx=".3" cy=".18" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="${p}flatshade" x1="0" y1=".55" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
    <filter id="${p}b3" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="${p}b8" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
    <filter id="${p}b16" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16"/></filter>
    <filter id="${p}soft" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#020a14" flood-opacity=".45"/></filter>
  </defs>`;
}

// ------------------------------------------------------------------ components
function platform(p, cx, cy, rx, ry, th, n, id) {
  const c = ACC[n];
  return `<g data-space="${id}">
    <ellipse cx="${cx}" cy="${cy - 70}" rx="${rx * 1.35}" ry="${ry * 3.4}" fill="url(#${p}aura-${n})"/>
    <ellipse cx="${cx}" cy="${cy + th + 52}" rx="${f(rx * 0.82)}" ry="${f(ry * 0.2)}" fill="#010812" opacity=".55" filter="url(#${p}b16)"/>
    <path d="M${cx - rx} ${cy} L${cx - rx} ${cy + th} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + th} L${cx + rx} ${cy} A${rx} ${ry} 0 0 1 ${cx - rx} ${cy}Z" fill="url(#${p}side-${n})"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${p}top-${n})"/>
    <path d="M${cx - rx} ${cy} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy}" fill="none" stroke="url(#${p}rimline-${n})" stroke-width="2"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx - 22}" ry="${ry - 9}" fill="none" stroke="${c.glow}" stroke-opacity=".28" stroke-width="1.2" stroke-dasharray="3 7" stroke-linecap="round"/>
  </g>`;
}

// Grok-Bot-style characters: flat organic silhouette, two white capsule eyes carry the expression.
export const BOTS = {
  A: {
    fill: "#ff6a00",
    glow: "#ff8a3d",
    w: 184,
    h: 158,
    path: "M8 -158 C64 -158 94 -118 94 -73 C94 -27 55 0 -2 0 C-57 0 -94 -25 -94 -69 C-94 -119 -49 -158 8 -158Z",
    eyes: [[-26, -96], [14, -102]],
    eye: { w: 17, h: 38, tilt: -14 },
  },
  B: {
    fill: "#00b3a1",
    glow: "#30d9c6",
    w: 164,
    h: 150,
    rot: -7,
    path: "M-44 -150 H44 C70 -150 82 -138 82 -108 V-42 C82 -12 70 0 44 0 H-44 C-70 0 -82 -12 -82 -42 V-108 C-82 -138 -70 -150 -44 -150Z",
    eyes: [[-22, -84], [22, -84]],
    eye: { w: 19, h: 36, tilt: 7 },
  },
};

function eye(x, y, e, i) {
  return `<g transform="translate(${x} ${y}) rotate(${e.tilt})"><g data-eye="${i}" class="be-eye">
      <rect x="${f(-e.w / 2)}" y="${f(-e.h / 2)}" width="${e.w}" height="${e.h}" rx="${f(e.w / 2)}" fill="#fff"/>
    </g><path data-happy="${i}" d="M${f(-e.w * 0.85)} ${f(e.h * 0.12)} Q0 ${f(-e.h * 0.42)} ${f(e.w * 0.85)} ${f(e.h * 0.12)}" fill="none" stroke="#fff" stroke-width="${f(e.w * 0.78)}" stroke-linecap="round" opacity="0"/></g>`;
}

export function grokBot(p, id, x, y, scale = 1) {
  const B = BOTS[id];
  const float = 26;
  const shape = (attrs) => `<path d="${B.path}" ${attrs}/>`;
  const turn = B.rot ? ` rotate(${B.rot} 0 ${-B.h / 2})` : "";
  return `<g data-bot="${id}" transform="translate(${x} ${y}) scale(${scale})">
    <ellipse data-bot-shadow cx="0" cy="6" rx="${f(B.w * 0.4)}" ry="11" fill="#010812" opacity=".55" filter="url(#${p}b8)"/>
    <ellipse cx="0" cy="${-float + 4}" rx="${f(B.w * 0.26)}" ry="6" fill="${B.glow}" opacity=".35" filter="url(#${p}b8)"/>
    <g data-bot-float class="be-float"><g data-bot-body><g transform="translate(0 ${-float})${turn}">
      ${shape(`data-bot-aura fill="${B.glow}" opacity=".28" filter="url(#${p}b16)"`)}
      ${shape(`fill="${B.fill}"`)}
      ${shape(`fill="url(#${p}flathi)"`)}
      ${shape(`fill="url(#${p}flatshade)"`)}
      <g data-eyes>${B.eyes.map(([ex, ey], i) => eye(ex, ey, B.eye, i)).join("")}</g>
    </g></g></g>
  </g>`;
}

const lines = (x, y, w, o = 0.55) =>
  `<rect x="${x}" y="${y}" width="${w}" height="3" rx="1.5" fill="#fff" opacity="${o}"/><rect x="${x}" y="${y + 8}" width="${f(w * 0.7)}" height="3" rx="1.5" fill="#fff" opacity="${f(o * 0.7)}"/>`;

export function card(p, x, y, w, h, n, o = {}) {
  const { glow = false, rot = 0, attrs = "" } = o;
  const c = ACC[n];
  return `<g ${attrs}><g transform="rotate(${rot} ${f(x + w / 2)} ${f(y + h)})">
    ${glow ? `<rect data-card-glow x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${h + 6}" rx="11" fill="${c.glow}" opacity=".5" filter="url(#${p}b8)"/>` : ""}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="url(#${p}card-${n})" filter="url(#${p}soft)"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="url(#${p}gloss)" opacity=".6"/>
    ${lines(x + 7, y + 9, w - 14)}
    ${h > 40 ? `<rect x="${x + 7}" y="${y + h - 14}" width="${f(w * 0.38)}" height="4" rx="2" fill="#fff" opacity=".35"/>` : ""}
  </g></g>`;
}

const rawCard = (x, y, rot, attrs = "") =>
  `<g ${attrs}><g transform="rotate(${rot} ${x + 13} ${y + 34})"><rect x="${x}" y="${y}" width="26" height="34" rx="5" fill="#dbe8f4" opacity=".86"/><rect x="${x + 5}" y="${y + 8}" width="16" height="2.4" rx="1.2" fill="#7f9bb5" opacity=".7"/><rect x="${x + 5}" y="${y + 14}" width="11" height="2.4" rx="1.2" fill="#7f9bb5" opacity=".5"/><rect x="${x + 5}" y="${y + 20}" width="14" height="2.4" rx="1.2" fill="#7f9bb5" opacity=".4"/></g></g>`;

const chip = (x, y, text, color, attrs) =>
  `<g ${attrs} opacity="0"><rect x="${x - text.length * 3.6 - 10}" y="${y - 10}" width="${text.length * 7.2 + 20}" height="20" rx="10" fill="#071a2e" stroke="${color}" stroke-width="1.3"/><text x="${x}" y="${y + 3.8}" text-anchor="middle" font-family="${FONT}" font-size="10" font-weight="700" letter-spacing="1.2" fill="${color}">${text}</text></g>`;

// A project repository: curated cards (2 x 3 grid with one empty slot), raw sources in a tray below.
export function repository(p, x, y, n, id, sc = 1) {
  const c = ACC[n];
  const w = 152;
  const h = 200;
  const out = [];
  const gx = x + 12;
  const gy = y + 40;
  for (let r = 0; r < 2; r++) {
    for (let col = 0; col < 3; col++) {
      const cx = gx + col * 44;
      const cy = gy + r * 52;
      if (r === 1 && col === 2) {
        out.push(`<rect data-slot x="${cx}" y="${cy}" width="38" height="46" rx="8" fill="none" stroke="${c.glow}" stroke-opacity=".5" stroke-width="1.4" stroke-dasharray="3 5"/>`);
        out.push(card(p, cx, cy, 38, 46, n, { glow: true, attrs: `data-newcard opacity="0"` }));
      } else out.push(card(p, cx, cy, 38, 46, n, { attrs: `data-cur="${r * 3 + col}"` }));
    }
  }
  const raws = [0, 1, 2, 3].map((i) => rawCard(x + 26 + i * 30, y + h - 52, [-9, 5, -4, 8][i], i === 3 ? `data-raw="new" opacity="0"` : `data-raw="${i}"`)).join("");
  const bx = x + w / 2;
  const by = y + h;
  return `<g data-repo="${id}" transform="translate(${bx} ${by}) scale(${sc}) translate(${-bx} ${-by})">
    <ellipse cx="${bx}" cy="${by + 4}" rx="${w * 0.5}" ry="11" fill="${c.glow}" opacity=".32" filter="url(#${p}b8)"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="#071a2e" opacity=".62"/>
    <rect data-repo-frame x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="url(#${p}glass)" stroke="${c.glow}" stroke-opacity=".5" stroke-width="1.5"/>
    <rect data-lockring x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" rx="27" fill="none" stroke="${ACC.violet.glow}" stroke-width="2.4" opacity="0"/>
    <rect x="${x + 16}" y="${y + 17}" width="40" height="6" rx="3" fill="${c.a}" opacity=".6"/>
    <circle data-status-halo cx="${x + w - 20}" cy="${y + 20}" r="9" fill="${c.glow}" opacity=".55" filter="url(#${p}b3)"/><circle data-status cx="${x + w - 20}" cy="${y + 20}" r="4.5" fill="${c.a}"/>
    <g data-cards>${out.join("")}</g>
    <rect x="${x + 10}" y="${y + h - 62}" width="${w - 20}" height="52" rx="14" fill="#020b16" opacity=".5"/>
    <g data-raws>${raws}</g>
    <path d="M${x + 24} ${y + 2} H${x + w - 24}" stroke="#fff" stroke-opacity=".5" stroke-width="1.4" stroke-linecap="round"/>
    <g data-check opacity="0"><circle cx="${x + 120}" cy="${y + 118}" r="11" fill="#22c55e"/><path d="M${x + 114.5} ${y + 118} l3.8 3.8 l7 -7.5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></g>
    ${chip(x + w / 2, y - 18, "INDEXED · SEARCHABLE", c.a, "data-chip-indexed")}
    ${chip(x + w / 2, y + h + 22, "COMMITTED · RECEIPT", ACC.violet.a, "data-chip-commit")}
  </g>`;
}

export function library(p, cx, base) {
  const w = 220;
  const x0 = cx - w / 2;
  const top = base - 250;
  const r = w / 2;
  const arch = `M${x0} ${base} V${top + r} A${r} ${r} 0 0 1 ${x0 + w} ${top + r} V${base} Z`;
  const shelves = [base - 62, base - 128, base - 192];
  const tints = ["#e8f3fd", "#cfe3f5", "#b3d1ec", "#dcecfa", "#9cc3e4", "#f3e9d2"];
  let s = "";
  let idx = 0;
  shelves.forEach((sy, si) => {
    const inset = si === 2 ? 46 : si === 1 ? 24 : 18;
    let x = x0 + inset;
    let k = 0;
    while (x < x0 + w - inset - 14) {
      const cw = 13 + ((k * 7 + si * 5) % 9);
      const ch = 34 + ((k * 11 + si * 3) % 20);
      const warm = (k + si) % 5 === 2;
      if (warm) s += `<rect class="be-warm" x="${f(x - 2)}" y="${f(sy - ch - 2)}" width="${cw + 4}" height="${ch + 4}" rx="6" fill="#ffd9a0" opacity=".35" filter="url(#${p}b8)"/>`;
      s += `<rect data-book="${idx++}" x="${f(x)}" y="${f(sy - ch)}" width="${cw}" height="${ch}" rx="4" fill="${warm ? "#ffe3b0" : tints[(k + si) % tints.length]}" opacity="${warm ? 0.95 : 0.78}"/>`;
      x += cw + 5;
      k++;
    }
    s += `<rect x="${x0 + inset - 8}" y="${sy}" width="${w - 2 * inset + 16}" height="5" rx="2.5" fill="#cfe3f5" opacity=".55"/>`;
  });
  return `<g data-lib>
    <ellipse cx="${cx}" cy="${base - 110}" rx="150" ry="170" fill="url(#${p}aura-steel)"/>
    <path d="${arch}" fill="#0b2239" opacity=".6"/>
    <path d="${arch}" fill="url(#${p}glass)"/>
    <ellipse class="be-libglow" cx="${cx}" cy="${base - 8}" rx="92" ry="120" fill="#ffe9c4" opacity=".16" filter="url(#${p}b16)"/>
    ${s}
    <path d="${arch}" fill="none" stroke="url(#${p}rimline-steel)" stroke-width="3.5" stroke-linejoin="round"/>
    <path data-lockring d="${arch}" fill="none" stroke="${ACC.violet.glow}" stroke-width="2.4" opacity="0"/>
  </g>`;
}

const label = (x, y, text, color, size = 12) =>
  `<g transform="translate(${x} ${y})"><circle cx="${f(-(text.length * (size * 0.38)) - 13)}" cy="0" r="4" fill="${color}"/><text x="0" y="${f(size * 0.38)}" text-anchor="middle" font-family="${FONT}" font-size="${size}" font-weight="600" letter-spacing="1.6" fill="#b4c7da">${text}</text></g>`;

// a connection that is dim at rest and lights up only for an authorized operation
const REST = { import: 0.35, scope: 0.3, mcp: 0, curate: 0 };
function connection(d, ends, color, attrs) {
  const kind = (attrs.match(/data-link="(w+)-/) || [])[1];
  return `<g ${attrs} class="be-link" opacity="${REST[kind] ?? 0.35}">
    <path data-glow d="${d}" fill="none" stroke="${color}" stroke-opacity=".5" stroke-width="6" filter="url(#__P__b3)" stroke-linecap="round" opacity="0"/>
    <path data-path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="1 8" stroke-linecap="round"/>
    ${ends.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#071a2e" stroke="${color}" stroke-width="1.8"/><circle cx="${x}" cy="${y}" r="2.2" fill="${color}"/>`).join("")}
  </g>`;
}

// agent tiles for non-Grok clients: Hermes (curator), Claude Code, Codex. Same rounded-tile family.
function agentTile(p, x, y, s, o) {
  const { name, sub = "", color, glyph = "", img = "", attrs = "" } = o;
  const rx = f(s * 0.26);
  return `<g ${attrs} transform="translate(${x} ${y})"><g data-tile>
    <rect data-tile-glow x="${-s / 2 - 4}" y="${-s / 2 - 4}" width="${s + 8}" height="${s + 8}" rx="${rx + 4}" fill="${color}" opacity=".18" filter="url(#${p}b8)"/>
    <rect x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" rx="${rx}" fill="#0b2239" filter="url(#${p}soft)"/>
    ${img ? `<image href="${img}" x="${f(-s / 2 + 5)}" y="${f(-s / 2 + 5)}" width="${s - 10}" height="${s - 10}"/>` : ""}
    ${glyph ? `<text x="0" y="${f(s * 0.12)}" text-anchor="middle" font-family="JetBrains Mono, Consolas, monospace" font-size="${f(s * 0.34)}" font-weight="700" fill="${color}">${glyph}</text>` : ""}
    <rect data-tile-ring x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" rx="${rx}" fill="none" stroke="${color}" stroke-opacity=".55" stroke-width="2"/>
    <text x="0" y="${f(s / 2 + 22)}" text-anchor="middle" font-family="${FONT}" font-size="11" font-weight="700" letter-spacing="1.3" fill="#c8d6e4">${name}</text>
    ${sub ? `<text x="0" y="${f(s / 2 + 38)}" text-anchor="middle" font-family="${FONT}" font-size="10" letter-spacing="1" fill="#7f99b3">${sub}</text>` : ""}
  </g></g>`;
}

const HERMES_IMG = "/brain/hermes-agent.png";

// ------------------------------------------------------------------ layouts
function dust(W, H) {
  let s = "";
  for (let i = 0; i < 40; i++) {
    const x = (i * 331 + 77) % W;
    const y = (i * 173 + 41) % H;
    s += `<circle cx="${x}" cy="${y}" r="${i % 5 === 0 ? 1.6 : 1}" fill="#9fc4e8" opacity="${i % 3 === 0 ? 0.32 : 0.16}"/>`;
  }
  return s;
}

function title(cx, y, size = 40) {
  return `<g data-title><text x="${cx}" y="${y}" text-anchor="middle" font-family="Sora, ${FONT}" font-size="${size}" font-weight="700" letter-spacing="${f(size * 0.16)}" fill="#f2f6fb">BRAIN</text>
    <text x="${cx}" y="${y + size * 0.72}" text-anchor="middle" font-family="${FONT}" font-size="${f(size * 0.36)}" letter-spacing="1.2" fill="#9fb4c8">A Living Memory for AI Agents</text></g>`;
}

function desktop(p, { showTitle = true } = {}) {
  const W = 1200;
  const top = showTitle ? 196 : 112; // vertical offset of the main stage (room for title + Hermes)
  const H = top + 690;
  const o = [];
  o.push(`<rect width="${W}" height="${H}" fill="url(#${p}bg)"/><rect width="${W}" height="${H}" fill="url(#${p}bgglow)"/>${dust(W, H)}`);
  if (showTitle) o.push(title(600, 58));
  o.push(`<g transform="translate(0 ${top})">`);
  // Shared Knowledge (no bot)
  o.push(platform(p, 600, 372, 138, 40, 16, "steel", "S"));
  o.push(library(p, 600, 366));
  o.push(label(600, 392, "SHARED KNOWLEDGE", ACC.steel.glow));
  // authorized imports, one per twin
  o.push(connection("M500 318 C488 290 470 290 452 326", [[500, 318], [452, 326]], ACC.amber.a, `data-link="import-A"`));
  o.push(connection("M700 318 C712 290 730 290 748 326", [[700, 318], [748, 326]], ACC.teal.a, `data-link="import-B"`));
  // twins
  o.push(platform(p, 250, 500, 205, 66, 24, "amber", "A"));
  o.push(repository(p, 288, 288, "amber", "A", 1.12));
  o.push(platform(p, 950, 500, 205, 66, 24, "teal", "B"));
  o.push(repository(p, 760, 288, "teal", "B", 1.12));
  // MCP: each bot to its own repository
  o.push(connection("M228 344 C262 330 270 330 286 336", [[286, 336]], ACC.amber.a, `data-link="mcp-A"`));
  o.push(connection("M972 344 C938 330 930 330 914 336", [[914, 336]], ACC.teal.a, `data-link="mcp-B"`));
  // token-scoped clients below: one line per area, dim until used
  o.push(connection("M556 556 C480 556 404 536 368 498", [[368, 498]], INK, `data-link="scope-A"`));
  o.push(connection("M600 528 V434", [[600, 434]], INK, `data-link="scope-S"`));
  o.push(connection("M644 556 C720 556 796 536 832 498", [[832, 498]], INK, `data-link="scope-B"`));
  o.push(`<ellipse cx="600" cy="620" rx="92" ry="9" fill="#010812" opacity=".5" filter="url(#${p}b8)"/><ellipse cx="600" cy="590" rx="96" ry="24" fill="url(#${p}top-steel)" stroke="${INK}" stroke-opacity=".18"/>`);
  o.push(agentTile(p, 556, 556, 56, { name: "CLAUDE CODE", color: "#f2a37a", glyph: "&gt;_", attrs: `data-agent="claude"` }));
  o.push(agentTile(p, 644, 556, 56, { name: "CODEX", color: "#e8f0f8", glyph: "&gt;_", attrs: `data-agent="codex"` }));
  o.push(`<text x="600" y="664" text-anchor="middle" font-family="${FONT}" font-size="11" font-weight="600" letter-spacing="1.6" fill="#7f99b3">TOKEN-SCOPED KNOWLEDGE ACCESS</text>`);
  // Grok Bots
  o.push(grokBot(p, "A", 140, 506, 1.12));
  o.push(grokBot(p, "B", 1058, 506, 1.12));
  o.push(label(255, 626, "PROJECT TWIN A", ACC.amber.glow));
  o.push(label(945, 626, "PROJECT TWIN B", ACC.teal.glow));
  // Hermes above, with one curation line per area (only the active one is shown)
  o.push(connection("M558 -50 C470 -50 382 160 368 262", [[368, 262]], ACC.violet.glow, `data-link="curate-A"`));
  o.push(connection("M600 34 V112", [[600, 112]], ACC.violet.glow, `data-link="curate-S"`));
  o.push(connection("M642 -50 C730 -50 818 160 832 262", [[832, 262]], ACC.violet.glow, `data-link="curate-B"`));
  o.push(agentTile(p, 600, -50, 72, { name: "HERMES AGENT", sub: "CURATOR", color: ACC.violet.glow, img: HERMES_IMG, attrs: `data-agent="hermes"` }));
  o.push(`</g>`);
  return { W, H, body: o.join(""), top };
}

function mobile(p) {
  const W = 420;
  const H = 1440;
  const o = [];
  o.push(`<rect width="${W}" height="${H}" fill="url(#${p}bg)"/><rect width="${W}" height="${H}" fill="url(#${p}bgglow)"/>${dust(W, H)}`);
  o.push(title(210, 54, 36));
  // Shared
  o.push(platform(p, 210, 392, 138, 40, 16, "steel", "S"));
  o.push(library(p, 210, 386));
  o.push(label(210, 412, "SHARED KNOWLEDGE", ACC.steel.glow, 11));
  o.push(connection("M110 338 C40 380 60 470 268 520", [[110, 338], [268, 520]], ACC.amber.a, `data-link="import-A"`));
  o.push(connection("M310 338 C412 420 408 800 352 896", [[310, 338], [352, 896]], ACC.teal.a, `data-link="import-B"`));
  // Twin A
  o.push(platform(p, 210, 700, 190, 60, 22, "amber", "A"));
  o.push(repository(p, 214, 496, "amber", "A", 0.98));
  o.push(connection("M152 550 C176 540 192 540 210 546", [[210, 546]], ACC.amber.a, `data-link="mcp-A"`));
  o.push(grokBot(p, "A", 110, 704, 0.86));
  o.push(label(210, 810, "PROJECT TWIN A", ACC.amber.glow, 11));
  // Twin B
  o.push(platform(p, 210, 1070, 190, 60, 22, "teal", "B"));
  o.push(repository(p, 214, 866, "teal", "B", 0.98));
  o.push(connection("M152 920 C176 910 192 910 210 916", [[210, 916]], ACC.teal.a, `data-link="mcp-B"`));
  o.push(grokBot(p, "B", 108, 1074, 0.86));
  o.push(label(210, 1180, "PROJECT TWIN B", ACC.teal.glow, 11));
  // integrations
  o.push(agentTile(p, 90, 1270, 58, { name: "HERMES AGENT", sub: "CURATOR", color: ACC.violet.glow, img: HERMES_IMG, attrs: `data-agent="hermes"` }));
  o.push(agentTile(p, 210, 1270, 58, { name: "CLAUDE CODE", color: "#f2a37a", glyph: "&gt;_", attrs: `data-agent="claude"` }));
  o.push(agentTile(p, 330, 1270, 58, { name: "CODEX", color: "#e8f0f8", glyph: "&gt;_", attrs: `data-agent="codex"` }));
  o.push(`<text x="210" y="1396" text-anchor="middle" font-family="${FONT}" font-size="11" font-weight="600" letter-spacing="1.6" fill="#7f99b3">TOKEN-SCOPED KNOWLEDGE ACCESS</text>`);
  return { W, H, body: o.join("") };
}

// synthetic knowledge cards used by the animations (live in an untransformed top layer)
function fxLayer(p) {
  const fly = (attr, n, w = 34, h = 44) => `<g ${attr} opacity="0">${card(p, -w / 2, -h / 2, w, h, n, { glow: true })}</g>`;
  return `<g data-fx>
    ${fly("data-fx-capture", "amber")}
    ${fly('data-fx-import', "steel", 22, 28)}
    ${fly('data-fx-ctx="0"', "amber", 26, 32)}
    ${fly('data-fx-ctx="1"', "amber", 26, 32)}
  </g>`;
}

/**
 * @param {"desktop" | "mobile" | "preview"} variant
 * @param {string} prefix unique id prefix per SVG instance on the page
 */
export function brainScene(variant, prefix = "be") {
  const p = `${prefix}-`;
  const L = variant === "mobile" ? mobile(p) : desktop(p, { showTitle: variant !== "preview" });
  const interactive = variant !== "preview";
  const desc =
    "BRAIN, a living memory for AI agents. Project Twin A and Project Twin B each have their own Grok Bot and their own knowledge repository. Shared Knowledge sits between them and has no bot; a twin reads only Shared pages it explicitly imports. Hermes Agent curates one area at a time. Claude Code and Codex reach only the areas their tokens allow.";
  const body = (L.body + (interactive ? fxLayer(p) : "")).replaceAll("__P__", p);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L.W} ${L.H}" role="img" aria-labelledby="${p}t ${p}d" data-brain-svg="${variant}" class="be-svg"><title id="${p}t">BRAIN: a living memory for AI agents</title><desc id="${p}d">${desc}</desc>${defs(p)}${body}</svg>`;
}
