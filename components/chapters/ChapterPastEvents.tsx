"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { PastEvent } from "@/lib/chapter-details";

function EventCard({ event, index }: { event: PastEvent; index: number }) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden transition-all duration-300 hover:border-zinc-700"
    >
      {/* Event image */}
      <div className="relative aspect-video bg-zinc-800 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Event info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-zinc-100 mb-2 group-hover:text-zinc-50 transition-colors">
          {event.title}
        </h3>

        <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center justify-between text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formattedDate}</span>
          </div>

          {event.participants && (
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>{event.participants} participants</span>
            </div>
          )}
        </div>

        {event.time && (
          <div className="flex items-center gap-2 mt-3 text-sm text-zinc-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{event.time}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface ChapterPastEventsProps {
  events: PastEvent[];
}

export default function ChapterPastEvents({ events }: ChapterPastEventsProps) {
  // TEMPORARY DESIGN SECTION - PLACEHOLDER UNTIL FINAL UI APPROVED
  return (
    <section className="relative py-16 sm:py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
            Past Events & Meetings
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A glimpse into our recent activities and workshops
          </p>

          {/* Temporary design indicator */}
          <div className="inline-flex items-center gap-2 mt-6 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-500">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Temporary Design - Pending Final Approval
          </div>
        </motion.div>

        {/* Events grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-zinc-500 text-lg">
              No past events available at the moment. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}