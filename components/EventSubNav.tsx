"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { EventDetail, EventType } from "@/lib/event-details";

interface EventSubNavProps {
  currentEventSlug: string;
  events: EventDetail[];
  type: EventType;
}

export default function EventSubNav({ currentEventSlug, events, type }: EventSubNavProps) {
  const pathname = usePathname();

  // Filter to only show events of the same type (past with past, upcoming with upcoming)
  const filteredEvents = events.filter(event => event.type === type && event.slug !== "upcoming");

  if (filteredEvents.length <= 1) {
    return null; // Don't show sub-nav if there's only one event
  }

  return (
    <motion.div 
      className="sticky top-18 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
          <span className="text-sm font-medium text-zinc-500 mr-2 whitespace-nowrap">
            {type === "past" ? "Past Events:" : "Upcoming Events:"}
          </span>
          {filteredEvents.map((event) => {
            const isActive = event.slug === currentEventSlug;
            return (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${isActive 
                    ? "bg-zinc-800 text-zinc-100 shadow-sm" 
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                  }
                `}
              >
                {event.eventName}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}