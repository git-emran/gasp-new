"use client";
import React, { useState, useEffect } from "react";
import { interactionDesigns } from "../constants";
import HoverLink from "../components/HoverLink";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getOptimizedImageUrl } from "@/lib/imageLoader";

const uniqueCategories = [...new Set(interactionDesigns.map((item) => item.category))];

export default function InteractionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? interactionDesigns
      : interactionDesigns.filter((item) => item.category === selectedCategory);

  return (
    <main className="tracking-tight md:px-2 md:py-1 px-0 py-1 bg-transparent text-black dark:text-white min-h-screen flex flex-col">
      {/* Mobile Top Navigation */}
      <div className="md:hidden flex flex-row justify-between items-center px-7 pt-4 pb-2 mb-6">
        <div className="flex flex-row gap-6">
          <HoverLink
            preset="work"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/"
          >
            Work
          </HoverLink>
          <HoverLink
            preset="hero"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
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
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300 font-medium"
            href="/interaction-archive"
          >
            Interactions
          </HoverLink>
        </div>
      </div>

      <div className="bg-transparent text-lg dark:text-white flex-1 w-full">
        <div className="grid grid-cols-12 px-7">
          <div className="col-span-12 md:col-span-11 lg:col-span-9 max-w-screen-xl pb-16 leading-relaxed">
            {/* Header */}
            <h1 className="text-4xl font-serif mb-4 mt-4 tracking-tight">
              <HoverLink
                preset="hero"
                className="font-bold font-serif text-black hover:text-gray-800 hover:no-underline no-underline dark:text-white dark:hover:text-gray-300"
                href="/"
              >
                Emran Hossain
                <span className="font-serif font-semibold"> — Interactions</span>
              </HoverLink>
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-prose leading-relaxed">
              A curated collection of micro-animations, gesture mechanics for VisionOS and iPadOS, tactile feedback patterns, and fluid UI interactions.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-base border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === "All"
                    ? "font-semibold underline underline-offset-4 decoration-2 decoration-black dark:decoration-white text-black dark:text-white"
                    : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                All ({interactionDesigns.length})
              </button>
              {uniqueCategories.map((cat) => {
                const count = interactionDesigns.filter((item) => item.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`cursor-pointer transition-colors ${
                      selectedCategory === cat
                        ? "font-semibold underline underline-offset-4 decoration-2 decoration-black dark:decoration-white text-black dark:text-white"
                        : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Interactions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-zoom-in"
                  onClick={() => setSelectedImage(item.image)}
                >
                  <div className="relative aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 overflow-hidden outline outline-1 outline-black/10 dark:outline-white/10 rounded-lg shadow-xs">
                    <img
                      src={getOptimizedImageUrl(item.image, { width: 800 })}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 rounded-none"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <h3 className="font-medium text-base text-black dark:text-white">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      {item.category}
                    </span>
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
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
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
                className="mb-8 no-underline hover:underline dark:text-white dark:hover:text-gray-300 font-medium"
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 dark:bg-black/90 backdrop-blur-md cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 z-10 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <Icon icon="lucide:x" className="size-6" />
          </button>
          <img
            src={selectedImage}
            alt="Expanded view"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-none shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
