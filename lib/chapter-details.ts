export interface ChapterMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio: string;
  linkedIn?: string;
}

export interface ChapterStat {
  id: string;
  label: string;
  value: number;
  unit?: string;
  description: string;
  icon?: string;
}

export interface PastEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  participants?: number;
}

export interface ChapterDetail {
  slug: string;
  name: string;
  logo: string;
  description: string;
  longDescription: string;
  stats: ChapterStat[];
  team: ChapterMember[];
  pastEvents: PastEvent[];
  metadata: {
    title: string;
    description: string;
  };
}

export const chapterDetails: ChapterDetail[] = [
  {
    slug: "CS",
    name: "Computer Society",
    logo: "/images/chapters/cs-logo.webp",
    description: "Fostering innovation in computing technologies and software development.",
    longDescription: "The Computer Society is the premier source for information, inspiration, and collaboration in computer science and engineering. We advance computing as a science and profession through conferences, publications, and educational activities.",
    stats: [
      {
        id: "hackathons",
        label: "Hackathons Organized",
        value: 8,
        description: "Competitive coding events and innovation challenges"
      },
      {
        id: "tech-talks",
        label: "Tech Talks",
        value: 15,
        description: "Expert sessions on emerging technologies"
      },
      {
        id: "members",
        label: "Active Members",
        value: 120,
        description: "Students passionate about computer science"
      },
      {
        id: "certifications",
        label: "Certifications",
        value: 25,
        description: "Members achieved industry certifications"
      }
    ],
    team: [
      {
        id: "cs-chair",
        name: "Manas Kumar Sharma",
        designation: "Chapter Chair",
        image: "/images/team/manas_kumar_sharma.jpg",
        bio: "Full-stack developer with expertise in cloud computing and distributed systems, passionate about AI/ML.",
        linkedIn: "https://linkedin.com/in/arjunpatel"
      },
      {
        id: "cs-vice",
        name: "Nikshay Singh",
        designation: "Vice Chair",
        image: "/images/team/nikshay_singh.jpg",
        bio: "Cybersecurity enthusiast specializing in ethical hacking and network security protocols.",
        linkedIn: "https://linkedin.com/in/nehagupta"
      },
      {
        id: "cs-sec",
        name: "Khushi Talwar",
        designation: "Secretary",
        image: "/images/team/khushi_talwar.jpg",
        bio: "Mobile app developer and UI/UX designer with a focus on creating intuitive user experiences.",
        linkedIn: "https://linkedin.com/in/vikramsingh"
      },
      {
        id: "cs-tres",
        name: "Harkirat Singh",
        designation: "Treasurer",
        image: "/images/team/harkirat_singh.jpeg",
        bio: "Mobile app developer and UI/UX designer with a focus on creating intuitive user experiences.",
        linkedIn: "https://linkedin.com/in/vikramsingh"
      },
    ],
    pastEvents: [
      {
        id: "ai-workshop",
        title: "AI/ML Bootcamp",
        description: "Intensive 3-day bootcamp covering machine learning fundamentals, neural networks, and practical applications using Python and TensorFlow.",
        image: "/images/chapters/cs-logo.webp",
        date: "2025-01-20",
        time: "9:00 AM - 6:00 PM",
        participants: 80
      },
      {
        id: "hackathon-24",
        title: "CodeFest 2024",
        description: "24-hour hackathon challenging students to build innovative solutions for real-world problems with industry mentorship.",
        image: "/images/chapters/cs-logo.webp",
        date: "2024-11-25",
        time: "9:00 AM - 9:00 AM",
        participants: 100
      }
    ],
    metadata: {
      title: "Computer Society | IEEE BVICAM",
      description: "Explore cutting-edge computing technologies and software development with IEEE BVICAM Computer Society."
    }
  },
  {
    slug: "SMC",
    name: "Systems, Man, and Cybernetics Society",
    logo: "/images/chapters/smc-logo.webp",
    description: "Advancing the theory, analysis, design, tools, and implementation of circuits and systems.",
    longDescription: "The Circuits and Systems Society is dedicated to the advancement of the theory, analysis, design, tools, and implementation of circuits and systems. We focus on both analog and digital circuits, spanning from low-frequency to microwave applications, and from conventional to emerging technologies.",
    stats: [
      {
        id: "workshops",
        label: "Workshops Conducted",
        value: 12,
        description: "Technical workshops on circuit design and PCB development"
      },
      {
        id: "projects",
        label: "Active Projects",
        value: 8,
        description: "Student-led circuit design and implementation projects"
      },
      {
        id: "members",
        label: "Active Members",
        value: 45,
        description: "Engaged students passionate about circuits and systems"
      },
      {
        id: "collaborations",
        label: "Industry Collaborations",
        value: 3,
        description: "Partnerships with electronics companies"
      }
    ],
    team: [
      {
        id: "smc-chair",
        name: "Vaibhav Pathak",
        designation: "Chapter Chair",
        image: "/images/team/vaibhav_pathak.webp",
        bio: "Final year ECE student specializing in analog circuit design with a passion for VLSI and embedded systems.",
        linkedIn: "https://linkedin.com/in/priyasharma"
      },
      {
        id: "smc-vice",
        name: "Rohan Swami",
        designation: "Vice Chair",
        image: "/images/team/rohan_swami.webp",
        bio: "Enthusiastic about signal processing and RF circuit design, currently working on IoT projects.",
        linkedIn: "https://linkedin.com/in/rahulverma"
      },
      {
        id: "smc-sec",
        name: "Nimisha Jindal",
        designation: "Secretary",
        image: "/images/team/nimisha_jindal.webp",
        bio: "Focused on power electronics and renewable energy systems with hands-on PCB design experience.",
        linkedIn: "https://linkedin.com/in/ananyasingh"
      },
      {
        id: "smc-tres",
        name: "Rahul Sardana",
        designation: "Treasurer",
        image: "/images/team/Rahul_sardana.webp",
        bio: "Focused on power electronics and renewable energy systems with hands-on PCB design experience.",
        linkedIn: "https://linkedin.com/in/ananyasingh"
      },
    ],
    pastEvents: [
      {
        id: "pcb-workshop",
        title: "PCB Design Workshop",
        description: "Comprehensive hands-on workshop covering PCB design fundamentals, trace routing, and manufacturing preparation using industry-standard tools.",
        image: "/images/chapters/smc-logo.webp",
        date: "2025-01-15",
        time: "10:00 AM - 4:00 PM",
        participants: 60
      },
      {
        id: "analog-seminar",
        title: "Analog Circuit Design Seminar",
        description: "Expert lecture series on advanced analog circuit techniques including op-amp design, filters, and oscillators.",
        image: "/images/chapters/smc-logo.webp",
        date: "2024-12-10",
        time: "2:00 PM - 5:00 PM",
        participants: 45
      }
    ],
    metadata: {
      title: "Circuits and Systems Society | IEEE BVICAM",
      description: "Join IEEE BVICAM Circuits and Systems Society to advance your knowledge in circuit theory, design, and implementation."
    }
  },
  {
    slug: "AP-S",
    name: "Antennas and Propagation Society",
    logo: "/images/chapters/ap-s-Logo.png",
    description: "Advancing the theory and practice of robotics and automation engineering.",
    longDescription: "The Robotics and Automation Society is dedicated to advancing innovation, education, and fundamental and applied research in robotics and automation. We cover topics ranging from autonomous systems to human-robot interaction.",
    stats: [
      {
        id: "robots",
        label: "Robots Built",
        value: 15,
        description: "Student projects from line followers to autonomous drones"
      },
      {
        id: "competitions",
        label: "Competition Wins",
        value: 6,
        description: "Awards in national and international robotics competitions"
      },
      {
        id: "members",
        label: "Active Members",
        value: 65,
        description: "Engineers passionate about robotics and automation"
      },
      {
        id: "labs",
        label: "Lab Sessions",
        value: 20,
        description: "Hands-on robotics and automation workshops"
      }
    ],
    team: [
      {
        id: "aps-chair",
        name: "Mankirat",
        designation: "Chapter Chair",
        image: "/images/team/mankirat_singh.jpg",
        bio: "Robotics engineer specializing in autonomous navigation and computer vision for mobile robots.",
        linkedIn: "https://linkedin.com/in/adityamalhotra"
      },
      {
        id: "aps-vice",
        name: "Laksya Gupta",
        designation: "Vice Chair",
        image: "/images/team/Lakshya_gupta.jpg",
        bio: "Mechatronics enthusiast with expertise in robot kinematics and control systems design.",
        linkedIn: "https://linkedin.com/in/shreyakapoor"
      },
      {
        id: "aps-sec",
        name: "Diya Aggarwal",
        designation: "Secretary",
        image: "/images/team/diya_aggarwal.jpg",
        bio: "Drone technology specialist working on swarm robotics and aerial surveillance systems.",
        linkedIn: "https://linkedin.com/in/karanmehta"
      },
      {
        id: "aps-tres",
        name: "Arpita",
        designation: "Treasurer",
        image: "/images/team/Arpita.jpeg",
        bio: "Drone technology specialist working on swarm robotics and aerial surveillance systems.",
        linkedIn: "https://linkedin.com/in/karanmehta"
      },
    ],
    pastEvents: [
      {
        id: "robo-race",
        title: "Autonomous Robot Race",
        description: "Competitive event where teams build and program autonomous robots to navigate complex obstacle courses using sensors and AI.",
        image: "/images/chapters/ap-s-Logo.png",
        date: "2025-01-10",
        time: "11:00 AM - 5:00 PM",
        participants: 50
      },
      {
        id: "drone-workshop",
        title: "Drone Building Workshop",
        description: "Hands-on workshop teaching participants to assemble, program, and fly their own quadcopter drones.",
        image: "/images/chapters/ap-s-Logo.png",
        date: "2024-12-05",
        time: "1:00 PM - 6:00 PM",
        participants: 35
      }
    ],
    metadata: {
      title: "Robotics and Automation Society | IEEE BVICAM",
      description: "Build, program, and innovate with robots at IEEE BVICAM Robotics and Automation Society."
    }
  },
  {
    slug: "WIE",
    name: "Women in Engineering",
    logo: "/images/chapters/IEEE_WIE-social_logo.webp",
    description: "Inspiring and empowering women in engineering and technology.",
    longDescription: "IEEE Women in Engineering facilitates the recruitment and retention of women in technical disciplines globally. We inspire girls around the world to follow their academic interests in engineering, leading to a fulfilling career.",
    stats: [
      {
        id: "mentorship",
        label: "Mentorship Programs",
        value: 5,
        description: "Career guidance and technical mentorship initiatives"
      },
      {
        id: "outreach",
        label: "Outreach chapters",
        value: 10,
        description: "Programs inspiring young girls in STEM fields"
      },
      {
        id: "members",
        label: "Active Members",
        value: 55,
        description: "Women engineers driving change and innovation"
      },
      {
        id: "speakers",
        label: "Guest Speakers",
        value: 12,
        description: "Industry leaders sharing their success stories"
      }
    ],
    team: [
      {
        id: "wie-chair",
        name: "Shruti Dhingra",
        designation: "Chapter Chair",
        image: "/images/team/Shruti_dhingra.webp",
        bio: "Software engineer and advocate for diversity in tech, working on initiatives to bridge the gender gap in engineering.",
        linkedIn: "https://linkedin.com/in/ishitaagarwal"
      },
      {
        id: "wie-vice",
        name: "Nishant Malhotra",
        designation: "Vice Chair",
        image: "/images/team/nishant_malhotra.webp",
        bio: "Data scientist passionate about empowering women through technology and creating inclusive tech communities.",
        linkedIn: "https://linkedin.com/in/riyasharma"
      },
      {
        id: "wie-sec",
        name: "Kajal Mishra",
        designation: "Secretary",
        image: "/images/team/Kajal_Mishra.webp",
        bio: "Electronics engineer focused on IoT and sustainable technology solutions for social impact.",
        linkedIn: "https://linkedin.com/in/tanvireddy"
      },
      {
        id: "wie-tres",
        name: "Md Nazare Alam",
        designation: "Treasurer",
        image: "/images/team/md_nazare_alam.webp",
        bio: "Electronics engineer focused on IoT and sustainable technology solutions for social impact.",
        linkedIn: "https://linkedin.com/in/tanvireddy"
      },
    ],
    pastEvents: [
      {
        id: "stem-girls",
        title: "Girls in STEM Workshop",
        description: "Interactive workshop for high school girls introducing engineering concepts through hands-on projects and mentoring.",
        image: "/images/chapters/IEEE_WIE-social_logo.webp",
        date: "2025-01-08",
        time: "10:00 AM - 3:00 PM",
        participants: 70
      },
      {
        id: "women-tech-talk",
        title: "Women Leaders in Tech Panel",
        description: "Panel discussion featuring successful women engineers and entrepreneurs sharing their career journeys and insights.",
        image: "/images/chapters/IEEE_WIE-social_logo.webp",
        date: "2024-12-15",
        time: "3:00 PM - 5:00 PM",
        participants: 90
      }
    ],
    metadata: {
      title: "Women in Engineering | IEEE BVICAM",
      description: "Join IEEE BVICAM Women in Engineering to inspire, empower, and support women in technical fields."
    }
  }
];

export function getChapterBySlug(slug: string): ChapterDetail | undefined {
  return chapterDetails.find((chapter) => chapter.slug === slug);
}

export function getAllChapterSlugs(): string[] {
  return chapterDetails.map((chapter) => chapter.slug);
}