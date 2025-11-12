import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// All Technical Clubs Data
const technicalClubs = [
  { 
    id: 1, 
    name: "Coding Ninjas", 
    img: "cn.jpg", 
    desc: "Sharpen coding skills with contests, projects, and mentorship.",
    insta: "https://www.instagram.com/codingninjas_cuiet?igsh=MWVrbGxrOWxwc2Frag==",
    linkedin: "https://www.linkedin.com/company/codingninjas-cuiet/",
    link: "CodingNinjas.html"
  },
  { 
    id: 2, 
    name: "IEEE", 
    img: "ieee.webp", 
    desc: "Innovate with technology, research, and professional networking.",
    insta: "https://www.instagram.com/ieeeciet?igsh=MWxqMmJtcDU4em9zcw==",
    linkedin: "https://www.linkedin.com/company/ieee-ciet-student-branch/",
    link: "IEEE.html"
  },
  { 
    id: 3, 
    name: "GFG Student Chapter", 
    img: "gfg.jpeg", 
    desc: "Dive into open source contributions and problem solving.",
    insta: "https://www.instagram.com/gfg_cuiet?igsh=bnptdWtsZTRlcWFq",
    linkedin: "#",
    link: "GFG.html"
  },
  { 
    id: 4, 
    name: "ACM", 
    img: "acm.jpg", 
    desc: "Advance computing with workshops, papers, and events.",
    insta: "https://www.instagram.com/acm_cuiet?igsh=MW50Zzc1ZWd0bHJxYQ==",
    linkedin: "https://www.linkedin.com/company/chitkara-acm-student-chapter/",
    link: "ACM.html"
  },
  { 
    id: 5, 
    name: "Open Source Chandigarh", 
    img: "open.jpg", 
    desc: "Contribute to real-world projects and collaborate globally.",
    insta: "https://www.instagram.com/opensourcechandigarh?igsh=NHZldWJkbmVleTBs",
    linkedin: "https://www.linkedin.com/company/open-source-chandigarh/",
    link: "OpenSource.html"
  },
  { 
    id: 6, 
    name: "Bit N Bytes", 
    img: "bits.webp", 
    desc: "Explore coding, gaming, and fun digital competitions.",
    insta: "https://www.instagram.com/bits_nbytes?igsh=aWtwNWZscW5kZmsy",
    linkedin: "https://www.linkedin.com/company/bits-n-bytes-chitkara/",
    link: "BitsNBytes.html"
  },
  { 
    id: 7, 
    name: "GDSC", 
    img: "google.jpg", 
    desc: "Learn and build using Google technologies with peers.",
    insta: "#",
    linkedin: "#",
    link: "GDSC.html"
  },
  { 
    id: 8, 
    name: "Coding Blocks", 
    img: "codingblocks.jpeg", 
    desc: "Master programming with bootcamps, courses, and events.",
    insta: "https://www.instagram.com/codingblocks_cuiet?igsh=MXZtNDR6YmV5dnJrdg==",
    linkedin: "https://www.linkedin.com/company/coding-blocks-cuiet-chapter/",
    link: "CodingBlocks.html"
  }
];



const nonTechnicalClubs = [
  {
    id: 1,
    name: "Literayllis",
    img: "literayllis.jpeg",
    desc: "The official literary society that celebrates poetry, debate, and storytelling.",
    insta: "https://www.instagram.com/c2s2_literayllis?igsh=N3ZlcTNhOGF3d3Yz",
    link: "Literayllis.html"
  },
  {
    id: 2,
    name: "Dhwani",
    img: "dhwani.jpeg",
    desc: "The music club that unites singers and instrumentalists to create soulful melodies.",
    insta: "https://www.instagram.com/c2s2__dhwani?igsh=MXFhNmoxaXV6N2k1YQ==",
    link: "Dhwani.html"
  },
  {
    id: 3,
    name: "Nati",
    img: "nati.jpg",
    desc: "The dramatics club, showcasing stage plays, skits, and street theatre performances.",
    insta: "https://www.instagram.com/c2s2_nati_?igsh=MXNneGVsOGtyY2VyeQ==",
    link: "Nati.html"
  },
  {
    id: 4,
    name: "Custody",
    img: "custody.jpeg",
    desc: "The dance club, where passion meets rhythm and creativity takes the stage.",
    insta: "https://www.instagram.com/c2s2_custody?igsh=aWNsMnJ5aDN4cXhh",
    link: "Custody.html"
  },
  {
    id: 5,
    name: "The Bhangra Regiment",
    img: "bhangra.jpeg",
    desc: "A high-energy bhangra crew spreading Punjabi culture through dance and enthusiasm.",
    insta: "https://www.instagram.com/c2s2_thebhangraregiment?igsh=bXZudDZxNTk0ZWti",
    link: "BhangraRegiment.html"
  },
  {
    id: 6,
    name: "Reflection",
    img: "reflection.jpeg",
    desc: "The photography and cinematography club capturing creativity through the lens.",
    insta: "https://www.instagram.com/c2s2_reflection?igsh=MXQxdnlmamU1cDQxcQ==",
    link: "Reflection.html"
  },
  {
    id: 7,
    name: "Lethal Giddha Squad",
    img: "giddha.jpeg",
    desc: "A dynamic all-girls team reviving traditional Punjabi giddha with a modern touch.",
    insta: "https://www.instagram.com/c2s2_lethal_giddha_squad?igsh=ODZkMGx3bzNhbXdo",
    link: "Giddha.html"
  },
  {
    id: 8,
    name: "Natraj",
    img: "natraj.jpeg",
    desc: "The classical dance club dedicated to Bharatanatyam, Kathak, and Odissi traditions.",
    insta: "https://www.instagram.com/c2s2_natraj?igsh=MWl6em1mczYwdnM4aQ==",
    link: "Natraj.html"
  }
];


// API Endpoint
app.get("/api/technical-clubs", (req, res) => {
  res.json(technicalClubs);
});
app.get("/api/nontechnical-clubs", (req, res) => {
  res.json(nonTechnicalClubs);
});

// Start Server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
