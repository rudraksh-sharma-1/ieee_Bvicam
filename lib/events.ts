// Event classification and data structure
// Separated from UI for easy maintenance and scalability

export type EventCategory = 
  | "flagship" 
  | "competition" 
  | "panel" 
  | "inauguration" 
  | "workshop";

// Layout size variants for bento grid hierarchy
export type EventSize = "hero" | "large" | "wide" | "standard";

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  images: string[]; // Array of image paths for carousel
  year?: string; // Optional year for context
  size: EventSize; // Determines grid span (data-driven)
}

export const events: Event[] = [
  // HERO TILE - Largest, most prominent (2x2 on desktop)
  {
    id: "DSSYWLC-24",
    title: "DSSYWLC - 24",
    description: "This event brings together Students, Young Professionals, and esteemed experts to explore current and emerging trends and opportunities in technology and leadership. The theme underscores the transformative power of technology in shaping the present and the future.",
    category: "panel",
    images: [
      "/images/events/DSSYWLC-24-1.jpg",
      "/images/events/DSSYWLC-24-2.jpg",
      "/images/events/DSSYWLC-24-3.jpg"
    ],
    year: "2025",
    size: "large"
  },
  // STANDARD TILES - Regular events
  {
    id: "branch-presentation",
    title: "Branch Presentations",
    description: "Branch presentations showcased innovation and student initiatives across institutes.",
    category: "panel",
    images: [
      "/images/events/branch-presentaion-1.jpg",
      "/images/events/branch-presentation-2.jpg"
    ],
    year: "2025",
    size: "standard"
  },
  {
    id: "sporty-pleasures",
    title: "Sporty Pleasures",
    description: "Sporty Pleasures offered a fun-filled series of games, including Tug of War, Hurdle Race, and Musical Chair.",
    category: "competition",
    images: [
      "/images/events/sporty-pleasures-1.jpg"
    ],
    year: "2025",
    size: "standard"
  },


  // STANDARD TILES - Regular events
  {
    id: "Web-Wizardry",
    title: "Web Wizardry (Web Designing Competition)",
    description: "Web Wizardry challenged participants to create innovative, user-friendly websites showcasing strong design.",
    category: "competition",
    images: [
      "/images/events/web-wizardy-1.jpg",
      "/images/events/web-wizardy-2.jpg"
    ],
    year: "2025",
    size: "standard"
  },

    // LARGE TILE - Secondary prominence (2x1 on desktop)
  {
    id: "lmag",
    title: "LMAG Panel Discussion",
    description: "The LMAG Panel featured esteemed professionals, including Prof. H. L. Bajaj, Prof. Sudhanshu S Jamuar, Prof. Rajendra K. Asthana, and Prof. V. R. Singh. They discussed IEEE's impact, advancements in technology, and strategies for enhancing member engagement, fostering collaboration and growth within the organization.",
    category: "panel",
    images: [
      "/images/events/lmag-1.jpg",
      "/images/events/lmag-2.jpg"
    ],
    year: "2025",
    size: "large"
  },

  {
    id: "Coding-Clash",
    title: "Coding Clash: Battle of Brains",
    description: "Coding Clash tested participants’ logic and algorithmic skills through intense, time-bound coding challenges.",
    category: "competition",
    images: [
      "/images/events/coding-clash.jpg"
    ],
    year: "2025",
    size: "standard"
  },




  // STANDARD TILES
  {
    id: "Logo-Logic",
    title: "Logo Logic: Design Beyond Imagination (Logo Designing Competition)",
    description: "Logo Logic challenged participants to design creative and meaningful logos with strong brand identity.",
    category: "competition",
    images: [
      "/images/events/logo-logic-1.jpg",
      "/images/events/logo-logic-2.jpg"
    ],
    year: "2025",
    size: "standard"
  },
  {
    id: "entrepreneurial-horizons",
    title: "Entrepreneurial Horizons: Inspiring Journeys from Industry Leaders",
    description: "The session featured industry experts sharing entrepreneurial journeys, insights on innovation and leadership.",
    category: "panel",
    images: [
      "/images/events/entrepreneurial-horizons-1.jpg",
      "/images/events/entrepreneurial-horizons-2.jpg"
    ],
    year: "2025",
    size: "standard"
  },

    // WIDE TILE - Horizontal emphasis (2x1 on desktop)
  {
    id: "wienove-2.0",
    title: "WIENOVA 2.0 (Event by WIE Team)",
    description: "WIENOVA 2.0 empowered women in engineering by highlighting leadership, career growth, and breaking barriers in STEM through shared insights and inspiration.",
    category: "workshop",
    images: [
      "/images/events/wienova-1.jpg"
    ],
    year: "2025",
    size: "wide"
  },

  {
    id: "ieee-young-professionals-meet",
    title: "IEEE Young Professionals Meet",
    description: "The IEEE Young Professionals Meet focused on career growth, leadership, and networking.",
    category: "workshop",
    images: [
      "/images/events/ieee-young-professionals-meet-1.jpg"
    ],
    year: "2025",
    size: "standard"
  },
  {
    id: "Inaugural-Ceremony-(AP-S)",
    title: "Inaugural Ceremony of the IEEE BVICAM Antennas and Propagation Society (AP-S) Students’ Branch Chapter",
    description: "Bharati Vidyapeeth’s Institute of Computer Applications and Management (BVICAM), New Delhi, proudly hosted the Inaugural Ceremony of the IEEE BVICAM Antennas and Propagation Society (AP-S) Students’ Branch Chapter on 30th April 2025.",
    category: "inauguration",
    images: [
      "/images/events/aps-1.jpg",
      "/images/events/aps-2.jpg"
    ],
    year: "2025",
    size: "wide"
  },
  {
    id: "dark-coding",
    title: "Dark Coding",
    description: "Dark Coding challenged participants to code without visual feedback, sharpening logic, adaptability.",
    category: "competition",
    images: [
      "/images/events/dark-coding-1.jpg"
    ],
    year: "2025",
    size: "standard"
  }
];

// Helper function to get events by size (for layout organization)
export function getEventsBySize(size: EventSize): Event[] {
  return events.filter(event => event.size === size);
}

// Helper function to get events by category
export function getEventsByCategory(category: EventCategory): Event[] {
  return events.filter(event => event.category === category);
}

// LAYOUT HIERARCHY:
// - 1 hero (2x2 desktop) - IEEE India Congress
// - 1 large (2x1 desktop) - Technical Symposium
// - 2 wide (2x1 desktop) - Industry Panel, CS Chapter
// - 6 standard (1x1) - Remaining events
//
// Total: 10 events with intentional size distribution