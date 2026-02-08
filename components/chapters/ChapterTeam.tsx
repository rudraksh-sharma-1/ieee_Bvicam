"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { ChapterMember } from "@/lib/chapter-details";

function TeamMemberCard({
  member,
  index,
}: {
  member: ChapterMember;
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

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
      className="perspective-1000 h-full"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full preserve-3d"
        style={{ minHeight: "450px" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden bg-blue-950/50 backdrop-blur-sm rounded-lg border-2 border-blue-700/40 overflow-hidden hover:border-blue-600/60 transition-colors shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Image */}
          <div className="relative w-full aspect-square bg-blue-900/30">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>

          {/* Info */}
          <div className="p-2">
            <h3 className="text-lg font-semibold text-white mb-1">
              {member.name}
            </h3>
            <p className="text-sm text-blue-200/80 uppercase tracking-wider mb-3">
              {member.designation}
            </p>

            {/* LinkedIn icon */}
            {member.linkedIn && (
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-300/70 hover:text-blue-100 transition-colors"
                aria-label={`${member.name}'s LinkedIn`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden bg-blue-900/60 backdrop-blur-md rounded-lg border-2 border-blue-600/50 p-6 flex flex-col justify-center shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="text-xl font-semibold text-white mb-3">
            {member.name}
          </h3>
          <p className="text-sm text-blue-50/90 leading-relaxed">{member.bio}</p>

          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-blue-200/80 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Connect on LinkedIn
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ChapterTeamProps {
  team: ChapterMember[];
  chapterName: string;
}

export default function ChapterTeam({ team, chapterName }: ChapterTeamProps) {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-blue-900 overflow-hidden">
      {/* Smooth transition overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950/50 to-transparent pointer-events-none" />
      
      {/* Pulsating background orbs */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent mb-4">
            Our Team
          </h2>
          <p className="text-blue-100/80 text-lg max-w-2xl mx-auto">
            Meet the dedicated leaders driving {chapterName}
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Hover hint */}
        {/* <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-sm text-blue-400/60 mt-8"
        >
          Hover over cards to learn more about each member
        </motion.p> */}
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .perspective-1000 * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}