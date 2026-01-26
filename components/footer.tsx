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
      className={`relative bg-zinc-950 border-t border-zinc-800 transition-opacity duration-1000 `}
    >
    
     <div
    className={`transition-all duration-700 ease-out ${
      isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-6"
    }`}
  >

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1:  About */}
          <div className="space-y-4">
            <div className="relative w-64 h-16 group">
              <Image
                src="/images/SBIEEE_Logo.webp"
                alt="IEEE BVICAM Logo"
                fill
                className="object-cover transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
                priority
              />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              IEEE Student Branch at Bharati Vidyapeeth's Institute of Computer 
              Applications and Management, empowering innovation and technical excellence.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-zinc-200 font-semibold text-base uppercase tracking-wider">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-3">
             {/*  <Link
                href="/"
                className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-200 w-fit"
              >
                Home
              </Link> */}
              <button
                onClick={() => handleNavigation("about")}
                className="cursor-pointer text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-200 w-fit text-left"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation("chapters")}
                className="cursor-pointer text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-200 w-fit text-left"
              >
                Chapters
              </button>
              {/* <Link
                href="/events/ieee-education-week-2025"
                className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-200 w-fit"
              >
                Events
              </Link> */}
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-zinc-200 font-semibold text-base uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-zinc-400">
              <p className="leading-relaxed">
                <span className="block font-medium text-zinc-300">Email</span>
                ieee@bvicam.ac.in
              </p>
              <p className="leading-relaxed">
                <span className="block font-medium text-zinc-300">Institute</span>
                Bharati Vidyapeeth's Institute of<br />
                Computer Applications and Management
              </p>
              <p className="leading-relaxed">
                <span className="block font-medium text-zinc-300">Location</span>
                New Delhi, India
              </p>
            </div>
          </div>

          {/* Column 4: Social Links */}
          <div className="space-y-4">
            <h3 className="text-zinc-200 font-semibold text-base uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/ieeebvicam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-zinc-400">
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