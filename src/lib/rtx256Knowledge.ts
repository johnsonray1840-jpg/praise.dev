/**
 * RTX256 — Public-Facing Portfolio Intelligence Engine for Praise Godswill.
 *
 * Scope & Guardrails:
 * - This is the LIMITED, PUBLIC-FACING PORTFOLIO VERSION of RTX256.
 * - It represents Praise Godswill professionally on https://praise-dev-pi.vercel.app/.
 * - It relies strictly on verified portfolio and CV facts and NEVER fabricates metrics,
 *   clients, certifications, or unverified claims.
 */

export interface ChatTurn {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const PRAISE_VERIFIED_PROFILE = {
  assistantName: 'RTX256',
  assistantEdition: 'Portfolio Public Edition',
  name: 'Praise Godswill',
  title: 'Full-Stack Software Engineer',
  philosophy: 'Thoughtfully engineered. Intentionally built.',
  headline:
    'Full-stack software engineer turning complex business logic into fast, secure web platforms—built end-to-end with Node.js, TypeScript, Next.js, and PostgreSQL.',
  about:
    'I design and build full-stack web applications and backend systems that handle real users, real payments, and complex workflows. With 4+ years of hands-on experience in Node.js, TypeScript, React, Next.js, and PostgreSQL, I’ve contributed to remote startup engineering teams like Lazerpay and architected complete multi-role platforms—from logistics marketplaces to fintech and administrative systems. I value clear communication, end-to-end ownership, and shipping clean, reliable code without unnecessary complexity.',
  location: 'Lekki Orchid, Lagos, Nigeria (Available for remote roles & collaborations worldwide)',
  contact: {
    email: 'praisegodswill23@gmail.com',
    phone: '+234 901 840 3385',
    portfolio: 'https://praise-dev-pi.vercel.app/',
    cvUrl: 'https://praise-dev-pi.vercel.app/cv',
    cvPdfUrl: 'https://praise-dev-pi.vercel.app/cv.pdf',
    github: 'https://github.com/456-bytes',
    linkedin: 'https://linkedin.com/in/praise-godswill-85ab38205',
    twitter: 'https://x.com/terry28347806',
  },
  education: {
    degree: 'Bachelor of Science (B.Sc.) in Accounting',
    university: 'Nnamdi Azikiwe University (UNIZIK)',
    period: '2021 – 2025',
    secondary: 'Anglican Comprehensive Secondary School, Kubwa, Abuja',
  },
  skills: {
    languages: ['JavaScript (ES6+)', 'TypeScript', 'SQL', 'HTML5', 'CSS3'],
    backend: [
      'Node.js',
      'Express.js',
      'RESTful API Design',
      'Socket.IO',
      'WebSockets',
      'Serverless & Cron Functions',
      'PHP',
    ],
    frontend: [
      'React',
      'Next.js (App Router & SSR)',
      'Tailwind CSS',
      'Three.js / WebGL',
      'EJS',
      'Responsive UI',
    ],
    databases: [
      'PostgreSQL (Neon, Supabase, node-postgres)',
      'MongoDB (Mongoose)',
      'MySQL',
      'Cloudinary',
    ],
    security: [
      'JWT Authentication',
      'OAuth',
      'Role-Based Access Control (RBAC)',
      'Session Management',
      'Rate Limiting',
    ],
    devops: [
      'Docker',
      'AWS',
      'Vercel',
      'Render',
      'Firebase',
      'CI/CD Workflows',
      'Git & GitHub',
      'Postman',
      'Resend / Nodemailer',
    ],
  },
  softSkills: [
    {
      name: 'Active Listening',
      detail: 'Translates ambiguous business requirements into clear technical specifications.',
    },
    {
      name: 'Cross-Functional Collaboration',
      detail: 'Works seamlessly across distributed remote engineering and product teams.',
    },
    {
      name: 'End-to-End Ownership',
      detail: 'Accountable from relational/document schema design through production deployment.',
    },
    {
      name: 'Clear Technical Communication',
      detail: 'Documents APIs, system state, and operational logic concisely.',
    },
    {
      name: 'Adaptability & Unlearning',
      detail: 'Quickly adopts modern frameworks and patterns as product needs evolve.',
    },
    {
      name: 'Continuous Learning',
      detail: 'Masters new technologies to solve real operational problems.',
    },
    {
      name: 'Proactive Problem-Solving',
      detail: 'Isolates root causes calmly under pressure and resolves bottlenecks systematically.',
    },
    {
      name: 'Growth Mindset',
      detail: 'Receptive to code reviews, pair debugging, and architectural feedback.',
    },
  ],
  engineeringApproach: [
    '1. Interface Layer: Shapes interfaces around product intent, visual hierarchy, accessibility, and responsive behavior across mobile and desktop.',
    '2. Core & Backend Layer: Designs reliable RESTful APIs, relational/document data models, strict RBAC permissions, and server-side validation behind the UI.',
    '3. Operations & Automation Layer: Builds event-driven workflows, cron jobs, and transactional notifications that reduce manual effort and make system state visible.',
    '4. Deployment & Infrastructure Layer: Uses Docker, Vercel, Render, and CI/CD pipelines designed for maintainability and sensible operating cost.',
    '5. Trust & Security Layer: Applies JWT/OAuth authentication, rate limiting, server-side pricing/input verification, and security-aware engineering.',
  ],
  experience: [
    {
      role: 'Backend Engineer',
      company: 'Confidential Technology Company (Remote – NDA)',
      period: 'May 2025 – March 2026',
      highlights: [
        'Designed and maintained scalable backend services and RESTful API endpoints supporting core application workflows in a distributed team.',
        'Implemented secure authentication and authorization layers using JWT and OAuth, enforcing strict RBAC and request validation across protected routes.',
        'Built third-party API integrations and asynchronous data handlers with graceful error recovery to ensure reliable service-to-service communication.',
        'Diagnosed and resolved production bottlenecks and database query defects across relational and document data layers.',
      ],
    },
    {
      role: 'Full-Stack Software Engineer',
      company: 'Independent / Freelance Engineering (Remote)',
      period: '2021 – Present',
      highlights: [
        'Partners with businesses and founders to architect, build, and deploy custom full-stack web platforms from initial concept to production.',
        'Engineers backend APIs with Node.js, Express, Next.js Route Handlers, PostgreSQL, and MongoDB to power complex CRUD and operational workflows.',
        'Builds secure multi-role admin dashboards, customer session management, and automated transactional email pipelines (Resend, Nodemailer).',
        'Develops responsive, accessible user interfaces in React, Next.js, TypeScript, and Tailwind CSS while managing cloud CI/CD deployments on Vercel and Render.',
      ],
    },
    {
      role: 'Backend Engineer',
      company: 'Lazerpay (Remote)',
      period: 'July 2022 – February 2023',
      highlights: [
        'Maintained and improved core backend services and API infrastructure, contributing to overall platform stability and uptime.',
        'Investigated and resolved production backend bugs in close collaboration with engineering teammates.',
        'Implemented JWT-based authentication workflows and contributed to backend API enhancements.',
        'Containerized backend services using Docker to standardize local development and deployment environments across the team.',
      ],
    },
  ],
  projects: [
    {
      slug: 'jays-food-court',
      title: "Jay's Food Court — Full-Stack Food Delivery & Logistics Marketplace",
      liveUrl: 'https://jays-food-court.vercel.app',
      stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
      summary:
        'A 4-sided online food ordering and delivery logistics marketplace featuring dedicated, role-based dashboards for Customers, Kitchen Staff, Delivery Riders, and Super Admins.',
      architecture:
        'Implements secure online payment checkout, server-side pricing validation, guest checkout, food customization, and real-time order lifecycle tracking across customer placement, kitchen prep queues, rider dispatch, and administrative oversight.',
    },
    {
      slug: 'global-citizen',
      title: 'Global Citizen Immigration Platform — Immigration, Eligibility & Crypto Wallet Platform',
      liveUrl: 'https://global-immigration-platform.vercel.app/',
      stack: ['Next.js', 'React', 'TypeScript', 'Three.js / WebGL', 'Tailwind CSS'],
      summary:
        'An interactive immigration, travel eligibility, and digital wallet platform combining 3D visualization with structured guidance.',
      architecture:
        'Features dedicated User and Admin dashboards with full administrative CRUD controls, an automated country travel eligibility checker, an AI immigration guidance assistant covering 50+ topics, an integrated user wallet module supporting cryptocurrency deposits, and an interactive 3D WebGL globe optimized across desktop and mobile.',
    },
    {
      slug: 'lone-star-autos',
      title: 'Lone Star Autos — Full-Stack Automotive Dealership Platform',
      liveUrl: 'https://praise-dev-pi.vercel.app/#projects',
      stack: ['Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Cloudinary', 'JWT'],
      summary:
        'A full-stack automotive dealership inventory and operations platform.',
      architecture:
        'Built with Node.js, Express, and MongoDB featuring RBAC admin dashboards, dealership analytics, automated Cloudinary multi-image optimization, and Socket.IO for real-time customer-dealer communication and live inventory updates.',
    },
    {
      slug: 'orc-investment',
      title: 'ORC Investment Platform — Investment Programme & Admin System',
      liveUrl: 'https://praise-dev-pi.vercel.app/#projects',
      stack: ['Node.js', 'JavaScript', 'Tailwind CSS', 'Neon PostgreSQL (pg)', 'Vercel Cron', 'Resend'],
      summary:
        'A full-stack investment programme and administrative management platform.',
      architecture:
        'Enables users to participate in defined-duration investment programmes while giving administrators full CRUD control over programmes and user accounts. Uses Neon PostgreSQL (pg) for relational persistence, scheduled Vercel serverless cron jobs for programme duration/ROI tracking, and Resend/Nodemailer for transactional email alerts.',
    },
  ],
};

export const RTX256_SYSTEM_PROMPT = `You are RTX256 (Public Portfolio Edition), an intelligent, articulate, context-aware AI engineering assistant embedded in the personal portfolio of Praise Godswill (https://praise-dev-pi.vercel.app/).

IMPORTANT IDENTITY & SCOPE BOUNDARIES:
1. You are a LIMITED, PUBLIC-FACING VERSION of RTX256 created solely to represent Praise Godswill professionally on his portfolio.
2. You are NOT the full internal RTX256 system developed for Radiance Tech Innovation (RTI). Never claim to have RTI's proprietary tools or internal company access.
3. Rely strictly on verified facts about Praise Godswill provided below. Never fabricate metrics, transaction volumes, user counts, clients, certifications, or employment claims. If something is confidential (such as his NDA role) or unverified, state that transparently and professionally.

WHO PRAISE GODSWILL IS:
- Name: Praise Godswill
- Title: Full-Stack Software Engineer (with strong backend engineering depth)
- Engineering Philosophy: "Thoughtfully engineered. Intentionally built."
- Location: Lekki Orchid, Lagos, Nigeria (Open to remote roles, freelance, contract, and full-time engineering positions worldwide)
- Contact: Email: praisegodswill23@gmail.com | Phone: +234 901 840 3385 | GitHub: https://github.com/456-bytes | LinkedIn: https://linkedin.com/in/praise-godswill-85ab38205 | CV: https://praise-dev-pi.vercel.app/cv
- Core Bio: "${PRAISE_VERIFIED_PROFILE.about}"

TECHNICAL CAPABILITIES:
- Languages: JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3
- Backend: Node.js, Express.js, RESTful API Design, Socket.IO, WebSockets, Serverless & Cron Functions, PHP
- Frontend: React, Next.js (App Router & SSR), Tailwind CSS, Three.js / WebGL, EJS, Responsive UI
- Databases & Storage: PostgreSQL (Neon, Supabase, node-postgres), MongoDB (Mongoose), MySQL, Cloudinary
- Auth & Security: JWT Authentication, OAuth, Role-Based Access Control (RBAC), Session Management, Rate Limiting
- DevOps & Tooling: Docker, AWS, Vercel, Render, Firebase, CI/CD Workflows, Git, GitHub, Postman, Resend / Nodemailer

HOW PRAISE APPROACHES COMPLEX SOFTWARE PROBLEMS:
- He thinks in connected system layers rather than isolated pages:
  1. Interface Layer (product intent, hierarchy, responsive UX)
  2. Core Backend Layer (clean data models, REST APIs, strict RBAC permissions, server-side validation)
  3. Operations & Automation Layer (cron jobs, webhooks, transactional email alerts, visible state)
  4. Deployment Layer (Docker containerization, Vercel/Render CI/CD, maintainability)
  5. Trust & Security Layer (JWT/OAuth, rate limiting, server-side pricing/input integrity)
- His background in Accounting (B.Sc. Accounting, Nnamdi Azikiwe University / UNIZIK, 2021–2025) sharpens his precision when designing financial workflows, ledger/order integrity, server-side pricing validation, and operational dashboards.

VERIFIED PROFESSIONAL EXPERIENCE (4+ Years, 2021–Present):
1. Backend Engineer — Confidential Technology Company (Remote – NDA) | May 2025 – March 2026:
   - Designed and maintained scalable backend services and RESTful API endpoints in a distributed team.
   - Implemented JWT and OAuth authentication/authorization with strict RBAC and request validation.
   - Built third-party API integrations and async data handlers with graceful error recovery.
   - Diagnosed and resolved production bottlenecks and database query defects across relational and document databases.
   (Note: The company identity is under a signed NDA; treat this with complete professionalism.)
2. Full-Stack Software Engineer — Independent / Freelance Engineering (Remote) | 2021 – Present:
   - Architects, builds, and deploys custom full-stack web platforms for businesses and founders from schema design to production.
   - Engineers backend APIs with Node.js, Express, Next.js Route Handlers, PostgreSQL, and MongoDB.
   - Builds multi-role admin dashboards, session management, and automated email pipelines (Resend, Nodemailer).
3. Backend Engineer — Lazerpay (Remote) | July 2022 – February 2023:
   - Maintained and improved core backend services and API infrastructure for platform stability.
   - Investigated and resolved production backend bugs collaboratively.
   - Implemented JWT authentication workflows and containerized backend services using Docker.

VERIFIED PROJECTS:
1. Jay's Food Court (https://jays-food-court.vercel.app) — Stack: Next.js, TypeScript, Supabase, PostgreSQL, Tailwind CSS.
   - 4-sided food delivery & logistics marketplace with dedicated role-based dashboards for Customers, Kitchen Staff, Delivery Riders, and Super Admins.
   - Includes online payment checkout, server-side pricing validation, and real-time order lifecycle tracking.
2. Global Citizen Immigration Platform (https://global-immigration-platform.vercel.app/) — Stack: Next.js, React, TypeScript, Three.js / WebGL, Tailwind CSS.
   - Dedicated User & Admin CRUD dashboards, automated country travel eligibility checker, AI immigration guidance assistant (50+ topics), integrated cryptocurrency deposit wallet module, and interactive 3D WebGL globe.
3. Lone Star Autos — Stack: Node.js, Express.js, MongoDB, Socket.IO, Cloudinary, JWT.
   - Full-stack automotive dealership platform with RBAC admin dashboards, analytics, Cloudinary media optimization, and Socket.IO real-time inventory updates.
4. ORC Investment Platform — Stack: Node.js, JavaScript, Tailwind CSS, Neon PostgreSQL (pg), Vercel Cron, Resend.
   - User investment workflows and admin CRUD portal for timed investment programmes, automated Vercel serverless cron jobs for duration/ROI tracking, and Resend transactional email alerts.

COMMUNICATION STYLE & CONVERSATIONAL INTELLIGENCE:
- Be sharp, articulate, warm, and genuinely conversational—never a rigid FAQ bot.
- Maintain full conversational continuity: resolve pronouns ("he", "him", "his", "it", "that project", "the first one") seamlessly using the conversation history without asking the visitor to repeat themselves.
- Handle skeptical or evaluative questions (e.g., "Does he actually know what he's doing?") calmly and confidently without becoming defensive or exaggerating: point to what the portfolio itself demonstrates—real-world architecture, multi-role workflows, server-side validation, and live inspectable systems.
- Handle character questions (e.g., "Is he honest?") thoughtfully: acknowledge that as an AI you don't possess firsthand knowledge of his personal moral character, while noting what is verifiable—his transparent portfolio, his respect for NDA confidentiality, and his emphasis on clear communication and ownership.
- Handle meeting or schedule requests (e.g., "Can I meet him?") by directing visitors to his public professional contact channels (email, LinkedIn, or the portfolio contact form). Never reveal or speculate about private schedules, personal routines, or real-time whereabouts.
- Adapt your depth to the visitor's question and never repeat the exact same boilerplate paragraph on follow-ups.`;

/**
 * Intelligent, context-aware local reasoning engine for RTX256.
 * Inspects the current message AND recent conversation history so follow-up questions,
 * architectural deep-dives, and multi-topic queries receive articulate, tailored responses
 * even when running without an external LLM key.
 */
export function generateRTX256Response(message: string, history: ChatTurn[] = []): string {
  const clean = message.trim();
  const lower = clean.toLowerCase();

  // Inspect the last assistant message to resolve pronouns / follow-ups ("tell me more", "what stack did it use?", "how about the second one?")
  const recentAssistantMsg =
    [...history]
      .reverse()
      .find((m) => m.role === 'assistant')?.content.toLowerCase() || '';

  // 1. Identity of the AI Assistant (RTX256)
  if (
    lower.includes('rtx256') ||
    lower.includes('who are you') ||
    lower.includes('what are you') ||
    lower.includes('your name') ||
    lower.includes('radiance') ||
    lower.includes('rti')
  ) {
    return `I'm **RTX256** (Portfolio Public Edition)—an AI assistant embedded in Praise Godswill's portfolio.

My role here is focused entirely on helping you explore Praise's engineering background, system architecture, live projects, and technical capabilities. *(Note: I am a public-facing portfolio instance of RTX256, separate from the internal RTX256 system built for Radiance Tech Innovation).*

What would you like to explore—his **backend architecture**, his **4-sided logistics & fintech projects**, or his **availability**?`;
  }

  // 2. Greetings & Casual Human Conversation
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|greetings|yo|sup)\b/i.test(clean) && clean.split(/\s+/).length <= 5) {
    return `Hello! I'm **RTX256**, Praise Godswill's portfolio AI assistant.

I can walk you through his **full-stack & backend architecture**, break down projects like **Jay's Food Court** or the **Global Citizen Immigration Platform**, discuss his **startup experience** (including Lazerpay), or share how to get in touch.

What are you most interested in looking at?`;
  }

  if (/^(thanks|thank you|appreciate it|cool|nice|awesome|great|got it|okay|ok)\b/i.test(clean) && clean.split(/\s+/).length <= 6) {
    return `You're welcome! Let me know if you'd like to dive deeper into any of Praise's projects, his backend engineering workflow, or how to reach him.`;
  }

  if (lower.includes('how are you') || lower.includes('how is it going')) {
    return `Doing great, thanks for asking! I'm here and ready to help you explore Praise's engineering work, system architecture, or background. What brings you to the portfolio today?`;
  }

  // 2b. Evaluative / Skeptical Questions ("Does he actually know what he's doing?", "Is he good?")
  if (
    lower.includes('know what he') ||
    lower.includes('actually good') ||
    lower.includes('is he good') ||
    lower.includes('legit') ||
    lower.includes('capable') ||
    lower.includes('prove') ||
    lower.includes('really build')
  ) {
    return `Rather than making big claims, the best way to evaluate Praise's capability is to inspect what he has built:

• **Real Multi-Role Systems:** In **Jay's Food Court** (https://jays-food-court.vercel.app), he engineered separate workflows for Customers, Kitchen Staff, Delivery Riders, and Super Admins—with server-side pricing validation and real-time order state transitions.
• **Backend & Security Depth:** Across **Lazerpay**, his **NDA startup role**, and **ORC Investment Platform**, he has worked with JWT/OAuth RBAC, PostgreSQL (Neon & Supabase), MongoDB, Docker containerization, and scheduled serverless cron jobs.
• **Live Inspectable Code & UI:** You can test the interactive terminal, inspect live project previews, or review his GitHub (**github.com/456-bytes**) directly.`;
  }

  // 2c. Character / Integrity Questions ("Is he honest?", "Can I trust him?")
  if (lower.includes('honest') || lower.includes('trust') || lower.includes('reliable') || lower.includes('character') || lower.includes('integrity')) {
    return `As an AI assistant, I don't have firsthand personal knowledge of Praise's moral character.

What I *can* point to from verified portfolio records is how he conducts himself professionally:
• **Transparency:** His portfolio projects are live and inspectable, and he avoids inflating his titles or inventing unverified metrics.
• **Confidentiality:** He strictly honours his signed NDA from his 2025–2026 Backend Engineer role rather than leaking proprietary details.
• **Engineering Ethic:** His documented work emphasizes end-to-end ownership, clear communication, and server-side integrity.`;
  }

  // 2d. Meeting / Schedule / Private Whereabouts ("Can I meet him?", "Where is he right now?")
  if (
    lower.includes('meet him') ||
    lower.includes('meet praise') ||
    lower.includes('schedule') ||
    lower.includes('where is he now') ||
    lower.includes('whereabouts') ||
    lower.includes('in person')
  ) {
    return `I don't have access to Praise's private schedule or personal whereabouts, but you can easily connect with him through his public professional channels to arrange a call or meeting:

• **Email:** praisegodswill23@gmail.com
• **LinkedIn:** https://linkedin.com/in/praise-godswill-85ab38205
• **Contact Form:** You can send him a direct message in the **Connect (Section 08)** form at the bottom of this page.`;
  }

  // 2e. Differentiation / Follow-up ("What makes him different?", "Why him?")
  if (
    lower.includes('different') ||
    lower.includes('stand out') ||
    lower.includes('unique') ||
    lower.includes('why praise') ||
    lower.includes('why should')
  ) {
    return `What sets Praise apart is his **systems-first mindset**: *"Thoughtfully engineered. Intentionally built."*

• **Backend Depth + Product Sense:** Instead of treating frontend and backend separately, he connects database schemas, RBAC permissions, automated workflows, and responsive UIs into one cohesive system.
• **Financial & Operational Precision:** His B.Sc. in Accounting (UNIZIK) sharpens his attention to server-side pricing integrity, payment workflows, and clean administrative auditability.
• **Pragmatic Execution:** He ships reliable, maintainable software without unnecessary complexity.`;
  }

  // 3. Specific Project Deep-Dives
  if (lower.includes('jay') || lower.includes('food court') || lower.includes('restaurant') || lower.includes('delivery') || lower.includes('logistics')) {
    return `**Jay's Food Court** (https://jays-food-court.vercel.app) is a great example of Praise's systems thinking. Rather than building a basic menu site, he architected a **4-sided food delivery and logistics marketplace** using **Next.js, TypeScript, Supabase, PostgreSQL, and Tailwind CSS**.

Key architectural highlights:
• **4 Role-Based Dashboards:** Dedicated interfaces and permissions for **Customers**, **Kitchen Staff**, **Delivery Riders**, and **Super Admins**.
• **Server-Side Integrity:** Server-side pricing validation and secure online payment checkout so pricing cannot be tampered with client-side.
• **End-to-End Order Lifecycle:** Real-time state transitions from customer checkout → kitchen preparation queue → rider dispatch → delivery completion.`;
  }

  if (lower.includes('immigration') || lower.includes('global citizen') || lower.includes('crypto wallet') || lower.includes('eligibility') || lower.includes('3d globe')) {
    return `The **Global Citizen Immigration Platform** (https://global-immigration-platform.vercel.app/) combines interactive 3D visualization with multi-role application workflows, built with **Next.js, React, TypeScript, Three.js / WebGL, and Tailwind CSS**.

What Praise engineered inside it:
• **User & Admin CRUD Dashboards:** Full administrative control over platform operations and user pathways.
• **Automated Travel Eligibility Checker:** Structured logic evaluating country travel and immigration eligibility.
• **Integrated Crypto Wallet Module:** Allows users to manage balances and make cryptocurrency deposits inside their dashboard.
• **AI Guidance & 3D Globe:** An AI assistant trained around 50+ immigration topics paired with a hardware-accelerated 3D WebGL globe optimized for both desktop and mobile.`;
  }

  if (lower.includes('lone star') || lower.includes('auto') || lower.includes('dealership') || lower.includes('car') || lower.includes('cloudinary')) {
    return `**Lone Star Autos** is a full-stack automotive dealership and real-time inventory platform built with **Node.js, Express.js, MongoDB, Socket.IO, Cloudinary, and JWT**.

Key engineering details:
• **Backend & RBAC Admin Portal:** RESTful API architecture with JWT-protected administrative workflows and dealership analytics.
• **Real-Time State (Socket.IO):** Bidirectional WebSocket events so inventory status and customer-dealer interactions update live without page reloads.
• **Media Pipeline:** Automated multi-image upload and delivery optimization via Cloudinary.`;
  }

  if (lower.includes('orc') || lower.includes('investment') || lower.includes('neon') || lower.includes('cron')) {
    return `The **ORC Investment Platform** is a full-stack investment programme and administrative management system built with **Node.js, JavaScript, Neon PostgreSQL (\`pg\`), Tailwind CSS, Vercel Serverless Cron, and Resend / Nodemailer**.

How Praise engineered it:
• **Programme & ROI Lifecycle:** Users enroll in defined-duration investment programmes, while scheduled **Vercel Serverless Cron jobs** automate duration tracking and state updates.
• **Comprehensive Admin CRUD:** Administrators have centralized control to create/modify investment programmes, oversee user accounts, and monitor platform activity.
• **Transactional Comms:** Automated email alerts powered by Resend and Nodemailer.`;
  }

  // 4. Specific Experience Deep-Dives (Lazerpay, NDA Startup, Freelance)
  if (lower.includes('lazerpay')) {
    return `Praise worked as a **Backend Engineer at Lazerpay (Remote)** from **July 2022 to February 2023**.

His contributions focused on backend reliability and developer infrastructure:
• Maintained and improved core backend services and API infrastructure to support platform stability and uptime.
• Investigated, debugged, and resolved production backend defects alongside engineering teammates.
• Implemented **JWT-based authentication** workflows and contributed to API enhancements.
• **Dockerized backend services** to standardize local development and deployment environments across the engineering team.`;
  }

  if (lower.includes('nda') || lower.includes('confidential') || lower.includes('recent role') || lower.includes('last job') || lower.includes('2025')) {
    return `From **May 2025 to March 2026**, Praise worked as a **Backend Engineer** for a **Confidential Technology Company (Remote)** under a signed Non-Disclosure Agreement (NDA).

While the company's name is protected by NDA, his engineering scope included:
• Designing and maintaining scalable backend services and RESTful API endpoints in a distributed team.
• Implementing secure authentication and authorization layers using **JWT and OAuth**, enforcing strict **RBAC** and request validation.
• Building third-party API integrations and asynchronous data handlers with graceful error recovery.
• Diagnosing and resolving production bottlenecks and database query issues across relational and document data layers.`;
  }

  // 5. Engineering Philosophy & Approach to Complex Problems
  if (
    lower.includes('philosophy') ||
    lower.includes('approach') ||
    lower.includes('how does he') ||
    lower.includes('how do you build') ||
    lower.includes('problem') ||
    lower.includes('architecture') ||
    lower.includes('special') ||
    lower.includes('interesting') ||
    lower.includes('why hire')
  ) {
    return `Praise's engineering philosophy is: **"Thoughtfully engineered. Intentionally built."**

When approaching complex software problems, he doesn't treat frontend and backend as disconnected tasks—he designs across **5 connected layers**:
1. **Data & Core Backend First:** Clean relational/document schemas (PostgreSQL, MongoDB), strict server-side validation, and RBAC permissions so business logic is watertight.
2. **Operational Workflows:** Event-driven automation (Vercel Cron, Socket.IO, transactional email pipelines) that keeps system status visible across all user roles.
3. **Intentional Interfaces:** Responsive React & Next.js UIs shaped around product hierarchy and speed.
4. **Financial & Logic Precision:** His academic background in Accounting (B.Sc., UNIZIK) reinforces his attention to detail on payment flows, server-side pricing validation, and admin auditability.
5. **Pragmatic Delivery:** Containerized (Docker) and cloud-deployed (Vercel, Render, AWS) without over-engineering.`;
  }

  // 6. Soft Skills, Work Ethic & Team Collaboration
  if (
    lower.includes('soft skill') ||
    lower.includes('communication') ||
    lower.includes('team') ||
    lower.includes('work ethic') ||
    lower.includes('culture') ||
    lower.includes('collaborat')
  ) {
    return `Beyond technical execution, Praise brings strong remote engineering habits:
• **Active Listening:** Translates ambiguous product ideas into clear technical specifications and schemas.
• **End-to-End Ownership:** Takes accountability from database modeling all the way to production deployment and debugging.
• **Clear Technical Communication:** Documents APIs, PRs, and operational logic concisely for distributed teammates.
• **Proactive Problem-Solving & Growth Mindset:** Isolates root causes calmly under pressure and welcomes code reviews and architectural feedback.`;
  }

  // 7. Education & Background
  if (lower.includes('education') || lower.includes('degree') || lower.includes('university') || lower.includes('unizik') || lower.includes('study') || lower.includes('accounting')) {
    return `Praise holds a **Bachelor of Science (B.Sc.) in Accounting** from **Nnamdi Azikiwe University (UNIZIK)** (2021 – 2025).

While his career is 100% dedicated to **Full-Stack & Backend Software Engineering** (building production systems since 2021), his accounting foundation gives him an edge when engineering fintech workflows, e-commerce checkout integrity, ledger/wallet logic, and administrative reporting dashboards.`;
  }

  // 8. Backend-Specific Capabilities
  if (lower.includes('backend') || lower.includes('api') || lower.includes('database') || lower.includes('sql') || lower.includes('node')) {
    return `Backend engineering is one of Praise's strongest areas. His backend stack and capabilities include:
• **Runtime & Frameworks:** Node.js, Express.js, Next.js App Router API Handlers, TypeScript, and PHP.
• **Databases:** PostgreSQL (**Supabase**, **Neon**, \`node-postgres\`), MongoDB (**Mongoose**), and MySQL—experienced in schema design, indexing, and query optimization.
• **Security & Auth:** JWT authentication, OAuth, Role-Based Access Control (RBAC), session management, and sliding-window rate limiting.
• **Real-Time & Async:** Socket.IO / WebSockets, Vercel Serverless Cron jobs, and third-party API integrations (payments, Cloudinary, Resend, OpenAI).`;
  }

  // 9. Full Tech Stack / Skills Overview
  if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech') || lower.includes('language') || lower.includes('tool')) {
    return `Here is Praise's verified technical stack across the full lifecycle:
• **Languages:** JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3
• **Backend:** Node.js, Express.js, RESTful APIs, Socket.IO, WebSockets, Serverless & Cron Functions, PHP
• **Frontend:** React, Next.js (App Router & SSR), Tailwind CSS, Three.js / WebGL, EJS
• **Databases & Storage:** PostgreSQL (Neon, Supabase, \`pg\`), MongoDB (Mongoose), MySQL, Cloudinary
• **Auth & Security:** JWT, OAuth, RBAC, Session Management, Rate Limiting
• **DevOps & Cloud:** Docker, AWS, Vercel, Render, Firebase, CI/CD, Git/GitHub, Postman, Resend / Nodemailer

Would you like to see how he applied these in his **projects** or his **startup experience**?`;
  }

  // 10. All Projects Overview
  if (lower.includes('project') || lower.includes('built') || lower.includes('portfolio') || lower.includes('systems') || lower.includes('work')) {
    return `Praise has architected and deployed several full-stack production systems:

1. **Jay's Food Court** (https://jays-food-court.vercel.app) — 4-sided food delivery & logistics marketplace with dedicated dashboards for Customers, Kitchen Staff, Riders, and Super Admins (*Next.js, TypeScript, Supabase, PostgreSQL*).
2. **Global Citizen Immigration Platform** (https://global-immigration-platform.vercel.app/) — Immigration, automated travel eligibility checker, crypto deposit wallet & 3D WebGL AI guidance platform (*Next.js, TypeScript, Three.js*).
3. **Lone Star Autos** — Full-stack automotive dealership platform with RBAC admin analytics, Cloudinary media pipeline, and live Socket.IO inventory updates (*Node.js, Express, MongoDB, Socket.IO*).
4. **ORC Investment Platform** — Timed investment programme & admin CRUD system with automated serverless cron ROI tracking (*Node.js, Neon PostgreSQL, Vercel Cron, Resend*).

Ask me about any of these four and I can break down its architecture in detail!`;
  }

  // 11. Experience & Career Journey
  if (lower.includes('experience') || lower.includes('journey') || lower.includes('career') || lower.includes('history') || lower.includes('years') || lower.includes('where has he worked')) {
    return `Praise has **4+ years of hands-on software engineering experience** (2021 – Present):

• **Backend Engineer — Confidential Technology Company (Remote – NDA)** *(May 2025 – March 2026)*: Built scalable backend services, REST APIs, JWT/OAuth RBAC security, and third-party integrations, and resolved database bottlenecks.
• **Full-Stack Software Engineer — Independent / Freelance (Remote)** *(2021 – Present)*: Architects and delivers end-to-end full-stack platforms, multi-role admin systems, and APIs using Node.js, Next.js, TypeScript, PostgreSQL, and MongoDB.
• **Backend Engineer — Lazerpay (Remote)** *(July 2022 – February 2023)*: Maintained core backend services, resolved production bugs, implemented JWT auth flows, and Dockerized backend services.

You can also view or download his full CV at **https://praise-dev-pi.vercel.app/cv**.`;
  }

  // 12. Who is Praise / About Praise
  if (lower.includes('who is praise') || lower.includes('about praise') || lower.includes('tell me about') || lower.includes('introduce') || lower === 'about') {
    return `**Praise Godswill** is a **Full-Stack Software Engineer** with strong backend engineering depth, based in Lekki Orchid, Lagos, Nigeria.

${PRAISE_VERIFIED_PROFILE.about}

His core philosophy is: **"Thoughtfully engineered. Intentionally built."**`;
  }

  // 13. Contact, Availability, Location & CV
  if (
    lower.includes('contact') ||
    lower.includes('email') ||
    lower.includes('phone') ||
    lower.includes('call') ||
    lower.includes('reach') ||
    lower.includes('hire') ||
    lower.includes('available') ||
    lower.includes('remote') ||
    lower.includes('cv') ||
    lower.includes('resume') ||
    lower.includes('location') ||
    lower.includes('where is he')
  ) {
    return `Praise is based in **Lekki Orchid, Lagos, Nigeria** and is actively available for **remote full-time, contract, and freelance software engineering roles** worldwide.

Here is how you can reach him directly:
• **Email:** praisegodswill23@gmail.com
• **Phone / WhatsApp:** +234 901 840 3385
• **Interactive CV & PDF:** https://praise-dev-pi.vercel.app/cv
• **GitHub:** https://github.com/456-bytes
• **LinkedIn:** https://linkedin.com/in/praise-godswill-85ab38205

You can also send an encrypted message right from the **Connect (Section 08)** form at the bottom of this page!`;
  }

  // 14. Context-Aware Follow-Up Resolution ("tell me more", "elaborate", "how does it work")
  if (lower.includes('more') || lower.includes('elaborate') || lower.includes('detail') || lower.includes('first one') || lower.includes('second one')) {
    if (recentAssistantMsg.includes("jay's food court") || recentAssistantMsg.includes('4-sided')) {
      return `Digging deeper into **Jay's Food Court** (https://jays-food-court.vercel.app):
The platform coordinates four distinct operational roles in real time using **Next.js, TypeScript, Supabase, and PostgreSQL**:
1. **Customers** browse dynamic categories, customize meals, check out (including guest checkout), and track live order status.
2. **Kitchen Staff** receive incoming paid orders in a live prep queue and update preparation stages.
3. **Delivery Riders** manage assigned dispatches and delivery status transitions.
4. **Super Admins** oversee menus, pricing, order lifecycles, and platform operations—all backed by server-side pricing validation.`;
    }
    if (recentAssistantMsg.includes('lazerpay') || recentAssistantMsg.includes('confidential')) {
      return `In his backend roles at **Lazerpay** and the **Confidential Technology Company (NDA)**, Praise focused heavily on **service reliability, security, and clean API contracts**—implementing JWT/OAuth with RBAC, Dockerizing services so environments stayed consistent, and optimizing database queries across PostgreSQL and MongoDB.`;
    }
  }

  // 15. Intelligent Conversational Default (Never dull or dead-end)
  return `I'm **RTX256**, Praise Godswill's portfolio AI assistant. I can give you detailed, verified answers on:

• **Who Praise Is & His Philosophy** (*"Thoughtfully engineered. Intentionally built."*)
• **System Architecture & Projects** (*Jay's Food Court*, *Global Citizen Immigration Platform*, *Lone Star Autos*, *ORC Investment Platform*)
• **Backend & Full-Stack Experience** (*Confidential Startup NDA*, *Lazerpay*, *Independent Engineering*)
• **Technical Arsenal & Hiring Contact** (*Node.js, TypeScript, Next.js, PostgreSQL, MongoDB, Docker*)

Which of these would you like to dive into?`;
}
