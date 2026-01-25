"use client";

import { motion } from "framer-motion";

interface EventHeroTitleProps {
  eventName: string;
}

export default function EventHeroTitle({ eventName }: EventHeroTitleProps) {
  // Split by words for cleaner animation
  const words = eventName.split(" ");

  return (
    <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 leading-tight">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: wordIndex * 0.1 + charIndex * 0.03,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </h1>
  );
}