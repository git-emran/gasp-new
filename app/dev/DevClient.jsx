"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import "./dev.css";
import { devData, themes, days } from "./dev-content.js";
import { createArchive } from "./archive.js";
import { createWatch } from "./watch.js";
import { createBar } from "./bar.js";
import { createWheel } from "./wheel.js";
import { createTerminal } from "./terminal.js";
import { createBlueprint } from "./blueprint.js";
import { createTips } from "./tip.js";
import { familyFigure } from "./family.js";
import { createLightbox } from "./lightbox.js";

import GlimpseIntro from "./GlimpseIntro";

const DEFAULT_THEME = "blackmoney";
const THEME_KEY = "emran.scheme";
const WORM_KEY = "emran.worm";

const key = (value) => String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
const fmt = (value) => Math.round(value).toLocaleString("en-US").replace(/,/g, "'");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const hex = (value) => [1, 3, 5].map((k) => parseInt(value.slice(k, k + 2), 16));
const LINK_SLOTS = [3, 4, 5, 8];
const luminance = (value) => {
  const [r, g, b] = hex(value).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const lab = (value) => {
  const [r, g, b] = hex(value).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const x = f((r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047);
  const y = f(r * 0.2126 + g * 0.7152 + b * 0.0722);
  const z = f((r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
};
const distance = (a, b) => {
  const [p, q] = [lab(a), lab(b)];
  return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
};
const chroma = (value) => Math.hypot(lab(value)[1], lab(value)[2]);
const mix = (a, b, t) => `#${hex(a).map((v, n) => Math.round(v * (1 - t) + hex(b)[n] * t).toString(16).padStart(2, "0")).join("")}`;

function DevWorkspace({ onReturnToIntro }) {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = React.useState("about");
  const sectionSelectRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const $ = (selector) => root.querySelector(selector);
    const editor = $(".editor");
    const wheelHost = $(".wheel");
    const buffer = $(".buffer");
    const winbar = $(".winbar");
    const tabline = $(".tabline");
    const tabFile = $(".tab-file");
    const tabToggle = $(".tab-toggle");
    const barHost = $(".bar");
    const cmdNode = $(".bar .cmd");
    const overlay = root.querySelector(".overlay");
    const deskHost = $(".desk");
    const eyeHost = $(".eye-host");
    const den = $(".den");

    const palettes = new Map(devData.palettes.map((theme) => [key(theme.name), theme]));
    const snapshot = devData.snapshot;
    const content = devData;
    const stack = devData.stack;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = matchMedia("(max-width: 700px)");

    let currentTheme = DEFAULT_THEME;
    let openEntry = null;
    let booted = false;
    let cleanup = null;
    let typingToken = 0;
    let clearTimer = 0;
    let command = null;
    let watch = null;
    let wheel = null;
    let hero = null;
    let typingBar = false;
    let typingTerm = false;
    let lastChild = "";
    let child = null;

    function applyTheme(name, remember = false) {
      const theme = palettes.get(key(name));
      if (!theme) return false;
      const fg = theme.fg || theme.kinds.text;
      const vars = {
        "--bg": theme.bg,
        "--ink": fg,
        "--dim": theme.kinds.comment || mix(fg, theme.bg, 0.55),
        "--accent": theme.accent,
        "--line": theme.cursorline || mix(fg, theme.bg, 0.9),
        "--kw": theme.kinds.keyword,
        "--str": theme.kinds.string,
        "--fn": theme.kinds.function,
        "--ty": theme.kinds.type,
        "--num": theme.kinds.number,
        "--chrome": mix(fg, theme.bg, 0.3),
        "--color1": theme.color1,
      };
      (theme.ansi || []).forEach((value, n) => {
        vars[`--color${n}`] = value;
      });
      const links = LINK_SLOTS.map((n) => theme.ansi?.[n]).filter((value) => value && contrast(value, theme.bg) >= 3 && distance(value, fg) >= 15);
      vars["--link"] = links.sort((a, b) => chroma(b) - chroma(a))[0] || fg;
      for (const [vName, vVal] of Object.entries(vars)) {
        if (vVal) {
          root.style.setProperty(vName, vVal);
          document.body.style.setProperty(vName, vVal);
        }
      }
      document.documentElement.style.colorScheme = theme.light ? "light" : "dark";
      currentTheme = key(name);
      hero?.recolor?.();
      watch?.recolor();
      wheel?.recolor();
      bar?.recolor();
      if (remember) {
        try {
          localStorage.setItem(THEME_KEY, currentTheme);
        } catch {}
      }
      return true;
    }

    const projectEntries = content.projects.map((project) => ({
      id: project.repo,
      label: project.repo,
      kind: "project",
      data: project,
      parent: null,
      section: "projects",
      tag: "project",
    }));

    const entries = [
      { id: "about", label: "whoami", kind: "about", tile: "about", section: "about", tag: "about" },
      ...projectEntries,
      { id: "themes", label: "themes/", kind: "themes", tile: "themes", section: "theme", tag: "theme" },
    ];

    const items = entries.map((entry) =>
      entry.kind === "project"
        ? { entry, label: entry.label, src: entry.data.images[0]?.file, pushed: entry.data.pushed, tag: entry.tag }
        : { entry, label: entry.label, tile: entry.tile, tag: entry.tag }
    );

    const bar = createBar(barHost);

    // Simulated 56-hour traffic activity curve
    const hours = Array.from({ length: 56 }, (_, i) => {
      const cycle = Math.sin((i / 24) * Math.PI * 2) * 200 + 350;
      return Math.round(cycle + Math.random() * 80);
    });
    bar.setSeen({ total: 30820, hours, since: "2026-10-01" });

    const KEYS = {
      wide: "↑↓ project · ←→ shot · ↩ enter · : cmd",
      touch: "swipe the wheel · tap to open",
      closed: "tap ~/Projects ↓ to browse",
    };
    const paintKeys = () =>
      bar.setKeys(narrow.matches ? (editor.classList.contains("is-tree-open") ? KEYS.touch : KEYS.closed) : matchMedia("(pointer: fine)").matches ? KEYS.wide : KEYS.touch);
    paintKeys();

    function paintTyping() {
      bar.setTyping(typingBar || typingTerm);
    }

    const tips = createTips();
    const lightbox = createLightbox({ onOpen: () => tips.hide() });
    const terminal = createTerminal(buffer, {
      lightbox,
      get watch() {
        return watch;
      },
      onTyping(on) {
        typingTerm = on;
        paintTyping();
      },
    });

    function clearSoon(ms = 2400) {
      clearTimeout(clearTimer);
      clearTimer = setTimeout(() => {
        if (command === null && !typingBar) cmdNode.textContent = "";
      }, ms);
    }

    async function typeCmd(text, pace = 12) {
      const token = ++typingToken;
      clearTimeout(clearTimer);
      typingBar = true;
      barHost.classList.add("is-typing");
      paintTyping();
      try {
        if (reduced.matches) cmdNode.textContent = text;
        else {
          cmdNode.textContent = "";
          for (let n = 1; n <= text.length; n++) {
            if (token !== typingToken) return;
            cmdNode.textContent = text.slice(0, n);
            watch?.pressChar(text[n - 1]);
            const rect = cmdNode.getBoundingClientRect();
            if (rect.width) watch?.focus(rect.right + 4, rect.top + rect.height / 2);
            await sleep(pace);
          }
        }
        await sleep(160);
        if (token !== typingToken) return;
        watch?.pressKey("Enter");
      } finally {
        if (token === typingToken) {
          typingBar = false;
          barHost.classList.remove("is-typing");
          paintTyping();
          clearSoon();
        }
      }
    }

    function say(text) {
      typingToken++;
      typingBar = false;
      barHost.classList.remove("is-typing");
      paintTyping();
      cmdNode.textContent = text;
      clearSoon(text ? 3200 : 0);
    }

    const GAUGE = 16;
    const filledOf = (share, cells) => (share > 0 ? Math.max(1, Math.min(cells, Math.round(share * cells))) : 0);
    function room(used) {
      const style = getComputedStyle(buffer);
      const cell = parseFloat(style.getPropertyValue("--cell-w")) || 7.2;
      const chars = Math.floor((buffer.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 1) / cell) - 3;
      return Math.max(6, Math.min(GAUGE, chars - used));
    }
    function gauge(share, used) {
      const cells = room(used);
      const filled = filledOf(share, cells);
      const on = () => {
        const span = document.createElement("span");
        span.className = "t-gauge";
        span.textContent = "█".repeat(filled);
        span.dataset.share = share;
        span.dataset.used = used;
        return span;
      };
      return [{ node: on }, ["░".repeat(cells - filled), "t-gauge-off"]];
    }
    const pad = (label) => label.padEnd(9);
    const num = (value) => fmt(value ?? 0).padStart(6);
    const fact = (label, value, extra = []) => ({ segments: [[pad(label), "t-key"], [num(value), "md-num"], ...extra] });

    function starShare(stars) {
      const total = snapshot.stars?.total || 0;
      if (!total) return { share: 0, note: "" };
      const share = Math.round((stars / total) * 100);
      return { share: share || (stars ? 0.5 : 0), note: `  ${share || (stars ? "<1" : 0)}% of all stars` };
    }

    function projectSpec(project) {
      const { share, note } = starShare(project.stars || 0);
      const out = [
        ...(project.description ? [{ segments: [project.description], className: "t-dim" }] : []),
        { segments: [[pad("category"), "t-key"], [project.category || "Design & Engineering", "t-dim"]] },
        { segments: [[pad("role"), "t-key"], [project.role || "Lead Designer / Engineer", "t-dim"]] },
        { segments: [[pad("stack"), "t-key"], [project.language || "TypeScript / React", "md-code"]] },
        fact("stars", project.stars),
        ...(project.caseStudyUrl ? [{ segments: [[pad("case-study"), "t-key"], [project.caseStudyUrl, "md-link", project.caseStudyUrl]] }] : []),
        ...(project.liveUrl ? [{ segments: [[pad("live"), "t-key"], [project.liveUrl.replace(/^https:\/\//, ""), "md-link", project.liveUrl]] }] : []),
      ];
      const url = project.caseStudyUrl || project.url;
      return {
        cwd: `~/P/${project.repo}`,
        branch: project.branch || "main",
        shots: project.images.map((image) => ({ ...image, repo: project.repo, file: image.file, name: image.label || "preview.png" })),
        blocks: [
          { cmd: `cat ${project.repo}.md`, out },
          { cmd: "ls shots/", viewer: true },
          { cmd: `open ${url.replace(/^https:\/\//, "")}`, link: { text: url.replace(/^https:\/\//, ""), href: url } },
        ],
      };
    }

    function calendarBlock() {
      return {
        cmd: "node calendar.mjs 2026",
        calendar: {
          days,
          months: [],
          done: `// done · 10 months · ${fmt(snapshot.contributions.total)} contributions`,
        },
      };
    }

    function aboutSpec() {
      return {
        cwd: "~",
        branch: null,
        hero: (host) =>
          createBlueprint(host, {
            points: snapshot.contributions.total,
            from: snapshot.contributions.from,
            to: snapshot.contributions.to,
            owner: content.owner,
            family: true,
          }),
        blocks: [
          {
            cmd: "whoami",
            out: [
              ...content.about.lines.filter((l) => l.trim() && !/^#|^\[/.test(l)).map((line) => ({ segments: [line], className: "t-dim" })),
            ],
          },
          {
            cmd: "ls links/",
            out: [
              {
                segments: [
                  ["github", "", "https://github.com/git-emran"],
                  "   ",
                  ["linkedin", "", "https://www.linkedin.com/in/emran-hossain-80ab17190/"],
                  "   ",
                  ["instagram", "", "https://www.instagram.com/designwithemran/"],
                  "   ",
                  ["blog", "", "https://my-blog-omega-ashy.vercel.app/"],
                ],
              },
            ],
          },
        ],
      };
    }

    function stackSpec() {
      const unit = (l) => ` repo${l.repos === 1 ? "" : "s"}`;
      const used = 26;
      const lang = stack.languages.map((l) => ({
        segments: [{ icon: l.icon, letter: l.name }, " ", [l.name.padEnd(11), "md-code"], ...gauge(l.repos / 32, used), [String(l.repos).padStart(4), "md-num"], [unit(l), "t-dim"]],
      }));
      const grid = (list, width) => {
        const rows = [];
        const cols = narrow.matches ? 2 : 3;
        for (let k = 0; k < list.length; k += cols) {
          rows.push({
            segments: list.slice(k, k + cols).flatMap((tool, j) => [...(j ? ["  "] : []), [tool.name.padEnd(width)], [String(tool.repos ?? "").padStart(3), "md-num"]]),
          });
        }
        return rows;
      };
      return {
        cwd: "~",
        branch: null,
        blocks: [
          { cmd: "stack --languages", out: lang },
          { cmd: "stack --tools", out: [...grid(stack.tools, 14), { segments: ["verified stack usage across portfolio repos"], className: "t-dim" }] },
          { cmd: "stack --site", out: stack.site.map((tool) => ({ segments: [[tool.name.padEnd(24)], [tool.via, "t-dim"]] })) },
          calendarBlock(),
        ],
      };
    }

    function themesSpec() {
      const out = [
        fact("palettes", devData.palettes.length),
        { segments: [[pad("light/dark"), "t-key"], ["adaptive", "t-dim"]] },
        { segments: [[pad("engine"), "t-key"], "dynamic CSS custom properties", ["  live switcher", "t-dim"]] },
      ];
      return {
        cwd: "~/themes",
        branch: null,
        blocks: [
          { cmd: "fetch themes/", out },
          {
            cmd: "git log --graph themes/",
            mount(host) {
              const archive = createArchive(host, themes, {
                stats: Object.fromEntries(themes.map((t) => [t.slug, { stars: Math.floor(Math.random() * 40) + 10, created: "2026-04-01" }])),
                thumbs: {},
                current: currentTheme,
                viewport: buffer,
                lightbox,
                onPick(t) {
                  if (applyTheme(t.slug, true)) typeCmd(`:colorscheme ${key(t.slug)}`);
                },
              });
              return archive.destroy;
            },
          },
        ],
      };
    }

    function textOf(entry) {
      if (entry.kind === "project") return [entry.data.repo, entry.data.description, entry.data.language, entry.data.lines.join(" ")].join(" ");
      if (entry.kind === "about") return content.about.lines.join(" ");
      if (entry.kind === "themes") return themes.map((t) => `${t.name} ${t.description}`).join(" ");
      return [...stack.languages, ...stack.tools, ...stack.site].map((item) => item.name).join(" ");
    }

    function barView(entry) {
      if (entry.kind === "project") {
        const p = entry.data;
        return [["STARS", fmt(p.stars)], ["FORKS", fmt(p.forks ?? 0)], ["WATCH", fmt(p.watchers ?? 0)]];
      }
      if (entry.kind === "themes") return [["THEMES", String(themes.length)], ["CURRENT", currentTheme.toUpperCase()]];
      if (entry.kind === "stack") return [["LANGS", String(stack.languages.length)], ["TOOLS", String(stack.tools.length)]];
      return [["REPOS", fmt(snapshot.stars.repositoryCount)], ["STARS", fmt(snapshot.stars.total)], ["FOLLOWERS", fmt(snapshot.followers)]];
    }

    function open(entry) {
      if (entry === openEntry) return;
      if (cleanup) cleanup();
      cleanup = null;
      hero = null;
      openEntry = entry;
      if (entry.section) setActiveSection(entry.section);
      try {
        history.replaceState(null, "", `#${entry.id}`);
      } catch {}
      buffer.scrollTop = 0;
      buffer.dataset.kind = entry.kind;
      watch?.setText(textOf(entry));
      bar.setView(barView(entry));

      if (entry.kind === "project") {
        const project = entry.data;
        winbar.textContent = `fish — ~/Projects/${project.repo}`;
        tabFile.textContent = `/${project.repo}`;
        terminal.show(projectSpec(project));
        cleanup = () => terminal.destroy();
      } else if (entry.kind === "about") {
        winbar.textContent = `fish — ~ · ${content.owner}`;
        tabFile.textContent = "/";
        hero = terminal.show(aboutSpec());
        cleanup = () => {
          terminal.destroy();
          hero = null;
        };
      } else if (entry.kind === "stack") {
        winbar.textContent = `fish — ~ · stack`;
        tabFile.textContent = "/stack/";
        terminal.show(stackSpec());
        cleanup = () => terminal.destroy();
      } else if (entry.kind === "themes") {
        winbar.textContent = `themes/ — ${themes.length} color palettes · click card or run :colorscheme`;
        tabFile.textContent = "/themes/";
        terminal.show(themesSpec());
        cleanup = () => terminal.destroy();
        typeCmd(":e themes/");
      }
    }

    function openDrawer() {
      editor.classList.add("is-tree-open");
      tabline.setAttribute("aria-expanded", "true");
      tabToggle.textContent = "↑";
      paintKeys();
      requestAnimationFrame(() => wheel?.layout());
    }

    function closeDrawer() {
      editor.classList.remove("is-tree-open");
      tabline.setAttribute("aria-expanded", "false");
      tabToggle.textContent = "↓";
      paintKeys();
    }

    tabline.addEventListener("click", () => (editor.classList.contains("is-tree-open") ? closeDrawer() : openDrawer()));

    function findEntry(name) {
      const wanted = key(name.replace(/\/README\.md$/i, "").replace(/^~\/Projects\/?/, ""));
      if (!wanted || ["readmemd", "about", "whoami", "home"].includes(wanted)) return entries.find((e) => e.kind === "about");
      if (["git", "gitlog", "log", "stack"].includes(wanted)) return entries.find((e) => e.kind === "stack");
      return entries.find((e) => key(e.id) === wanted || key(e.label) === wanted);
    }

    function goTo(entry) {
      const k = items.findIndex((item) => item.entry === entry);
      if (k < 0) return;
      wheel.select(k);
      wheel.commitNow();
      open(entry);
    }

    function schemes(name) {
      const wanted = key(name);
      if (!wanted) return [];
      if (palettes.has(wanted)) return [wanted];
      return [...palettes.keys()].filter((cand) => cand.startsWith(wanted));
    }

    function scheme(name) {
      const found = schemes(name);
      if (found.length === 1 && applyTheme(found[0], true)) return say(`:colorscheme ${found[0]}`);
      if (found.length > 1) return say(`E185: ${found.slice(0, 4).join(" · ")}${found.length > 4 ? " …" : ""}`);
      return say(`E185: Cannot find color scheme '${name}'`);
    }

    function run(text) {
      const [name, ...rest] = text.trim().split(/\s+/);
      const arg = rest.join(" ");
      if (!name) return say("");
      if (/^q(a|all)?!?$/.test(name) || name === "wq" || name === "x") {
        location.href = "/";
        return;
      }
      if (name === "colorscheme" || name === "colo" || name === "theme") {
        if (!arg) {
          if (name === "theme") return goTo(entries.find((e) => e.kind === "themes"));
          return say(currentTheme);
        }
        return scheme(arg);
      }
      if (name === "e" || name === "edit" || name === "cd") {
        const entry = findEntry(arg);
        if (entry) {
          say("");
          return goTo(entry);
        }
        return say(`E484: Can't open file ${arg}`);
      }
      if (name === "Git" || name === "git") return goTo(entries.find((e) => e.kind === "stack"));
      const entry = !arg && key(name) && findEntry(name);
      if (entry) {
        say("");
        return goTo(entry);
      }
      if (!arg && schemes(name).length) return scheme(name);
      return say(`E492: Not an editor command: ${text.trim()}`);
    }

    function startCommand() {
      typingToken++;
      clearTimeout(clearTimer);
      command = "";
      typingBar = false;
      barHost.classList.add("is-typing");
      cmdNode.textContent = ":";
    }

    function commandKey(event) {
      event.preventDefault();
      if (event.key === "Escape") {
        command = null;
        barHost.classList.remove("is-typing");
        say("");
      } else if (event.key === "Enter") {
        const text = command;
        command = null;
        barHost.classList.remove("is-typing");
        run(text);
      } else if (event.key === "Backspace") {
        if (!command) {
          command = null;
          barHost.classList.remove("is-typing");
          say("");
          return;
        }
        command = command.slice(0, -1);
        cmdNode.textContent = `:${command}`;
      } else if (event.key.length === 1) {
        command += event.key;
        cmdNode.textContent = `:${command}`;
      }
    }

    const onKeyDown = (event) => {
      if (!event.repeat) watch?.pressKey(event.code, event.shiftKey);
      if (event.ctrlKey || event.metaKey || event.altKey || !booted) return;
      if (command !== null) {
        commandKey(event);
        return;
      }
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(".rack") || (target?.closest(".frame.is-xray") && ["Escape", "Enter", " "].includes(event.key))) return;
      if (event.key === ":") {
        event.preventDefault();
        startCommand();
        return;
      }
      const inBuffer = target && (target === buffer || buffer.contains(target));
      if (event.key === "Tab" && !event.shiftKey) {
        event.preventDefault();
        if (inBuffer) wheel.focus();
        else buffer.focus({ preventScroll: true });
        return;
      }
      if (inBuffer) {
        const scroller = buffer.querySelector(".arc") || buffer;
        const lines = { j: 13, ArrowDown: 13, k: -13, ArrowUp: -13, d: scroller.clientHeight / 2, u: -scroller.clientHeight / 2 };
        if (event.key in lines) {
          event.preventDefault();
          scroller.scrollBy({ top: lines[event.key] });
        } else if (event.key === "g") scroller.scrollTo({ top: 0 });
        else if (event.key === "G") scroller.scrollTo({ top: scroller.scrollHeight });
        else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          terminal.step(event.key === "ArrowRight" ? 1 : -1);
        } else if (event.key === " " && !target.closest("button, a") && terminal.toggle()) event.preventDefault();
        else if (event.key === "Enter" && !target.closest("button, a") && terminal.zoom()) event.preventDefault();
        else if (event.key === "h" || event.key === "Escape") wheel.focus();
        return;
      }
      if (target?.closest("a, button:not(.wheel-item)") && event.key === "Enter") return;
      if (event.key === "j" || event.key === "ArrowDown") {
        event.preventDefault();
        wheel.step(1);
      } else if (event.key === "k" || event.key === "ArrowUp") {
        event.preventDefault();
        wheel.step(-1);
      } else if (event.key === "l" || event.key === "ArrowRight") {
        event.preventDefault();
        terminal.step(1);
      } else if (event.key === "h" || event.key === "ArrowLeft") {
        event.preventDefault();
        terminal.step(-1);
      } else if (event.key === "Enter") {
        event.preventDefault();
        wheel.commitNow();
        const { item } = wheel.current();
        if (openEntry?.id === item.entry.id) open(item.entry);
        closeDrawer();
      } else if (event.key === "Escape") closeDrawer();
    };

    document.addEventListener("keydown", onKeyDown);

    let wormOn = false;
    try {
      wormOn = localStorage.getItem(WORM_KEY) === "on";
    } catch {}
    const paintDen = () => {
      den.setAttribute("aria-pressed", String(wormOn));
      den.dataset.tip = wormOn ? "switch the worm off" : "wake the worm";
    };
    paintDen();
    den.addEventListener("click", () => {
      wormOn = !wormOn;
      paintDen();
      watch?.setWorm(wormOn);
      try {
        if (wormOn) localStorage.setItem(WORM_KEY, "on");
        else localStorage.removeItem(WORM_KEY);
      } catch {}
    });

    const family = {
      box: () => (openEntry?.kind === "about" && hero?.family?.()) || null,
      fire: (ms) => hero?.fire?.(ms),
    };

    watch = createWatch({
      layer: overlay,
      deskHost,
      eyeHost,
      buffer,
      status: barHost,
      onState: (state) => bar.setState(state),
      family,
      den,
      wormOn,
    });

    const selectSection = (sec) => {
      setActiveSection(sec);
      if (!wheel) return;
      if (sec === "about") {
        wheel.select(0);
        open(entries[0]);
      } else if (sec === "projects") {
        const projIdx = entries.findIndex((e) => e.section === "projects");
        if (projIdx >= 0) {
          wheel.select(projIdx);
          open(entries[projIdx]);
        }
      } else if (sec === "theme") {
        const themeIdx = entries.findIndex((e) => e.id === "themes");
        if (themeIdx >= 0) {
          wheel.select(themeIdx);
          open(entries[themeIdx]);
        }
      }
    };
    sectionSelectRef.current = selectSection;

    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem(THEME_KEY);
    } catch {}
    applyTheme(savedTheme && palettes.has(savedTheme) ? savedTheme : DEFAULT_THEME);

    const initialEntry = entries.find((entry) => entry.id === "about") || entries[0];

    wheel = createWheel(wheelHost, {
      items,
      days,
      palettes: content.palettes,
      stack,
      wordmark: null,
      initial: 0,
      onChange(item) {
        tabFile.textContent = `/${item.entry.kind === "project" ? item.entry.id : item.label}`;
        if (item.entry.section) setActiveSection(item.entry.section);
      },
      onCommit(item) {
        if (!booted) return;
        open(item.entry);
        const center = wheel.centerOf();
        if (center) watch?.focus(center.x, center.y);
      },
      onPick(item) {
        if (openEntry?.id === item.entry.id) open(item.entry);
        if (!narrow.matches) return;
        setTimeout(() => {
          wheel.commitNow();
          closeDrawer();
        }, reduced.matches ? 0 : 170);
      },
    });

    let destroyed = false;

    typeCmd(":e ~/Projects", 18).then(() => {
      if (destroyed) return;
      wheelHost.classList.add("is-in");
      wheel.form();
      booted = true;
      open(initialEntry);
      wheel.commitNow();
    });

    const handleLinkClick = (e) => {
      const anchor = e.target?.closest?.("a");
      if (anchor && anchor.href && !anchor.href.startsWith("javascript:")) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }
    };
    const node = containerRef.current;
    node?.addEventListener("click", handleLinkClick, { capture: true });

    return () => {
      destroyed = true;
      node?.removeEventListener("click", handleLinkClick, { capture: true });
      document.removeEventListener("keydown", onKeyDown);
      cleanup?.();
      watch?.destroy?.();
      lightbox?.destroy?.();
      tips?.destroy?.();
      hero?.destroy?.();
      wheel?.destroy?.();
      bar?.destroy?.();
      document.documentElement.style.removeProperty("color-scheme");
      const varsToClean = [
        "--bg", "--ink", "--dim", "--accent", "--line", "--kw", "--str", "--fn",
        "--ty", "--num", "--chrome", "--color1", "--link", "--margin", "--eye-w", "--desk-h"
      ];
      for (let i = 0; i < 16; i++) varsToClean.push(`--color${i}`);
      for (const v of varsToClean) {
        document.body.style.removeProperty(v);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="dev-root">
      <main className="stage">
        <header className="frame-top">
          <Link className="brand" href="/" data-tip="back to main portfolio" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 88 80" aria-hidden="true">
              <path d="M0 12L12 0H16V32H29L38 23V43L33 48H16V80H0Z" />
              <path d="M50 0H88V16H57L50 23V57L57 64H88L72 80H50L34 64V16Z" />
            </svg>
            <span>emran.dev</span>
          </Link>
          <nav className="switch is-solo" aria-label="Elsewhere">
            <button
              type="button"
              className="quiet-button"
              onClick={onReturnToIntro}
              data-tip="play intro glimpse again"
              style={{
                marginRight: 16,
                border: 0,
                background: "none",
                color: "var(--dim)",
                cursor: "pointer",
                font: "inherit",
                padding: 0,
                verticalAlign: "middle",
              }}
            >
              intro
            </button>
            <Link href="/" data-tip="back to GUI mode" target="_blank" rel="noopener noreferrer" style={{ marginRight: 16 }}>
              GUI mode
            </Link>
            <a href="https://github.com/git-emran" target="_blank" rel="noopener noreferrer">
              github
            </a>
          </nav>
        </header>

        <h1 className="sr-only">emran.dev — interactive systems, terminal interface, projects, themes and contributions</h1>

        <section className="editor" aria-label="Editor">
          <nav className="dev-sections-nav" aria-label="Sections">
            <button
              type="button"
              className={`dev-sec-btn ${activeSection === "about" ? "is-active" : ""}`}
              onClick={() => sectionSelectRef.current?.("about")}
              title="About me (whoami)"
            >
              <span className="sec-num">01</span>
              <span className="sec-title">About me</span>
            </button>
            <button
              type="button"
              className={`dev-sec-btn ${activeSection === "projects" ? "is-active" : ""}`}
              onClick={() => sectionSelectRef.current?.("projects")}
              title="Projects"
            >
              <span className="sec-num">02</span>
              <span className="sec-title">Projects</span>
            </button>
            <button
              type="button"
              className={`dev-sec-btn ${activeSection === "theme" ? "is-active" : ""}`}
              onClick={() => sectionSelectRef.current?.("theme")}
              title="Theme switcher"
            >
              <span className="sec-num">03</span>
              <span className="sec-title">Theme</span>
            </button>
          </nav>
          <button className="tabline" type="button" aria-expanded="false" aria-controls="tree">
            <span className="tab-dir">~/Projects</span>
            <span className="tab-file"></span>
            <span className="tab-toggle" aria-hidden="true">
              ↓
            </span>
          </button>
          <nav className="wheel" id="tree" aria-label="Projects, themes and the log"></nav>
          <div className="pane">
            <p className="winbar"></p>
            <div className="buffer" tabIndex={0} aria-live="polite"></div>
            <div className="eye-host" aria-hidden="true"></div>
          </div>
        </section>

        <div className="bar">
          <p className="bar-id" aria-hidden="true">
            <span className="bar-title">EMRAN-DEV</span>
            <span className="bar-sub">
              <span className="cmd"></span>
              <span className="hunt"></span>
              <span className="keys"></span>
            </span>
          </p>
          <div className="bar-cols" aria-hidden="true"></div>
          <div className="bar-state" aria-hidden="true">
            <p className="col">
              <span className="label">WORM</span>
              <span className="value" data-k="worm">
                lurking
              </span>
            </p>
            <p className="col">
              <span className="label">EYE</span>
              <span className="value" data-k="eye">
                closed
              </span>
            </p>
            <p className="col">
              <span className="label">GHOST</span>
              <span className="value" data-k="ghost">
                idle
              </span>
            </p>
          </div>
          <button className="den" type="button" aria-label="worm" aria-pressed="false" data-tip="wake the worm"></button>
          <p className="bar-graph" aria-hidden="true">
            <span className="label span">VISITORS</span>
            <span className="value end"></span>
            <canvas></canvas>
          </p>
        </div>
        <div className="desk" aria-hidden="true"></div>
      </main>
      <canvas className="overlay" aria-hidden="true"></canvas>
    </div>
  );
}

export default function DevClient() {
  const [entered, setEntered] = React.useState(() => {
    if (typeof window !== "undefined") {
      return window.location.hash === "#workspace";
    }
    return false;
  });

  const handleEnter = React.useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.hash = "workspace";
    }
    setEntered(true);
  }, []);

  const handleReturnToIntro = React.useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.hash = "";
    }
    setEntered(false);
  }, []);

  if (!entered) {
    return <GlimpseIntro onEnter={handleEnter} />;
  }

  return <DevWorkspace onReturnToIntro={handleReturnToIntro} />;
}
