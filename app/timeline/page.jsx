"use client";

import React, { useState, useEffect } from "react";
import HoverLink from "../components/HoverLink";
import { Icon } from "@iconify/react/dist/iconify.js";

const timelineData = [
  {
    company: "Tiblo Digital",
    location: "Copenhagen, Denmark (Remote)",
    role: "Product Design Lead",
    period: "05/2024 — Present",
    companySummary: "Digital Agency Helping Startups and Mid-size Businesses scale digital products.",
    items: [
      {
        id: "tiblo-wheellog",
        title: "WheelLog fleet UX",
        year: "2026",
        role: "Product Design Lead",
        description:
          "Led the 0→1 UX for WheelLog, a B2B fleet-management platform serving 5K–10K operators. Ran 20+ customer interviews and a 3-sprint prototyping cycle that brought the product to value six weeks faster.",
        tags: ["0→1 Product Design", "User Research", "B2B SaaS", "Design Systems"],
        preset: "biotech",
      },
      {
        id: "tiblo-ai-citations",
        title: "AI citation transparency",
        year: "2025",
        role: "Product Design Lead",
        description:
          "Led a cross-functional team of 12 (design, eng, research, policy) to ship AI citation transparency patterns used by 1M+ users in the EU, satisfying DSA compliance requirements 3 weeks ahead of deadline.",
        tags: ["AI UX", "EU DSA Compliance", "Human-in-the-Loop", "Cross-Functional"],
        preset: "ai",
      },
      {
        id: "tiblo-telemetry",
        title: "Fleet telemetry prototypes",
        year: "2024",
        role: "Product Design Lead",
        description:
          "Used AI-assisted development to build realistic fleet-telemetry prototypes for remote user testing, helping the team validate three major features before engineering development.",
        tags: ["AI-Assisted Dev", "Interactive Prototyping", "Telemetry", "User Testing"],
        preset: "spatial",
      },
      {
        id: "tiblo-design-system",
        title: "Markdown design system",
        year: "2024",
        role: "Product Design Lead",
        description:
          "Built a markdown-based design system from scratch for rapid agentic development and high-velocity cross-functional shipping.",
        tags: ["Design Systems", "Markdown", "Agentic Workflows", "Component Architecture"],
        preset: "hero",
      },
      {
        id: "tiblo-mau-growth",
        title: "Activation & retention",
        year: "2024",
        role: "Product Design Lead",
        description:
          "Helped increase MAU by 35% over two quarters by working with PM and Marketing to identify activation drop-offs and prioritize retention improvements by redesigning the core user flows.",
        tags: ["Growth UX", "+35% MAU", "User Retention", "Funnel Optimization"],
        preset: "writer",
      },
    ],
  },
  {
    company: "The Total Office",
    location: "Dubai, UAE (Onsite)",
    role: "Product Design Lead",
    period: "04/2023 — 05/2024",
    companySummary: "E-commerce & spatial visualization platform for modern enterprise workstations.",
    items: [
      {
        id: "tto-space-planner",
        title: "Workstation space planner",
        year: "2024",
        role: "Product Design Lead / Front-End Engineer",
        description:
          "Designed and built a drag-and-drop virtual workstation space planner and ordering app. Achieved 100% conversion during initial Q1 launch across Dubai and UAE.",
        tags: ["Next.js", "Spatial Planner", "E-Commerce", "Atomic Design"],
        caseStudyHref: "/case-study/office-outlet",
        caseStudyTitle: "View Office Outlet Case Study",
        preset: "biotech",
      },
      {
        id: "tto-computer-vision",
        title: "Computer vision discovery",
        year: "2024",
        role: "Product Design Lead",
        description:
          "Built a computer-vision powered product discovery feature using ML image similarity. Concept tested with 15 shoppers, validated a 50%+ uplift in product engagement, and handed off a production-ready spec to engineering.",
        tags: ["Computer Vision", "ML Similarity", "Concept Testing", "+50% Engagement"],
        preset: "ai",
      },
      {
        id: "tto-wcag-redesign",
        title: "WCAG 2.1 accessibility",
        year: "2023",
        role: "Product Design Lead",
        description:
          "Redesigned legacy platform following WCAG 2.1 compliancy with custom keyboard and voice navigation patterns. Conducted 3 rounds of moderated testing with 30 users with disabilities, passing external audit with zero critical violations.",
        tags: ["WCAG 2.1 AA", "Keyboard Navigation", "Voice UX", "Accessibility"],
        preset: "writer",
      },
      {
        id: "tto-churn-reduction",
        title: "Churn rate optimization",
        year: "2023",
        role: "Product Design Lead",
        description:
          "Successfully reduced churn rate for 500K+ user platform by running bi-weekly user behavior analytics reviews with PM, translating findings into a prioritized backlog of UI optimizations shipped across two quarters.",
        tags: ["Product Analytics", "500K+ Users", "Churn Reduction", "UI Polish"],
        preset: "hero",
      },
    ],
  },
  {
    company: "MarketTime",
    location: "Texas, USA (Hybrid)",
    role: "Lead UX/UI Designer",
    period: "05/2022 — 04/2023",
    companySummary: "B2B SaaS workplace & wholesale commerce platform with 1M+ end users.",
    items: [
      {
        id: "mt-payment-flow",
        title: "mtPay Stripe checkout",
        year: "2023",
        role: "Lead UX/UI Designer",
        description:
          "Led the end-to-end checkout and payment flow for 'mtPay' (Stripe Integration), achieving 95% user adoption at launch by proactively resolving 12 critical friction points identified across 5 rounds of usability testing.",
        tags: ["Stripe Integration", "95% Adoption", "Payment UX", "Checkout Optimization"],
        preset: "biotech",
      },
      {
        id: "mt-component-library",
        title: "Atomic component library",
        year: "2022",
        role: "Lead UX/UI Designer",
        description:
          "Built and shipped a company-wide UI component library from scratch with 40+ atomic components, standardized design tokens, detailed interaction patterns, and rigorous documentation cutting cross-functional engineering handoff cycles.",
        tags: ["Design System", "40+ Components", "Design Tokens", "Atomic Design"],
        preset: "spatial",
      },
      {
        id: "mt-order-dashboard",
        title: "B2B order dashboard",
        year: "2022",
        role: "Lead UX/UI Designer",
        description:
          "Redesigned the B2B order-management dashboard using data-driven layout prioritization. Reduced complex order-entry time and decreased user support tickets related to transaction errors by 30%.",
        tags: ["B2B Dashboard", "Order Management", "-30% Support Tickets", "Data Prioritization"],
        preset: "default",
      },
    ],
  },
  {
    company: "InsideMaps",
    location: "Silicon Valley, USA (Hybrid)",
    role: "Sr Product Designer",
    period: "04/2019 — 05/2022",
    companySummary: "Computer Vision powered 3D spatial scanning platform for real-estate and inspection workflows.",
    items: [
      {
        id: "im-capture-app",
        title: "3D spatial scanning",
        year: "2021",
        role: "Sr Product Designer / iOS Developer",
        description:
          "Designed the UX for a Computer Vision powered 3D spatial scanning workflow and built an in-app interactive guide on iOS, validated with 3 rounds of moderated testing with 24 users.",
        tags: ["SwiftUI", "ARKit", "3D Spatial Capture", "Computer Vision"],
        caseStudyHref: "/case-study/insidemaps-capture",
        caseStudyTitle: "View InsideMaps Capture Case Study",
        preset: "spatial",
      },
      {
        id: "im-capture-flow",
        title: "Capture flow autocomplete",
        year: "2020",
        role: "Sr Product Designer",
        description:
          "Reduced spatial scanning error rates and cut onboarding time from 15 steps to 5 steps by redesigning the capture flow with ML-assisted autocomplete, inline error recovery, and step-level cognitive-load audits.",
        tags: ["ML Autocomplete", "Error Recovery", "15→5 Steps", "Mobile UX"],
        preset: "biotech",
      },
      {
        id: "im-website-redesign",
        title: "Sitemap & web redesign",
        year: "2020",
        role: "Lead Designer",
        description:
          "Complete experience and information architecture overhaul of the legacy web platform. Increased user conversion and app downloads by 80% with 85% becoming long-term users.",
        tags: ["IA & Sitemap", "React", "+80% Conversion", "Accessibility"],
        caseStudyHref: "/case-study/insidemaps-redesign",
        caseStudyTitle: "View InsideMaps Website Case Study",
        preset: "hero",
      },
      {
        id: "im-engineering-bridge",
        title: "Design-engineering bridge",
        year: "2019",
        role: "Sr Product Designer",
        description:
          "Acted as design-engineering bridge for a cross-functional team of 6, reducing design-related PR review cycles from 4 rounds to 1 in over 3 months.",
        tags: ["Frontend Systems", "PR Review Velocity", "Cross-Functional", "Design Handoff"],
        preset: "default",
      },
    ],
  },
  {
    company: "Genex Infosys",
    location: "Dhaka, Bangladesh (Onsite)",
    role: "Sr UI/UX Designer",
    period: "05/2017 — 04/2019",
    companySummary: "Software Agency building ML & Enterprise systems for Government and Banking institutions.",
    items: [
      {
        id: "genex-conversational-ai",
        title: "Conversational AI platform",
        year: "2018",
        role: "Sr UI/UX Designer",
        description:
          "Led design architecture and built end-to-end UX for an enterprise Conversational AI platform deployed across a major tier-1 banking portal, driving a 90% increase in monthly customer interactions and CSAT scores.",
        tags: ["Conversational AI", "Tier-1 Banking", "+90% CSAT", "Enterprise UX"],
        preset: "ai",
      },
      {
        id: "genex-predictive-search",
        title: "Predictive search interface",
        year: "2018",
        role: "Sr UI/UX Designer",
        description:
          "Implemented cross-functional design of an ML-driven predictive search interface collaborating directly with Data Science and Core Engineering to slash average user query resolution times by 60%.",
        tags: ["Predictive Search", "Machine Learning", "-60% Resolution Time", "Data Science"],
        preset: "biotech",
      },
      {
        id: "genex-fraud-view",
        title: "Fraud-View risk operations",
        year: "2017",
        role: "Sr UI/UX Designer",
        description:
          "Shipped Fraud-View interface for risk operations teams, embedding ML confidence scores and explainability signals into UX; reduced false-positive dispute rates in a 90-day A/B test across 12K+ operations users.",
        tags: ["ML Explainability", "Fraud Prevention", "Risk Ops", "12K+ Users"],
        preset: "writer",
      },
      {
        id: "genex-banking-compliance",
        title: "Accessible pattern library",
        year: "2017",
        role: "Sr UI/UX Designer",
        description:
          "Conducted 20+ user interviews and usability tests to establish a standardized, accessible pattern library that brought high-traffic transaction funnels into full WCAG 2.1 AA compliance.",
        tags: ["WCAG 2.1 AA", "FinTech Patterns", "Design Tokens", "Usability Testing"],
        preset: "default",
      },
    ],
  },
  {
    company: "Open Source",
    location: "Global",
    role: "Creator & Maintainer",
    period: "2025 — Present",
    companySummary: "Open-source developer tooling, Vim-native workflows, and terminal software.",
    items: [
      {
        id: "project-slides",
        title: "Slides.nvim presentation tool",
        year: "2026",
        role: "Creator & Developer",
        description:
          "Designed and built a slideshow experience that lives inside a developer's existing Neovim editor rather than a separate app, parsing Markdown headings into a center-aligned presentation layout with seamless, distraction-free rendering.",
        tags: ["Neovim / Lua", "Markdown", "Developer Tooling", "Open Source"],
        externalHref: "https://github.com/git-emran/slides.nvim",
        externalTitle: "View on GitHub (slides.nvim)",
        preset: "hero",
      },
      {
        id: "project-writer",
        title: "Writer markdown editor",
        year: "2025",
        role: "Solo Creator & Developer",
        description:
          "Designed and built a Markdown editor in TypeScript/React/Electron with full LSP implementation, interactive diagram canvas, and Vim-first navigation. 500+ active users within 60 days of launch.",
        tags: ["React / Electron", "TypeScript", "Vim Motions", "LSP Suite", "CodeMirror 6"],
        caseStudyHref: "/case-study/writer-app",
        caseStudyTitle: "View Writer Case Study",
        externalHref: "https://github.com/git-emran/simple-notes",
        preset: "writer",
      },
    ],
  },
];

export default function TimelinePage() {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <main className="tracking-tight md:px-2 md:py-1 px-0 py-1 bg-transparent text-black dark:text-white min-h-screen flex flex-col font-sans">
      {/* Mobile Top Navigation */}
      <div className="md:hidden flex flex-row justify-between items-center px-7 pt-4 pb-2 mb-6">
        <div className="flex flex-row gap-5">
          <HoverLink
            preset="work"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/"
          >
            Work
          </HoverLink>
          <HoverLink
            preset="hero"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300 font-medium"
            href="/timeline"
          >
            Timeline
          </HoverLink>
          <HoverLink
            preset="about"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/about"
          >
            About
          </HoverLink>
          <HoverLink
            preset="notes"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/notes"
          >
            Notes
          </HoverLink>
          <HoverLink
            preset="interactions_nav"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/interaction-archive"
          >
            Interactions
          </HoverLink>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="bg-transparent text-lg dark:text-white flex-1 w-full">
        <div className="grid grid-cols-12 px-7">
          <div className="col-span-12 md:col-span-11 lg:col-span-8 max-w-3xl pb-24 leading-relaxed">
            {/* Top Bar Header (Reference Layout) */}
            <div className="flex flex-row justify-between items-baseline pt-4 pb-12 text-sm md:text-base text-neutral-600 dark:text-neutral-400">
              <HoverLink
                href="/"
                preset="hero"
                className="font-normal text-neutral-900 dark:text-neutral-100 hover:text-black dark:hover:text-white transition-colors"
              >
                Emran Hossain
              </HoverLink>
              <span className="text-right text-neutral-500 dark:text-neutral-400">
                Product Designer · Copenhagen
              </span>
            </div>

            {/* Currently At Header (Matching Reference Image Accent Style) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-8 text-black dark:text-white">
              Currently at{" "}
              <HoverLink
                href="https://tiblo.dk/"
                target="_blank"
                rel="noopener noreferrer"
                preset="hero"
                className="text-[#DE5E38] dark:text-[#F37A57] hover:underline transition-colors"
              >
                Tiblo Digital.
              </HoverLink>
            </h1>

            {/* Subtle Divider Rule */}
            <hr className="border-t border-neutral-200 dark:border-neutral-800 my-8 md:my-10" />

            {/* Timeline Sections List */}
            <div className="space-y-12 md:space-y-14">
              {timelineData.map((section) => (
                <div
                  key={section.company}
                  className="grid grid-cols-12 gap-y-3 gap-x-4 md:gap-x-8 items-start"
                >
                  {/* Left Column: Company Name */}
                  <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h2 className="text-base sm:text-lg font-normal text-black dark:text-white">
                      {section.company}
                    </h2>
                  </div>

                  {/* Middle and Right Columns: Stack of Projects with Years */}
                  <div className="col-span-12 sm:col-span-8 md:col-span-8 space-y-3.5 sm:space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-row justify-between items-baseline group"
                      >
                        {/* Middle: Project Title with Dotted Underline */}
                        <div className="flex-1 pr-4">
                          <button
                            type="button"
                            onClick={() => setActiveItem(item)}
                            className="text-left font-normal text-base sm:text-lg text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer border-b border-dashed border-neutral-300 dark:border-neutral-600 group-hover:border-black dark:group-hover:border-white pb-0.5 inline-block"
                          >
                            {item.title}
                          </button>
                        </div>

                        {/* Right: Year */}
                        <div className="text-right flex-shrink-0">
                          <span className="text-base sm:text-lg text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                            {item.year}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Fixed Right Navigation */}
          <div className="hidden md:block md:fixed md:right-8 md:top-4 lg:col-span-2 lg:col-start-11 md:col-span-2 md:col-start-12 col-span-12 pt-4 pb-20 transition-opacity z-20">
            <div className="flex flex-col items-end text-right md:mt-0 mt-6">
              <HoverLink
                preset="work"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/"
              >
                Work
              </HoverLink>
              <HoverLink
                preset="hero"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300 font-medium"
                href="/timeline"
              >
                Timeline
              </HoverLink>
              <HoverLink
                preset="about"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/about"
              >
                About
              </HoverLink>
              <HoverLink
                preset="notes"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/notes"
              >
                Notes
              </HoverLink>
              <HoverLink
                preset="interactions_nav"
                className="mb-8 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/interaction-archive"
              >
                Interactions
              </HoverLink>
              <HoverLink
                preset="linkedin"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/emran-hossain-80ab17190/"
              >
                LinkedIn
              </HoverLink>
              <HoverLink
                preset="github"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/git-emran"
              >
                GitHub
              </HoverLink>
              <HoverLink
                preset="instagram"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/designwithemran/"
              >
                Instagram
              </HoverLink>
              <HoverLink
                preset="blog"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://my-blog-omega-ashy.vercel.app/"
              >
                Blog
              </HoverLink>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal / Drawer for Clicked Item */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setActiveItem(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-black dark:hover:text-white p-1 rounded-full transition-colors"
            >
              <Icon icon="mdi:close" className="w-5 h-5" />
            </button>

            {/* Header / Meta */}
            <div className="flex items-center gap-2 text-xs tracking-tight text-neutral-500 dark:text-neutral-400 mb-2 font-normal">
              <span>{activeItem.year}</span>
              <span>•</span>
              <span className="text-[#DE5E38] dark:text-[#F37A57] font-semibold">{activeItem.role}</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-3">
              {activeItem.title}
            </h3>

            {/* Description */}
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base mb-5">
              {activeItem.description}
            </p>

            {/* Tags */}
            {activeItem.tags && activeItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Links */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              {activeItem.caseStudyHref && (
                <HoverLink
                  href={activeItem.caseStudyHref}
                  preset={activeItem.preset || "hero"}
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity"
                  onClick={() => setActiveItem(null)}
                >
                  <span>{activeItem.caseStudyTitle || "View Case Study"}</span>
                  <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                </HoverLink>
              )}

              {activeItem.externalHref && (
                <a
                  href={activeItem.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <span>{activeItem.externalTitle || "View Source / Link"}</span>
                  <Icon icon="lucide:external-link" className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden flex flex-row flex-wrap px-7 py-2 pb-10 w-full">
        <HoverLink
          preset="linkedin"
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/emran-hossain-80ab17190/"
        >
          LinkedIn
        </HoverLink>
        <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
        <HoverLink
          preset="github"
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/git-emran"
        >
          GitHub
        </HoverLink>
        <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
        <HoverLink
          preset="instagram"
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/designwithemran/"
        >
          Instagram
        </HoverLink>
        <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
        <HoverLink
          preset="blog"
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://my-blog-omega-ashy.vercel.app/"
        >
          Blog
        </HoverLink>
      </nav>
    </main>
  );
}
