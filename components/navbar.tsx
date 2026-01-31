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
  { id: "chapters", label: "Chapters", scrollTo: "chapters" },
  { id: "team", label: "Team", scrollTo: "team" },
];

// Events dropdown items
const eventsDropdownItems = [
  { label: "Past Events", href: "/events/ieee-education-week-2025" },
  { label: "Upcoming Events", href: "/events/upcoming" },
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
    <nav className="absolute top-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo - Enhanced Visibility */}
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-3 group cursor-pointer transition-all duration-300 -ml-2 sm:-ml-3"
            aria-label="IEEE BVICAM Home"
          >
            <div className="relative w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-24 flex items-center justify-center">
              <Image
                src="/images/SBIEEE_Logo.webp"
                alt="IEEE BVICAM Logo"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                className="object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(148,163,184,0.5)]"
                priority
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Home button */}
            <button
              onClick={handleHomeClick}
              className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors rounded-md hover:bg-zinc-800/50"
            >
              Home
            </button>

            {baseNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link)}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors rounded-md hover:bg-zinc-800/50"
              >
                {link.label}
              </button>
            ))}

            {/* Events Dropdown */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors rounded-md hover:bg-zinc-800/50 flex items-center gap-1">
                  Events
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
                {eventsDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link
                      href={item.href}
                      className="text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 cursor-pointer"
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
          <div className="md:hidden py-4 border-t border-zinc-800/50">
            <div className="flex flex-col gap-2">
              {/* Home button mobile */}
              <button
                onClick={handleHomeClick}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-md transition-colors text-left"
              >
                Home
              </button>

              {baseNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigation(link)}
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-md transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}

              {/* Events submenu in mobile */}
              <div className="border-t border-zinc-800/50 mt-2 pt-2">
                <div className="px-4 py-1 text-xs uppercase tracking-wider text-zinc-500">Events</div>
                {eventsDropdownItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-md transition-colors block"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

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