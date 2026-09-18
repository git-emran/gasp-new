"use client";

import React, { useState } from "react";
import HoverLink from "./HoverLink";

const VIDEOS = [
  {
    id: "reel",
    title: "Portfolio Reel — Design & Engineering Highlights",
    category: "Showcase Reel",
    videoId: "W62B-Zmsm2E",
    duration: "2 min",
    description:
      "A curated walkthrough of design engineering systems, tactile micro-interactions, spatial interfaces, and production SaaS applications.",
    preset: "ai",
  },
  {
    id: "about",
    title: "About Emran — Product Philosophy & Approach",
    category: "Story & Workflow",
    videoId: "WVf93qHZ6Kc",
    duration: "3 min",
    description:
      "A deeper look into my workflow across B2B SaaS, AI/ML tools, and developer platforms—focusing on clean architecture and high-performance craft.",
    preset: "writer",
  },
];

export default function AboutVideos() {
  const [activeVideoId, setActiveVideoId] = useState(VIDEOS[0].id);

  const activeVideo =
    VIDEOS.find((v) => v.id === activeVideoId) || VIDEOS[0];

  return (
    <div className="w-full">
      {/* Video Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {VIDEOS.map((video) => {
          const isActive = video.id === activeVideoId;
          return (
            <button
              key={video.id}
              onClick={() => setActiveVideoId(video.id)}
              className={`text-sm md:text-base px-4 py-2 rounded-full transition-all duration-300 cursor-pointer font-sans ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black font-medium shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              }`}
            >
              <span>{video.category}</span>
            </button>
          );
        })}
      </div>

      {/* Video Frame */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm mb-6">
        <iframe
          key={activeVideo.videoId}
          src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?rel=0&modestbranding=1`}
          title={activeVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>

      {/* Active Video Details */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h4 className="font-serif text-xl font-bold text-black dark:text-white">
            {activeVideo.title}
          </h4>
          <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
            {activeVideo.duration}
          </span>
        </div>
        <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {activeVideo.description}
        </p>
        <div className="pt-2">
          <HoverLink
            href={`https://www.youtube.com/watch?v=${activeVideo.videoId}`}
            preset={activeVideo.preset}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm underline underline-offset-4 decoration-1 decoration-neutral-400 hover:decoration-black dark:hover:decoration-white font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
          >
            <span>Watch on YouTube</span>
            <svg
              className="w-3.5 h-3.5 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </HoverLink>
        </div>
      </div>
    </div>
  );
}
