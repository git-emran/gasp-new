"use client";

import React, { useEffect, useMemo, useRef } from "react";

const DEFAULT_CHARS = Array.from(
  "abcdefghijklmnopqrstuvwxyz0123456789"
);

export default function MatrixRain({
  className,
  height = "70vh",
  density = 1,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  const chars = useMemo(() => DEFAULT_CHARS, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const fontSize = 14;
    const colWidth = fontSize;
    // Slow + smooth
    // Wider range so each stream feels unique, but still slow overall
    const speedMin = 0.16;
    const speedMax = 0.72;

    const BG = "#e5e5e0";
    const INK = "rgba(57, 54, 50, 0.35)";
    const HEAD = "rgba(207, 163, 85, 0.75)";
    const FADE = "rgba(229, 229, 224, 0.10)";

    let columns = 0;
    let drops = [];
    let speeds = [];
    let streamCols = [];
    let last = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      if (!rect) return;

      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));

      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.font = `${fontSize}px "SF Mono", "Menlo", "Consolas", monospace`;
      ctx.textBaseline = "top";

      columns = Math.ceil(w / colWidth);
      const streamCount = Math.max(12, Math.floor(columns * density));
      drops = new Array(streamCount).fill(0).map(() => Math.random() * -h);
      streamCols = new Array(streamCount)
        .fill(0)
        .map(() => (Math.random() * columns) | 0);
      speeds = new Array(streamCount)
        .fill(0)
        .map(() => speedMin + Math.random() * (speedMax - speedMin));

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement || canvas);
    resize();

    const tick = (t) => {
      rafRef.current = requestAnimationFrame(tick);
      const { w, h } = sizeRef.current;
      if (!w || !h) return;

      const dt = t - last;
      if (dt < 1000 / 60) return;
      last = t;

      // Fade towards the page background, but keep it transparent-ish.
      ctx.fillStyle = FADE;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < drops.length; i++) {
        const x = streamCols[i] * colWidth;
        const y = drops[i];

        const ch = chars[(Math.random() * chars.length) | 0];

        // Head highlight
        ctx.fillStyle = HEAD;
        ctx.fillText(ch, x, y);

        // A couple of trailing chars for density
        ctx.fillStyle = INK;
        const ch2 = chars[(Math.random() * chars.length) | 0];
        const ch3 = chars[(Math.random() * chars.length) | 0];
        ctx.fillText(ch2, x, y - fontSize * 1.2);
        ctx.fillText(ch3, x, y - fontSize * 2.4);

        // Slight per-stream variation so they don't feel "locked" together
        drops[i] += speeds[i] * fontSize * 0.85;

        if (drops[i] > h * 0.62 && Math.random() < 0.015) {
          // Restart from top; fade-out happens via CSS mask (and limited travel)
          drops[i] = Math.random() * -h * 0.35;
          streamCols[i] = (Math.random() * columns) | 0;
          speeds[i] = speedMin + Math.random() * (speedMax - speedMin);
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [chars, density]);

  return (
    <div
      className={className}
      style={{
        height,
        width: "100%",
        pointerEvents: "none",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)",
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
