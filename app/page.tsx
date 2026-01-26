"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import LoadingScreen from "@/components/loading-screen";

// Lazy-load sections
const Hero = dynamic(() => import("@/components/hero"), { ssr: true });
const About = dynamic(() => import("@/components/about"), { ssr: true });
const Events = dynamic(() => import("@/components/events"), { ssr: true });
const Chapters = dynamic(() => import("@/components/chapters"), { ssr: true });
const Footer = dynamic(() => import("@/components/footer"), { ssr: true });

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Events />
        <Chapters />
      </main>
      <Footer />
    </>
  );
}
