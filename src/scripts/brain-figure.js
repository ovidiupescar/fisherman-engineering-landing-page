// BRAIN figure: Capture / Curate / Retrieve, built on Motion (motion.dev) over the SVG from
// src/lib/brain-scene.js. Choreography follows the motion-design skill: one signature ease for most
// moves, decelerating entrances, low-bounce springs only for the characters, staggers under 400 ms,
// at most a third of the scene moving at once, and calm ambient life (float, blink, glances).
// All data is synthetic; nothing here talks to a network.
import { animate } from "motion";

const EASE = [0.4, 0, 0.2, 1]; // signature: on-screen moves
const ENTER = [0.05, 0.7, 0.1, 1]; // entrances decelerate
const CHAR = { type: "spring", bounce: 0.22, duration: 0.6 }; // characters only
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const sleep = (s) => (reduce.matches ? Promise.resolve() : new Promise((r) => setTimeout(r, s * 1000)));

const COPY = {
  idle: {
    say: "Each Grok Bot has its own project memory. Choose a mode to see how knowledge moves.",
  },
  capture: {
    say: "Captured. Searchable immediately.",
  },
  curate: {
    say: "Automatically curated. Traceable by design.",
  },
  retrieve: {
    say: "Persistent context for every authorized session.",
  },
};

for (const root of document.querySelectorAll("[data-brain-figure]")) init(root);

function init(root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];
  const caption = root.querySelector("[data-be-caption]");
  const replay = root.querySelector("[data-be-replay]");
  const svgs = [...root.querySelectorAll("svg[data-brain-svg]")];
  let mode = "idle";
  let run = 0;
  let live = [];
  let visible = true;

  const activeSvg = () => svgs.find((s) => s.getBoundingClientRect().width > 0) || svgs[0];
  const $ = (svg, sel) => svg.querySelector(sel);
  const $$ = (svg, sel) => [...svg.querySelectorAll(sel)];

  // remember the rest opacity of everything we touch, so a reset is exact
  for (const svg of svgs) {
    for (const el of svg.querySelectorAll("[data-link],[data-space],[data-repo],[data-bot],[data-agent],[data-lib]")) {
      el.dataset.rest = el.getAttribute("opacity") ?? "1";
    }
  }

  // ---------------------------------------------------------------- helpers
  const go = (el, kf, opts = {}) => {
    if (!el) return Promise.resolve();
    const a = animate(el, kf, { ease: EASE, duration: 0.6, ...opts, ...(reduce.matches ? { duration: 0, delay: 0, type: undefined } : {}) });
    live.push(a);
    return a.finished.catch(() => {});
  };
  const fx = (svg) => $(svg, "[data-fx]");
  // centre of an element in the fx layer's user space (works across nested transforms)
  const centre = (svg, el) => {
    const b = el.getBBox();
    const p = new DOMPoint(b.x + b.width / 2, b.y + b.height / 2).matrixTransform(el.getCTM());
    return p.matrixTransform(fx(svg).getCTM().inverse());
  };
  const box = (svg, el) => {
    const b = el.getBBox();
    const m = fx(svg).getCTM().inverse().multiply(el.getCTM());
    const a = new DOMPoint(b.x, b.y).matrixTransform(m);
    const c = new DOMPoint(b.x + b.width, b.y + b.height).matrixTransform(m);
    return { x: a.x, y: a.y, w: c.x - a.x, h: c.y - a.y };
  };
  const link = (svg, name) => $(svg, `[data-link="${name}"]`);
  const lightLink = (svg, name, on = true) => {
    const el = link(svg, name);
    if (!el) return Promise.resolve();
    go($(el, "[data-glow]"), { opacity: on ? 1 : 0 }, { duration: 0.4 });
    return go(el, { opacity: on ? 1 : Number(el.dataset.rest) }, { duration: on ? 0.5 : 0.4 });
  };
  const dim = (els, to) => Promise.all(els.filter(Boolean).map((el) => go(el, { opacity: to }, { duration: 0.45 })));
  const restore = (svg) =>
    Promise.all($$(svg, "[data-space],[data-repo],[data-bot],[data-agent],[data-lib]").map((el) => go(el, { opacity: Number(el.dataset.rest) }, { duration: 0.5 })));
  const area = (svg, id) => [$(svg, `[data-space="${id}"]`), $(svg, `[data-repo="${id}"]`), $(svg, `[data-bot="${id}"]`), id === "S" ? $(svg, "[data-lib]") : null];

  const bot = (svg, id) => $(svg, `[data-bot="${id}"]`);
  const eyes = (svg, id) => $(bot(svg, id), "[data-eyes]");
  const look = (svg, id, x, y) => go(eyes(svg, id), { x, y }, CHAR);
  const happy = async (svg, id, hold = 0.9) => {
    const b = bot(svg, id);
    go($$(b, "[data-eye]"), { opacity: 0 }, { duration: 0.2 });
    await go($$(b, "[data-happy]"), { opacity: 1 }, { duration: 0.2 });
    go($(b, "[data-bot-body]"), { scale: [1, 1.04, 1] }, { duration: 0.6, ease: EASE });
    await sleep(hold);
    go($$(b, "[data-happy]"), { opacity: 0 }, { duration: 0.25 });
    return go($$(b, "[data-eye]"), { opacity: 1 }, { duration: 0.25 });
  };
  const brighten = (svg, id, on) => go($(bot(svg, id), "[data-bot-aura]"), { opacity: on ? 0.55 : 0.28 }, { duration: 0.5 });
  const pulse = (svg, repo) =>
    Promise.all([go($(repo, "[data-status]"), { scale: [1, 1.7, 1] }, { duration: 0.7 }), go($(repo, "[data-status-halo]"), { opacity: [0.55, 1, 0.55] }, { duration: 0.7 })]);
  const chip = (el) => go(el, { opacity: [0, 1], y: [6, 0] }, { duration: 0.45, ease: ENTER });

  // ---------------------------------------------------------------- rest state (instant)
  function reset(svg) {
    live.forEach((a) => a.stop());
    live = [];
    const set = (el, props) => el && animate(el, props, { duration: 0 });
    for (const el of $$(svg, "[data-link],[data-space],[data-repo],[data-bot],[data-agent],[data-lib]")) set(el, { opacity: Number(el.dataset.rest) });
    for (const el of $$(svg, "[data-glow],[data-fx] > g,[data-newcard],[data-raw='new'],[data-lockring],[data-check],[data-chip-indexed],[data-chip-commit],[data-happy]")) set(el, { opacity: 0, x: 0, y: 0, scale: 1 });
    for (const el of $$(svg, "[data-raw]:not([data-raw='new']),[data-cur],[data-eye]")) set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
    for (const el of $$(svg, "[data-eyes],[data-bot-body],[data-tile]")) set(el, { x: 0, y: 0, scale: 1 });
    for (const el of $$(svg, "[data-bot-aura]")) set(el, { opacity: 0.28 });
    for (const el of $$(svg, "[data-tile-glow]")) set(el, { opacity: 0.18 });
  }

  // ---------------------------------------------------------------- the three modes
  const MODES = {
    // A Grok Bot submits a source; it is stored and indexed at once (no LLM, no Hermes).
    async capture(svg, me) {
      const repo = $(svg, '[data-repo="A"]');
      const card = $(svg, "[data-fx-capture]");
      const target = $(repo, "[data-raw='new']");
      dim([...area(svg, "B"), ...area(svg, "S"), ...$$(svg, "[data-agent]")], 0.45);
      const b = box(svg, bot(svg, "A"));
      const start = { x: b.x + b.w * 0.22, y: b.y - 24 };
      const end = centre(svg, target);
      await go(card, { opacity: [0, 1], x: [start.x, start.x], y: [start.y + 12, start.y], scale: [0.6, 1] }, { duration: 0.5, ease: ENTER });
      if (me !== run) return;
      await look(svg, "A", -5, -6);
      await sleep(0.35);
      if (me !== run) return;
      look(svg, "A", 7, -2);
      lightLink(svg, "mcp-A");
      const mid = { x: (start.x + end.x) / 2, y: Math.min(start.y, end.y) - 46 };
      await go(card, { x: [start.x, mid.x, end.x], y: [start.y, mid.y, end.y], scale: [1, 0.9, 0.78], rotate: [-8, 0, 6] }, { duration: 1.1, ease: EASE });
      if (me !== run) return;
      go(card, { opacity: 0 }, { duration: 0.2 });
      await go(target, { opacity: [0, 1], scale: [0.8, 1] }, { duration: 0.35, ease: ENTER });
      lightLink(svg, "mcp-A", false);
      pulse(svg, repo);
      await chip($(repo, "[data-chip-indexed]"));
      if (me !== run) return;
      await happy(svg, "A", 0.7);
      look(svg, "A", 0, 0);
      restore(svg);
    },

    // Hermes Agent curates one area (Twin A): sources -> structured page -> validated -> committed.
    async curate(svg, me) {
      const repo = $(svg, '[data-repo="A"]');
      const hermes = $(svg, '[data-agent="hermes"]');
      dim([...area(svg, "B"), ...area(svg, "S"), bot(svg, "A"), $(svg, '[data-agent="claude"]'), $(svg, '[data-agent="codex"]')], 0.45);
      go($(svg, '[data-raw="new"]'), { opacity: 1 }, { duration: 0 }); // the source captured earlier
      go($(hermes, "[data-tile-glow]"), { opacity: 0.7 }, { duration: 0.5 });
      await go($(hermes, "[data-tile]"), { scale: [1, 1.06, 1] }, CHAR);
      if (me !== run) return;
      await lightLink(svg, "curate-A");
      await go($(repo, "[data-lockring]"), { opacity: 1 }, { duration: 0.45 }); // one curator per area
      if (me !== run) return;
      const raws = $$(repo, "[data-raw]");
      await Promise.all(raws.map((r, i) => go(r, { y: -5, scale: 1.06 }, { duration: 0.4, delay: i * 0.09 })));
      await sleep(0.3);
      if (me !== run) return;
      // sources stay (immutable); a structured page is written into the empty slot
      Promise.all(raws.map((r, i) => go(r, { y: 0, scale: 1, opacity: 0.55 }, { duration: 0.4, delay: i * 0.06 })));
      await go($(repo, "[data-newcard]"), { opacity: [0, 1], y: [34, 0], scale: [0.7, 1] }, { duration: 0.9, ease: ENTER });
      if (me !== run) return;
      await go($(repo, "[data-check]"), { opacity: [0, 1], scale: [0.6, 1] }, CHAR); // validated
      await chip($(repo, "[data-chip-commit]")); // committed with a receipt
      pulse(svg, repo);
      await sleep(0.5);
      if (me !== run) return;
      lightLink(svg, "curate-A", false);
      go($(repo, "[data-lockring]"), { opacity: 0 }, { duration: 0.5 });
      go($(hermes, "[data-tile-glow]"), { opacity: 0.18 }, { duration: 0.5 });
      restore(svg);
    },

    // Grok Bot A asks for context through its scoped token; only its twin (and an import) answers.
    async retrieve(svg, me) {
      const repo = $(svg, '[data-repo="A"]');
      go($(svg, '[data-raw="new"]'), { opacity: 1 }, { duration: 0 });
      go($(repo, "[data-newcard]"), { opacity: 1 }, { duration: 0 });
      dim([...area(svg, "B"), ...$$(svg, "[data-agent]")], 0.4);
      brighten(svg, "A", true);
      go($$(bot(svg, "A"), "[data-eye]"), { scaleY: [1, 1.12, 1] }, { duration: 0.5 });
      await look(svg, "A", 7, -3);
      if (me !== run) return;
      await lightLink(svg, "mcp-A");
      go($(repo, "[data-repo-frame]"), { opacity: [1, 0.6, 1] }, { duration: 0.6 });
      const picks = [$(repo, '[data-cur="0"]'), $(repo, "[data-newcard]")];
      await Promise.all(picks.map((c, i) => go(c, { y: -4, scale: 1.06 }, { duration: 0.35, delay: i * 0.12 })));
      if (me !== run) return;
      // an explicitly permitted Shared import joins the context
      const imp = link(svg, "import-A");
      const impCard = $(svg, "[data-fx-import]");
      lightLink(svg, "import-A");
      const ends = $$(imp, "circle[r='6']").map((c) => centre(svg, c));
      if (ends.length === 2) {
        go(impCard, { opacity: [0, 1, 1, 0], x: [ends[0].x, ends[1].x], y: [ends[0].y, ends[1].y], scale: [0.8, 1] }, { duration: 1, ease: EASE });
      }
      const b = box(svg, bot(svg, "A"));
      const to = { x: b.x + b.w * 0.55, y: b.y + b.h * 0.35 };
      await Promise.all(
        picks.map((c, i) => {
          const from = centre(svg, c);
          const fly = $(svg, `[data-fx-ctx="${i}"]`);
          const mid = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 40 };
          return go(fly, { opacity: [0, 1, 1, 0], x: [from.x, mid.x, to.x], y: [from.y, mid.y, to.y], scale: [1, 0.8, 0.45] }, { duration: 1, delay: 0.15 + i * 0.18, ease: EASE });
        }),
      );
      if (me !== run) return;
      picks.forEach((c) => go(c, { y: 0, scale: 1 }, { duration: 0.35 }));
      await happy(svg, "A", 0.9);
      look(svg, "A", 0, 0);
      brighten(svg, "A", false);
      lightLink(svg, "mcp-A", false);
      lightLink(svg, "import-A", false);
      restore(svg);
    },
  };

  // ---------------------------------------------------------------- controls
  function select(next, { play = true } = {}) {
    mode = next;
    const me = ++run;
    tabs.forEach((t) => {
      const on = t.dataset.mode === next;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on || (next === "idle" && t === tabs[0]) ? 0 : -1;
    });
    panels.forEach((p) => (p.hidden = p.dataset.mode !== next));
    root.dataset.mode = next;
    if (caption) caption.textContent = COPY[next].say;
    for (const svg of svgs) reset(svg);
    if (next !== "idle" && play) MODES[next](activeSvg(), me);
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t.dataset.mode));
    t.addEventListener("keydown", (e) => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d && e.key !== "Home" && e.key !== "End") return;
      e.preventDefault();
      const n = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + d + tabs.length) % tabs.length;
      tabs[n].focus();
      select(tabs[n].dataset.mode);
    });
  });
  replay?.addEventListener("click", () => select(mode === "idle" ? "capture" : mode));

  // layout switch (desktop <-> mobile SVG): replay the current mode on the new layout
  let lastSvg = activeSvg();
  addEventListener("resize", () => {
    const s = activeSvg();
    if (s !== lastSvg) {
      lastSvg = s;
      select(mode, { play: mode !== "idle" });
    }
  });

  // ---------------------------------------------------------------- ambient life: blink + glances
  new IntersectionObserver((es) => (visible = es[es.length - 1].isIntersecting), { rootMargin: "80px" }).observe(root);
  const blink = (svg, id) => go($$(bot(svg, id), "[data-eye]"), { scaleY: [1, 0.12, 1] }, { duration: 0.18, ease: EASE });
  const idleTick = (id, base) => {
    setTimeout(() => {
      if (visible && !reduce.matches && !document.hidden) {
        const svg = activeSvg();
        blink(svg, id);
        if (mode === "idle" && Math.random() < 0.4) {
          const dx = Math.round((Math.random() * 2 - 1) * 5);
          look(svg, id, dx, Math.round(Math.random() * -3)).then(() => sleep(1.4)).then(() => mode === "idle" && look(svg, id, 0, 0));
        }
      }
      idleTick(id, base);
    }, (base + Math.random() * 2.5) * 1000);
  };
  idleTick("A", 3.4);
  idleTick("B", 4.2);

  // the Grok Bots glance toward the pointer while nothing is playing
  let raf = 0;
  root.addEventListener("pointermove", (e) => {
    if (mode !== "idle" || reduce.matches || raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const svg = activeSvg();
      for (const id of ["A", "B"]) {
        const r = bot(svg, id).getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 3);
        const k = 6 / Math.max(60, Math.hypot(dx, dy));
        animate(eyes(svg, id), { x: dx * k, y: dy * k }, { duration: 0.35, ease: EASE });
      }
    });
  });
  root.addEventListener("pointerleave", () => {
    if (mode !== "idle") return;
    const svg = activeSvg();
    look(svg, "A", 0, 0);
    look(svg, "B", 0, 0);
  });

  select("idle", { play: false });
}
