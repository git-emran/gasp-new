"use client";

import React from "react";
import Link from "next/link";
import { useHoverBackground } from "./HoverBackgroundProvider";

export default function HoverLink({
  href,
  preset = "default",
  tint,
  distortion,
  swirl,
  speed,
  grainMixer,
  grainOverlay,
  className = "",
  children,
  target,
  rel,
  onClick,
  ...props
}) {
  const { triggerHover, clearHover } = useHoverBackground();

  const handleMouseEnter = (e) => {
    if (tint || distortion !== undefined || swirl !== undefined || speed !== undefined) {
      triggerHover({
        ...(preset ? { preset } : {}),
        ...(tint ? { tint } : {}),
        ...(distortion !== undefined ? { distortion } : {}),
        ...(swirl !== undefined ? { swirl } : {}),
        ...(speed !== undefined ? { speed } : {}),
        ...(grainMixer !== undefined ? { grainMixer } : {}),
        ...(grainOverlay !== undefined ? { grainOverlay } : {}),
      });
    } else {
      triggerHover(preset);
    }
  };

  const handleMouseLeave = () => {
    clearHover();
  };

  const isExternal =
    target === "_blank" ||
    (typeof href === "string" && (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")));

  if (isExternal) {
    return (
      <a
        href={href}
        target={target || (isExternal ? "_blank" : undefined)}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}
