"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { interactionDesigns } from "../constants";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactLenis from "lenis/react";
import Contact from "../sections/Contact";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Lazy-loads an image/GIF only when it enters the viewport.
 * Uses a data-src pattern so GIFs don't download or animate until visible.
 */
const LazyImage = ({ src, alt, className, style }) => {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.src = src;
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // start loading 200px before entering viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <>
      {/* Shimmer placeholder shown until image loads */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.04) 25%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.04) 75%)" }}
        />
      )}
      <img
        ref={imgRef}
        alt={alt}
        className={className}
        style={style}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

gsap.registerPlugin(ScrollTrigger);

const uniqueCategories = [...new Set(interactionDesigns.map((item) => item.category))];

// Group items by category
const groupedByCategory = uniqueCategories.map((cat) => ({
  category: cat,
  items: interactionDesigns.filter((item) => item.category === cat),
}));

const InteractionsPage = () => {
  const [activeTab, setActiveTab] = useState(uniqueCategories[0] || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  const sectionRefs = useRef({});
  const tabStripRef = useRef(null);
  const isScrollingRef = useRef(false);

  useGSAP(() => {
    gsap.from(".hero-content > *", {
      opacity: 0,
      y: 80,
      stagger: 0.15,
      duration: 1.2,
      ease: "power4.out",
    });
  }, { scope: containerRef });

  // Scroll to section on tab click
  const handleTabClick = useCallback((cat) => {
    const el = sectionRefs.current[cat];
    if (!el) return;

    isScrollingRef.current = true;
    setActiveTab(cat);

    const tabStripHeight = tabStripRef.current?.offsetHeight || 0;
    const navbarHeight = 80;
    const offset = navbarHeight + tabStripHeight + 16;

    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });

    // Re-enable IntersectionObserver tracking after scroll settles
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  }, []);

  // IntersectionObserver — highlight the tab whose section is in view
  useEffect(() => {
    const observers = [];

    uniqueCategories.forEach((cat) => {
      const el = sectionRefs.current[cat];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isScrollingRef.current) {
            setActiveTab(cat);
          }
        },
        {
          root: null,
          // Trigger when section crosses into the middle band of the viewport
          rootMargin: "-30% 0px -60% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <ReactLenis root>
      <main
        ref={containerRef}
        className="bg-[#e5e5e0] dark:bg-[#0a0a0a] text-black dark:text-white min-h-screen selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black font-light transition-colors duration-500"
      >
        {/* Back Button */}
        <div className="fixed top-24 left-8 z-[60] mix-blend-difference hidden md:block">
          <Link
            href="/#interaction-design"
            className="flex items-center gap-2 group text-xs uppercase tracking-[0.3em] text-white font-medium"
          >
            <Icon icon="lucide:arrow-left" className="size-4" />
            <span className="relative overflow-hidden h-4">
              <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                Back
              </span>
              <span className="absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full">
                Back
              </span>
            </span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative flex flex-col pt-32 pb-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
            <div className="hero-content space-y-8 mb-16">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 border border-black/10 dark:border-white/20 rounded-full text-[9px] uppercase tracking-widest text-black/40 dark:text-white/50">
                  Interactive
                </span>
              </div>
              <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase">
                Interaction<br />Archive
              </h1>
              <div className="max-w-2xl">
                <p className="text-xl md:text-2xl text-black/60 dark:text-white/60 font-light leading-relaxed">
                  A curated collection of micro-animations, flows, and interactive components.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Tab Strip */}
        <div
          ref={tabStripRef}
          className="sticky top-0 z-50 py-4 border-y border-black/10 dark:border-white/10 bg-[#e5e5e0]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md px-6 md:px-12 lg:px-24"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleTabClick(cat)}
                className={`px-6 py-2.5 text-[10px] font-normal uppercase tracking-widest transition-all duration-300 rounded-full border cursor-pointer ${
                  activeTab === cat
                    ? "bg-black text-white dark:bg-white dark:text-black border-transparent shadow-sm"
                    : "bg-black/[0.02] dark:bg-white/[0.03] text-black/50 dark:text-white/50 border-black/5 dark:border-white/10 hover:bg-black/[0.05] dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* All Category Sections stacked */}
        {groupedByCategory.map(({ category, items }) => (
          <section
            key={category}
            ref={(el) => { sectionRefs.current[category] = el; }}
            className="py-24 px-6 md:px-12 lg:px-24 border-b border-black/5 dark:border-white/5"
          >
            <div className="max-w-7xl mx-auto">
              {/* Section heading */}
              <div className="mb-12 flex items-end justify-between">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                  {category}
                </h2>
                <span className="text-sm text-black/40 dark:text-white/40 tabular-nums">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Masonry grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="reveal-card break-inside-avoid overflow-hidden border rounded-[2rem] border-black/5 dark:border-white/10 group cursor-zoom-in transition-[transform,box-shadow] duration-500 bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/5 hover:-translate-y-1"
                    onClick={() => setSelectedImage(item.image)}
                    style={{
                      transform: "translate3d(0, 0, 0)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div
                      className="relative"
                      style={{ aspectRatio: item.aspectRatio || "4/3" }}
                    >
                      <LazyImage
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-8 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:opacity-100">
                        <p className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
                          {item.category}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold text-white">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <Contact />

        {/* Image Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl cursor-zoom-out animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <Icon icon="lucide:x" className="size-5" />
            </button>

            {/* Image — fills available screen space while preserving aspect ratio */}
            <img
              src={selectedImage}
              className="block max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300"
              style={{ maxHeight: "calc(100vh - 4rem)", maxWidth: "calc(100vw - 4rem)" }}
              alt="Lightbox View"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </main>
    </ReactLenis>
  );
};

export default InteractionsPage;
