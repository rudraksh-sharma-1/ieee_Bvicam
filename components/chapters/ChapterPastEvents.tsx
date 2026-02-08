"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { PastEvent } from "@/lib/chapter-details";
import { Calendar, Clock, MapPin, Users, Video, Award } from "lucide-react";

interface ChapterPastEventsProps {
  events: PastEvent[];
}

function EventCard({ event, index }: { event: PastEvent; index: number }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getModeConfig = (mode?: string) => {
    switch (mode) {
      case 'online':
        return { icon: Video, label: 'Online Event', color: 'text-blue-100 bg-blue-600/30 border-blue-400/50' };
      case 'offline':
        return { icon: MapPin, label: 'In-Person', color: 'text-blue-100 bg-blue-600/30 border-blue-400/50' };
      case 'hybrid':
        return { icon: Award, label: 'Hybrid Event', color: 'text-blue-100 bg-blue-600/30 border-blue-400/50' };
      default:
        return null;
    }
  };

  const modeConfig = getModeConfig(event.mode);
  const ModeIcon = modeConfig?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-gradient-to-br from-blue-900/95 via-blue-950/95 to-blue-900/95 backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden border border-blue-700/30"
    >
      {/* Featured Image with Gallery Preview */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-800 to-blue-950 overflow-hidden group">
        <Image
          src={event.gallery?.[selectedImage] || event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-transparent" />
        
        {/* Mode Badge */}
        {modeConfig && ModeIcon && (
          <div className={`absolute top-4 right-4 ${modeConfig.color} border px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold shadow-lg backdrop-blur-md`}>
            <ModeIcon className="w-3.5 h-3.5" />
            {modeConfig.label}
          </div>
        )}

        {/* Gallery Thumbnails */}
        {event.gallery && event.gallery.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
            {event.gallery.slice(0, 6).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  selectedImage === idx ? 'border-blue-400 shadow-lg shadow-blue-500/50' : 'border-blue-400/40 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
            {event.gallery.length > 6 && (
              <button className="w-16 h-16 rounded-lg bg-blue-600/50 backdrop-blur-sm flex items-center justify-center text-blue-100 text-xs font-semibold flex-shrink-0 border border-blue-400/30">
                +{event.gallery.length - 6}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent mb-3 leading-tight">
          {event.title}
        </h3>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-blue-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{event.time}</span>
          </div>
          {event.participants && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>{event.participants} Participants</span>
            </div>
          )}
        </div>

        {/* Venue */}
        {event.venue && (
          <div className="mb-4 p-3 bg-blue-800/40 backdrop-blur-sm rounded-lg flex items-start gap-2 border border-blue-700/30">
            <MapPin className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-100">{event.venue}</p>
          </div>
        )}

        {/* Description */}
        <p className="text-blue-50/90 leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Agenda */}
        {event.agenda && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent mb-2 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded" />
              Meeting Agenda
            </h4>
            <p className="text-blue-100/80 leading-relaxed pl-3 border-l-2 border-blue-700/50">
              {event.agenda}
            </p>
          </div>
        )}

        {/* Schedule Timeline */}
        {event.schedule && event.schedule.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded" />
              Meeting Schedule
            </h4>
            <div className="space-y-3">
              {event.schedule.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 group"
                >
                  {/* Time */}
                  <div className="flex-shrink-0 w-32">
                    <div className="text-sm font-semibold text-blue-100 bg-blue-700/40 backdrop-blur-sm px-3 py-1.5 rounded-lg inline-block border border-blue-600/30">
                      {item.time}
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="relative flex-shrink-0">
                    <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full ring-4 ring-blue-700/30 shadow-lg shadow-blue-500/50" />
                    {idx < event.schedule!.length - 1 && (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-600/50 to-blue-700/30" />
                    )}
                  </div>

                  {/* Activity */}
                  <div className="flex-1 pb-6">
                    <h5 className="font-semibold text-blue-100 mb-1">{item.activity}</h5>
                    {item.description && (
                      <p className="text-sm text-blue-200/70">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Speakers */}
        {event.speakers && event.speakers.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded" />
              Featured Speakers
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.speakers.map((speaker, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 p-4 bg-gradient-to-br from-blue-800/40 to-blue-900/40 backdrop-blur-sm rounded-xl border border-blue-700/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                >
                  {speaker.photo && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0 ring-2 ring-blue-400/30">
                      <Image
                        src={speaker.photo}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-blue-100 truncate">{speaker.name}</h5>
                    {speaker.designation && (
                      <p className="text-sm text-blue-300 font-medium truncate">{speaker.designation}</p>
                    )}
                    {speaker.organization && (
                      <p className="text-xs text-blue-200/70 truncate">{speaker.organization}</p>
                    )}
                    {speaker.bio && (
                      <p className="text-xs text-blue-200/60 mt-2 line-clamp-2">{speaker.bio}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ChapterPastEvents({ events }: ChapterPastEventsProps) {
  const [filter, setFilter] = useState<'all' | 'online' | 'offline' | 'hybrid'>('all');

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.mode === filter);

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-br from-blue-900 via-blue-950 to-blue-900 overflow-hidden">
      {/* Pulsating animated background orbs - matching hero */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.35, 0.15],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-700/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-800/20 via-blue-950/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-blue-700/30 backdrop-blur-sm text-blue-100 rounded-full text-sm font-semibold border border-blue-600/30">
              Past Events & Meetings
            </div>
          </div>
          <h2 className="text-4xl py-2 sm:text-5xl font-bold bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent mb-4">
            Our Journey in Innovation
          </h2>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
            Explore our recent events, workshops, and meetings that have shaped our community
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {(['all', 'offline', 'online', 'hybrid'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                filter === mode
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-blue-800/30 backdrop-blur-sm text-blue-100 border border-blue-600/30 hover:border-blue-400/50 hover:shadow-md hover:shadow-blue-500/20'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-blue-200/70 text-lg">No events found for the selected filter.</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        {filteredEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            {/* <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1">
              View All Events
            </button> */}
          </motion.div>
        )}
      </div>
    </section>
  );
}