"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

// Lightweight count-up hook using RAF
function getDuration(end: number) {
  return Math.min(2000, Math.max(800, end * 4));
}
function useCountUp(
  end: number,
  start: boolean,
  duration: number = 2000
) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1
      );

      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, end, duration]);

  return count;
}

export default function Hero() {
  const [startCount, setStartCount] = useState(false);
  const membersCount = useCountUp(500, startCount, getDuration(500));
  const eventsCount = useCountUp(50, startCount, getDuration(50));
  const yearsCount = useCountUp(10, startCount, getDuration(10));
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

      {/* Floating Gradient Orb */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-slate-700/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-zinc-600/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-sm text-zinc-300 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Institute of Electrical and Electronics Engineers
          </div>

          {/* Heading*/}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-100 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 2.8,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {"IEEE BVICAM".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 2.8 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 3,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            Advancing technology for humanity through innovation, collaboration, and technical excellence at BVICAM
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 px-8 py-6 text-lg font-semibold"
            >
              Explore Events
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>

          {/* Stat */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            onAnimationComplete={() => setStartCount(true)}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-1">
                {membersCount}+
              </div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider pr-3">
                Members
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-1">
                {eventsCount}+
              </div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider pr-3">
                Events
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-slate-100 mb-1">
                {yearsCount}+
              </div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider pr-3">
                Years
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - COMMENTED OUT FOR FUTURE USE */}
      {/* 
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-slate-700 rounded-full p-1">
          <motion.div
            className="w-1.5 h-2 bg-slate-500 rounded-full mx-auto"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
      */}
    </section>
  );
}
