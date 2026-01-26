// lib/chapters.ts
export interface Chapter {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const chapters: Chapter[] = [
  {
    id: "AP-S",
    name: "IEEE Antennas and Propagation Society",
    description: "Advancing wireless communication through innovative antenna design and electromagnetic wave propagation research.",
    image: "/images/chapters/ap-s-Logo.png"
  },
  {
    id: "cs",
    name: "IEEE Computer Society",
    description: "Empowering tomorrow's tech leaders with cutting-edge computing knowledge, from algorithms to artificial intelligence.",
    image: "/images/chapters/cs-logo.webp"
  },
  {
    id: "wie",
    name: "IEEE Women in Engineering",
    description: "Inspiring and empowering women engineers to achieve their full potential and lead innovation in technology.",
    image: "/images/chapters/IEEE_WIE-social_logo.webp"
  },
  {
    id: "smc",
    name: "IEEE Systems, Man, and Cybernetics Society",
    description: "Exploring intelligent systems and human-machine interaction to create smarter, more adaptive technologies.",
    image: "/images/chapters/smc-logo.webp"
  }
];