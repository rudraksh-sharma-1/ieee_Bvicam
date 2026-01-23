"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import LoadingScreen from "@/components/loading-screen";

// Lazy-load sections to reduce initial JS bundle
const Hero = dynamic(() => import("@/components/hero"), {
  ssr: true,
});

const About = dynamic(() => import("@/components/about"), {
  ssr: true,
});

const Events = dynamic(() => import("@/components/events"), {
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
          <Events />
          
          {/* Future sections will be added here:
          <Team />
          <Footer />
          */}
        </main>
      </div>
    </>
  );
}
