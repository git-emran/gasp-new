"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { mountGlimpse } from "./glimpse";
import "./glimpse.css";

export default function GlimpseIntro({ onEnter }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = mountGlimpse(containerRef.current, { onEnter });
    return () => {
      cleanup?.();
    };
  }, [onEnter]);

  return (
    <div ref={containerRef} className="glimpse-stage stage">
      <header className="frame-top">
        <Link className="brand" href="/" data-tip="back to main portfolio" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 88 80" aria-hidden="true">
            <path d="M0 12L12 0H16V32H29L38 23V43L33 48H16V80H0Z" />
            <path d="M50 0H88V16H57L50 23V57L57 64H88L72 80H50L34 64V16Z" />
          </svg>
          <span>emran.dev</span>
        </Link>
        <nav className="switch is-solo" aria-label="Elsewhere">
          <a href="https://github.com/git-emran" target="_blank" rel="noopener noreferrer">
            github
          </a>
        </nav>
      </header>

      <h1 className="sr-only">emran.dev — Engineering with feeling.</h1>
      <canvas className="wall" aria-hidden="true"></canvas>
      <div className="glass kb-glass" aria-hidden="true"></div>
      <canvas className="machine" aria-hidden="true"></canvas>
      <canvas className="tile" aria-hidden="true"></canvas>
      <p className="status" aria-hidden="true">
        <span className="mode">NORMAL</span>
        <span className="path"></span>
        <span className="pos"></span>
      </p>
      <p className="cmdline" aria-hidden="true">
        <span className="cmd"></span>
        <span className="showcmd"></span>
      </p>
      <p className="status pane-status" aria-hidden="true">
        <span className="mode">NORMAL</span>
        <span className="path"></span>
        <span className="pos"></span>
      </p>
      <p className="cmdline pane-cmd" aria-hidden="true">
        <span className="cmd"></span>
        <span className="showcmd"></span>
      </p>

      <a className="enter" href="#workspace" aria-label="Enter">
        enter ↩
      </a>
      <button className="theme-key" type="button" aria-label="Change theme">
        <span className="command-glyph" aria-hidden="true"></span>:theme
      </button>
      <p className="note" aria-hidden="true">
        // engineering with feeling.
      </p>
      <nav className="sources sr-only" aria-label="Code shown on this page"></nav>
    </div>
  );
}
