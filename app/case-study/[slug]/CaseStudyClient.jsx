"use client";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../sections/Navbar";
import Contact from "../../sections/Contact";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const CaseStudyClient = ({ project }) => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const contentRefs = useRef([]);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="text-blue-400 hover:underline hover:text-blue-300 transition-colors">Back to Home</Link>
        </div>
      </div>
    );
  }

  useGSAP(() => {
    // Hero Entrance
    gsap.from(".hero-content > *", {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 1.5,
      ease: "power4.out",
    });

    gsap.from(".hero-image", {
      opacity: 0,
      scale: 1.2,
      duration: 2,
      ease: "power2.out",
    });

    // Content Sections Entrance
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    });

    // Parallax on image
    gsap.to(".hero-image img", {
      scrollTrigger: {
        trigger: ".hero-image",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 100,
    });

  }, { scope: containerRef });

  useEffect(() => {
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
          <Link href="/#works" className="flex items-center gap-2 group text-[10px] uppercase tracking-[0.3em] text-white">
             <Icon icon="lucide:arrow-left" className="size-4" />
             <span className="relative overflow-hidden h-4">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">Back</span>
                <span className="absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full">Back</span>
             </span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col pt-32 pb-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
            
            <div className="hero-content space-y-8 mb-16">
              <div className="flex flex-wrap gap-2">
                {project.frameworks.map((f) => (
                  <span key={f.id} className="px-3 py-1 border border-black/10 dark:border-white/20 rounded-full text-[9px] uppercase tracking-widest text-black/40 dark:text-white/50">
                    {f.name}
                  </span>
                ))}
              </div>
              <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase">
                {project.name.split(' - ')[0]}
              </h1>
              <div className="max-w-2xl">
                 <p className="text-xl md:text-2xl text-black/60 dark:text-white/60 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                 <a 
                  href={project.visitUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-2"
                >
                  Visit Product
                  <Icon icon="lucide:external-link" className="size-4" />
                </a>
              </div>
            </div>

            <div className="hero-image relative aspect-video rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/10 group">
               <img 
                src={project.bgImage} 
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center p-12 md:p-32">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
                  onClick={() => setSelectedImage(project.image)}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Info Strip */}
        <section className="py-20 border-y border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-sm px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="reveal space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">Client</span>
              <p className="text-base font-medium">{project.name.split(' - ')[0]}</p>
            </div>
            <div className="reveal space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">Role</span>
              <p className="text-base font-medium">{project.caseStudy?.role}</p>
            </div>
            <div className="reveal space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">Team</span>
              <p className="text-base font-medium whitespace-pre-line">{project.caseStudy?.team.replace(/, /g, '\n')}</p>
            </div>
            <div className="reveal space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">Tools</span>
              <p className="text-base font-medium">{project.caseStudy?.techStack}</p>
            </div>
          </div>
        </section>

        {/* Detailed Narrative */}
        <section className="py-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto space-y-48">
            
            {/* Overview Section */}
            {project.caseStudy?.overview && (
              <div className="reveal space-y-8">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30 dark:text-white/30 block mb-6 px-4 py-1 border border-black/10 dark:border-white/10 rounded-full w-fit">Overview</span>
                <p className="text-2xl md:text-4xl font-light leading-tight text-black/80 dark:text-white/90">
                  {project.caseStudy.overview}
                </p>
              </div>
            )}

            {/* The Problem */}
            <div className="reveal space-y-12">
               <div className="grid md:grid-cols-2 gap-16 items-start">
                  <div className="sticky top-32">
                     <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30 dark:text-white/30 block mb-6 px-4 py-1 border border-black/10 dark:border-white/10 rounded-full w-fit">Problem</span>
                     <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        {project.caseStudy?.problemTitle}
                     </h2>
                  </div>
                  <div className="space-y-6 pt-12 md:pt-0">
                     <p className="text-xl md:text-2xl text-black/60 dark:text-white/60 leading-relaxed font-light italic border-l-2 border-black/10 dark:border-white/20 pl-8 py-4">
                        "{project.caseStudy?.problemContent}"
                     </p>
                  </div>
               </div>
               
               {project.caseStudy?.problemImages?.length > 0 && (
                 <div className="flex flex-col gap-8 ring-1 ring-black/5 dark:ring-white/5 p-4 rounded-[2.5rem]">
                   {project.caseStudy.problemImages.map((img, i) => (
                     <div key={i} className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 cursor-zoom-in" onClick={() => setSelectedImage(img)}>
                        <img src={img} alt={`Problem ${i}`} className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700" />
                     </div>
                   ))}
                 </div>
               )}
            </div>

            {/* Research Sections */}
            {project.caseStudy?.researchPhases && (
              <div className="reveal space-y-24">
                <div className="max-w-3xl">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30 dark:text-white/30 block mb-6 px-4 py-1 border border-black/10 dark:border-white/10 rounded-full w-fit">Research</span>
                  <h2 className="text-3xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase mb-8">
                     {project.caseStudy.researchTitle || "The Discovery Phase"}
                  </h2>
                </div>

                <div className="space-y-32">
                  {project.caseStudy.researchPhases.map((phase, i) => (
                    <div key={i} className="reveal grid md:grid-cols-2 gap-16 items-center">
                      <div className={i % 2 === 0 ? "order-1" : "order-1 md:order-2"}>
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">{phase.title}</h3>
                        <p className="text-lg md:text-xl text-black/60 dark:text-white/60 leading-relaxed font-light">
                          {phase.content}
                        </p>
                      </div>
                      <div 
                        className={`relative aspect-video rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 ${i % 2 === 0 ? "order-2" : "order-2 md:order-1"} cursor-zoom-in`}
                        onClick={() => setSelectedImage(phase.image)}
                      >
                        <img src={phase.image} alt={phase.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* The Solution / Improvements Summary */}
            <div className="reveal space-y-16">
               <div className="max-w-3xl">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30 dark:text-white/30 block mb-6 px-4 py-1 border border-black/10 dark:border-white/10 rounded-full w-fit">Solution</span>
                  <h2 className="text-3xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase mb-8">
                     {project.caseStudy?.solutionTitle}
                  </h2>
                  <p className="text-xl md:text-2xl text-black/80 dark:text-white/80 leading-relaxed font-light">
                    {project.caseStudy?.solutionContent}
                  </p>
               </div>
              
              {project.caseStudy?.features && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.caseStudy?.features?.map((feature, i) => (
                    <div key={i} className="reveal p-10 border border-black/5 dark:border-white/10 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/5 transition-all duration-500 hover:-translate-y-1">
                      <p className="text-sm font-medium opacity-40 mb-4">{String(i + 1).padStart(2, '0')}</p>
                      <p className="text-lg font-light leading-relaxed tracking-tight">{feature}</p>
                    </div>
                  ))}
                </div>
              )}

               {project.caseStudy?.solutionImages?.length > 0 && (
                  <div className="flex flex-col gap-8 ring-1 ring-black/5 dark:ring-white/5 p-4 rounded-[2.5rem]">
                    {project.caseStudy.solutionImages.map((img, i) => (
                      <div key={i} className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 cursor-zoom-in" onClick={() => setSelectedImage(img)}>
                         <img src={img} alt={`Solution ${i}`} className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Improvement Details */}
            {project.caseStudy?.improvementSections && (
              <div className="reveal space-y-24">
                <div className="max-w-3xl">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30 dark:text-white/30 block mb-6 px-4 py-1 border border-black/10 dark:border-white/10 rounded-full w-fit">Implementation</span>
                  <h2 className="text-3xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase mb-8">
                     Technical Depth
                  </h2>
                </div>

                <div className="space-y-32">
                  {project.caseStudy.improvementSections.map((section, i) => (
                    <div key={i} className="reveal grid md:grid-cols-2 gap-16 items-center">
                      <div className={i % 2 !== 0 ? "order-1" : "order-1 md:order-2"}>
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">{section.title}</h3>
                        <p className="text-lg md:text-xl text-black/60 dark:text-white/60 leading-relaxed font-light">
                          {section.content}
                        </p>
                      </div>
                      <div 
                        className={`relative aspect-video rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 ${i % 2 !== 0 ? "order-2" : "order-2 md:order-1"} cursor-zoom-in`}
                        onClick={() => setSelectedImage(section.image)}
                      >
                        <img src={section.image} alt={section.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Impact Metric */}
            <div className="reveal space-y-12">
              <div className="relative py-32 px-12 md:px-24 bg-black dark:bg-white text-white dark:text-black rounded-[4rem] overflow-hidden group">
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="space-y-6 max-w-lg text-center md:text-left">
                       <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
                          {project.caseStudy?.resultsTitle}
                       </span>
                       <h2 className="text-7xl md:text-[10rem] font-black leading-none tracking-tighter -mt-4">
                          {project.caseStudy?.resultsMetric}
                       </h2>
                       <p className="text-xl md:text-2xl opacity-70 leading-relaxed font-light">
                         {project.caseStudy?.resultsContent}
                       </p>
                    </div>
                    <div className="text-[40vw] font-black absolute -right-1/4 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none tracking-tighter">
                      {project.caseStudy?.resultsMetric}
                    </div>
                 </div>
              </div>

               {project.caseStudy?.resultsImages?.length > 0 && (
                  <div className="flex flex-col gap-8 ring-1 ring-black/5 dark:ring-white/5 p-4 rounded-[2.5rem]">
                    {project.caseStudy.resultsImages.map((img, i) => (
                      <div key={i} className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 cursor-zoom-in" onClick={() => setSelectedImage(img)}>
                         <img src={img} alt={`Result ${i}`} className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </section>

        {/* Contact Strip */}
 

        <Contact />

        {/* Image Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl cursor-zoom-out animate-in fade-in duration-500"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] reveal">
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

export default CaseStudyClient;
