"use client";

import Link from "next/link";
import Image from "next/image";
import { EventDetail } from "@/lib/event-details";

interface UpcomingEventCardProps {
  event: EventDetail;
}

export default function UpcomingEventCard({ event }: UpcomingEventCardProps) {
  const poster = event.posterImage;

  // Show full description — no truncation
  const shortDesc = event.description ?? null;

  // Pull up to 3 learning outcomes from the first day's events
  const learnItems: string[] = event.days?.[0]?.events
    ?.slice(1, 4)
    .map((e) => e.eventTitle) ?? [];

  return (
    <article className="upcoming-card group relative rounded-2xl overflow-hidden border border-blue-700/40 bg-gradient-to-br from-[#0f1e3d] via-[#0d1a35] to-[#0a1628] transition-all duration-300 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-900/50 hover:-translate-y-0.5">

      {/* Top-edge animated glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="flex flex-col md:flex-row">

        {/* ── LEFT: Poster panel ───────────────────────────────────── */}
        {poster && (
          <div className="relative flex-shrink-0 w-full md:w-56 lg:w-64 overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
            {/* Blurred bg */}
            <Image
              src={poster.src}
              alt="Event Poster"
              aria-hidden
              fill
              className="object-cover scale-110 blur-lg opacity-60 saturate-150"
            />
            {/* Dark overlay */}
            <div aria-hidden className="absolute inset-0 bg-blue-950/40" />

            {/* Sharp centered poster */}
            <div className="relative z-10 h-full min-h-[220px] md:min-h-0 md:h-full flex items-center justify-center p-5">
              <Image
                src={poster.src}
                alt={poster.alt}
                width={180}
                height={260}
                className="object-contain rounded-xl shadow-2xl shadow-black/60 transition-transform duration-300 group-hover:scale-[1.03]"
                style={{ maxHeight: "380px", width: "auto" }}
                priority
              />
            </div>
          </div>
        )}

        {/* ── RIGHT: Content panel ─────────────────────────────────── */}
        <div className="flex-1 flex flex-col p-5 sm:p-6 gap-3 min-w-0 justify-center">

          {/* Title + Subtitle */}
          <div className="space-y-0.5">
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight group-hover:text-blue-50 transition-colors duration-200">
              {event.eventName}
            </h3>
            {event.subtitle && (
              <p className="text-sm font-medium text-blue-300/90">{event.subtitle}</p>
            )}
          </div>

          {/* Full description */}
          {shortDesc && (
            <p className="text-sm text-blue-200/70 leading-relaxed">
              {shortDesc}
            </p>
          )}

          {/* Two-column info grid + learn section */}
          <div className="flex flex-col sm:flex-row gap-4 mt-0.5">

            {/* Event Information */}
            <div className="flex-1 space-y-2">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Event information
              </p>

              <div className="space-y-1.5 text-sm text-blue-200/80">
                {event.date && (
                  <span className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      <span className="text-white/60 text-xs mr-1">Date:</span>
                      {event.date}
                      {event.date && (() => {
                        try {
                          const d = new Date(event.date.replace(/(\d+)(st|nd|rd|th)/, "$1"));
                          return ` (${d.toLocaleDateString("en-US", { weekday: "long" })})`;
                        } catch { return ""; }
                      })()}
                    </span>
                  </span>
                )}

                {event.time && (
                  <span className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      <span className="text-white/60 text-xs mr-1">Time:</span>
                      {event.time}
                    </span>
                  </span>
                )}

                {event.venue && (
                  <span className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>
                      <span className="text-white/60 text-xs mr-1">Venue:</span>
                      {event.venue}
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* What You'll Learn */}
            {learnItems.length > 0 && (
              <div className="flex-1 space-y-2">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  What You&apos;ll Learn
                </p>
                <ul className="space-y-1.5">
                  {learnItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-blue-200/80">
                      <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Card entrance animation */}
      <style jsx>{`
        .upcoming-card {
          animation: cardFadeUp 0.45s ease both;
        }
        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </article>
  );
}