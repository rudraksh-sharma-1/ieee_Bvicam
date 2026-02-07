"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { teamData, formatRole } from "@/lib/team-data";
import type { CoreMember, Society, ExecomMember } from "@/lib/team-data";

// Core leadership card - Largest, most prominent
function CoreLeaderCard({ member, index }: { member: CoreMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group"
    >
      <div className="bg-blue-950/60 backdrop-blur-md rounded-lg border-2 border-blue-600/50 overflow-hidden transition-all duration-300 hover:border-blue-500/70 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:bg-blue-950/70">
        {/* Image */}
        <div className="relative aspect-square bg-blue-900/40">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
          {/* Placeholder overlay */}
          {/* <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-blue-300 text-sm">Team Photo</span>
          </div> */}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-1">
            {member.name}
          </h3>
          <p className="text-sm text-blue-200/70 uppercase tracking-wider">
            {formatRole(member.role)}
          </p>

          {/* Optional links */}
          {(member.linkedIn || member.email) && (
            <div className="flex gap-3 mt-4">
              {member.linkedIn && (
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300/70 hover:text-blue-100 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Chapter team card - Medium size
function SocietyCard({ society, index }: { society: Society; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="bg-blue-950/60 backdrop-blur-md rounded-lg border-2 border-blue-600/50 p-6 hover:bg-blue-950/70 hover:border-blue-500/70 transition-all"
    >
      {/* Chapter header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-1">
          {society.name}
        </h3>
        <p className="text-sm text-blue-300/70 uppercase tracking-wider">
          {society.abbreviation}
        </p>
      </div>

      {/* chapter members grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {society.members.map((member, idx) => {
          const MemberWrapper = member.linkedIn ? 'a' : 'div';
          const wrapperProps = member.linkedIn ? {
            href: member.linkedIn,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "block group"
          } : {
            className: "block group"
          };

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.15 + idx * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <MemberWrapper {...wrapperProps}>
                {/* Member avatar */}
                <div className={`relative aspect-square bg-blue-900/40 rounded-lg overflow-hidden mb-3 border-2 border-blue-600/60 transition-all duration-300 ${member.linkedIn ? 'hover:border-blue-500/80 cursor-pointer' : ''}`}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 25vw, 10vw"
                  />
                </div>

                {/* Member info */}
                <div>
                  <p className={`text-sm font-medium text-white mb-0.5 ${member.linkedIn ? 'group-hover:text-blue-50' : ''}`}>
                    {member.name}
                  </p>
                  <p className="text-xs text-blue-300/70 uppercase tracking-wide">
                    {formatRole(member.role)}
                  </p>
                </div>
              </MemberWrapper>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Execom member card - Larger circular avatars, centered layout
function ExecomCard({ member, index }: { member: ExecomMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group text-center"
    >
      {/* Larger circular avatar */}
      <div className="relative w-40 h-40 mx-auto mb-3 bg-blue-900/40 rounded-full overflow-hidden border-2 border-blue-600/60 transition-all duration-300 hover:border-blue-500/80">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="112px"
        />
      </div>

      {/* Name only */}
      <p className="text-sm font-medium text-blue-100/90">
        {member.name}
      </p>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section
      id="team"
      className="relative min-h-screen bg-gradient-to-b from-blue-800 via-blue-800 to-blue-700 py-20 sm:py-32 overflow-hidden"
    >
      {/* Subtle animated orbs in background */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 relative inline-block">
            Meet Our Team
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full" />
          </h2>

          <motion.p
            className="text-lg sm:text-xl text-blue-50/90 max-w-3xl mx-auto mt-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Dedicated leaders and innovators driving IEEE BVICAM's mission to advance technology 
            for humanity through collaborative excellence.
          </motion.p>
        </motion.div>

        {/* TIER 1: Core Leadership - Largest cards, primary visual weight */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Student Branch Core Leadership
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamData.coreLeadership.map((member, index) => (
              <CoreLeaderCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* Visual separator */}
        <div className="flex items-center justify-center mb-16">
          <div className="h-px w-32 bg-blue-600/40" />
          <div className="mx-4 text-blue-400/60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="h-px w-32 bg-blue-600/40" />
        </div>

        {/* TIER 2: Society Teams */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Chapters Teams
          </h3>
          <div className="space-y-8">
            {teamData.societies.map((society, index) => (
              <SocietyCard key={society.id} society={society} index={index} />
            ))}
          </div>
        </div>

        {/* Visual separator */}
        <div className="flex items-center justify-center mb-16">
          <div className="h-px w-32 bg-blue-600/40" />
          <div className="mx-4 text-blue-400/60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="h-px w-32 bg-blue-600/40" />
        </div>

        {/* TIER 3: Execom */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Execomm
          </h3>
          {/* Centered grid with 5 columns per row */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-5xl">
              {teamData.execom.map((member, index) => (
                <ExecomCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}