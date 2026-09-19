"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
    tint: "#b8860b",
    distortion: 0.95,
    swirl: 0.32,
    speed: 0.3,
    grainMixer: 0.18,
    grainOverlay: 0.09,
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
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentStyle, setCurrentStyle] = useState(HOVER_PRESETS.default);
  const hideTimerRef = useRef(null);

  // Sync dark/light theme based on system preferences
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = (matches) => {
      setIsDark(matches);
      if (matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    syncTheme(media.matches);
    const handler = (e) => syncTheme(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Guarantee hover effect is immediately cleared whenever route/page changes
  useEffect(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setIsHovered(false);
  }, [pathname]);

  // Clear hover on scrolling, window blur, visibility loss, or mouse leaving the viewport
  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissHover = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      setIsHovered(false);
    };

    const handleMouseLeaveDoc = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        dismissHover();
      }
    };

    window.addEventListener("blur", dismissHover);
    window.addEventListener("scroll", dismissHover, { passive: true });
    document.addEventListener("visibilitychange", dismissHover);
    document.addEventListener("mouseleave", handleMouseLeaveDoc);

    return () => {
      window.removeEventListener("blur", dismissHover);
      window.removeEventListener("scroll", dismissHover);
      document.removeEventListener("visibilitychange", dismissHover);
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
    };
  }, []);

  const [hoveredRects, setHoveredRects] = useState([]);
  const [isBlurActive, setIsBlurActive] = useState(false);

  const triggerHover = (customStyleOrPreset) => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    let resolvedStyle = HOVER_PRESETS.default;
    let rects = [];
    let blur = false;

    if (typeof customStyleOrPreset === "string" && HOVER_PRESETS[customStyleOrPreset]) {
      resolvedStyle = HOVER_PRESETS[customStyleOrPreset];
    } else if (typeof customStyleOrPreset === "object" && customStyleOrPreset !== null) {
      if (customStyleOrPreset.preset && HOVER_PRESETS[customStyleOrPreset.preset]) {
        resolvedStyle = { ...HOVER_PRESETS[customStyleOrPreset.preset], ...customStyleOrPreset };
      } else {
        resolvedStyle = { ...HOVER_PRESETS.default, ...customStyleOrPreset };
      }
      if (Array.isArray(customStyleOrPreset.rects)) {
        rects = customStyleOrPreset.rects;
      }
      if (typeof customStyleOrPreset.shouldBlur === "boolean") {
        blur = customStyleOrPreset.shouldBlur;
      }
    }

    setHoveredRects(rects);
    setIsBlurActive(blur);
    setCurrentStyle(resolvedStyle);
    setIsHovered(true);
  };

  const clearHover = (immediate = false) => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (immediate) {
      setIsHovered(false);
      setIsBlurActive(false);
      setHoveredRects([]);
    } else {
      hideTimerRef.current = setTimeout(() => {
        setIsHovered(false);
        setIsBlurActive(false);
        setHoveredRects([]);
      }, 40);
    }
  };

  const padX = 8;
  const padY = 8;
  let blurClipPath = undefined;
  if (isHovered && isBlurActive && hoveredRects.length > 0) {
    const holePolygons = hoveredRects
      .map((r) => {
        const x1 = Math.max(0, Math.round(r.x - padX));
        const y1 = Math.round(r.y - padY);
        const x2 = Math.round(r.x + r.width + padX);
        const y2 = Math.round(r.y + r.height + padY);
        return `${x1}px ${y1}px, ${x2}px ${y1}px, ${x2}px ${y2}px, ${x1}px ${y2}px, ${x1}px ${y1}px`;
      })
      .join(", ");

    blurClipPath = `polygon(evenodd, 0 0, 100vw 0, 100vw 100vh, 0 100vh, 0 0, ${holePolygons})`;
  }

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

      {/* Content */}
      <div className="relative z-[1] w-full min-h-full">
        {children}
      </div>

      {/* Blur overlay — blurs all content EXCEPT the hovered project section */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          zIndex: 10,
          opacity: isHovered && isBlurActive ? 1 : 0,
          backdropFilter: isHovered && isBlurActive ? "blur(3px)" : "none",
          WebkitBackdropFilter: isHovered && isBlurActive ? "blur(3px)" : "none",
          clipPath: blurClipPath,
          WebkitClipPath: blurClipPath,
        }}
      />
    </HoverBackgroundContext.Provider>
  );
}

export function useHoverBackground() {
  return useContext(HoverBackgroundContext);
}
