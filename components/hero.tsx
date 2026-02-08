"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const membersCount = useCountUp(300, startCount, getDuration(500));
  const eventsCount = useCountUp(30, startCount, getDuration(50));
  const yearsCount = useCountUp(5, startCount, getDuration(10));

  const handleExploreEvents = () => {
    router.push("/events/ieee-education-week-2025");
  };

  const handleLearnMore = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-600 via-blue-800 to-blue-950"
    >
      {/* Animated Grid Pattern */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        animate={{
          opacity: [0.7, 0.2, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles effect */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-2xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay:2.5, duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white mb-6">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Institute of Electrical and Electronics Engineers
          </div>

          {/* Heading*/}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 2.6,
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
                  delay: 0.3 + i * 0.05,
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
            className="text-xl sm:text-2xl text-blue-50/90 max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 2.7,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            Advancing technology for humanity through innovation, collaboration, and technical excellence at BVICAM
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          >
            <Button
              size="lg"
              onClick={handleExploreEvents}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all"
            >
              Explore Events
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleLearnMore}
              className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 px-8 py-6 text-lg cursor-pointer transition-all"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            onAnimationComplete={() => setStartCount(true)}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                {membersCount}+
              </div>
              <div className="text-sm text-blue-100/80 uppercase tracking-wider">
                Members
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                {eventsCount}+
              </div>
              <div className="text-sm text-blue-100/80 uppercase tracking-wider">
                Events
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                {yearsCount}+
              </div>
              <div className="text-sm text-blue-100/80 uppercase tracking-wider">
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
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <motion.div
            className="w-1.5 h-2 bg-white/70 rounded-full mx-auto"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
      */}
    </section>
  );
}