"use client";

import React, { useState, useEffect } from "react";
import { IconPlayerPlay, IconX, IconCircleFilled } from "@tabler/icons-react";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = "W62B-Zmsm2E";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0`;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Player Outer Frame */}
      <div className="relative group rounded-xl overflow-hidden border border-[rgba(207,163,85,0.25)] bg-[rgba(57,54,50,0.03)] backdrop-blur-md transition-all duration-500 hover:border-[rgba(207,163,85,0.6)] hover:shadow-[0_0_30px_rgba(207,163,85,0.15)] aspect-video">
        
        {/* Terminal Header */}
        <div className="absolute top-0 inset-x-0 h-10 border-b border-[rgba(207,163,85,0.2)] bg-[rgba(57,54,50,0.08)] flex items-center justify-between px-4 z-20 font-mono text-[10px] sm:text-xs text-[rgba(57,54,50,0.7)]">
          <div className="flex items-center gap-2">
            <IconCircleFilled className={`w-2 h-2 ${isPlaying ? "text-[#cfa355] animate-pulse" : "text-emerald-600 animate-pulse"}`} />
            <span className="tracking-widest uppercase font-bold text-[#393632]">
              {isPlaying ? "STREAM: ONLINE" : "design reel"}
            </span>
          </div>
        </div>

        {/* Video or Preview Cover */}
        <div className="w-full h-full pt-10 relative bg-black/5">
          {isPlaying ? (
            <div className="relative w-full h-full">
              <iframe
                src={embedUrl}
                title="YouTube Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              {/* Close Button HUD */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#393632] hover:bg-[#cfa355] text-[#e5e5e0] hover:text-[#393632] font-mono text-xs uppercase tracking-wider transition-all duration-300 border border-[rgba(207,163,85,0.3)] shadow-lg"
              >
                <IconX className="w-3.5 h-3.5" />
                <span>Disconnect Feed</span>
              </button>
            </div>
          ) : (
            <div 
              onClick={() => setIsPlaying(true)}
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group/cover"
            >
              {/* Technical grid overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(57,54,50,1)_1px,transparent_1px),linear-gradient(90deg,rgba(57,54,50,1)_1px,transparent_1px)]"
                style={{ backgroundSize: "20px 20px" }}
              />
              
              {/* Scanline animation */}
              <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-[#cfa355]/10 to-transparent w-full h-[200%] -translate-y-1/2 animate-[scan_6s_infinite_linear]" style={{ backgroundSize: "100% 4px" }} />

              {/* Corner brackets in absolute positions */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#cfa355]/40 group-hover/cover:border-[#cfa355]" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#cfa355]/40 group-hover/cover:border-[#cfa355]" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#cfa355]/40 group-hover/cover:border-[#cfa355]" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#cfa355]/40 group-hover/cover:border-[#cfa355]" />

              {/* Glassmorphic Play button container */}
              <div className="relative z-10 flex flex-col items-center gap-4 scale-95 group-hover/cover:scale-100 transition-transform duration-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-[rgba(57,54,50,0.06)] hover:bg-[rgba(207,163,85,0.15)] border-2 border-[#cfa355]/60 group-hover/cover:border-[#cfa355] text-[#393632] group-hover/cover:text-[#cfa355] shadow-[0_0_15px_rgba(207,163,85,0.1)] group-hover/cover:shadow-[0_0_30px_rgba(207,163,85,0.4)] transition-all duration-500">
                  <IconPlayerPlay className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-[2px]" />
                </div>
                <div className="text-center">
                  <p className="font-mono text-xs tracking-[0.25em] text-[#393632] uppercase font-bold">
                    [ VIEW REEL ]
                  </p>
                </div>
              </div>

              <div className="absolute bottom-4 right-6 font-mono text-[9px] text-black/40 hidden sm:block animate-pulse">
                <span>CLICK TO INITIALIZE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
