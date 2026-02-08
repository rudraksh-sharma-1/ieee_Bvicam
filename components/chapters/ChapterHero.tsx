"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ChapterHeroProps {
  name: string;
  logo: string;
  description: string;
}

export default function ChapterHero({ name, logo, description }: ChapterHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-950 to-blue-900 overflow-hidden">
      {/* Smooth transition overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-blue-800/50 pointer-events-none" />
      
      {/* Pulsating animated background orbs */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-5! sm:py-24">
        {/* Chapter Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl py-5 sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent tracking-tight">
            {name}
          </h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-1 w-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto shadow-lg shadow-blue-500/50"
          />
        </motion.div>

        {/* Logo and Description */}
        <div className="grid md:grid-cols-2 gap-12 items-center -mt-15">
          {/* Logo - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square p-8 bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-700/30 shadow-2xl">
              <Image
                src={logo}
                alt={`${name} logo`}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>

          {/* Description - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
              About the Chapter
            </h2>
            <p className="text-lg sm:text-xl text-blue-50/90 leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}