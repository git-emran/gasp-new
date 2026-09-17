"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { projects } from "../../constants";

export default function CaseStudyClient({ project }) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!project) {
    return (
      <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="font-serif text-4xl mb-4 font-bold">Project Not Found</h1>
          <Link href="/" className="hover:underline text-lg">
            ← Back to Work
          </Link>
        </div>
      </main>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="tracking-tight md:px-2 md:py-1 px-0 py-1 bg-white text-black dark:bg-black dark:text-white min-h-screen flex flex-col">
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
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/interaction-archive"
          >
            Interactions
          </Link>
        </div>
      </div>

      <div className="bg-white text-lg dark:bg-black dark:text-white flex-1 w-full">
        <div className="grid grid-cols-12 px-7">
          <div className="col-span-12 md:col-span-11 lg:col-span-8 max-w-screen-lg pb-24 leading-relaxed">
            {/* Back link */}
            <div className="mt-4 mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-base text-gray-500 hover:text-black dark:hover:text-white no-underline hover:underline"
              >
                ← Back to Work
              </Link>
            </div>

            {/* Title & Tagline */}
            <h1 className="font-serif font-extrabold md:text-7xl text-5xl mt-2 mb-4 tracking-tight -mr-[calc(100%/11)] md:mr-0">
              {project.name.split(" - ")[0]}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-prose">
              {project.description}
            </p>

            {/* Metadata Bar */}
            <div className="border-y border-gray-200 dark:border-gray-800 py-6 my-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
              {project.caseStudy?.role && (
                <div>
                  <div className="text-gray-400 dark:text-gray-500 mb-1">Role</div>
                  <div className="font-medium text-black dark:text-white">
                    {project.caseStudy.role}
                  </div>
                </div>
              )}
              {project.caseStudy?.techStack && (
                <div>
                  <div className="text-gray-400 dark:text-gray-500 mb-1">Stack</div>
                  <div className="font-medium text-black dark:text-white">
                    {project.caseStudy.techStack}
                  </div>
                </div>
              )}
              {project.caseStudy?.team && (
                <div>
                  <div className="text-gray-400 dark:text-gray-500 mb-1">Team</div>
                  <div className="font-medium text-black dark:text-white">
                    {project.caseStudy.team}
                  </div>
                </div>
              )}
              {project.visitUrl && (
                <div>
                  <div className="text-gray-400 dark:text-gray-500 mb-1">Link</div>
                  <a
                    href={project.visitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-black dark:text-white hover:underline"
                  >
                    Visit Live ↗
                  </a>
                </div>
              )}
            </div>

            {/* Main Showcase Hero Media */}
            {project.image && (
              <div
                className="my-10 outline outline-1 outline-black/10 dark:outline-white/10 overflow-hidden cursor-zoom-in"
                onClick={() => setSelectedImage(project.image)}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-auto rounded-none block"
                />
              </div>
            )}

            {/* Overview Section */}
            {project.caseStudy?.overview && (
              <div className="my-12">
                <div className="text-gray-500 mb-2">Overview</div>
                <p className="text-xl leading-relaxed text-black dark:text-gray-100 max-w-prose">
                  {project.caseStudy.overview}
                </p>
              </div>
            )}

            {/* Problem Section */}
            {project.caseStudy?.problemTitle && (
              <section className="my-16">
                <div className="text-gray-500 mb-2">The Challenge</div>
                <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4 tracking-tight">
                  {project.caseStudy.problemTitle}
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-prose mb-8">
                  {project.caseStudy.problemContent}
                </p>

                {project.caseStudy?.problemImages?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    {project.caseStudy.problemImages.map((img, i) => (
                      <div
                        key={i}
                        className="outline outline-1 outline-black/10 dark:outline-white/10 overflow-hidden cursor-zoom-in"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img
                          src={img}
                          alt={`Problem illustration ${i + 1}`}
                          className="w-full h-auto rounded-none block"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Research Phases */}
            {project.caseStudy?.researchPhases?.length > 0 && (
              <section className="my-16">
                <div className="text-gray-500 mb-2">Research & Discovery</div>
                <h2 className="font-serif font-bold text-3xl md:text-4xl mb-8 tracking-tight">
                  {project.caseStudy.researchTitle || "Workflow Analysis & Constraints"}
                </h2>

                <div className="space-y-12">
                  {project.caseStudy.researchPhases.map((phase, i) => (
                    <div key={i} className="my-8">
                      <h3 className="font-medium text-xl mb-3 text-black dark:text-white">
                        {phase.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-prose mb-6">
                        {phase.content}
                      </p>
                      {phase.image && (
                        <div
                          className="outline outline-1 outline-black/10 dark:outline-white/10 overflow-hidden cursor-zoom-in my-6"
                          onClick={() => setSelectedImage(phase.image)}
                        >
                          <img
                            src={phase.image}
                            alt={phase.title}
                            className="w-full h-auto rounded-none block"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Solution Section */}
            {project.caseStudy?.solutionTitle && (
              <section className="my-16">
                <div className="text-gray-500 mb-2">The Solution</div>
                <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4 tracking-tight">
                  {project.caseStudy.solutionTitle}
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-prose mb-8">
                  {project.caseStudy.solutionContent}
                </p>

                {/* Features list */}
                {project.caseStudy?.features?.length > 0 && (
                  <div className="my-8 max-w-prose">
                    <ul className="space-y-3 pl-4">
                      {project.caseStudy.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="list-disc text-lg leading-relaxed text-gray-800 dark:text-gray-200"
                        >
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Improvement Sections */}
                {project.caseStudy?.improvementSections?.length > 0 && (
                  <div className="space-y-12 mt-12">
                    {project.caseStudy.improvementSections.map((sec, i) => (
                      <div key={i} className="my-8">
                        <h3 className="font-medium text-xl mb-3 text-black dark:text-white">
                          {sec.title}
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-prose mb-6">
                          {sec.content}
                        </p>
                        {sec.image && (
                          <div
                            className="outline outline-1 outline-black/10 dark:outline-white/10 overflow-hidden cursor-zoom-in my-6"
                            onClick={() => setSelectedImage(sec.image)}
                          >
                            <img
                              src={sec.image}
                              alt={sec.title}
                              className="w-full h-auto rounded-none block"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Results Section */}
            {project.caseStudy?.resultsTitle && (
              <section className="my-16 border-t border-gray-200 dark:border-gray-800 pt-12">
                <div className="text-gray-500 mb-2">Impact & Results</div>
                <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4 tracking-tight">
                  {project.caseStudy.resultsTitle}
                </h2>
                {project.caseStudy?.resultsMetric && (
                  <div className="font-serif font-extrabold text-6xl md:text-7xl my-4 text-black dark:text-white">
                    {project.caseStudy.resultsMetric}
                  </div>
                )}
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-prose mb-8">
                  {project.caseStudy.resultsContent}
                </p>

                {project.caseStudy?.resultsImages?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    {project.caseStudy.resultsImages.map((img, i) => (
                      <div
                        key={i}
                        className="outline outline-1 outline-black/10 dark:outline-white/10 overflow-hidden cursor-zoom-in"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img
                          src={img}
                          alt={`Result image ${i + 1}`}
                          className="w-full h-auto rounded-none block"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Next / Prev Project Navigation */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-10 mt-16 flex flex-col sm:flex-row justify-between gap-6">
              <div>
                {prevProject ? (
                  <Link
                    href={prevProject.href}
                    className="no-underline group hover:underline text-left block"
                  >
                    <div className="text-xs text-gray-400 mb-1">Previous Project</div>
                    <div className="text-lg font-medium group-hover:underline">
                      ← {prevProject.name.split(" - ")[0]}
                    </div>
                  </Link>
                ) : (
                  <Link href="/" className="no-underline hover:underline text-gray-500 block">
                    ← Back to All Work
                  </Link>
                )}
              </div>

              <div>
                {nextProject && (
                  <Link
                    href={nextProject.href}
                    className="no-underline group hover:underline text-right block"
                  >
                    <div className="text-xs text-gray-400 mb-1">Next Project</div>
                    <div className="text-lg font-medium group-hover:underline">
                      {nextProject.name.split(" - ")[0]} →
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Fixed Right Navigation */}
          <div className="hidden md:block md:fixed md:right-8 md:top-4 lg:col-span-2 lg:col-start-11 md:col-span-2 md:col-start-12 col-span-12 pt-4 pb-20 transition-opacity z-20">
            <div className="flex flex-col items-end text-right md:mt-0 mt-6">
              <Link
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300 font-medium"
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
                className="mb-8 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
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
