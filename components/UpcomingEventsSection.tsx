"use client";

import { getRealUpcomingEvents } from "../lib/event-details";
import UpcomingEventCard from "./Upcomingeventcard";
import Link from "next/link";

export default function UpcomingEventsSection() {
  const upcomingEvents = getRealUpcomingEvents();

  if (upcomingEvents.length === 0) {
    return null; 
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Cards list — staggered animation via animation-delay */}
      <ul className="flex flex-col gap-4 sm:gap-5">
        {upcomingEvents.map((event, index) => (
          <li
            key={event.eventId}
            style={{ animationDelay: `${index * 80}ms` }}
            className="opacity-0 animate-[cardFadeUp_0.45s_ease_forwards]"
          >
            <UpcomingEventCard event={event} />
          </li>
        ))}
      </ul>

      {/* Mobile "View all" link */}
      {upcomingEvents.length > 1 && (
        <div className="mt-5 text-center sm:hidden">
          <Link
            href="/events/upcoming"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 hover:text-blue-100 transition-colors duration-150"
          >
            View all upcoming events
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
      <style jsx>{`
        @keyframes cardFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}