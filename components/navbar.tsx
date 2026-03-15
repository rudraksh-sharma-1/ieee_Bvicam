"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Base nav links (non-dropdown)
const baseNavLinks = [
  { id: "about", label: "About", scrollTo: "about" },
  { id: "team", label: "Team", scrollTo: "team" },
];

// Events dropdown items
const eventsDropdownItems = [
  { label: "Past Events", href: "/events/ieee-education-week-2025" },
  { label: "Upcoming Events", href: "/events/upcoming" },
];

// Chapters dropdown items
const chaptersDropdownItems = [
  { label: "Computer Society", href: "/chapters/CS" },
  { label: "Systems, Man, and Cybernetics Society", href: "/chapters/SMC" },
  { label: "Antennas and Propagation Society", href: "/chapters/AP-S" },
  { label: "Women in Engineering", href: "/chapters/WIE" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const handleNavigation = (link: typeof baseNavLinks[0]) => {
    if (!isHomePage) {
      router.push("/");
      return;
    }
    
    if (link.scrollTo) {
      scrollToSection(link.scrollTo);
    }
  };

  const handleHomeClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
    setIsOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-40 bg-blue-950/90 backdrop-blur-md border-b border-blue-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo - Enhanced Visibility */}
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-3 group cursor-pointer transition-all duration-300 -ml-2 sm:-ml-3"
            aria-label="IEEE BVICAM Home"
          >
            <div className="relative w-32 h-16 sm:w-40 sm:h-20 md:w-60 md:h-16 md:bg-amber-50 rounded-2xl flex items-center justify-center">
              <Image
                src="/images/SBIEEE_Logo.webp"
                alt="IEEE BVICAM Logo"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                className="object-cover transition-all md:pb-2 duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                priority
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Home button */}
            <button
              onClick={handleHomeClick}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors rounded-md hover:bg-white/10"
            >
              Home
            </button>

            {baseNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link)}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors rounded-md hover:bg-white/10"
              >
                {link.label}
              </button>
            ))}

            {/* Chapters Dropdown */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors rounded-md hover:bg-white/10 flex items-center gap-1">
                  Chapters
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-blue-950/98 backdrop-blur-md border-blue-800/60">
                {chaptersDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link
                      href={item.href}
                      className="text-blue-100 hover:text-white hover:bg-white/10 cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Events Dropdown */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors rounded-md hover:bg-white/10 flex items-center gap-1">
                  Events
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-blue-950/98 backdrop-blur-md border-blue-800/60">
                {eventsDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link
                      href={item.href}
                      className="text-blue-100 hover:text-white hover:bg-white/10 cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="default"
              size="sm"
              className="ml-4 bg-white text-blue-900 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all"
            >
              Join Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-blue-800/40">
            <div className="flex flex-col gap-2">
              {/* Home button mobile */}
              <button
                onClick={handleHomeClick}
                className="px-4 py-2 text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-md transition-colors text-left"
              >
                Home
              </button>

              {baseNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigation(link)}
                  className="px-4 py-2 text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-md transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}

              {/* Chapters submenu in mobile */}
              <div className="border-t border-blue-800/40 mt-2 pt-2">
                <div className="px-4 py-1 text-xs uppercase tracking-wider text-blue-300/70">Chapters</div>
                {chaptersDropdownItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-md transition-colors block"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Events submenu in mobile */}
              <div className="border-t border-blue-800/40 mt-2 pt-2">
                <div className="px-4 py-1 text-xs uppercase tracking-wider text-blue-300/70">Events</div>
                {eventsDropdownItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-md transition-colors block"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Button
                variant="default"
                size="sm"
                className="mt-2 bg-white text-blue-900 hover:bg-blue-50"
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