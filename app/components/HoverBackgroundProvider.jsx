"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import LamaBackgroundShader from "./LamaBackgroundShader";

const HoverBackgroundContext = createContext({
  isHovered: false,
  setIsHovered: () => {},
  setHovered: () => {},
});

export function HoverBackgroundProvider({ children }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(media.matches);
    const handler = (e) => setIsDark(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <HoverBackgroundContext.Provider
      value={{
        isHovered,
        setIsHovered,
        setHovered: setIsHovered,
      }}
    >
      {/* Reference background effect from lamanoujaim.com */}
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
        <LamaBackgroundShader
          tint="#cc785c"
          themeBg={isDark ? "#141210" : "#ffffff"}
          distortion={0.8}
          swirl={0.2}
          speed={0.25}
          grainMixer={0.15}
          grainOverlay={0.08}
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
