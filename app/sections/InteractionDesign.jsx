"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { interactionDesigns, interactionDesignsCarousel } from "../constants";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const InteractionDesign = () => {
  const text = `A collection of interaction designs and micro-animations, focusing on seamless user experiences.`;
  const carouselRef = useRef(null);
  const rafRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  // Throttle scroll checks via requestAnimationFrame to eliminate main-thread jank
  const checkScrollability = useCallback(() => {
    if (rafRef.current) return; // already scheduled
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 2);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
      }
    });
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    // passive: true keeps scroll on the compositor thread
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability, { passive: true });
    checkScrollability(); // initial check
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [checkScrollability]);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Escape key closes modal
  useEffect(() => {
    if (!activeItem) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => { if (e.key === "Escape") setActiveItem(null); };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  return (
    /* Remove transition-colors — it forces repaints every scroll frame */
    <section id="interaction-design" className="flex flex-col py-24 my-12 bg-black text-white rounded-t-4xl rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Micro-interactions & UX"}
        title={"Interaction Design"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      {/* Native Carousel */}
      <div className="relative w-full mt-12 md:mt-20">
        <div
          ref={carouselRef}
          className="flex w-full gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-8"
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            /* Replicates max-w-7xl (80rem = 1280px) mx-auto left alignment, min 1.5rem on small screens */
            paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2))",
            paddingRight: "max(1.5rem, calc((100vw - 80rem) / 2))",
          }}
        >
          {interactionDesignsCarousel.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="flex-shrink-0 snap-start cursor-pointer relative w-[75vw] md:w-[380px] lg:w-[420px] aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900 group"
              style={{
                /* Promote to own GPU layer — eliminates main-thread repaint on scroll */
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                contain: "layout style",
              }}
            >
              {/* Image — no scale on hover (avoids layer invalidation) */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 object-cover w-full h-full"
              />

              {/* Static gradient overlay — opacity only on hover (compositor-only) */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/65 transition-opacity duration-300 group-hover:opacity-70"
                style={{ willChange: "opacity" }}
              />

              {/* Text */}
              <div className="absolute top-6 left-6 right-6 z-10">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-white/80 uppercase">
                  {item.category}
                </span>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-white leading-snug" style={{ textWrap: "balance" }}>
                  {item.title}
                </h3>
              </div>

              {/* Icon hint — no backdrop-blur (extremely expensive per-card) */}
              <div className="absolute bottom-6 right-6 z-10 bg-white/25 size-10 rounded-full flex items-center justify-center text-white">
                <Icon icon="lucide:maximize-2" className="size-5" />
              </div>
            </div>
          ))}

          {/* Trailing spacer */}
          <div className="flex-shrink-0 w-[5vw] md:w-[10vw]" aria-hidden />
        </div>

        {/* Arrow controls */}
        <div
          className="flex justify-end gap-3 mt-4 relative z-20"
          style={{ paddingRight: "max(1.5rem, calc((100vw - 80rem) / 2))" }}
        >
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white border border-white/10 shadow-sm disabled:opacity-40 disabled:pointer-events-none transition-transform duration-150 hover:scale-105 active:scale-95"
          >
            <Icon icon="lucide:arrow-left" className="size-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white border border-white/10 shadow-sm disabled:opacity-40 disabled:pointer-events-none transition-transform duration-150 hover:scale-105 active:scale-95"
          >
            <Icon icon="lucide:arrow-right" className="size-6" />
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-12 relative z-30">
        <Link
          href="/interaction-archive"
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black dark:text-black bg-white dark:bg-white rounded-full overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:pr-12"
        >
          <span>Explore All Interactions</span>
          <Icon 
            icon="lucide:arrow-right" 
            className="w-4 h-4 absolute right-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" 
          />
        </Link>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl cursor-zoom-out p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white dark:bg-neutral-900 rounded-[2rem] overflow-hidden shadow-2xl p-6 md:p-10 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-black dark:text-white transition-colors"
              onClick={() => setActiveItem(null)}
            >
              <Icon icon="lucide:x" className="size-6" />
            </button>

            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-black/40 dark:text-white/40 uppercase">
                  {activeItem.category}
                </span>
                <h2 className="mt-2 text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white leading-tight">
                  {activeItem.title}
                </h2>
              </div>

              <div className="relative aspect-video rounded-[1.5rem] overflow-hidden border border-black/5 dark:border-white/10 bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-black/60 dark:text-white/60">
                  Interactive UI micro-animation concept.
                </p>
                <Link
                  href="/interaction-archive"
                  onClick={() => setActiveItem(null)}
                  className="px-6 py-3 text-xs font-normal uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-90 transition-opacity"
                >
                  View Archive
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractionDesign;
