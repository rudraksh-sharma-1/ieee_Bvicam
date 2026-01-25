"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { events } from "@/lib/events";
import type { Event } from "@/lib/events";

// Lightweight image carousel for event cards
function EventImageCarousel({ images, title, heightClass }: { images: string[]; title: string; heightClass?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Placeholder overlay for development */}
        {/* <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm flex items-center justify-center">
          <span className="text-zinc-500 text-sm">Event Image</span>
        </div> */}
      </div>
    );
  }

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden group">
      {/* Current Image */}
      <div className="relative w-full h-full">
        <Image
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Placeholder overlay */}
        {/* <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm flex items-center justify-center">
          <span className="text-zinc-500 text-sm">Event Image {currentIndex + 1}/{images.length}</span>
        </div> */}
      </div>

      {/* Navigation Arrows - Only show on hover and if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-950/80 hover:bg-zinc-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-950/80 hover:bg-zinc-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <svg className="w-4 h-4 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? "bg-zinc-100 w-4" : "bg-zinc-500"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function EventCard({ event, index }: { event: Event; index: number }) {
  
  const sizeClasses = {
    hero: "md:col-span-2 md:row-span-2",      
    large: "md:col-span-2 md:row-span-1",    
    wide: "md:col-span-2 md:row-span-1",      
    standard: "md:col-span-1 md:row-span-1"   
  };

  
  const imageHeightClasses = {
    hero: "h-64 md:h-80",      
    large: "h-52 md:h-64",    
    wide: "h-48 md:h-56",      
    standard: "h-48"           
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`group relative bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(113,113,122,0.15)] ${sizeClasses[event.size]}`}
    >
      {/* Event Images with dynamic height */}
      <div className={`relative w-full bg-zinc-900 overflow-hidden ${imageHeightClasses[event.size]}`}>
        <EventImageCarousel images={event.images} title={event.title} heightClass={imageHeightClasses[event.size]} />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="inline-block mb-3">
          <span className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
            {event.category}
          </span>
        </div>

        {/* Title - Larger for hero/large cards */}
        <h3 className={`font-semibold text-zinc-100 mb-2 group-hover:text-zinc-50 transition-colors ${
          event.size === "hero" ? "text-xl md:text-2xl" : "text-lg"
        }`}>
          {event.title}
        </h3>

        {/* Description - Show more lines for larger cards */}
        <p className={`text-sm text-zinc-400 leading-relaxed ${
          event.size === "hero" || event.size === "large" ? "line-clamp-4" : "line-clamp-3"
        }`}>
          {event.description}
        </p>

        {/* year tag */}
        {event.year && (
          <div className="mt-4 text-xs text-zinc-600">
            {event.year}
          </div>
        )}
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

export default function Events() {
  return (
    <section 
      id="events" 
      className="relative min-h-screen bg-zinc-950 py-20 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading with Lamp-style animation */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main Heading with subtle glow effect */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-zinc-100 mb-6 relative inline-block">
            Events
            {/* Subtle underline glow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-700 rounded-full" />
          </h2>

          {/* Introductory paragraph */}
          <motion.p
            className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto mt-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            IEEE BVICAM hosts flagship conferences, technical competitions, and thought leadership panels 
            that advance innovation and foster professional growth within the engineering community.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* Optional: View all events CTA */}
        {/* <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-md transition-colors border border-zinc-700 hover:border-zinc-600">
            View Past Events Archive
          </button>
        </motion.div> */}
      </div>
    </section>
  );
}
