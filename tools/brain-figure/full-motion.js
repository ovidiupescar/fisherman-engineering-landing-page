// Test aid: this machine reports prefers-reduced-motion: reduce. Pretend it does not, to film the full animation.
(() => {
  const mm = window.matchMedia.bind(window);
  window.matchMedia = (q) => (String(q).includes("prefers-reduced-motion") ? mm("(min-width: 100000px)") : mm(q));
})();
