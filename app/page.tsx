"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import LoadingScreen from "@/components/loading-screen";

// Lazy-load Hero and About to reduce initial JS bundle
const Hero = dynamic(() => import("@/components/hero"), {
  ssr: true,
});

const About = dynamic(() => import("@/components/about"), {
  ssr: true,
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for loading screen to complete before showing main content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />
      <div
        className={`transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <main className="relative">
          <Hero />
          <About />
          
          {/* Future sections will be added here:
          <Events />
          <Team />
          <Footer />
          */}
        </main>
      </div>
    </>
  );
}

// CHANGES MADE:
// - Imported About component with dynamic loading
// - Added <About /> after <Hero /> in main content
// - Lazy-loading ensures About's framer-motion code doesn't bloat initial bundle
// - ssr: true maintains SEO while code-splitting