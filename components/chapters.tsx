"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { chapters } from "@/lib/chapters";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Chapters() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentChapter = useMemo(
    () => chapters[currentIndex],
    [currentIndex]
  );

  /*  Intersection Observer  */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /*  Navigation  */
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % chapters.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? chapters.length - 1 : prev - 1
    );
  }, []);

  /*  Autoplay  */
  useEffect(() => {
    if (!isVisible) return;

    autoPlayRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isVisible, nextSlide]);

  return (
    <section
      id="chapters"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 overflow-hidden"
    >
      {/* Subtle animated orbs in background */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*  Section Header  */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Chapters
          </h2>
          <p className="text-blue-100/80 text-lg max-w-2xl mx-auto">
            Discover the pillars that define our mission and drive our community forward
          </p>
        </motion.div>

        {/*  Carousel Frame  */}
        <div
          className="relative rounded-3xl border border-blue-700/40 overflow-hidden bg-blue-950/50 backdrop-blur-sm shadow-2xl"
          onMouseEnter={() => autoPlayRef.current && clearInterval(autoPlayRef.current)}
          onMouseLeave={() =>
            (autoPlayRef.current = setInterval(nextSlide, 5000))
          }
        >
          {/* Slide */}
          <div className="grid grid-rows-[1fr_auto] md:grid-cols-2 md:grid-rows-1 h-[520px] md:h-[460px]">
            {/* IMAGE */}
            <div className="relative flex items-center justify-center bg-blue-900/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentChapter.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentChapter.image}
                    alt={currentChapter.name}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-6"
                    priority={currentIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* TEXT */}
            <div className="flex items-center bg-blue-950/60 backdrop-blur-sm border-t md:border-t-0 md:border-l border-blue-700/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentChapter.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="p-8 md:p-12 max-w-xl"
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {currentChapter.name}
                  </h3>
                  <p className="text-blue-50/90 text-lg leading-relaxed">
                    {currentChapter.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-blue-800/60 border border-blue-600/40 flex items-center justify-center text-white hover:bg-blue-700/60 hover:border-blue-500/60 transition backdrop-blur-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-blue-800/60 border border-blue-600/40 flex items-center justify-center text-white hover:bg-blue-700/60 hover:border-blue-500/60 transition backdrop-blur-sm"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/*  Counter  */}
        <div className="text-center mt-8 text-blue-300/70 text-sm">
          {currentIndex + 1} / {chapters.length}
        </div>
      </div>
    </section>
  );
}