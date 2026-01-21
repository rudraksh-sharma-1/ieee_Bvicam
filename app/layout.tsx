import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "IEEE BVICAM | Student Chapter",
  description: "IEEE Student Chapter at Bharati Vidyapeeth's Institute of Computer Applications and Management",
  keywords: ["IEEE", "BVICAM", "Student Chapter", "Technology", "Innovation"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

// WHY SERVER COMPONENT:
// - No interactivity needed
// - Purely structural wrapper
// - Metadata generation happens at build time
// - Font loading optimized by Next.js automatically