"use client";
import React, { useState, useEffect } from "react";
import { interactionDesigns } from "../constants";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

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
          <Link
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/"
          >
            Work
          </Link>
          <Link
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/notes"
          >
            Notes
          </Link>
          <Link
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300 font-medium"
            href="/interaction-archive"
          >
            Interactions
          </Link>
        </div>
      </div>

      <div className="bg-transparent text-lg dark:text-white flex-1 w-full">
        <div className="grid grid-cols-12 px-7">
          <div className="col-span-12 md:col-span-11 lg:col-span-9 max-w-screen-xl pb-16 leading-relaxed">
            {/* Header */}
            <h1 className="text-4xl font-serif mb-4 mt-4 tracking-tight">
              <Link
                className="font-bold font-serif text-black hover:text-gray-800 hover:no-underline no-underline dark:text-white dark:hover:text-gray-300"
                href="/"
              >
                Emran Hossain
                <span className="font-serif font-semibold"> — Interactions</span>
              </Link>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-prose leading-relaxed">
              A curated collection of micro-animations, gesture mechanics for VisionOS and iPadOS, tactile feedback patterns, and fluid UI interactions.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-base border-b border-gray-200 dark:border-gray-800 pb-4">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === "All"
                    ? "font-semibold underline underline-offset-4 decoration-2 decoration-red-500 text-black dark:text-white"
                    : "text-gray-500 hover:text-black dark:hover:text-white"
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
                        ? "font-semibold underline underline-offset-4 decoration-2 decoration-red-500 text-black dark:text-white"
                        : "text-gray-500 hover:text-black dark:hover:text-white"
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
                  <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900 overflow-hidden outline outline-1 outline-black/10 dark:outline-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 rounded-none"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <h3 className="font-medium text-base text-black dark:text-white">
                      {item.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
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
              <Link
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/"
              >
                Work
              </Link>
              <Link
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/about"
              >
                About
              </Link>
              <Link
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/notes"
              >
                Notes
              </Link>
              <Link
                className="mb-8 no-underline hover:underline dark:text-white dark:hover:text-gray-300 font-medium"
                href="/interaction-archive"
              >
                Interactions
              </Link>
              <a
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/emran-hossain-80ab17190/"
              >
                LinkedIn
              </a>
              <a
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/git-emran"
              >
                GitHub
              </a>
              <a
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/designwithemran/"
              >
                Instagram
              </a>
              <a
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://my-blog-omega-ashy.vercel.app/"
              >
                Blog
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden flex flex-row flex-wrap px-7 py-2 pb-10 w-full">
        <a
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/emran-hossain-80ab17190/"
        >
          LinkedIn
        </a>
        <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
        <a
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/git-emran"
        >
          GitHub
        </a>
        <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
        <a
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/designwithemran/"
        >
          Instagram
        </a>
        <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
        <a
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://my-blog-omega-ashy.vercel.app/"
        >
          Blog
        </a>
      </nav>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md cursor-zoom-out"
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
