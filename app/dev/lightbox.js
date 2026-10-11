const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const MS = { open: 240, close: 200, fade: 160 };
const SVG = "http://www.w3.org/2000/svg";
const PLAY = "M6 3 17 10 6 17Z";
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

function contain(rect, w, h) {
  const s = Math.min(rect.width / w, rect.height / h);
  return { x: rect.left + (rect.width - w * s) / 2, y: rect.top + (rect.height - h * s) / 2, w: w * s };
}

const seen = (rect) => rect && rect.width > 0 && rect.bottom > 0 && rect.right > 0 && rect.top < innerHeight && rect.left < innerWidth;

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
  if (typeof document === "undefined") return { open() {}, close() {}, isOpen() { return false; } };
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
  const left = make("span");
  const right = make("span");
  cap.append(left, right);
  root.append(back, stage, cap);
  document.body.append(root);

  let state = null;
  let touch = null;

  function close() {
    if (!state) return;
    root.hidden = true;
    state = null;
    document.body.style.removeProperty("overflow");
  }

  function open(src, captionText = "") {
    state = { src };
    img.src = src;
    left.textContent = captionText;
    root.hidden = false;
    onOpen();
    document.body.style.overflow = "hidden";
  }

  back.addEventListener("click", close);
  stage.addEventListener("click", close);

  const onKeyDown = (e) => {
    if (state && e.key === "Escape") close();
  };
  document.addEventListener("keydown", onKeyDown);

  return {
    open,
    close,
    isOpen() {
      return Boolean(state);
    },
    destroy() {
      close();
      root.remove();
      document.removeEventListener("keydown", onKeyDown);
    },
  };
}
