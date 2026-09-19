"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { getOptimizedImageUrl } from "@/lib/imageLoader";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className = "",
}) => {
  const [active, setActive] = useState(0);
  const [randomRotations, setRandomRotations] = useState([]);

  useEffect(() => {
    setRandomRotations(
      testimonials.map(() => Math.floor(Math.random() * 16) - 8)
    );
  }, [testimonials]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 6000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className={`w-full py-4 font-sans antialiased ${className}`}>
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
        {/* Left: Avatar Stack */}
        <div className="col-span-12 md:col-span-5 relative">
          <div className="relative h-64 md:h-72 w-full max-w-xs mx-auto md:mx-0">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotations[index] || 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.65,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotations[index] || 0,
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotations[index] || 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom rounded-2xl overflow-hidden shadow-md border border-neutral-200/70 dark:border-neutral-800"
                >
                  <img
                    src={getOptimizedImageUrl(testimonial.src, { width: 500 })}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Quote and Author Info */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-between">
          <motion.div
            key={active}
            initial={{
              y: 15,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -15,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <h4 className="font-serif text-xl md:text-2xl font-bold text-black dark:text-white">
              {testimonials[active].name}
            </h4>
            <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-1">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-5 text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
              &ldquo;
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(6px)",
                    opacity: 0,
                    y: 4,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.015 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
              &rdquo;
            </motion.p>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white transition-all cursor-pointer shadow-xs"
            >
              <IconArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white transition-all cursor-pointer shadow-xs"
            >
              <IconArrowRight className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 ml-2">
              {active + 1} / {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
