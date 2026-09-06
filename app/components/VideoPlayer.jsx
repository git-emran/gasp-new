"use client";

import React, { useState } from "react";
import { IconPlayerPlay, IconX, IconCircleFilled } from "@tabler/icons-react";

export default function VideoPlayer() {
  const [activeTab, setActiveTab] = useState("reel");
  const [isPlaying, setIsPlaying] = useState(false);

  const tabs = [
    { id: "reel", label: "Portfolio Reel", videoId: "W62B-Zmsm2E" },
    { id: "about", label: "About Emran", videoId: "WVf93qHZ6Kc" },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];
  const embedUrl = `https://www.youtube.com/embed/${currentTab.videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0`;

  const handleTabChange = (tabId) => {
    if (tabId !== activeTab) {
      setActiveTab(tabId);
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Player Outer Frame */}
      <div className="relative group rounded-xl overflow-hidden border border-[rgba(207,163,85,0.25)] bg-[rgba(57,54,50,0.03)] backdrop-blur-md transition-all duration-500 hover:border-[rgba(207,163,85,0.6)] hover:shadow-[0_0_30px_rgba(207,163,85,0.15)] aspect-video">
        
        {/* Terminal Header & Tabs */}
        <div className="absolute top-0 inset-x-0 h-10 border-b border-[rgba(207,163,85,0.2)] bg-[rgba(57,54,50,0.08)] flex items-center justify-between px-2 sm:px-4 z-20 font-mono text-[10px] sm:text-xs">
          {/* Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 h-full">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 h-full border-b-2 cursor-pointer transition-all duration-300 font-mono uppercase font-bold tracking-wider ${
                    isActive
                      ? "border-[#cfa355] text-[#393632] bg-[rgba(207,163,85,0.12)]"
                      : "border-transparent text-[rgba(57,54,50,0.6)] hover:text-[#393632] hover:bg-[rgba(57,54,50,0.05)]"
                  }`}
                >
                  <IconCircleFilled
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${
                      isActive
                        ? isPlaying
                          ? "text-[#cfa355] animate-pulse"
                          : "text-emerald-600 animate-pulse"
                        : "text-transparent opacity-0"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Status */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest text-[rgba(57,54,50,0.7)] uppercase font-semibold">
            <span>{isPlaying ? "STREAM: ONLINE" : "STREAM: IDLE"}</span>
          </div>
        </div>

        {/* Video or Preview Cover */}
        <div className="w-full h-full pt-10 relative bg-black/5">
          {isPlaying ? (
            <div className="relative w-full h-full">
              <iframe
                key={currentTab.videoId}
                src={embedUrl}
                title={`${currentTab.label} Video Player`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              {/* Close Button HUD */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#393632] hover:bg-[#cfa355] text-[#e5e5e0] hover:text-[#393632] font-mono text-xs uppercase tracking-wider transition-all duration-300 border border-[rgba(207,163,85,0.3)] shadow-lg z-30"
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
                  <p className="font-mono text-lg tracking-[0.25em] text-[#393632] uppercase font-bold">
                    [PLAY {currentTab.label}]
                  </p>
                </div>
              </div>

              <div className="absolute bottom-4 right-6 font-mono text-[15px] text-black/40 hidden sm:block animate-pulse">
                <span>CLICK TO INITIALIZE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
