import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// 1. Initialize Sequelize Connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// 2. Re-define Models (Must match server.js definition exactly)
const TechnicalClub = sequelize.define("TechnicalClub", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
    desc: { type: DataTypes.TEXT },
    insta: { type: DataTypes.STRING },
    linkedin: { type: DataTypes.STRING },
    link: { type: DataTypes.STRING },
  });
  
  const NonTechnicalClub = sequelize.define("NonTechnicalClub", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
    desc: { type: DataTypes.TEXT },
    insta: { type: DataTypes.STRING },
    linkedin: { type: DataTypes.STRING },
    link: { type: DataTypes.STRING },
  });

// 3. Data to Seed (Same as your original)
const technicalClubs = [
    { name: "Coding Ninjas", img: "cn.jpg", desc: "Sharpen coding skills with contests, projects, and mentorship.", insta: "https://www.instagram.com/codingninjas_cuiet?igsh=MWVrbGxrOWxwc2Frag==", linkedin: "https://www.linkedin.com/company/codingninjas-cuiet/", link: "CodingNinjas.html" },
    { name: "IEEE", img: "ieee.webp", desc: "Innovate with technology, research, and professional networking.", insta: "https://www.instagram.com/ieeeciet?igsh=MWxqMmJtcDU4em9zcw==", linkedin: "https://www.linkedin.com/company/ieee-ciet-student-branch/", link: "IEEE.html" },
    { name: "GFG Student Chapter", img: "gfg.jpeg", desc: "Dive into open source contributions and problem solving.", insta: "https://www.instagram.com/gfg_cuiet?igsh=bnptdWtsZTRlcWFq", linkedin: "https://www.linkedin.com/company/gfg-cuiet/", link: "GFG.html" },
    { name: "ACM", img: "acm.jpg", desc: "Advance computing with workshops, papers, and events.", insta: "https://www.instagram.com/acm_cuiet?igsh=MW50Zzc1ZWd0bHJxYQ==", linkedin: "https://www.linkedin.com/company/chitkara-acm-student-chapter/", link: "ACM.html" },
    { name: "Open Source Chandigarh", img: "open.jpg", desc: "Contribute to real-world projects and collaborate globally.", insta: "https://www.instagram.com/opensourcechandigarh?igsh=NHZldWJkbmVleTBs", linkedin: "https://www.linkedin.com/company/open-source-chandigarh/", link: "OpenSource.html" },
    { name: "Bit N Bytes", img: "bits.webp", desc: "Explore coding, gaming, and fun digital competitions.", insta: "https://www.instagram.com/bits_nbytes?igsh=aWtwNWZscW5kZmsy", linkedin: "https://www.linkedin.com/company/bits-n-bytes-chitkara/", link: "BitsNBytes.html" },
    { name: "GDSC", img: "google.jpg", desc: "Learn and build using Google technologies with peers.", insta: "https://www.instagram.com/gdsc_chitkara/", linkedin: "https://www.linkedin.com/company/dsc-chitkara-university/", link: "GDSC.html" },
    { name: "Coding Blocks", img: "codingblocks.jpeg", desc: "Master programming with bootcamps, courses, and events.", insta: "https://www.instagram.com/codingblocks_cuiet?igsh=MXZtNDR6YmV5dnJrdg==", linkedin: "https://www.linkedin.com/company/coding-blocks-cuiet-chapter/", link: "CodingBlocks.html" }
];

const nonTechnicalClubs = [
    { name: "Literayllis", img: "literayllis.jpeg", desc: "The official literary society that celebrates poetry, debate, and storytelling.", insta: "https://www.instagram.com/c2s2_literayllis?igsh=N3ZlcTNhOGF3d3Yz", link: "Literayllis.html" },
    { name: "Dhwani", img: "dhwani.jpeg", desc: "The music club that unites singers and instrumentalists to create soulful melodies.", insta: "https://www.instagram.com/c2s2__dhwani?igsh=MXFhNmoxaXV6N2k1YQ==", link: "Dhwani.html" },
    { name: "Nati", img: "nati.jpg", desc: "The dramatics club, showcasing stage plays, skits, and street theatre performances.", insta: "https://www.instagram.com/c2s2_nati_?igsh=MXNneGVsOGtyY2VyeQ==", link: "Nati.html" },
    { name: "Custody", img: "custody.jpeg", desc: "The dance club, where passion meets rhythm and creativity takes the stage.", insta: "https://www.instagram.com/c2s2_custody?igsh=aWNsMnJ5aDN4cXhh", link: "Custody.html" },
    { name: "The Bhangra Regiment", img: "bhangra.jpeg", desc: "A high-energy bhangra crew spreading Punjabi culture through dance and enthusiasm.", insta: "https://www.instagram.com/c2s2_thebhangraregiment?igsh=bXZudDZxNTk0ZWti", link: "BhangraRegiment.html" },
    { name: "Reflection", img: "reflection.jpeg", desc: "The photography and cinematography club capturing creativity through the lens.", insta: "https://www.instagram.com/c2s2_reflection?igsh=MXQxdnlmamU1cDQxcQ==", link: "Reflection.html" },
    { name: "Lethal Giddha Squad", img: "giddha.jpeg", desc: "A dynamic all-girls team reviving traditional Punjabi giddha with a modern touch.", insta: "https://www.instagram.com/c2s2_lethal_giddha_squad?igsh=ODZkMGx3bzNhbXdo", link: "Giddha.html" },
    { name: "Natraj", img: "natraj.jpeg", desc: "The classical dance club dedicated to Bharatanatyam, Kathak, and Odissi traditions.", insta: "https://www.instagram.com/c2s2_natraj?igsh=MWl6em1mczYwdnM4aQ==", link: "Natraj.html" }
];

// 4. Seeding Function
const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected for seeding...");

    // Sync schema (force: true drops tables if they exist to give a clean slate)
    await sequelize.sync({ force: true });
    console.log("Tables created/recreated.");

    // Insert Data
    await TechnicalClub.bulkCreate(technicalClubs);
    await NonTechnicalClub.bulkCreate(nonTechnicalClubs);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await sequelize.close();
    console.log("MySQL connection closed.");
  }
};

seedDatabase();