export interface ChapterMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio: string;
  linkedIn?: string;
}

export interface GradeData {
  grade: string;
  count: number;
  male?: number;
  female?: number;
  unknown?: number;
}

export interface GenderData {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

export interface TechFocusData {
  area: string;
  count: number;
}

export interface IEEEAnalytics {
  sectionName: string;
  totalMembers: number;
  gradeDistribution: GradeData[];
  genderDistribution: GenderData[];
  technologyFocus: TechFocusData[];
  gradeGenderBreakdown: GradeData[];
}

export interface ChapterStat {
  id: string;
  label: string;
  value: number;
  unit?: string;
  description: string;
  icon?: string;
}

export interface SpeakerInfo {
  name: string;
  designation?: string;
  organization?: string;
  photo?: string;
  bio?: string;
}

export interface ScheduleItem {
  time: string;
  activity: string;
  description?: string;
}

export interface PastEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[]; // Multiple event photos
  date: string;
  time: string;
  mode?: 'online' | 'offline' | 'hybrid';
  venue?: string;
  participants?: number;
  agenda?: string;
  schedule?: ScheduleItem[];
  speakers?: SpeakerInfo[];
}

export interface ChapterDetail {
  slug: string;
  name: string;
  logo: string;
  description: string;
  longDescription: string;
  stats: ChapterStat[];
  ieeeAnalytics?: {
    delhiSection: IEEEAnalytics;
    studentBranch: IEEEAnalytics;
  };
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
    ieeeAnalytics: {
      delhiSection: {
        sectionName: "Delhi Section Computer Society Chapter",
        totalMembers: 1454,
        gradeDistribution: [
          { grade: 'Student Member', count: 926 },
          { grade: 'Graduate Student', count: 248 },
          { grade: 'Member', count: 203 },
          { grade: 'Senior Member', count: 62 },
          { grade: 'Associate Member', count: 7 },
          { grade: 'Fellow', count: 3 },
          { grade: 'Life Senior', count: 4 },
          /* { grade: 'Affiliate', count: 1 }, */
        ],
        genderDistribution: [
          { label: 'Male', value: 831, percentage: 57.15, color: '#52525b' },
          { label: 'Female', value: 339, percentage: 23.31, color: '#fb923c' },
          { label: 'Unknown', value: 284, percentage: 19.53, color: '#94a3b8' },
        ],
        technologyFocus: [
          { area: 'Computing and Processing (Hardware/Software)', count: 600 },
          { area: 'Engineering Profession', count: 300 },
          { area: 'Other', count: 250 },
          { area: 'Components, Circuits, Devices and Systems', count: 150 },
          { area: 'Communication, Networking and Broadcasting', count: 100 },
          { area: 'General Topics for Engineers (Math, Science...)', count: 80 },
          { area: 'Robotics and Control Systems', count: 50 },
          { area: 'Power, Energy and Industry Applications', count: 40 },
        ],
        gradeGenderBreakdown: [
          { grade: 'Student Member', count: 926, male: 500, female: 200, unknown: 226 },
          { grade: 'Graduate Student Member', count: 248, male: 100, female: 50, unknown: 98 },
          { grade: 'Member', count: 203, male: 130, female: 50, unknown: 23 },
          { grade: 'Senior Member', count: 62, male: 40, female: 10, unknown: 12 },
        ],
      },
      studentBranch: {
        sectionName: "IEEE SB Computer Society Chapter",
        totalMembers: 195,
        gradeDistribution: [
          { grade: 'Graduate Student Member', count: 195 },
        ],
        genderDistribution: [
          { label: 'Male', value: 55, percentage: 28.21, color: '#52525b' },
          { label: 'Female', value: 24, percentage: 12.31, color: '#fb923c' },
          { label: 'Unknown', value: 116, percentage: 59.49, color: '#94a3b8' },
        ],
        technologyFocus: [
          { area: 'Computing and Processing (Hardware/Software)', count: 120 },
          { area: 'Components, Circuits, Devices and Systems', count: 50 },
          { area: 'Communication, Networking and Broadcasting', count: 30 },
          { area: 'Engineering Profession', count: 25 },
          { area: 'Aerospace', count: 15 },
          { area: 'Bioengineering', count: 10 },
        ],
        gradeGenderBreakdown: [
          { grade: 'Graduate Student Member', count: 195, male: 55, female: 24, unknown: 116 },
        ],
      },
    },
    team: [
      {
        id: "cs-chair",
        name: "Manas Kumar Sharma",
        designation: "Chapter Chair",
        image: "/images/team/manas_kumar_sharma.jpg",
        bio: "A motivated and dedicated individual with a strong passion for learning and personal growth. Always eager to take on new challenges and continuously improve skills. Strong belief in teamwork, discipline, and responsibility in both academic and professional settings. Positive attitude and determination help in adapting effectively to different situations. Aiming to contribute meaningfully to every opportunity that comes along.",
        linkedIn: "https://www.linkedin.com/in/manas-kumar-sharma-52300017b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
      },
      {
        id: "cs-vice",
        name: "Nikshay Singh",
        designation: "Vice Chair",
        image: "/images/team/nikshay_singh.jpg",
        bio: "Nikshay serves as the Vice Chair of the Computer Society Chapter of IEEE, where he promotes teamwork and ensures strong collaboration among members. He actively supports the organization of technical events, workshops, and seminars to enhance learning and innovation. Through his leadership, he helps create a productive and inclusive environment within the chapter.",
        linkedIn: "https://www.linkedin.com/in/nikshay-singh-b4425522a"
      },
      {
        id: "cs-sec",
        name: "Khushi Talwar",
        designation: "Secretary",
        image: "/images/team/khushi_talwar.jpg",
        bio: "Khushi Talwar, Secretary of the IEEE Computer Society Chapter, is a disciplined and proactive individual with a strong focus on growth, leadership, and meaningful contribution. She takes pride in managing communication, documentation, and coordination with clarity and responsibility. She enjoys working in collaborative environments where ideas are shared and executed with purpose. Known for her calm approach, reliability, and attention to detail, she adapts easily to new challenges. She aims to contribute positively to initiatives that promote learning, innovation, and collective progress.",
        linkedIn: "https://www.linkedin.com/in/khushi-talwar-4727b6274/"
      },
      {
        id: "cs-tres",
        name: "Harkirat Singh",
        designation: "Treasurer",
        image: "/images/team/harkirat_singh.jpeg",
        bio: "Harkirat Singh, I am currently the Treasurer of the Computer Society. I manage the budgeting for our activities and events. I am responsible, organized, and detail-oriented, and I enjoy working in a team while continuously improving my skills.",
        linkedIn: "http://www.linkedin.com/in/harkirat-singh-4327223a9"
      },
    ],
    pastEvents: [
      {
        id: "hackathon-24",
        title: "CodeFest 2024 - National Hackathon",
        description: "A 24-hour coding marathon where teams of developers collaborate to build innovative solutions addressing real-world problems. Participants received mentorship from industry professionals and competed for prizes worth ₹2 lakhs.",
        image: "/images/events/codefest-main.webp",
        gallery: [
          "/images/meetings/temp-1.jpg",
          "/images/meetings/temp-2.jpg",
          "/images/meetings/temp-3.jpg",
          "/images/meetings/temp-4.jpg",
        ],
        date: "2024-11-25",
        time: "9:00 AM (Day 1) - 9:00 AM (Day 2)",
        mode: "hybrid",
        venue: "BVICAM Campus & Online Platform",
        participants: 100,
        agenda: "To foster innovation and problem-solving skills among students by providing a platform to develop creative tech solutions. Focus areas included Healthcare Tech, FinTech, EdTech, and Sustainability.",
        schedule: [
          {
            time: "9:00 AM - 10:00 AM",
            activity: "Opening Ceremony",
            description: "Team registration, problem statement reveal, and rules briefing"
          },
          {
            time: "10:00 AM - 12:00 PM",
            activity: "Ideation & Planning Phase",
            description: "Teams brainstorm and finalize their approach"
          },
          {
            time: "12:00 PM - 8:00 PM",
            activity: "Development Sprint 1",
            description: "Initial development and prototyping"
          },
          {
            time: "8:00 PM - 9:00 PM",
            activity: "Dinner & Mentor Rounds",
          },
          {
            time: "9:00 PM - 2:00 AM",
            activity: "Development Sprint 2",
            description: "Core feature implementation"
          },
          {
            time: "2:00 AM - 6:00 AM",
            activity: "Late Night Coding",
            description: "Bug fixes and final touches"
          },
          {
            time: "6:00 AM - 9:00 AM",
            activity: "Final Presentations",
            description: "Teams present their solutions to judges"
          },
        ],
        speakers: [
          {
            name: "Amit Verma",
            designation: "CTO",
            organization: "TechStartup Inc.",
            photo: "/images/team/user_template.png",
            bio: "Serial entrepreneur and tech leader with successful exits in the startup ecosystem."
          },
        ],
      },
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
        bio: "Vaibhav Pathak serves as the Chair of the IEEE Systems, Man, and Cybernetics (SMC) society at BVICAM, New Delhi. He leads the chapter in advancing systems engineering and cybernetics. Vaibhav is dedicated to fostering technical excellence and professional growth, helping members with opportunities for research, networking, and innovative real-world applications.",
        linkedIn: "https://www.linkedin.com/in/vaibhav-pathak2003?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      },
      {
        id: "smc-vice",
        name: "Rohan Swami",
        designation: "Vice Chair",
        image: "/images/team/rohan_swami.webp",
        bio: "Rohan Swami serves as the Vice Chair of the IEEE Systems, Man, and Cybernetics (SMC) chapter. He is dedicated to fostering a collaborative and inclusive environment that encourages innovation and leadership. The chapter focuses on systems science and engineering, human–machine systems, cybernetics, and their real-world applications through research, technical activities, networking, and professional development opportunities.",
        linkedIn: "http://www.linkedin.com/in/rohan-swami-0a50a0330"
      },
      {
        id: "smc-sec",
        name: "Nimisha Jindal",
        designation: "Secretary",
        image: "/images/team/nimisha_jindal.webp",
        bio: "Nimisha Jindal serves as the Secretary of the IEEE Systems, Man, and Cybernetics Society (SMC). She is responsible for managing records, coordinating official communications, and ensuring accurate documentation. Her structured approach and reliability support efficient coordination and contribute to the smooth functioning of the organization.",
        linkedIn: "https://www.linkedin.com/in/nimisha-j-74b169279?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
      },
      {
        id: "smc-tres",
        name: "Rahul Sardana",
        designation: "Treasurer",
        image: "/images/team/Rahul-s.jpg",
        bio: "Rahul Sardana serves as the Treasurer of the IEEE Systems, Man, and Cybernetics Society (SMC). He is responsible for overseeing financial planning, budget management, and expense tracking. His analytical approach and attention to financial discipline ensure transparency, accountability, and effective utilization of resources within the organization.",
        linkedIn: "https://www.linkedin.com/in/rahul-sardana-20873b3a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
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
        image: "/images/team/Mankirat singh - chair.jpg",
        bio: "I am a passionate tech enthusiast with a deep curiosity for emerging technologies and innovative solutions. I enjoy exploring new strategies and ideas that have the potential to positively impact the tech world. Continuously learning and experimenting, I strive to stay ahead in the fast-evolving technology landscape. I am committed to applying my knowledge and skills to contribute meaningfully to society. Being part of projects that drive change and innovation gives me immense satisfaction and motivation",
        linkedIn: "https://www.linkedin.com/in/mankirat-singh-217a3a290?utm_source=share_via&utm_content=profile&utm_medium=member_android"
      },
      {
        id: "aps-vice",
        name: "Laksya Gupta",
        designation: "Vice Chair",
        image: "/images/team/Lakshya_gupta.jpg",
        bio: "I work with the team to organize events, workshops, and technical activities. I’m excited about antennas, wireless systems, and innovation in communication. My goal is to boost participation and create valuable learning experiences.",
        linkedIn: "https://www.linkedin.com/in/lakshya-gupta-6b47022a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
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
        image: "/images/team/arpitaa.jpeg",
        bio: "I am Arpita, Treasurer of the IEEE APS Society. I believe and focus on transparent fund management, clear communication, and strong teamwork to keep things running smoothly. I enjoy bringing structure behind the scenes because well-managed numbers make great ideas possible.",
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
        image: "/images/team/Shruti_Dhingra.jpg",
        bio: "I, Shruti Dhingra the Chairperson of the Women in Engineering (WIE) Society at my college student branch. I work towards empowering students, especially women, through technical, professional, and leadership initiatives. I focus on creating opportunities for skill development, innovation, and collaboration. I believe in building an inclusive community where ideas turn into impactful actions. My goal is to inspire more young women to grow and excel in engineering and emerging technologies.",
        linkedIn: "http://www.linkedin.com/in/shruti-dhingra"
      },
      {
        id: "wie-vice",
        name: "Nishant Malhotra",
        designation: "Vice Chair",
        image: "/images/team/nishant_malhotra.webp",
        bio: "Nishant serves as the Vice Chair of the IEEE Women in Engineering chapter. They are committed to cultivating a supportive and empowering environment. The chapter's core focus is on facilitating networking, mentorship, and professional development opportunities. Nishant is enthusiastic about inspiring future generations in STEM fields.",
        linkedIn: "https://www.linkedin.com/in/nishant-malhotra-3204552a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
      },
      {
        id: "wie-sec",
        name: "Kajal Mishra",
        designation: "Secretary",
        image: "/images/team/Kajal_Mishra.JPG",
        bio: "Kajal Mishra serves as the Secretary of the IEEE Women in Engineering (WIE) Affinity Group. With a strong sense of organization and responsibility, she oversees documentation, communication, and record management. Her disciplined and collaborative approach ensures seamless coordination and contributes to the group’s overall efficiency and success.",
        linkedIn: "https://www.linkedin.com/in/kajal-mishra-06924430a"
      },
      {
        id: "wie-tres",
        name: "Md Nazare Alam",
        designation: "Treasurer",
        image: "/images/team/Md Nazare Alam.jpeg",
        bio: "Nazare serves as the Treasurer of the IEEE Women in Engineering (WIE) Chapter, playing a key role in managing resources and supporting the chapter’s initiatives. They are deeply committed to fostering a supportive and empowering environment that encourages inclusion and growth.",
        linkedIn: "https://www.linkedin.com/in/imnazarealam/"
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