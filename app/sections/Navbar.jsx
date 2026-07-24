"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS = ["home", "works", "skills", "about"];

const SOCIAL_ICONS = {
  Insta:    "ri:instagram-line",
  LinkedIn: "ri:linkedin-box-line",
  GitHub:   "ri:github-line",
  "My Blog": "ri:article-line",
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const pathname = usePathname();
  const isHome   = pathname === "/";

  // Refs
  const pillRef       = useRef(null); // animate the pill, not the positioner
  const dropdownRef   = useRef(null);
  const contactBtnRef = useRef(null);

  // State
  const [contactOpen,    setContactOpen]    = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("home");

  // ── Entrance animation (animate the pill only — no horizontal transform clash)
  useGSAP(() => {
    gsap.fromTo(
      pillRef.current,
      { y: -72, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: "power3.out" }
    );
  }, []);

  // ── Scroll: track scrolled state for pill styling ──────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Scroll-spy (homepage only) ───────────────────────────────────────────────
  useEffect(() => {
    if (!isHome) return;
    const els = NAV_LINKS
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // ── Close dropdowns on outside click ─────────────────────────────────────────
  useEffect(() => {
    if (!contactOpen && !mobileMenuOpen) return;
    const onPointerDown = (e) => {
      const outsideContact =
        dropdownRef.current   && !dropdownRef.current.contains(e.target) &&
        contactBtnRef.current && !contactBtnRef.current.contains(e.target);
      if (outsideContact) setContactOpen(false);
      
      const outsideMobile = 
        pillRef.current && !pillRef.current.contains(e.target);
      if (outsideMobile) setMobileMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [contactOpen, mobileMenuOpen]);

  // ── Navigation ───────────────────────────────────────────────────────────────
  const handleNavClick = useCallback((section) => {
    if (isHome) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${section}`;
    }
  }, [isHome]);

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    /**
     * Positioner — full width, flex-centered, purely for layout.
     * NEVER put GSAP animations on this element; it would break centering
     * because GSAP's inline transform would override the flex layout.
     */
    <div
      className="fixed top-4 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none"
    >
      {/* Pill — GSAP target, pointer-events re-enabled here */}
      <nav
        ref={pillRef}
        aria-label="Main navigation"
        className={`
          relative pointer-events-auto
          flex items-center gap-0.5 px-2 py-1.5 rounded-full
          border border-black/8
          shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_3px_rgba(0,0,0,0.06)]
          transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500
          ${scrolled
            ? "bg-white/70 backdrop-blur-2xl border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.14),0_1px_3px_rgba(0,0,0,0.08)]"
            : "bg-white/50 backdrop-blur-xl"}
        `}
        style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
      >
        {/* ── Mobile Menu Toggle ──────────────────────────────────────────── */}
        <button
          className="md:hidden flex items-center justify-center p-2 ml-1 rounded-full text-black hover:bg-black/6 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <Icon icon={mobileMenuOpen ? "lucide:x" : "lucide:menu"} className="size-4" />
        </button>

        {/* ── Desktop Nav links ───────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((section) => {
            const isActive = isHome && activeSection === section;
            return (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className={`
                  px-4 py-1.5 rounded-full
                  text-[11px] font-semibold uppercase tracking-[0.12em]
                  font-[family-name:var(--font-jetbrains-mono)]
                  transition-all duration-200 ease-out cursor-pointer select-none
                  ${isActive
                    ? "bg-black text-white shadow-sm"
                    : "text-black/55 hover:text-black hover:bg-black/6"}
                `}
              >
                {section}
              </button>
            );
          })}
        </div>

        {/* ── Divider (Desktop only) ──────────────────────────────────────── */}
        <span className="hidden md:block w-px h-4 bg-black/12 mx-1 flex-shrink-0" aria-hidden />

        {/* ── Contact trigger ─────────────────────────────────────────────── */}
        <div className="relative">
          <button
            ref={contactBtnRef}
            onClick={() => setContactOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={contactOpen}
            className={`
              flex items-center gap-1.5 px-4 py-1.5 rounded-full
              text-[11px] font-semibold uppercase tracking-[0.12em]
              font-[family-name:var(--font-jetbrains-mono)]
              transition-all duration-200 ease-out cursor-pointer select-none
              ${contactOpen
                ? "bg-black text-white shadow-sm"
                : "text-black/55 hover:text-black hover:bg-black/6"}
            `}
          >
            Contact
            <Icon
              icon="lucide:chevron-down"
              className={`size-3 flex-shrink-0 transition-transform duration-300 ${contactOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* ── Dropdown panel ──────────────────────────────────────────────── */}
          <div
            ref={dropdownRef}
            role="menu"
            aria-label="Contact options"
            className={`
              absolute top-[calc(100%+10px)] right-0 w-72
              rounded-2xl border border-black/10 bg-white
              shadow-[0_20px_48px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06),0_0_0_0.5px_rgba(0,0,0,0.04)]
              transition-all duration-250 ease-out origin-top-right
              ${contactOpen
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-[0.96] -translate-y-1 pointer-events-none"}
            `}
          >
            <div className="p-4 space-y-4">

              {/* Email ─────────────────────────────────────────────────────── */}
              <section aria-label="Email">
                <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-black/35 font-normal">
                  Email
                </p>
                <a
                  href="mailto:emrn.hossn@gmail.com"
                  role="menuitem"
                  className="
                    group flex items-center gap-3 p-2.5 rounded-xl
                    hover:bg-black/4 transition-colors duration-150
                  "
                >
                  <span className="
                    flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0
                    bg-black/5 group-hover:bg-black/8 transition-colors duration-150
                  ">
                    <Icon icon="ri:mail-line" className="size-4 text-black/60" />
                  </span>
                  <span className="text-[12px] text-black/70 group-hover:text-black lowercase tracking-wide transition-colors duration-150 truncate">
                    emrn.hossn@gmail.com
                  </span>
                  <Icon
                    icon="lucide:arrow-up-right"
                    className="size-3.5 ml-auto text-black/25 opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity duration-150"
                  />
                </a>
              </section>

              {/* Separator ─────────────────────────────────────────────────── */}
              <div className="h-px bg-black/6" />

              {/* Socials ────────────────────────────────────────────────────── */}
              <section aria-label="Social media">
                <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-black/35 font-normal">
                  Social Media
                </p>
                <div className="space-y-0.5">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="
                        group flex items-center gap-3 px-2.5 py-2 rounded-xl
                        hover:bg-black/4 transition-colors duration-150
                      "
                    >
                      <span className="
                        flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0
                        bg-black/5 group-hover:bg-black/8 transition-colors duration-150
                      ">
                        <Icon
                          icon={SOCIAL_ICONS[social.name] ?? "ri:link-m"}
                          className="size-4 text-black/60 group-hover:text-black transition-colors duration-150"
                        />
                      </span>
                      <span className="text-[12px] text-black/70 group-hover:text-black capitalize tracking-wide transition-colors duration-150">
                        {social.name}
                      </span>
                      <Icon
                        icon="lucide:arrow-up-right"
                        className="size-3.5 ml-auto text-black/25 opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity duration-150"
                      />
                    </a>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>

        {/* ── Mobile Dropdown panel ─────────────────────────────────────── */}
        <div
          className={`
            md:hidden
            absolute top-[calc(100%+10px)] left-0 min-w-[200px]
            rounded-2xl border border-black/10 bg-white
            shadow-[0_20px_48px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06),0_0_0_0.5px_rgba(0,0,0,0.04)]
            transition-all duration-250 ease-out origin-top-left
            flex flex-col p-2 gap-1
            ${mobileMenuOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-[0.96] -translate-y-1 pointer-events-none"}
          `}
        >
          {NAV_LINKS.map((section) => {
            const isActive = isHome && activeSection === section;
            return (
              <button
                key={section}
                onClick={() => {
                  handleNavClick(section);
                  setMobileMenuOpen(false);
                }}
                className={`
                  px-4 py-3 rounded-xl text-left
                  text-[11px] font-semibold uppercase tracking-[0.12em]
                  font-[family-name:var(--font-jetbrains-mono)]
                  transition-all duration-200 ease-out cursor-pointer select-none
                  ${isActive
                    ? "bg-black text-white shadow-sm"
                    : "text-black/55 hover:text-black hover:bg-black/6"}
                `}
              >
                {section}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
