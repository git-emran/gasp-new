"use client";
import React, { useState, useMemo, useRef } from "react";
import { interactionDesigns } from "../constants";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactLenis from "lenis/react";
import Navbar from "../sections/Navbar";
import Contact from "../sections/Contact";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const uniqueCategories = [...new Set(interactionDesigns.map(item => item.category))];

const InteractionsPage = () => {
  const [activeTab, setActiveTab] = useState(uniqueCategories[0] || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return interactionDesigns.filter(item => item.category === activeTab);
  }, [activeTab]);

  useGSAP(() => {
    // Hero Entrance — runs once on mount
    gsap.from(".hero-content > *", {
      opacity: 0,
      y: 80,
      stagger: 0.15,
      duration: 1.2,
      ease: "power4.out",
    });
  }, { scope: containerRef });

  // Stagger animate cards on mount or tab change (no ScrollTrigger to avoid scroll lag)
  useGSAP(() => {
    gsap.fromTo(
      ".reveal-card",
      { 
        opacity: 0, 
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.02,
        ease: "power2.out",
      }
    );
  }, { scope: containerRef, dependencies: [filteredItems] });

  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <ReactLenis root>
      <main ref={containerRef} className="bg-[#e5e5e0] dark:bg-[#0a0a0a] text-black dark:text-white min-h-screen selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black font-light transition-colors duration-500">
        <Navbar />

        {/* Back Button */}
        <div className="fixed top-24 left-8 z-[60] mix-blend-difference hidden md:block">
          <Link href="/#interaction-design" className="flex items-center gap-2 group text-xs uppercase tracking-[0.3em] text-white font-medium">
             <Icon icon="lucide:arrow-left" className="size-4" />
             <span className="relative overflow-hidden h-4">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">Back</span>
                <span className="absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full">Back</span>
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
                Interaction<br/>Archive
              </h1>
              <div className="max-w-2xl">
                 <p className="text-xl md:text-2xl text-black/60 dark:text-white/60 font-light leading-relaxed">
                  A curated collection of micro-animations, flows, and interactive components.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Info / Tab Strip */}
        <section className="py-12 border-y border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-sm px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
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
        </section>

        {/* Masonry Grid */}
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="reveal-card opacity-0 relative break-inside-avoid overflow-hidden border rounded-[2rem] border-black/5 dark:border-white/10 group cursor-zoom-in transition-all duration-500 bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/5 hover:-translate-y-1"
                  onClick={() => setSelectedImage(item.image)}
                  style={{ 
                    contain: "layout",
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:opacity-100">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">{item.category}</p>
                    <h3 className="mt-2 text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="py-20 text-center text-black/50 dark:text-white/50">
                No interactions found for this category.
              </div>
            )}
          </div>
        </section>

        <Contact />

        {/* Image Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl cursor-zoom-out animate-in fade-in duration-500"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-[90vw] max-h-[90vh]">
              <img 
                src={selectedImage} 
                className="w-full h-full object-contain rounded-xl shadow-2xl scale-in-95 animate-in zoom-in-95 duration-500" 
                alt="Lightbox View"
              />
              <button 
                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <Icon icon="lucide:x" className="size-8" />
              </button>
            </div>
          </div>
        )}
      </main>
    </ReactLenis>
  );
};

export default InteractionsPage;
