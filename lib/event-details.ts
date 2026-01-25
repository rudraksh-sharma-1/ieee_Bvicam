// SINGLE SOURCE OF TRUTH for event navigation and detail pages
// DO NOT create additional event data files

export type EventType = "past" | "upcoming";

export interface EventImage {
  src: string;
  alt: string;
}

export interface EventItem {
  eventNumber: number;
  eventTitle: string;
  eventDescription: string;
  images: EventImage[]; // Max 2 images
}

export interface EventDay {
  dayNumber: number;
  date: string;
  numberOfEvents: number;
  events: EventItem[];
}

export interface EventDetail {
  slug: string;
  eventId: string;
  eventName: string;
  description: string;
  date?: string;
  duration?: string;
  type: EventType;
  isDefault?: boolean;
  days: EventDay[];
}

export const eventDetails: EventDetail[] = [
  {
    slug: "ieee-education-week-2025",
    eventId: "iew-2025",
    eventName: "IEEE Education Week 2025",
    description: "A week-long celebration of technology, innovation, and learning. IEEE Education Week brought together students from across the campus to participate in diverse technical activities, competitions, and membership drives.",
    duration: "April 6-12, 2025",
    type: "past",
    isDefault: true,
    days: [
      {
        dayNumber: 1,
        date: "April 6, 2025",
        numberOfEvents: 1,
        events: [
          {
            eventNumber: 1,
            eventTitle: "Tech Meme War",
            eventDescription: "An engaging online competition where participants created original tech-related memes. Shreya Singhal won with 120 likes on Instagram, combining creativity, humor, and technology while boosting the branch's online visibility.",
            images: [
              /* {
                src: "/images/events/iew-2025/day1-meme.png",
                alt: "Tech Meme War winner submission"
              } */
            ]
          }
        ]
      },
      {
        dayNumber: 2,
        date: "April 7, 2025",
        numberOfEvents: 1,
        events: [
          {
            eventNumber: 1,
            eventTitle: "Re-Engineering Challenge",
            eventDescription: "A hands-on design event with 29 participants analyzing and redesigning web pages. Sahej Bhatia won for his impressive Figma redesign of the 'Buy Me a Coffee' page, demonstrating clean interface and user-focused design.",
            images: [
              {
                src: "/images/events/re-engineering-challenge-1.jpg",
                alt: "Re-Engineering Challenge workspace"
              },
              {
                src: "/images/events/re-engineering-challenge-2.jpg",
                alt: "Winning design presentation"
              }
            ]
          }
        ]
      },
      {
        dayNumber: 3,
        date: "April 8, 2025",
        numberOfEvents: 1,
        events: [
          {
            eventNumber: 1,
            eventTitle: "Startup Showdown",
            eventDescription: "An entrepreneurial pitch event where 15 participants presented innovative startup ideas focusing on problem-solving and business potential. Yash Bansal won for his standout concept with impressive clarity and real-world relevance.",
            images: [
              {
                src: "/images/events/startup-showdown-1.jpg",
                alt: "Startup Showdown pitch session"
              }
            ]
          }
        ]
      },
      {
        dayNumber: 4,
        date: "April 9, 2025",
        numberOfEvents: 1,
        events: [
          {
            eventNumber: 1,
            eventTitle: "Women in STEM Group Discussion",
            eventDescription: "A powerful discussion at Delphi Hall with 21 participants exploring challenges and opportunities for women in STEM. Shreya Chhetri won for articulate points and impactful delivery in this inclusive platform for dialogue.",
            images: [
              {
                src: "/images/events/group-discussion.jpg",
                alt: "Women in STEM group discussion"
              }
            ]
          }
        ]
      },
      {
        dayNumber: 5,
        date: "April 10, 2025",
        numberOfEvents: 1,
        events: [
          {
            eventNumber: 1,
            eventTitle: "Membership Development Session",
            eventDescription: "An online session attended by 118 participants encouraging active participation in IEEE technical societies. The session resulted in 4 new IEEE members and numerous society enrollments.",
            images: []
          }
        ]
      },
      {
        dayNumber: 6,
        date: "April 11, 2025",
        numberOfEvents: 1,
        events: [
          {
            eventNumber: 1,
            eventTitle: "Dark Coding",
            eventDescription: "An intense coding competition where 30 participants solved problems with darkened code editors, testing memory and coding skills under pressure. Pratham Bhatia emerged as winner through 3 progressively difficult rounds.",
            images: [
              {
                src: "/images/events/dark-coding-1.jpg",
                alt: "Dark Coding competition in progress"
              }
            ]
          }
        ]
      },
      {
        dayNumber: 7,
        date: "April 12, 2025",
        numberOfEvents: 1,
        events: [
          {
            eventNumber: 1,
            eventTitle: "Vision Board Challenge",
            eventDescription: "An online event where 6 participants creatively visualized their tech aspirations and future goals. Sirali Gulati won for her outstanding vision board expressing engineering dreams and inspiring quotes.",
            images: [
              {
                src: "/images/events/vision-board-challenge-1.jpg",
                alt: "Winning vision board design"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "dssywlc-24",
    eventId: "dssywlc-2024",
    eventName: "IEEE Delhi Section SYWLC 2024",
    description: "IEEE Delhi Section Students' Young Professionals, Women in Engineering, Life Members' Congress brought together 500+ participants from premier institutions. A two-day convergence exploring technology trends, leadership, and innovation.",
    duration: "February 8-9, 2025",
    type: "past",
    days: [
      {
        dayNumber: 1,
        date: "February 8, 2025",
        numberOfEvents: 10,
        events: [
          {
            eventNumber: 1,
            eventTitle: "Open Discussion with SB Chairs",
            eventDescription: "Knowledge exchange session addressing challenges faced by student branches. Topics included leadership strategies, membership engagement, event planning, and best practices for fostering collaboration between branches.",
            images: [
              {
                src: "/images/events/Sb-cahirs-OD.jpg",
                alt: "SB Chairs discussion session"
              },
              {
                src: "/images/events/Sb-cahirs-OD-2.jpg",
                alt: "Interactive dialogue with branch counsellors"
              }
            ]
          },
          {
            eventNumber: 2,
            eventTitle: "Open Discussion with WIE Chairs",
            eventDescription: "Focused session on empowering women in engineering through leadership and collaboration. Participants explored mentorship programs, outreach initiatives, and strategies to enhance WIE engagement.",
            images: [
              {
                src: "/images/events/OD-with-wie-chairs-1.jpg",
                alt: "WIE Chairs discussion"
              },
              {
                src: "/images/events/OD-with-wie-chairs-2.jpg",
                alt: "Women in engineering leadership dialogue"
              }
            ]
          },
          {
            eventNumber: 3,
            eventTitle: "IEEE: Beyond Membership",
            eventDescription: "Mr. Ramneek Kalra provided strategic guidance on leveraging IEEE's global resources. The session highlighted networking, leadership opportunities, research collaborations, and professional growth beyond basic membership.",
            images: [
              {
                src: "/images/events/beyond-membership-1.jpg",
                alt: "Beyond Membership session"
              },
              {
                src: "/images/events/beyond-membership-2.jpg",
                alt: "Strategic guide presentation"
              }
            ]
          },
          {
            eventNumber: 4,
            eventTitle: "Entrepreneurial Horizons",
            eventDescription: "Industry leaders shared entrepreneurial journeys and business strategies. Mr. Rohit Kumar Birla, Mr. Tarun Khanna, and Mr. Sanjay Khurana discussed innovation, resilience, and strategic growth in entrepreneurship.",
            images: [
              {
                src: "/images/events/entrepreneurial-horizons-1.jpg",
                alt: "Industry leaders panel"
              },
              {
                src: "/images/events/entrepreneurial-horizons-2.jpg",
                alt: "Entrepreneurial insights session"
              }
            ]
          },
          {
            eventNumber: 5,
            eventTitle: "Keynote: The Future is Now",
            eventDescription: "Mr. Ganesh Sahai, CTO of Nagarro, delivered an inspiring keynote on technology's transformative power. He discussed emerging trends, digital advancements, and the importance of embracing innovation for global progress.",
            images: [
              {
                src: "/images/events/keynote-session-1.jpg",
                alt: "Keynote speaker presentation"
              },
              {
                src: "/images/events/keynote-session-2.jpg",
                alt: "Technology future discussion"
              }
            ]
          },
          {
            eventNumber: 6,
            eventTitle: "EPICS in IEEE",
            eventDescription: "Mr. Ramneek Kalra highlighted academic project funding opportunities through EPICS. The session covered application processes, eligibility, and the impact of funded projects on communities and technological advancement.",
            images: [
              {
                src: "/images/events/epics-1.jpg",
                alt: "EPICS funding session"
              },
              {
                src: "/images/events/epics-2.jpg",
                alt: "Academic project opportunities"
              }
            ]
          },
          {
            eventNumber: 7,
            eventTitle: "Young Professionals Meet",
            eventDescription: "Led by Rakshit Bajaj, Charu Goyal, and Rishabh Raj, this session focused on career growth and networking. Participants explored IEEE resources, mentorship programs, and strategies for professional development.",
            images: [
              {
                src: "/images/events/ieee-young-professionals-meet-1.jpg",
                alt: "Young Professionals networking"
              },
              {
                src: "/images/events/ieee-young-professionals-meet-2.jpg",
                alt: "Career growth discussion"
              }
            ]
          },
          {
            eventNumber: 8,
            eventTitle: "WIE Panel: Women Leadership in AI",
            eventDescription: "Dr. Rashmi Agarwal, Dr. Sneha Kabra, and Dr. Shivani Sharma discussed accelerating women leadership in AI. The panel explored strategies to overcome barriers and promote gender diversity in technology.",
            images: [
              {
                src: "/images/events/wie-panel-1.jpg",
                alt: "WIE panel discussion"
              },
              {
                src: "/images/events/wie-panel-2.jpg",
                alt: "AI leadership insights"
              }
            ]
          },
          {
            eventNumber: 9,
            eventTitle: "LMAG Panel Discussion",
            eventDescription: "Esteemed professors including Prof. H. L. Bajaj and Prof. Sudhanshu S Jamuar discussed IEEE's impact and technological advancements. The panel emphasized member engagement and collaborative growth.",
            images: [
              {
                src: "/images/events/lmag-1.jpg",
                alt: "LMAG panel discussion"
              },
              {
                src: "/images/events/lmag-2.jpg",
                alt: "IEEE impact conversation"
              }
            ]
          },
          {
            eventNumber: 10,
            eventTitle: "Inaugural Function",
            eventDescription: "Chief Guest Prof. Shiban Koul and distinguished guests inaugurated the congress. The ceremony set the tone for impactful discussions and collaborations, followed by a cultural evening and dinner.",
            images: [
              {
                src: "/images/events/inaugural-function-1.jpg",
                alt: "Inaugural ceremony"
              },
              {
                src: "/images/events/inaugural-function-3.jpg",
                alt: "Cultural evening celebration"
              }
            ]
          }
        ]
      },
      {
        dayNumber: 2,
        date: "February 9, 2025",
        numberOfEvents: 7,
        events: [
          {
            eventNumber: 1,
            eventTitle: "Life Changing Session by Dr. Suneel Keswani",
            eventDescription: "TEDx Speaker Dr. Suneel Keswani delivered transformative insights on personal growth, resilience, and leadership. The inspiring session encouraged attendees to embrace change and unlock their potential.",
            images: [
              {
                src: "/images/events/life-changing-session-1.jpg",
                alt: "Dr. Keswani keynote"
              },
              {
                src: "/images/events/life-changing-session-2.jpg",
                alt: "Inspiring session audience"
              }
            ]
          },
          {
            eventNumber: 2,
            eventTitle: "Branch Presentations",
            eventDescription: "Institutes including IIT Mandi, GTBIT, IIIT Delhi, DTU, and others showcased innovative projects and activities. Presentations highlighted technological advancements, academic excellence, and community engagement.",
            images: [
              {
                src: "/images/events/branch-presentation-1.jpg",
                alt: "Branch presentations"
              },
              {
                src: "/images/events/branch-presentation-2.jpg",
                alt: "Institute showcases"
              }
            ]
          },
          {
            eventNumber: 3,
            eventTitle: "WIENOVA 2.0",
            eventDescription: "WIE team organized WIENOVA 2.0 focusing on empowering women in engineering. The event provided insights into leadership, career growth, and breaking barriers in STEM fields.",
            images: [
              {
                src: "/images/events/wienova-1.jpg",
                alt: "WIENOVA 2.0 event"
              },
              {
                src: "/images/events/wienova-2.jpg",
                alt: "Women empowerment session"
              }
            ]
          },
          {
            eventNumber: 4,
            eventTitle: "Web Wizardry Competition",
            eventDescription: "Participants showcased creativity and technical skills in web design. Lakshaya Bharadwaj from GIBIT won by crafting innovative, user-friendly websites demonstrating design excellence and functionality.",
            images: [
              {
                src: "/images/events/web-wizardy-1.jpg",
                alt: "Web design competition"
              },
              {
                src: "/images/events/web-wizardy-2.jpg",
                alt: "Digital creativity showcase"
              }
            ]
          },
          {
            eventNumber: 5,
            eventTitle: "Coding Clash Competition",
            eventDescription: "Skilled programmers competed in challenging problems testing logic and algorithms. Ritvik Bhutani from CGC-COE emerged as winner in this thrilling battle demonstrating exceptional coding expertise.",
            images: [
              {
                src: "/images/events/coding-clash.jpg",
                alt: "Coding competition"
              },
              {
                src: "/images/events/coding-clash-1.jpg",
                alt: "Programming challenge"
              }
            ]
          },
          {
            eventNumber: 6,
            eventTitle: "Logo Logic & Sporty Pleasures",
            eventDescription: "Smit Bachan from DTU won the logo design competition. Fun activities including Tug of War, Hurdle Race, and Musical Chair tested teamwork and agility while fostering camaraderie among participants.",
            images: [
              {
                src: "/images/events/sporty-pleasures-1.jpg",
                alt: "Sports activities"
              }
            ]
          },
          {
            eventNumber: 7,
            eventTitle: "Valedictory Ceremony",
            eventDescription: "The closing ceremony celebrated participant achievements across all competitions. Winners were recognized for their excellence, marking the conclusion of this successful and transformative congress.",
            images: [
              {
                src: "/images/events/Valedictory.jpg",
                alt: "Valedictory ceremony"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "ieee-aps-inaugural",
    eventId: "aps-2025",
    eventName: "IEEE AP-S Students' Chapter Inaugural",
    description: "The inaugural ceremony of IEEE BVICAM Antennas and Propagation Society Students' Branch Chapter, marking the institute's entry into the IEEE AP-S domain with 153 registered student members.",
    date: "April 30, 2025",
    type: "past",
    days: [
      {
        dayNumber: 1,
        date: "April 30, 2025",
        numberOfEvents: 1,
        events: [
          {
            eventNumber: 1,
            eventTitle: "Inaugural Ceremony",
            eventDescription: "A landmark occasion featuring Prof. Shiban K. Kaul as Chief Guest and Dr. Dinesh Yadav as Guest of Honour. The ceremony included welcome addresses, chapter introduction, and inspiring talks on electromagnetic research and antenna systems, concluding with networking lunch.",
            images: [
              {
                src: "/images/events/aps-1.jpg",
                alt: "Inaugural ceremony chief guests"
              },
              {
                src: "/images/events/aps-2.jpg",
                alt: "AP-S chapter inauguration"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "upcoming",
    eventId: "upcoming",
    eventName: "Upcoming Events",
    description: "Exciting new events are being planned. Stay tuned for announcements!",
    type: "upcoming",
    isDefault: true,
    days: []
  }
];

// Helper functions
export function getEventBySlug(slug: string): EventDetail | undefined {
  return eventDetails.find(event => event.slug === slug);
}

export function getEventsByType(type: EventType): EventDetail[] {
  return eventDetails.filter(event => event.type === type);
}

export function getDefaultEvent(type: EventType): EventDetail | undefined {
  const events = getEventsByType(type);
  return events.find(event => event.isDefault) || events[0];
}