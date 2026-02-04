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
    <section className="relative bg-zinc-950 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950" />

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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-100 tracking-tight">
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
            className="h-1 w-32 bg-zinc-700 rounded-full mx-auto"
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
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src={logo}
                alt={`${name} logo`}
                fill
                className="object-contain"
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
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100">
              About the Chapter
            </h2>
            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}