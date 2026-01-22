"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
  { id: "chapters", label: "Chapters" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 group cursor-pointer transition-all duration-300"
            aria-label="Scroll to home"
          >
            {/* Logo Image Container */}
            <div className="relative w-20 h-20 flex items-center justify-center">

              <Image
                src="/images/bvicam_logo.avif"
                alt="IEEE BVICAM Logo"
                width={160}
                height={160}
                className="object-contain
                scale-110
                transition-all duration-300
                group-hover:scale-115
                group-hover:drop-shadow-[0_0_18px_rgba(148,163,184,0.6)]"
                priority
              />
              {/* <span className="absolute text-lg font-bold text-zinc-100 opacity-0">IB</span> */}
            </div>

            {/* Text with refined positioning and glow */}
            <span className="hidden sm:block text-base font-semibold text-zinc-100 translate-y-0.5
                 transition-all duration-300
                 group-hover:text-zinc-50
                 group-hover:drop-shadow-[0_0_12px_rgba(148,163,184,0.8)]">
              IEEE BVICAM
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors rounded-md hover:bg-zinc-800/50"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="default"
              size="sm"
              className="ml-4 bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
            >
              Join Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800/50">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-md transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="default"
                size="sm"
                className="mt-2 bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
              >
                Join Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// BRANDING ENHANCEMENTS SUMMARY:
//
// 1. Logo Image Integration:
//    - Added Next.js <Image /> component with proper sizing (32x32 inside 40x40 container)
//    - Priority loading for above-fold content
//    - Fallback "IB" text hidden but preserved for graceful degradation
//    - Path: /images/logo.png (replace with actual logo file)
//
// 2. Text Positioning:
//    - Added translate-y-0.5 (2px downward shift) for visual anchoring
//    - Text appears intentionally positioned relative to logo
//    - Maintains responsive behavior (hidden on mobile via sm:block)
//
// 3. Hover Glow Effect (CSS-only):
//    - Logo: box-shadow glow on hover (zinc-400 with 0.3 opacity)
//    - Text: custom text-shadow-glow class (defined in globals.css)
//    - Unified via :group-hover (entire button is interactive unit)
//    - Smooth 300ms transition for premium feel
//    - No JavaScript, no performance impact
//
// 4. Accessibility & Performance:
//    - Proper alt text for logo image
//    - Button remains keyboard-navigable
//    - Image priority loading (critical above-fold asset)
//    - No layout shift (explicit width/height)
//
// REQUIRED CSS (add to globals.css):
//
// @layer utilities {
//   .text-shadow-glow {
//     text-shadow: 0 0 20px rgba(148, 163, 184, 0.4),
//                  0 0 10px rgba(148, 163, 184, 0.2);
//   }
// }
//
// IMAGE SETUP:
// - Place logo file at: public/images/logo.png
// - Recommended: SVG or PNG with transparent background
// - Ideal size: 64x64px or larger (Next.js will optimize)
// - Format: WebP, PNG, or SVG preferred