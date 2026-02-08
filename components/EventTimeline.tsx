"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { EventDay } from "@/lib/event-details";

interface EventTimelineProps {
  days: EventDay[];
}

export default function EventTimeline({ days }: EventTimelineProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client-side to avoid hydration mismatch
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 15 + 20,
        delay: Math.random() * 8,
      }))
    );
  }, []);

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Subtle particle background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-300/15"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Vertical timeline line with gradient */}
      <div className="absolute left-12 md:left-15 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent" />

      <div className="relative z-10">
        {days.map((day, dayIndex) => (
          <TimelineDay key={day.dayNumber} day={day} dayIndex={dayIndex} />
        ))}
      </div>
    </div>
  );
}

function TimelineDay({ day, dayIndex }: { day: EventDay; dayIndex: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
      className="relative mb-16 last:mb-0"
    >
      {/* Day marker with gradient */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/30 backdrop-blur-sm border-2 border-blue-400/50 shadow-lg shadow-blue-500/20">
          <span className="text-lg font-bold bg-gradient-to-br from-blue-100 to-white bg-clip-text text-transparent">{day.dayNumber}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
            Day {day.dayNumber}
          </h3>
          <p className="text-sm text-blue-200/80">{day.date}</p>
          <p className="text-xs text-blue-300/60 mt-1">{day.numberOfEvents} {day.numberOfEvents === 1 ? 'event' : 'events'}</p>
        </div>
      </div>

      {/* Events for this day */}
      <div className="ml-24 space-y-12">
        {day.events.map((event, eventIndex) => (
          <EventCard key={event.eventNumber} event={event} eventIndex={eventIndex} />
        ))}
      </div>
    </motion.div>
  );
}

function EventCard({ event, eventIndex }: { event: EventDay['events'][0]; eventIndex: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: eventIndex * 0.15 }}
      className="relative"
    >
      {/* Event content */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-100 to-blue-50 bg-clip-text text-transparent">
          {event.eventTitle}
        </h4>
        <p className="text-blue-100/85 leading-relaxed">{event.eventDescription}</p>

        {/* Images */}
        {event.images.length > 0 && (
          <div className={`grid gap-4 mt-6 ${event.images.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {event.images.map((img, imgIndex) => (
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: 0.2 + imgIndex * 0.1 }}
                className="relative aspect-video rounded-lg overflow-hidden border-2 border-blue-500/30 group shadow-lg shadow-blue-900/20"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/10 transition-colors duration-300" />
                <div className="absolute inset-0 ring-1 ring-inset ring-blue-400/30 group-hover:ring-blue-300/50 transition-colors duration-300 rounded-lg" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}