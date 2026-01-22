"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center bg-zinc-950 py-20 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Heading with underline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-100 mb-4 inline-block">
            About IEEE BVICAM
            <div className="h-1 w-50 bg-zinc-700 mx-auto mt-3" />
          </h2>
          <motion.p
            className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            IEEE BVICAM Student Branch fosters innovation and technical excellence, 
            empowering students to advance technology for humanity through collaborative 
            learning and professional development.
          </motion.p>
        </motion.div>

        {/* Three-panel layout with image integration */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image placeholder */}
          <motion.div
            className="relative aspect-[4/3] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Placeholder for BVICAM college image */}
            <Image
              src="/images/bvicam-campus.AVIF"
              alt="BVICAM College Campus"
              fill
              className="object-cover"
              priority={false}
            />
            {/* Temporary placeholder styling */}
            {/* <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-slate-800 flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
                <p className="text-sm text-slate-500">BVICAM Campus Image</p>
                <p className="text-xs text-slate-600 mt-1">Replace: /images/bvicam-placeholder.jpg</p>
              </div>
            </div> */}
          </motion.div>

          {/* Right: Three informational panels */}
          <div className="grid gap-8">
            {[
              {
                title: "Our Mission",
                content: "To advance innovation, technological excellence, and interdisciplinary research while nurturing the professional growth of our members through hands-on learning and industry collaboration."
              },
              {
                title: "Our Vision",
                content: "To be a leading IEEE Student Branch recognized for cultivating future technology leaders who drive impactful solutions to global challenges through innovation and ethical practice."
              },
              {
                title: "Our Values",
                content: "We champion integrity, collaboration, continuous learning, and inclusive excellence. Our community thrives on curiosity, mutual respect, and a shared commitment to advancing technology for humanity."
              }
            ].map((panel, index) => (
              <motion.div
                key={index}
                className="relative pl-6 border-l-2 border-zinc-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4 + index * 0.15, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-3">
                  {panel.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {panel.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-slate-800/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { label: "Active Projects", value: "15+" },
            { label: "Workshops", value: "30+" },
            { label: "Collaborations", value: "20+" },
            { label: "Achievements", value: "50+" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-slate-100 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}

