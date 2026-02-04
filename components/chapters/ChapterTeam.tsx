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
          className="absolute inset-0 backface-hidden bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Image */}
          <div className="relative w-full aspect-square bg-zinc-800">
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
            <h3 className="text-lg font-semibold text-zinc-100 mb-1">
              {member.name}
            </h3>
            <p className="text-sm text-zinc-400 uppercase tracking-wider mb-3">
              {member.designation}
            </p>

            {/* LinkedIn icon */}
            {member.linkedIn && (
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-zinc-500 hover:text-zinc-300 transition-colors"
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
          className="absolute inset-0 backface-hidden bg-zinc-800 rounded-lg border border-zinc-700 p-6 flex flex-col justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="text-xl font-semibold text-zinc-100 mb-3">
            {member.name}
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed">{member.bio}</p>

          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
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
    <section className="relative py-16 sm:py-24 bg-zinc-950">
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
            Our Team
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
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
          className="text-center text-sm text-zinc-600 mt-8"
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