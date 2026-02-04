"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ChapterIntroProps {
  logo: string;
  name: string;
  description: string;
}

export default function ChapterIntro({
  logo,
  name,
  description,
}: ChapterIntroProps) {
  return (
    <section className="relative bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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