"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./TerminalGlitchTransition.css";

export default function TerminalGlitchTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [glitchState, setGlitchState] = useState({
    active: false,
    phase: "idle", // 'entering' | 'settling' | 'idle'
    targetUrl: "/dev",
  });
  const glitchTimerRef = useRef(null);

  // Play a brief synthetic audio blip (safe, self-closing AudioContext)
  const playGlitchSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
      setTimeout(() => ctx.close().catch(() => {}), 300);
    } catch {}
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Find closest anchor tag
      const anchor = e.target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      // Check if clicking link pointing to /dev from any non-/dev route
      const isTerminalLink =
        href === "/dev" ||
        href.startsWith("/dev?") ||
        href.startsWith("/dev#") ||
        (anchor.origin === window.location.origin && anchor.pathname === "/dev");

      if (isTerminalLink && pathname !== "/dev") {
        e.preventDefault();
        e.stopPropagation();

        playGlitchSound();
        setGlitchState({
          active: true,
          phase: "entering",
          targetUrl: href || "/dev",
        });

        // After initial glitch tear, navigate to /dev
        if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
        glitchTimerRef.current = setTimeout(() => {
          router.push(href || "/dev");
        }, 420);
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    };
  }, [pathname, router]);

  // When pathname changes to /dev during active glitch, begin settling transition
  useEffect(() => {
    if (glitchState.active && pathname === "/dev" && glitchState.phase === "entering") {
      setGlitchState((prev) => ({ ...prev, phase: "settling" }));
      const timer = setTimeout(() => {
        setGlitchState({ active: false, phase: "idle", targetUrl: "/dev" });
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [pathname, glitchState.active, glitchState.phase]);

  if (!glitchState.active) return null;

  return (
    <div
      className={`glitch-transition-root ${glitchState.phase === "settling" ? "is-settling" : ""}`}
      aria-hidden="true"
    >
      <div className="glitch-scanlines" />
      <div className="glitch-vignette" />
      <div className="glitch-raster-bar" />
      <div className="glitch-layer-cyan" />
      <div className="glitch-layer-magenta" />

      <div className="glitch-hud">
        <div className="glitch-hud-title">
          <span>SYSTEM // TTY_INIT</span>
          <span className="glitch-blink" />
        </div>
        <div className="glitch-hud-status">
          SWITCHING SUBSYSTEM: GUI → TERMINAL
          <br />
          ALLOCATING RAW BUFFER [0x050505]
        </div>
        <div className="glitch-hud-code">
          STTY -RAW -ECHO // EXEC NVIM
        </div>
      </div>
    </div>
  );
}
