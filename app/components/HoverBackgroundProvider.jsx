"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import FluidBackgroundShader from "./FluidBackgroundShader";

export const HOVER_PRESETS = {
  default: {
    tint: "#cc785c",
    distortion: 0.8,
    swirl: 0.2,
    speed: 0.25,
    grainMixer: 0.15,
    grainOverlay: 0.08,
  },
  hero: {
    tint: "#cc785c",
    distortion: 0.8,
    swirl: 0.2,
    speed: 0.25,
    grainMixer: 0.15,
    grainOverlay: 0.08,
  },
  ai: {
    tint: "#8175ec",
    distortion: 0.95,
    swirl: 0.35,
    speed: 0.35,
    grainMixer: 0.18,
    grainOverlay: 0.09,
  },
  biotech: {
    tint: "#2a9d8a",
    distortion: 0.75,
    swirl: 0.2,
    speed: 0.22,
    grainMixer: 0.12,
    grainOverlay: 0.07,
  },
  spatial: {
    tint: "#4a69bd",
    distortion: 1.1,
    swirl: 0.45,
    speed: 0.3,
    grainMixer: 0.2,
    grainOverlay: 0.08,
  },
  writer: {
    tint: "#d9a441",
    distortion: 0.7,
    swirl: 0.18,
    speed: 0.2,
    grainMixer: 0.22,
    grainOverlay: 0.12,
  },
  tennis: {
    tint: "#52d966",
    distortion: 1.2,
    swirl: 0.5,
    speed: 0.42,
    grainMixer: 0.15,
    grainOverlay: 0.07,
  },
  office: {
    tint: "#e09575",
    distortion: 0.75,
    swirl: 0.18,
    speed: 0.2,
    grainMixer: 0.25,
    grainOverlay: 0.1,
  },
  redesign: {
    tint: "#4e779f",
    distortion: 0.85,
    swirl: 0.25,
    speed: 0.25,
    grainMixer: 0.12,
    grainOverlay: 0.08,
  },
  interaction: {
    tint: "#f75092",
    distortion: 1.3,
    swirl: 0.6,
    speed: 0.45,
    grainMixer: 0.2,
    grainOverlay: 0.1,
  },
  work: {
    tint: "#cc785c",
    distortion: 0.8,
    swirl: 0.2,
    speed: 0.25,
    grainMixer: 0.15,
    grainOverlay: 0.08,
  },
  about: {
    tint: "#867162",
    distortion: 0.7,
    swirl: 0.15,
    speed: 0.2,
    grainMixer: 0.16,
    grainOverlay: 0.08,
  },
  notes: {
    tint: "#ddbdb4",
    distortion: 0.65,
    swirl: 0.15,
    speed: 0.18,
    grainMixer: 0.14,
    grainOverlay: 0.08,
  },
  interactions_nav: {
    tint: "#9f50d3",
    distortion: 1.25,
    swirl: 0.55,
    speed: 0.4,
    grainMixer: 0.18,
    grainOverlay: 0.09,
  },
  linkedin: {
    tint: "#0a66c2",
    distortion: 0.85,
    swirl: 0.25,
    speed: 0.26,
    grainMixer: 0.12,
    grainOverlay: 0.07,
  },
  github: {
    tint: "#6e5494",
    distortion: 0.9,
    swirl: 0.3,
    speed: 0.28,
    grainMixer: 0.16,
    grainOverlay: 0.08,
  },
  instagram: {
    tint: "#e1306c",
    distortion: 1.15,
    swirl: 0.45,
    speed: 0.38,
    grainMixer: 0.18,
    grainOverlay: 0.09,
  },
  blog: {
    tint: "#d97757",
    distortion: 0.8,
    swirl: 0.2,
    speed: 0.22,
    grainMixer: 0.15,
    grainOverlay: 0.08,
  },
};

const HoverBackgroundContext = createContext({
  isHovered: false,
  setIsHovered: () => {},
  triggerHover: () => {},
  clearHover: () => {},
  style: HOVER_PRESETS.default,
});

export function HoverBackgroundProvider({ children }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentStyle, setCurrentStyle] = useState(HOVER_PRESETS.default);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(media.matches);
    const handler = (e) => setIsDark(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const triggerHover = (customStyleOrPreset) => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    let resolvedStyle = HOVER_PRESETS.default;
    if (typeof customStyleOrPreset === "string" && HOVER_PRESETS[customStyleOrPreset]) {
      resolvedStyle = HOVER_PRESETS[customStyleOrPreset];
    } else if (typeof customStyleOrPreset === "object" && customStyleOrPreset !== null) {
      resolvedStyle = { ...HOVER_PRESETS.default, ...customStyleOrPreset };
    }

    setCurrentStyle(resolvedStyle);
    setIsHovered(true);
  };

  const clearHover = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 40);
  };

  return (
    <HoverBackgroundContext.Provider
      value={{
        isHovered,
        setIsHovered,
        triggerHover,
        clearHover,
        style: currentStyle,
      }}
    >
      {/* Interactive fluid WebGL background shader */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none transition-opacity duration-700 ease-out"
        style={{
          zIndex: 0,
          opacity: isHovered ? 1 : 0,
          WebkitMaskImage:
            "radial-gradient(ellipse 58% 52% at 50% 48%, rgba(0,0,0,0.28) 30%, rgba(0,0,0,0.6) 65%, black 95%)",
          maskImage:
            "radial-gradient(ellipse 58% 52% at 50% 48%, rgba(0,0,0,0.28) 30%, rgba(0,0,0,0.6) 65%, black 95%)",
        }}
      >
        <FluidBackgroundShader
          tint={currentStyle.tint}
          themeBg={isDark ? "#141210" : "#ffffff"}
          distortion={currentStyle.distortion}
          swirl={currentStyle.swirl}
          speed={currentStyle.speed}
          grainMixer={currentStyle.grainMixer}
          grainOverlay={currentStyle.grainOverlay}
          minPixelRatio={1}
          maxPixelCount={1500000}
        />
      </div>

      <div className="relative z-[1] w-full min-h-full">
        {children}
      </div>
    </HoverBackgroundContext.Provider>
  );
}

export function useHoverBackground() {
  return useContext(HoverBackgroundContext);
}
