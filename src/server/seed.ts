import mongoose from 'mongoose';
import Skill from './models/Skill';
import dotenv from 'dotenv';

dotenv.config();

const updatedSkills = [
  // Core Languages & Frameworks
  { name: 'JavaScript', category: 'Frontend', proficiency: 95 },
  { name: 'TypeScript', category: 'Frontend', proficiency: 90 },
  { name: 'HTML5', category: 'Frontend', proficiency: 95 },
  { name: 'CSS3', category: 'Frontend', proficiency: 92 },
  
  // Frontend Libraries
  { name: 'React', category: 'Frontend', proficiency: 92 },
  { name: 'Next.js', category: 'Frontend', proficiency: 90 },
  { name: 'TailwindCSS', category: 'Frontend', proficiency: 95 },
  { name: 'Bootstrap', category: 'Frontend', proficiency: 88 },
  
  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 88 },
  { name: 'Express.js', category: 'Backend', proficiency: 85 },
  { name: 'PHP', category: 'Backend', proficiency: 80 },
  
  // Databases
  { name: 'MongoDB', category: 'Database', proficiency: 90 },
  
  // DevOps & Tools
  { name: 'Docker', category: 'DevOps', proficiency: 85 },
  { name: 'AWS', category: 'DevOps', proficiency: 78 },
  { name: 'Git', category: 'Tools', proficiency: 92 },
  { name: 'Postman', category: 'Tools', proficiency: 88 },
  
  // Platforms & Services
  { name: 'Render', category: 'Platforms', proficiency: 85 },
  { name: 'Resend (Email)', category: 'Platforms', proficiency: 80 },
  
  // Architecture
  { name: 'SaaS Development', category: 'Architecture', proficiency: 82 },
];

async function seedSkills() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    // 🔥 Clear ONLY the skills collection (Projects stay safe)
    await Skill.deleteMany({});
    console.log('🧹 Cleared existing skills');

    await Skill.insertMany(updatedSkills);
    console.log(`✅ Seeded ${updatedSkills.length} skills successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seedSkills();