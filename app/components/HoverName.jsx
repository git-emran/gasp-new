"use client";

import React from "react";
import { useHoverBackground } from "./HoverBackgroundProvider";

export default function HoverName({
  children = "Emran Hossain",
  className = "",
  ...props
}) {
  const { setIsHovered } = useHoverBackground();

  return (
    <span
      className={`inline-block cursor-default transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </span>
  );
}
