const MS = { open: 280, close: 200 };
const SVG = "http://www.w3.org/2000/svg";
const CORNERS = "M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9";

function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function icon(d, viewBox) {
  const svg = document.createElementNS(SVG, "svg");
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS(SVG, "path");
  path.setAttribute("d", d);
  svg.append(path);
  return svg;
}

export function zoomButton(className) {
  const button = make("button", className);
  button.type = "button";
  button.setAttribute("aria-label", "view large");
  button.dataset.tip = "view large";
  button.append(icon(CORNERS, "0 0 14 14"));
  button.addEventListener("pointerdown", (event) => event.stopPropagation());
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  });
  return button;
}

export function createLightbox({ onOpen = () => {} } = {}) {
  if (typeof document === "undefined")
    return { open() {}, close() {}, isOpen() { return false; }, destroy() {} };

  /* ---- DOM ---- */
  const root = make("div", "lb");
  root.hidden = true;
  root.tabIndex = -1;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");

  const back = make("div", "lb-back");
  const stage = make("div", "lb-stage");

  const img = make("img", "lb-img");
  img.alt = "";
  img.draggable = false;
  stage.append(img);

  const cap = make("p", "lb-cap");
  const capLeft = make("span");
  const capRight = make("span");
  cap.append(capLeft, capRight);

  const nav = make("div", "lb-nav");
  const prevBtn = make("button", "lb-arrow lb-prev", "‹");
  prevBtn.type = "button";
  prevBtn.setAttribute("aria-label", "Previous");
  const nextBtn = make("button", "lb-arrow lb-next", "›");
  nextBtn.type = "button";
  nextBtn.setAttribute("aria-label", "Next");
  nav.append(prevBtn, nextBtn);

  const closeBtn = make("button", "lb-close", "×");
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Close modal");
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    close(false);
  });

  root.append(back, stage, cap, nav, closeBtn);
  document.body.append(root);

  /* ---- state ---- */
  let state = null; // { items, index, onStep, onClose, start }

  function layout() {
    if (!state) return;
    const pad = 36;
    const item = state.items[state.index];
    const src = typeof item === "string" ? item : item.src;
    img.src = src;
    img.alt = (typeof item === "string" ? "" : item.alt) || "";

    // Caption
    if (typeof item !== "string" && item.left) {
      capLeft.textContent = "";
      for (const seg of item.left) {
        if (Array.isArray(seg)) {
          const span = make("span", seg[1] || "");
          span.textContent = seg[0];
          capLeft.append(span);
        } else capLeft.append(seg);
      }
    } else capLeft.textContent = typeof item === "string" ? "" : item.alt || "";
    if (typeof item !== "string" && item.right) {
      capRight.textContent = "";
      for (const seg of item.right) {
        if (Array.isArray(seg)) {
          const span = make("span", seg[1] || "");
          span.textContent = seg[0];
          capRight.append(span);
        } else capRight.append(seg);
      }
    } else capRight.textContent = state.items.length > 1 ? `${state.index + 1} / ${state.items.length}  esc close` : "esc close";

    // Show/hide nav arrows
    nav.hidden = state.items.length <= 1;

    // Fit stage to viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const capH = 30;
    const maxW = Math.max(300, vw - pad * 2);
    const maxH = Math.max(200, vh - pad * 2 - capH);

    // Use natural image size for aspect ratio; fallback to 16:9
    const natW = img.naturalWidth || 16;
    const natH = img.naturalHeight || 9;
    const scale = Math.min(maxW / natW, maxH / natH);
    const w = Math.round(natW * scale);
    const h = Math.round(natH * scale);

    const left = Math.round((vw - w) / 2);
    const top = Math.max(capH + 10, Math.round((vh - h) / 2));

    stage.style.width = `${w}px`;
    stage.style.height = `${h}px`;
    stage.style.left = `${left}px`;
    stage.style.top = `${top}px`;

    cap.style.left = `${left}px`;
    cap.style.width = `${w}px`;
    cap.style.top = `${top - capH}px`;
  }

  function showIndex(k) {
    if (!state || k < 0 || k >= state.items.length) return;
    state.index = k;
    layout();
    state.onStep?.(k);
  }

  function close(silent) {
    if (!state) return;
    const s = state;
    root.hidden = true;
    root.classList.remove("is-open");
    document.body.style.removeProperty("overflow");
    document.body.classList.remove("is-zoomed");
    state = null;
    if (!silent) s.onClose?.(s.index, { time: 0 });
  }

  function open(arg) {
    // Support both open(src) and open({ items, index, ... })
    let items, index = 0, onStep, onClose, start;
    if (typeof arg === "string") {
      items = [arg];
    } else if (arg.items) {
      items = arg.items;
      index = arg.index || 0;
      onStep = arg.onStep;
      onClose = arg.onClose;
      start = arg.start;
    } else if (arg.src) {
      items = [arg];
    } else {
      items = [arg];
    }

    state = { items, index, onStep, onClose, start };

    root.hidden = false;
    document.body.style.overflow = "hidden";
    document.body.classList.add("is-zoomed");
    onOpen();

    // When natural dimensions aren't loaded yet, re-layout on load
    img.onload = () => layout();
    layout();

    requestAnimationFrame(() => {
      root.classList.add("is-open");
      root.focus();
    });
  }

  /* ---- events ---- */
  back.addEventListener("click", () => close(false));
  img.addEventListener("click", () => close(false));

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (state) showIndex((state.index - 1 + state.items.length) % state.items.length);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (state) showIndex((state.index + 1) % state.items.length);
  });

  const onKeyDown = (e) => {
    if (!state) return;
    if (e.key === "Escape") { e.preventDefault(); close(false); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); showIndex((state.index - 1 + state.items.length) % state.items.length); }
    else if (e.key === "ArrowRight") { e.preventDefault(); showIndex((state.index + 1) % state.items.length); }
  };
  document.addEventListener("keydown", onKeyDown);

  window.addEventListener("resize", () => { if (state) layout(); });

  // Touch swipe
  let touchStart = null;
  stage.addEventListener("touchstart", (e) => {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (!touchStart || !state) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      showIndex((state.index + (dx < 0 ? 1 : -1) + state.items.length) % state.items.length);
    }
  }, { passive: true });

  return {
    open,
    close(silent) { close(silent); },
    isOpen() { return Boolean(state); },
    destroy() {
      close(true);
      root.remove();
      document.removeEventListener("keydown", onKeyDown);
    },
  };
}
