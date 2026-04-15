"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const bootSequence = [
  { text: "EMRAN SYSTEMS", delay: 0.1, color: "text-[#8b8b73]" },
  { text: "Copyright (C) 2026, Emran Hossain. All rights reserved.", delay: 0.1, color: "text-[#8b8b73]" },
  { text: " ", delay: 0.1 },
  { text: "CPU: Next.js v15.0 @ 4.20 GHz", delay: 0.3, color: "text-[#8b8b73]" },
  { text: "Memory Test: 16384KB OK", delay: 0.5, color: "text-[#cfa355]" },
  { text: "Detecting Portfolio Assets...", delay: 0.4, color: "text-[#8b8b73]" },
  { text: "Initializing Lenis Scroll... OK", delay: 0.3, color: "text-[#cfa355]" },
  { text: "GSAP Motion Engine... READY", delay: 0.2, color: "text-[#cfa355]" },
  { text: " ", delay: 0.1 },
  { text: "Booting Emran's Portfolio...", delay: 0.6, color: "text-[#e5e5e0]" },
];

const LoadingScreen = ({ onFinish }) => {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentLine = 0;
    const timeouts = [];

    const addLine = () => {
      if (currentLine < bootSequence.length) {
        setLines((prev) => [...prev, bootSequence[currentLine]]);
        const nextDelay = bootSequence[currentLine].delay * 1000;
        currentLine++;
        setProgress((currentLine / bootSequence.length) * 100);
        const timeout = setTimeout(addLine, nextDelay);
        timeouts.push(timeout);
      } else {
        // All lines added, wait a bit then finish
        const finalTimeout = setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              if (onFinish) onFinish();
            },
          });

          tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          });
        }, 1000);
        timeouts.push(finalTimeout);
      }
    };

    addLine();

    // Blinking cursor animation
    const cursorAnim = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)",
    });

    return () => {
      timeouts.forEach(clearTimeout);
      cursorAnim.kill();
    };
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#393632] flex flex-col justify-start p-6 md:p-12 font-mono text-sm md:text-base selection:bg-[#cfa355] selection:text-[#393632] overflow-hidden"
    >
      <div className="max-w-4xl w-full">
        {lines.map((line, index) => {
          if (!line) return null;
          return (
            <div key={index} className={`mb-1 ${line.color || "text-[#8b8b73]"}`}>
              {line.text}
            </div>
          );
        })}
        <div className="flex items-center">
          <span ref={cursorRef} className="w-2 h-4 bg-[#8b8b73] ml-1"></span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 max-w-md w-full">
        <div className="flex justify-between mb-2 text-xs text-[#8b8b73]">
          <span>SYSTEM INITIALIZING</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-[#393632] border border-[#8b8b73]/30 relative overflow-hidden">
          <div
            className="h-full bg-[#cfa355] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(207,163,85,0.3)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Retro scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
};

export default LoadingScreen;
