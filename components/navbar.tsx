"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#team", label: "Chapters" },
  { href: "#contact", label: "Team" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-slate-100">IB</span>
            </div>
            <span className="text-xl font-semibold text-slate-100 hidden sm:block">
              IEEE BVICAM
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors rounded-md hover:bg-slate-800/50"
              >
                {link.label}
              </a>
            ))}
            <Button 
              variant="default" 
              size="sm" 
              className="ml-4 bg-slate-100 text-slate-950 hover:bg-slate-200"
            >
              Join Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-colors"
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
          <div className="md:hidden py-4 border-t border-slate-800/50">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button 
                variant="default" 
                size="sm" 
                className="mt-2 bg-slate-100 text-slate-950 hover:bg-slate-200"
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

// WHY CLIENT COMPONENT:
// - Mobile menu requires useState for toggle state
// - Interactive button click handlers
// - Could be Server Component if we removed mobile menu,
//   but mobile UX requires client-side interactivity
// - Still minimal JS (~3KB for mobile nav logic)