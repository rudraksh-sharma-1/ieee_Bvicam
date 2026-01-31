// Team hierarchy data structure

export type MemberRole = "chairperson" | "vice-chair" | "secretary" | "treasurer" | "webmaster";
export type SocietyRole = "chairperson" | "vice-chair" | "coordinator" | "secretary" | "treasurer";

export interface CoreMember {
  id: string;
  name: string;
  role: MemberRole;
  image: string;
  linkedIn?: string;
  email?: string;
}

export interface SocietyMember {
  id: string;
  name: string;
  role: SocietyRole;
  image: string;
  linkedIn?: string;
}

export interface Society {
  id: string;
  name: string;
  abbreviation: string;
  members: SocietyMember[];
}

export interface ExecomMember {
  id: string;
  name: string;
  image: string;
}

export interface TeamData {
  coreLeadership: CoreMember[];
  societies: Society[];
  execom: ExecomMember[];
}

// Actual team data
export const teamData: TeamData = {
  // TIER 1: Core Leadership - Primary focus, largest cards
  coreLeadership: [
    {
      id: "chair-1",
      name: "Nischay Virmani",
      role: "chairperson",
      image: "/images/team/nishchay_virmani.webp",
      linkedIn: "https://www.linkedin.com/in/nishchay-virmani-136836220/",
      email: "rajesh@ieee-bvicam.org"
    },
    {
      id: "vice-chair-1",
      name: "Saheba kaur kappor",
      role: "vice-chair",
      image: "/images/team/saheba_kaur_kapoor.webp",
      linkedIn: "https://www.linkedin.com/in/saheba-kaur-kapoor-6172a51b7/",
    },
    {
      id: "secretary-1",
      name: "Sheetal Sharma",
      role: "secretary",
      image: "/images/team/sheetal_sharma.webp",
      linkedIn: "https://www.linkedin.com/in/sheetal-sharma-s20/",
    },
    {
      id: "treasurer-1",
      name: "Priyanshu Naithani",
      role: "treasurer",
      image: "/images/team/priyanshu_naithani.webp",
      linkedIn: "https://www.linkedin.com/in/priyanshu-naithani-352599262/",
    },
  ],

  // TIER 2: Society Teams - Department-level organization
  societies: [
    {
      id: "smc",
      name: "SYSTEM, MAN and CYBERNETICS SOCIETY CHAPTER",
      abbreviation: "SMC",
      members: [
        {
          id: "smc-chair",
          name: "Vaibhav Pathak",
          role: "chairperson",
          image: "/images/team/vaibhav_pathak.webp",
        },
        {
          id: "smc-vice",
          name: "Rohan Swami",
          role: "vice-chair",
          image: "/images/team/rohan_swami.webp",
          linkedIn: "https://www.linkedin.com/in/rohan-swami-0a50a0330/",
        },
        {
          id: "smc-secretary",
          name: "Nimisha Jindal",
          role: "secretary",
          image: "/images/team/nimisha_jindal.webp",
          linkedIn: "https://www.linkedin.com/in/nimisha-j-74b169279/",
        },
        {
          id: "smc-treasurer",
          name: "Rahul Sardana",
          role: "treasurer",
          image: "/images/team/Rahul_sardana.webp",
         /*  linkedIn: "https://www.linkedin.com/in/priyanshu-naithani-352599262/", */
        }
      ]
    },
    {
      id: "wie",
      name: "WOMEN IN ENGINEERING AFFINITY GROUP",
      abbreviation: "WIE",
      members: [
        {
          id: "wie-chair",
          name: "Shruti Dhingra",
          role: "chairperson",
          image: "/images/team/Shruti_dhingra.webp",
          linkedIn: "https://www.linkedin.com/in/shruti-dhingra/",
        },
        {
          id: "wie-vice",
          name: "Nishant Malhotra",
          role: "vice-chair",
          image: "/images/team/nishant_malhotra.webp",
          linkedIn: "https://www.linkedin.com/in/nishant-malhotra-3204552a0/",
        },
        {
          id: "wie-secretary",
          name: "Kajal Mishra Md",
          role: "secretary",
          image: "/images/team/Kajal_Mishra.webp",
          linkedIn: "https://www.linkedin.com/in/kajal-mishra-06924430a/",
        },
        {
          id: "wie-treasurer",
          name: "Nazare Alam",
          role: "treasurer",
          image: "/images/team/md_nazare_alam.webp",
          linkedIn: "https://www.linkedin.com/in/imnazarealam/",
        }
      ]
    },
    {
      id: "cs",
      name: "Computer Society",
      abbreviation: "CS",
      members: [
        {
          id: "cs-chair",
          name: "Manas Kumar Sharma",
          role: "chairperson",
          image: "/images/team/manas_kumar_sharma.jpg",
          linkedIn: "https://www.linkedin.com/in/manas-kumar-sharma-52300017b/",
        },
        {
          id: "cs-vice",
          name: "Nikshay singh",
          role: "vice-chair",
          image: "/images/team/nikshay_singh.jpg",
          linkedIn: "https://www.linkedin.com/in/nikshay-singh-b4425522a/",
        },
        {
          id: "cs-secretary",
          name: "Khushi Talwar",
          role: "secretary",
          image: "/images/team/khushi_talwar.jpg",
          linkedIn: "https://www.linkedin.com/in/khushi-talwar-4727b6274/",
        },
        {
          id: "cs-treasurer",
          name: "Harkirat Singh",
          role: "treasurer",
          image: "/images/team/harkirat_singh.jpeg",
          /* linkedIn: "https://www.linkedin.com/in/priyanshu-naithani-352599262/", */
        }
      ]
    },
    {
      id: "aps",
      name: "ANTENNUS and PROPAGATION SOCIETY CHAPTER",
      abbreviation: "AP-S",
      members: [
        {
          id: "aps-chair",
          name: "Mankirat",
          role: "chairperson",
          image: "/images/team/mankirat_singh.jpg",
          linkedIn: "https://www.linkedin.com/in/mankirat-singh-217a3a290/",
        },
        {
          id: "aps-vice",
          name: "Laksya Gupta",
          role: "vice-chair",
          image: "/images/team/Lakshya_gupta.jpg",
          /* linkedIn: "https://www.linkedin.com/in/priyanshu-naithani-352599262/", */
        },
        {
          id: "aps-secretary",
          name: "Diya Aggarwal",
          role: "secretary",
          image: "/images/team/diya_aggarwal.jpg",
          /* linkedIn: "https://www.linkedin.com/in/priyanshu-naithani-352599262/", */
        },
        {
          id: "aps-treasurer",
          name: "Arpita",
          role: "treasurer",
          image: "/images/team/Arpita.jpeg",
          linkedIn: "https://www.linkedin.com/in/arpita-500a7a2b0/",
        }
      ]
    }
  ],

  // TIER 3: Execom - Supporting team, smaller presence
  execom: [
    {
      id: "execom-1",
      name: "Rudraksh Sharma",
      image: "/images/team/Rudraksh.png"
    },
    {
      id: "execom-2",
      name: "Ankit Kumar",
      image: "/images/team/Ankit_kumar.jpg"
    },
    {
      id: "execom-3",
      name: "Mayan Wadhawan",
      image: "/images/team/mayan_wadhawan.JPG"
    },
    {
      id: "execom-4",
      name: "Piyush Goel",
      image: "/images/team/piyush_goyal.jpg"
    },
    {
      id: "execom-5",
      name: "Yugansh Gupta",
      image: "/images/team/Yugansh_gupta.jpg"
    },
    {
      id: "execom-6",
      name: "Harsh",
      image: "/images/team/harsh.jpg"
    },
    {
      id: "execom-7",
      name: "Arul Sarabhai",
      image: "/images/team/arul_sarabhai.jpg"
    },
    {
      id: "execom-8",
      name: "Aman Kumar",
      image: "/images/team/Aman_kumar.jpg"
    },
    {
      id: "execom-9",
      name: "Harsh Rai",
      image: "/images/team/harsh_rai.jpg"
    },
    {
      id: "execom-10",
      name: "Nityam Kumar Tiwari",
      image: "/images/team/Nityam_kumar_tiwari.jpg"
    },
  ]
};

// Helper function to format role display names
export function formatRole(role: MemberRole | SocietyRole): string {
  const roleMap: Record<string, string> = {
    "chairperson": "Chairperson",
    "vice-chair": "Vice Chairperson",
    "secretary": "Secretary",
    "treasurer": "Treasurer",
    "webmaster": "Webmaster",
    "chair": "Chair",
    "coordinator": "Coordinator"
  };
  return roleMap[role] || role;
}
