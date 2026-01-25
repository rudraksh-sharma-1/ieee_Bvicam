"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { EventDay } from "@/lib/event-details";

interface EventTimelineProps {
  days: EventDay[];
}

export default function EventTimeline({ days }: EventTimelineProps) {
  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Vertical timeline line - appears progressively */}
      <div className="absolute left-12 md:left-15 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />

      {days.map((day, dayIndex) => (
        <TimelineDay key={day.dayNumber} day={day} dayIndex={dayIndex} />
      ))}
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
      {/* Day marker */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-700">
          <span className="text-lg font-bold text-zinc-100">{day.dayNumber}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-zinc-100">Day {day.dayNumber}</h3>
          <p className="text-sm text-zinc-400">{day.date}</p>
          <p className="text-xs text-zinc-500 mt-1">{day.numberOfEvents} {day.numberOfEvents === 1 ? 'event' : 'events'}</p>
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
        <h4 className="text-lg font-semibold text-zinc-100">{event.eventTitle}</h4>
        <p className="text-zinc-300 leading-relaxed">{event.eventDescription}</p>

        {/* Images */}
        {event.images.length > 0 && (
          <div className={`grid gap-4 mt-6 ${event.images.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {event.images.map((img, imgIndex) => (
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: 0.2 + imgIndex * 0.1 }}
                className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-300" />
                <div className="absolute inset-0 ring-1 ring-inset ring-zinc-700/50 group-hover:ring-zinc-600 transition-colors duration-300 rounded-lg" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
