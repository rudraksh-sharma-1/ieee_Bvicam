"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll to section functionality
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavigation = (scrollTo?: string) => {
    if (!isHomePage) {
      router.push("/");
      return;
    }

    if (scrollTo) {
      scrollToSection(scrollTo);
    }
  };

  return (
    <footer
      ref={footerRef}
      className={`relative bg-gradient-to-b from-blue-800 via-blue-950 to-slate-950 border-t border-blue-600/30 transition-opacity duration-1000 overflow-hidden`}
    >
      {/* Subtle animated orbs in background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl" />

      <div
        className={`relative z-10 transition-all duration-700 ease-out ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
          }`}
      >

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* Column 1:  About */}
            <div className="space-y-4">
              <div className="relative w-72 h-16 group">
                <Image
                  src="/images/SBIEEE_Logo.webp"
                  alt="IEEE BVICAM Logo"
                  fill
                  className="object-cover transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,-1)] drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                  priority
                />
              </div>
              <p className="text-blue-50/90 text-sm leading-relaxed max-w-xs">
                IEEE Student Branch at Bharati Vidyapeeth's Institute of Computer
                Applications and Management, empowering innovation and technical excellence.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-base uppercase tracking-wider">
                Quick Links
              </h3>
              <nav className="flex flex-col space-y-3">
                {/*  <Link
                href="/"
                className="text-blue-50/85 text-sm hover:text-white transition-colors duration-200 w-fit"
              >
                Home
              </Link> */}
                <button
                  onClick={() => handleNavigation("about")}
                  className="cursor-pointer text-blue-50/85 text-sm hover:text-white transition-colors duration-200 w-fit text-left"
                >
                  About
                </button>
                <button
                  onClick={() => handleNavigation("chapters")}
                  className="cursor-pointer text-blue-50/85 text-sm hover:text-white transition-colors duration-200 w-fit text-left"
                >
                  Chapters
                </button>
                <button
                  onClick={() => handleNavigation("team")}
                  className="cursor-pointer text-blue-50/85 text-sm hover:text-white transition-colors duration-200 w-fit text-left"
                >
                  Team
                </button>
                {/* <Link
                href="/events/ieee-education-week-2025"
                className="text-blue-50/85 text-sm hover:text-white transition-colors duration-200 w-fit"
              >
                Events
              </Link> */}
              </nav>
            </div>

            {/* Column 3: Contact Info */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-base uppercase tracking-wider">
                Contact
              </h3>
              <div className="space-y-3 text-sm text-blue-50/85">
                <p className="leading-relaxed">
                  <span className="block font-medium text-white">Email</span>
                  mca@bvicam.ac.in
                </p>
                <p className="leading-relaxed">
                  <span className="block font-medium text-white">Phone</span>
                  +91-8826883338, +91-8826883339
                </p>
                <p className="leading-relaxed">
                  <span className="block font-medium text-white">Location</span>
                  A-4, Paschim Vihar, Rohtak Road, New Delhi - 110063 (INDIA)
                </p>
              </div>
            </div>

            {/* Column 4: Social Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-base uppercase tracking-wider">
                Connect
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-blue-950/70 border-2 border-blue-500/50 flex items-center justify-center text-blue-100 hover:text-white hover:border-blue-400/70 hover:bg-blue-900/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 backdrop-blur-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/ieeebvicam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-blue-950/70 border-2 border-blue-500/50 flex items-center justify-center text-blue-100 hover:text-white hover:border-blue-400/70 hover:bg-blue-900/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 backdrop-blur-sm"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-blue-950/70 border-2 border-blue-500/50 flex items-center justify-center text-blue-100 hover:text-white hover:border-blue-400/70 hover:bg-blue-900/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 backdrop-blur-sm"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="border-t border-blue-700/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-blue-50/85">
              <p>
                © {new Date().getFullYear()} IEEE BVICAM Student Branch. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}