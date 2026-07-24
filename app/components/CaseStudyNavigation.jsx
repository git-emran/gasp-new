"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { projects } from "../constants";

const CaseStudyNavigation = ({ currentSlug }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const hasPrev = !!prevProject;
  const hasNext = !!nextProject;

  let maxWidthClass = "max-w-md";
  if (!hasPrev && !hasNext) maxWidthClass = "max-w-[72px]";
  else if (!hasPrev || !hasNext) maxWidthClass = "max-w-[260px]";

  return (
    <div className="fixed top-4 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Case study navigation"
        className={`
          relative pointer-events-auto overflow-hidden
          flex items-center gap-4 px-2 py-1.5 rounded-[2rem]
          border border-black/8 w-full ${maxWidthClass}
          shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_3px_rgba(0,0,0,0.06)]
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${scrolled
            ? "bg-white/70 backdrop-blur-2xl border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.14),0_1px_3px_rgba(0,0,0,0.08)]"
            : "bg-white/50 backdrop-blur-xl"}
        `}
        style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
      >
        <Link href="/" className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 transition-colors" title="Back to Home">
           <Icon icon="lucide:home" className="size-4 text-black" />
        </Link>
        
        {(hasPrev || hasNext) && (
          <div className="flex items-center flex-1 justify-center w-full min-w-0">
            {hasPrev && (
              <Link
                href={prevProject.href}
                className={`group flex flex-col items-end px-3 py-1 rounded-xl hover:bg-black/5 transition-colors flex-1 min-w-0 ${!hasNext ? 'items-start text-left' : ''}`}
              >
                <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-black/40">
                  <Icon icon="lucide:arrow-left" className="size-3 transition-transform group-hover:-translate-x-1" />
                  Prev
                </div>
                <span className={`text-[11px] font-semibold text-black truncate w-full font-[family-name:var(--font-jetbrains-mono)] ${!hasNext ? 'text-left' : 'text-right'}`}>
                  {prevProject.name.split(" -")[0]}
                </span>
              </Link>
            )}
            
            {(hasPrev && hasNext) && (
              <div className="px-4 flex-shrink-0">
                 <div className="w-px h-6 bg-black/10" />
              </div>
            )}

            {hasNext && (
              <Link
                href={nextProject.href}
                className={`group flex flex-col items-start px-3 py-1 rounded-xl hover:bg-black/5 transition-colors flex-1 min-w-0 ${!hasPrev ? 'items-start text-left' : ''}`}
              >
                <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-black/40">
                  Next
                  <Icon icon="lucide:arrow-right" className="size-3 transition-transform group-hover:translate-x-1" />
                </div>
                <span className={`text-[11px] font-semibold text-black truncate w-full text-left font-[family-name:var(--font-jetbrains-mono)]`}>
                  {nextProject.name.split(" -")[0]}
                </span>
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default CaseStudyNavigation;
