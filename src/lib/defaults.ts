export const DEFAULT_PROJECTS = [
  {
    _id: 'default-0',
    title: "Jay's Food Court",
    description:
      'Full-stack restaurant ordering and operations platform supporting mobile-first customer ordering, guest checkout, customisation, kitchen queue management, rider delivery workflows, and real-time order lifecycle tracking.',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://jays-food-court.vercel.app',
    repoUrl: 'https://github.com/456-bytes',
    deployedAt: new Date().toISOString(),
  },
  {
    _id: 'default-1',
    title: 'Global Citizen Immigration Platform',
    description:
      'Interactive immigration information and guidance platform featuring a 3D WebGL globe and an AI-powered conversational assistant engineered around 50+ structured immigration topics and pathways.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Three.js', 'AI Assistant', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://global-immigration-platform.vercel.app/',
    repoUrl: 'https://github.com/456-bytes',
    deployedAt: new Date().toISOString(),
  },
  {
    _id: 'default-2',
    title: 'Lone Star Autos',
    description:
      'Full-stack automotive dealership platform featuring vehicle inventory management, real-time customer communication, administrative analytics dashboard, secure authentication, and cloud media optimisation.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Cloudinary', 'JWT'],
    liveUrl: 'https://praise-dev-pi.vercel.app/#projects',
    repoUrl: 'https://github.com/456-bytes',
    deployedAt: new Date().toISOString(),
  },
  {
    _id: 'default-3',
    title: 'ORC Investment Platform',
    description:
      'Full-stack investment programme management platform with duration-based ROI tracking, automated serverless cron processing, transactional email notifications, and comprehensive administrative CRUD oversight.',
    techStack: [
      'Node.js',
      'Vanilla JavaScript',
      'Neon PostgreSQL (pg)',
      'Tailwind CSS',
      'Resend / Nodemailer',
      'Vercel Serverless & Cron',
    ],
    liveUrl: 'https://praise-dev-pi.vercel.app/#projects',
    repoUrl: 'https://github.com/456-bytes',
    deployedAt: new Date().toISOString(),
  },
];

export const DEFAULT_SKILLS = [
  { _id: '1', name: 'JavaScript (ES6+)', category: 'Languages', proficiency: 95 },
  { _id: '2', name: 'TypeScript', category: 'Languages', proficiency: 90 },
  { _id: '3', name: 'Node.js', category: 'Backend', proficiency: 92 },
  { _id: '4', name: 'Express.js', category: 'Backend', proficiency: 90 },
  { _id: '5', name: 'RESTful APIs', category: 'Backend', proficiency: 95 },
  { _id: '6', name: 'React', category: 'Frontend', proficiency: 92 },
  { _id: '7', name: 'Next.js', category: 'Frontend', proficiency: 90 },
  { _id: '8', name: 'Tailwind CSS', category: 'Frontend', proficiency: 95 },
  { _id: '9', name: 'PostgreSQL (Neon / Supabase)', category: 'Database', proficiency: 90 },
  { _id: '10', name: 'MongoDB', category: 'Database', proficiency: 92 },
  { _id: '11', name: 'MySQL', category: 'Database', proficiency: 85 },
  { _id: '12', name: 'Socket.IO & WebSockets', category: 'Backend', proficiency: 88 },
  { _id: '13', name: 'JWT & OAuth Auth', category: 'Security', proficiency: 92 },
  { _id: '14', name: 'Docker', category: 'DevOps', proficiency: 86 },
  { _id: '15', name: 'Vercel (Serverless & Cron)', category: 'Platforms', proficiency: 92 },
  { _id: '16', name: 'Git & GitHub (CI/CD)', category: 'Tools', proficiency: 92 },
];
