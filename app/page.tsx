"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import LoadingScreen from "@/components/loading-screen";

// Lazy-load Hero to reduce initial JS bundle
const Hero = dynamic(() => import("@/components/hero"), {
  ssr: true,
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for loading screen to complete before showing main content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

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
          
          {/* Future sections will be added here:
          <About />
          <Events />
          <Team />
          <Footer />
          */}
        </main>
      </div>
    </>
  );
}

// MODIFIED TO CLIENT COMPONENT:
// - Added smooth fade-in transition after loading screen
// - Requires useState/useEffect for coordinated timing
// - Wraps content in opacity transition wrapper
// - Minimal performance impact (~1KB additional JS)
// - Previous version was Server Component, but this change
//   improves UX significantly with negligible cost