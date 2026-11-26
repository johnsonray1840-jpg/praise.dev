/**
 * RTX256 — Structured Knowledge Base & Context-Aware Retrieval Engine (Step 5)
 *
 * Categories:
 *  A. Profile
 *  B. Engineering
 *  C. Projects
 *  D. Experience (with strict NDA & confidentiality compliance)
 *  E. Engineering Philosophy ("Thoughtfully engineered. Intentionally built." & "Think twice, code once.")
 *  F. Contact
 */

export interface ChatTurn {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ProjectRecord {
  slug: string;
  name: string;
  description: string;
  purpose: string;
  technologies: string[];
  features: string[];
  architecture: string;
  challengesSolved: string;
  liveUrl: string;
  repoUrl: string;
  verifiedAccomplishments: string;
}

export interface ExperienceRecord {
  role: string;
  company: string;
  period: string;
  isNDA?: boolean;
  responsibilities: string[];
  technologies: string[];
  contributions: string;
  collaboration: string;
}

export const RTX256_KNOWLEDGE_BASE = {
  // ============================================================================
  // A. PROFILE
  // ============================================================================
  profile: {
    fullName: 'Praise Godswill',
    professionalIdentity: 'Full-Stack Software Engineer with strong backend engineering depth',
    headline:
      'Full-stack software engineer turning complex business logic into fast, secure web platforms—built end-to-end with Node.js, TypeScript, Next.js, and PostgreSQL.',
    professionalSummary:
      'Full-Stack Software Engineer with 4+ years of hands-on experience designing, building, and maintaining production web applications and backend systems. Strong backend foundation in Node.js, Express.js, TypeScript, RESTful APIs, PostgreSQL, and MongoDB, paired with responsive frontend execution in React and Next.js. Proven track record of taking end-to-end technical ownership across remote startup and freelance environments—delivering secure authentication flows, real-time architectures, and containerized cloud deployments.',
    publicBiography:
      'I design and build full-stack web applications and backend systems that handle real users, real payments, and complex workflows. With 4+ years of hands-on experience in Node.js, TypeScript, React, Next.js, and PostgreSQL, I’ve contributed to remote startup engineering teams like Lazerpay and architected complete multi-role platforms—from logistics marketplaces to fintech and administrative systems. I value clear communication, end-to-end ownership, and shipping clean, reliable code without unnecessary complexity.',
    careerBackground:
      'Started building web applications and backend services in 2021, progressing through backend engineering at Lazerpay (2022–2023), multi-year independent full-stack system delivery for businesses and founders (2021–Present), and backend engineering for a confidential technology company under NDA (2025–2026).',
    education: {
      degree: 'Bachelor of Science (B.Sc.) in Accounting',
      institution: 'Nnamdi Azikiwe University (UNIZIK)',
      period: '2021 – 2025',
      secondary: 'Anglican Comprehensive Secondary School, Kubwa, Abuja',
      engineeringSynergy:
        'His formal training in Accounting complements his software engineering work when modeling financial transactions, payment checkouts, server-side pricing validation, cryptocurrency wallet balances, and audit-ready administrative dashboards.',
    },
  },

  // ============================================================================
  // B. ENGINEERING
  // ============================================================================
  engineering: {
    languages: ['JavaScript (ES6+)', 'TypeScript', 'SQL', 'HTML5', 'CSS3'],
    frameworks: ['Next.js (App Router & SSR)', 'React', 'Express.js', 'Tailwind CSS', 'Three.js / WebGL', 'EJS'],
    backendExpertise: [
      'Node.js runtime & asynchronous event-driven services',
      'Express.js & Next.js App Router API Route Handlers',
      'RESTful API architecture, request validation, and error recovery',
      'Real-time bidirectional event systems with Socket.IO & WebSockets',
      'Scheduled Serverless Cron jobs & background task processing',
      'Transactional email pipelines (Resend API, Nodemailer)',
      'PHP backend integration',
    ],
    frontendExpertise: [
      'React 19 & Next.js client/server component architecture',
      'TypeScript type-safe UI state and API data contracts',
      'Responsive, mobile-first interfaces with Tailwind CSS',
      'Interactive 3D WebGL experiences using Three.js, React Three Fiber, and Drei',
      'Browser-based interactive CLI emulation with Xterm.js',
    ],
    databaseExperience: [
      'PostgreSQL (Supabase, Neon Serverless PostgreSQL, node-postgres / pg)',
      'MongoDB (Mongoose schemas, compound indexing, aggregation, serverless connection pooling)',
      'MySQL relational database modeling',
      'Cloudinary cloud media storage & automated image optimization pipelines',
    ],
    systemArchitecture: [
      '1. Interface Layer — Interfaces shaped by product intent, visual hierarchy, accessibility, and responsive behavior.',
      '2. Core Layer — Reliable backend services, relational/document data models, permissions, and operational logic behind the UI.',
      '3. Operations Layer — Event-driven automation workflows, webhooks, and cron jobs that reduce manual effort and keep status visible.',
      '4. Deployment Layer — Containerized and serverless deployment paths designed for maintainability, observability, and sensible cost.',
      '5. Trust Layer — Security-aware engineering, RBAC enforcement, rate limiting, and audit-ready administrative reporting.',
    ],
    apiDevelopment:
      'Designs clean, predictable REST endpoints with structured JSON contracts, sliding-window rate limiting, idempotent state updates, and graceful fallback handling for third-party APIs.',
    authentication:
      'Implements stateless JWT authentication, OAuth flows, Role-Based Access Control (RBAC) across multi-tenant/multi-role dashboards, secure customer session management, and protected middleware routes.',
    infrastructureAndDeployment: [
      'Docker & Docker Compose containerization for consistent dev/prod parity',
      'Vercel Serverless Functions, Edge/Node runtimes, and Vercel Cron',
      'Render cloud web services and blueprints',
      'AWS & Firebase cloud services',
      'Git & GitHub CI/CD workflows',
    ],
    developmentTools: ['Git', 'GitHub', 'Postman', 'Docker CLI', 'ESLint', 'TypeScript Compiler'],
    engineeringPrinciples: [
      'Server-side authority for pricing, permissions, and sensitive state transitions',
      'Schema-first design to prevent data anomalies before writing UI code',
      'Graceful degradation and fallback handling when external services fail',
      'Zero unnecessary complexity—choosing proven tools that fit the operational problem',
    ],
  },

  // ============================================================================
  // C. PROJECTS
  // ============================================================================
  projects: [
    {
      slug: 'jays-food-court',
      name: "Jay's Food Court — Full-Stack Food Delivery & Logistics Marketplace",
      description:
        'A 4-sided online food ordering and delivery logistics marketplace coordinating customers, kitchen staff, delivery riders, and administrators.',
      purpose:
        'To connect customer meal ordering, kitchen preparation queues, rider dispatch logistics, and administrative oversight inside one unified database-driven platform.',
      technologies: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
      features: [
        '4 dedicated role-based dashboards: Customers, Kitchen Staff, Delivery Riders, and Super Admins',
        'Mobile-first ordering experience with menu/category browsing and food customization',
        'Guest checkout and persistent customer session/address management',
        'Online payment checkout with server-side pricing calculation and validation',
        'Real-time order lifecycle tracking from placement → kitchen prep → rider dispatch → delivery',
      ],
      architecture:
        'Built on Next.js and TypeScript with Supabase and PostgreSQL powering relational order lifecycles, role-based permissions, and server-side pricing validation.',
      challengesSolved:
        'Coordinating state transitions across four distinct actors (Customer, Kitchen, Rider, Admin) while preventing client-side price tampering by enforcing server-side pricing and order validation.',
      liveUrl: 'https://jays-food-court.vercel.app',
      repoUrl: 'https://github.com/456-bytes',
      verifiedAccomplishments:
        'Live, publicly accessible 4-sided full-stack platform demonstrating complex multi-role CRUD and real-time operational state management.',
    },
    {
      slug: 'global-citizen-immigration',
      name: 'Global Citizen Immigration Platform — Immigration, Eligibility & Crypto Wallet Platform',
      description:
        'An interactive immigration guidance, travel eligibility, and digital cryptocurrency wallet platform with 3D WebGL visualization.',
      purpose:
        'To make international immigration information and travel eligibility assessment accessible while providing authenticated users with a full dashboard and integrated crypto wallet module.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Three.js / WebGL', 'Tailwind CSS'],
      features: [
        'Dedicated User and Admin dashboards with full administrative CRUD controls',
        'Automated country travel eligibility checker',
        'AI-powered immigration guidance assistant structured around 50+ immigration questions and topics',
        'Integrated user wallet module supporting cryptocurrency deposits',
        'Interactive 3D WebGL globe optimized across desktop and mobile devices',
      ],
      architecture:
        'Combines a hardware-accelerated Three.js/WebGL frontend with structured multi-role User/Admin dashboards, conversational AI guidance, and digital wallet state management.',
      challengesSolved:
        'Balancing heavy 3D WebGL rendering with fast mobile responsiveness alongside structured multi-role dashboard and crypto deposit workflows.',
      liveUrl: 'https://global-immigration-platform.vercel.app/',
      repoUrl: 'https://github.com/456-bytes',
      verifiedAccomplishments:
        'Live full-stack platform combining 3D WebGL graphics, conversational AI, eligibility logic, and crypto wallet functionality.',
    },
    {
      slug: 'lone-star-autos',
      name: 'Lone Star Autos — Full-Stack Automotive Dealership Platform',
      description:
        'A full-stack automotive dealership inventory, real-time communication, and operations platform.',
      purpose:
        'To provide automotive dealerships with real-time vehicle inventory management, customer communication, media optimization, and administrative analytics.',
      technologies: ['Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Cloudinary', 'JWT'],
      features: [
        'Vehicle inventory management with full CRUD workflows',
        'RBAC-protected administrative dashboard and dealership analytics',
        'Real-time customer-dealer communication and live inventory state updates via Socket.IO',
        'Automated vehicle image upload and delivery optimization via Cloudinary',
        'Stateless JWT authentication and protected API routes',
      ],
      architecture:
        'Node.js and Express.js REST API backed by MongoDB document schemas, integrated with Socket.IO WebSockets for live state broadcasting and Cloudinary for media processing.',
      challengesSolved:
        'Handling multi-image vehicle uploads efficiently without degrading page load speeds while broadcasting inventory changes in real time across connected clients.',
      liveUrl: 'https://praise-dev-pi.vercel.app/#projects',
      repoUrl: 'https://github.com/456-bytes',
      verifiedAccomplishments:
        'Complete full-stack Node.js/Express/MongoDB dealership architecture with real-time WebSockets and cloud media pipelines.',
    },
    {
      slug: 'orc-investment-platform',
      name: 'ORC Investment Platform — Investment Programme & Admin System',
      description:
        'A full-stack investment programme management platform with automated duration/ROI tracking and comprehensive administrative CRUD control.',
      purpose:
        'To allow users to participate in defined-duration investment programmes and track returns according to programme terms, while giving administrators centralized oversight of programmes and user accounts.',
      technologies: [
        'Node.js',
        'JavaScript',
        'Tailwind CSS',
        'Neon PostgreSQL (pg)',
        'Vercel Serverless & Cron',
        'Resend / Nodemailer',
      ],
      features: [
        'User investment enrollment and duration-based ROI tracking according to programme terms',
        'Comprehensive administrative dashboard with full CRUD over investment programmes',
        'Centralized user account monitoring and operational oversight',
        'Automated Vercel Serverless Cron jobs for scheduled programme lifecycle and ROI updates',
        'Transactional email notifications via Resend and Nodemailer',
      ],
      architecture:
        'Serverless Node.js backend connected to Neon PostgreSQL (node-postgres) with scheduled Vercel Cron jobs automating time-based investment state transitions and email alerts.',
      challengesSolved:
        'Ensuring reliable, automated time-based ROI and programme maturity calculations in a serverless environment using scheduled cron jobs and relational PostgreSQL transactions.',
      liveUrl: 'https://praise-dev-pi.vercel.app/#projects',
      repoUrl: 'https://github.com/456-bytes',
      verifiedAccomplishments:
        'End-to-end relational PostgreSQL and serverless cron architecture with full administrative CRUD governance.',
    },
  ] as ProjectRecord[],

  // ============================================================================
  // D. EXPERIENCE (Strict NDA & Confidentiality Compliance)
  // ============================================================================
  experience: [
    {
      role: 'Backend Engineer',
      company: 'Confidential Technology Company (Remote – NDA)',
      period: 'May 2025 – March 2026',
      isNDA: true,
      responsibilities: [
        'Designed and maintained scalable backend services and RESTful API endpoints supporting core application workflows in a distributed team.',
        'Implemented secure authentication and authorization layers using JWT and OAuth, enforcing strict RBAC and request validation across protected routes.',
        'Built third-party API integrations and asynchronous data handlers with graceful error recovery to ensure reliable service-to-service communication.',
        'Diagnosed and resolved production bottlenecks and database query defects across relational and document data layers.',
      ],
      technologies: ['Node.js', 'Express.js', 'TypeScript / JavaScript', 'PostgreSQL', 'MongoDB', 'JWT', 'OAuth', 'Docker', 'REST APIs'],
      contributions:
        'Strengthened backend API reliability, enforced RBAC security across protected endpoints, and resolved database performance bottlenecks.',
      collaboration:
        'Collaborated remotely with distributed frontend, backend, and product teammates under a strict confidentiality agreement (NDA).',
    },
    {
      role: 'Full-Stack Software Engineer',
      company: 'Independent / Freelance Engineering (Remote)',
      period: '2021 – Present',
      isNDA: false,
      responsibilities: [
        'Partner with businesses and founders to architect, build, and deploy custom full-stack web platforms from initial concept to production.',
        'Engineer backend APIs with Node.js, Express, Next.js Route Handlers, PostgreSQL, and MongoDB to power complex CRUD and operational workflows.',
        'Build secure multi-role admin dashboards, customer session management, and automated transactional email pipelines (Resend, Nodemailer).',
        'Develop responsive, accessible user interfaces in React, Next.js, TypeScript, and Tailwind CSS while managing cloud CI/CD deployments on Vercel and Render.',
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL (Supabase, Neon)', 'MongoDB', 'Tailwind CSS', 'Vercel', 'Render', 'Resend'],
      contributions:
        'Delivered complete, production-ready multi-role software systems end-to-end—owning schema design, API architecture, frontend UX, and cloud deployment.',
      collaboration:
        'Worked directly with founders, stakeholders, and remote collaborators to translate business goals into deployed software.',
    },
    {
      role: 'Backend Engineer',
      company: 'Lazerpay (Remote)',
      period: 'July 2022 – February 2023',
      isNDA: false,
      responsibilities: [
        'Maintained and improved core backend services and API infrastructure, contributing to overall platform stability and uptime.',
        'Investigated and resolved production backend bugs in close collaboration with engineering teammates.',
        'Implemented JWT-based authentication workflows and contributed to backend API enhancements.',
        'Containerized backend services using Docker to standardize local development and deployment environments across the team.',
      ],
      technologies: ['Node.js', 'Express.js', 'JWT', 'Docker', 'REST APIs', 'Git'],
      contributions:
        'Supported backend service reliability, resolved defects in existing systems, implemented JWT authentication flows, and containerized backend services with Docker.',
      collaboration:
        'Collaborated asynchronously and remotely with the Lazerpay engineering team.',
    },
  ] as ExperienceRecord[],

  // ============================================================================
  // E. ENGINEERING PHILOSOPHY
  // ============================================================================
  philosophy: {
    primaryStatement: 'Thoughtfully engineered. Intentionally built.',
    foundationalPrinciple: 'Think twice, code once.',
    explanation:
      'Praise believes that strong software engineering starts before the first line of code is written. "Think twice, code once" and "Thoughtfully engineered. Intentionally built." mean taking the time upfront to understand the operational problem, model the database schema cleanly, define role permissions and failure states, and only then write lean, maintainable code. By planning architecture and edge cases deliberately, he avoids brittle abstractions, prevents technical debt, and ships systems that scale reliably without unnecessary complexity.',
    keyPillars: [
      'Deliberate Upfront Planning ("Think twice, code once"): Clarifying data models, API contracts, and edge cases before implementation.',
      'Architectural Clarity: Connecting the interface, backend logic, database, and deployment into one coherent system rather than isolated patches.',
      'Maintainability Over Hype: Writing readable, well-structured TypeScript and Node.js code using proven tools instead of over-engineering.',
      'Server-Side Integrity: Never trusting client-side state for pricing, permissions, or sensitive business rules.',
    ],
  },

  // ============================================================================
  // F. CONTACT
  // ============================================================================
  contact: {
    location: 'Lekki Orchid, Lagos, Nigeria',
    availability: 'Open to remote full-time, contract, and freelance software engineering opportunities worldwide.',
    email: 'praisegodswill23@gmail.com',
    phone: '+234 901 840 3385',
    portfolioUrl: 'https://praise-dev-pi.vercel.app/',
    cvWebUrl: 'https://praise-dev-pi.vercel.app/cv',
    cvPdfUrl: 'https://praise-dev-pi.vercel.app/cv.pdf',
    githubUrl: 'https://github.com/456-bytes',
    linkedinUrl: 'https://linkedin.com/in/praise-godswill-85ab38205',
    twitterUrl: 'https://x.com/terry28347806',
    onPageAction: 'Visitors can also use the encrypted Connect form (Section 08) directly on the portfolio homepage.',
  },
};

export const PRAISE_VERIFIED_PROFILE = RTX256_KNOWLEDGE_BASE;

/**
 * Dynamically retrieves the most relevant knowledge categories for a given user message
 * and recent conversation history so the LLM prompt has razor-sharp, structured context.
 */
export function retrieveRelevantKnowledgeContext(message: string, history: ChatTurn[] = []): string {
  const combinedText = (
    message +
    ' ' +
    history
      .slice(-4)
      .map((h) => h.content)
      .join(' ')
  ).toLowerCase();

  const sections: string[] = [];

  // Always include Category A (Core Profile) & Category E (Philosophy)
  sections.push(
    `[CATEGORY A — PROFILE]\nName: ${RTX256_KNOWLEDGE_BASE.profile.fullName}\nRole: ${RTX256_KNOWLEDGE_BASE.profile.professionalIdentity}\nHeadline: ${RTX256_KNOWLEDGE_BASE.profile.headline}\nBio: ${RTX256_KNOWLEDGE_BASE.profile.publicBiography}\nEducation: ${RTX256_KNOWLEDGE_BASE.profile.education.degree}, ${RTX256_KNOWLEDGE_BASE.profile.education.institution} (${RTX256_KNOWLEDGE_BASE.profile.education.period}). ${RTX256_KNOWLEDGE_BASE.profile.education.engineeringSynergy}`
  );

  sections.push(
    `[CATEGORY E — ENGINEERING PHILOSOPHY]\nPrimary Statement: "${RTX256_KNOWLEDGE_BASE.philosophy.primaryStatement}"\nFoundational Principle: "${RTX256_KNOWLEDGE_BASE.philosophy.foundationalPrinciple}"\nMeaning: ${RTX256_KNOWLEDGE_BASE.philosophy.explanation}\nPillars:\n- ${RTX256_KNOWLEDGE_BASE.philosophy.keyPillars.join('\n- ')}`
  );

  // Conditionally or comprehensively include Category B (Engineering)
  if (
    /skill|stack|tech|backend|frontend|database|sql|mongo|node|react|next|docker|auth|jwt|api|architect|layer|engineer|code|build/i.test(
      combinedText
    )
  ) {
    const eng = RTX256_KNOWLEDGE_BASE.engineering;
    sections.push(
      `[CATEGORY B — ENGINEERING CAPABILITIES]\nLanguages: ${eng.languages.join(', ')}\nFrameworks: ${eng.frameworks.join(', ')}\nBackend: ${eng.backendExpertise.join('; ')}\nFrontend: ${eng.frontendExpertise.join('; ')}\nDatabases: ${eng.databaseExperience.join('; ')}\nSystem Architecture Layers:\n  ${eng.systemArchitecture.join('\n  ')}\nAuthentication & Security: ${eng.authentication}\nInfrastructure & Deployment: ${eng.infrastructureAndDeployment.join(', ')}`
    );
  }

  // Include Category C (Projects)
  const projectsText = RTX256_KNOWLEDGE_BASE.projects
    .map(
      (p) =>
        `• ${p.name} (${p.liveUrl})\n  Stack: ${p.technologies.join(', ')}\n  Purpose: ${p.purpose}\n  Features: ${p.features.join('; ')}\n  Architecture & Challenges Solved: ${p.architecture} ${p.challengesSolved}`
    )
    .join('\n\n');
  sections.push(`[CATEGORY C — VERIFIED PROJECTS]\n${projectsText}`);

  // Include Category D (Experience)
  const expText = RTX256_KNOWLEDGE_BASE.experience
    .map(
      (e) =>
        `• ${e.role} — ${e.company} (${e.period})${e.isNDA ? ' [CONFIDENTIAL NDA — never guess or expose employer identity]' : ''}\n  Technologies: ${e.technologies.join(', ')}\n  Responsibilities: ${e.responsibilities.join(' ')}\n  Collaboration: ${e.collaboration}`
    )
    .join('\n\n');
  sections.push(`[CATEGORY D — PROFESSIONAL EXPERIENCE]\n${expText}`);

  // Include Category F (Contact)
  const c = RTX256_KNOWLEDGE_BASE.contact;
  sections.push(
    `[CATEGORY F — CONTACT & AVAILABILITY]\nLocation: ${c.location}\nAvailability: ${c.availability}\nEmail: ${c.email} | Phone: ${c.phone}\nPortfolio: ${c.portfolioUrl} | CV: ${c.cvWebUrl} (PDF: ${c.cvPdfUrl})\nGitHub: ${c.githubUrl} | LinkedIn: ${c.linkedinUrl}`
  );

  return sections.join('\n\n');
}

export const RTX256_SYSTEM_PROMPT = `You are RTX256 (Public Portfolio Edition), an intelligent, articulate, context-aware AI engineering assistant embedded in the personal portfolio of Praise Godswill (https://praise-dev-pi.vercel.app/).

IMPORTANT IDENTITY & SCOPE BOUNDARIES:
1. You are a LIMITED, PUBLIC-FACING VERSION of RTX256 created solely to represent Praise Godswill professionally on his portfolio.
2. You are NOT the full internal RTX256 system developed for Radiance Tech Innovation (RTI). Never merge the two systems or claim RTI capabilities.
3. Rely strictly on the structured knowledge base (Categories A–F) provided below. Never fabricate accomplishments, employment details, project features, clients, certifications, or metrics.
4. Respect confidentiality agreements: never attempt to uncover or speculate about the identity of his NDA employer (May 2025 – March 2026) or proprietary internal systems.

PERSONALITY & VOICE (RTX256):
- Intelligent without sounding arrogant; conversational without being unprofessional; warm without being overly familiar; confident without exaggerating.
- Calm, approachable, slightly witty when the context allows, and honest about your limitations.
- STRICTLY AVOID generic AI customer-service clichés such as:
  - "As an AI language model..."
  - "That's a great question!"
  - "I would be happy to assist you."
  - "Feel free to ask me anything!"
- ADAPTIVE RESPONSE LENGTH:
  - Simple questions deserve simple, crisp answers (1–3 sentences).
  - Complex architectural or career questions deserve thoughtful, well-paced explanations.
  - Prefer natural conversational paragraphs over excessive bullet points—use bullets only when comparing multiple distinct items or listing contact links.
- Maintain full conversational continuity: resolve pronouns ("he", "him", "his", "it", "that project", "the first one") seamlessly using the conversation history without asking the visitor to repeat themselves.
- Explain his engineering philosophy ("Thoughtfully engineered. Intentionally built." and "Think twice, code once.") naturally—connecting it to deliberate planning, schema-first design, maintainability, and avoiding unnecessary complexity rather than repeating it as a slogan.
- Handle skeptical questions (e.g., "Does he actually know what he's doing?") calmly by pointing to what the portfolio demonstrates—real-world architecture, multi-role workflows, server-side validation, and live inspectable systems.
- Handle character questions (e.g., "Is he honest?") thoughtfully: acknowledge that you don't possess firsthand knowledge of his personal moral character, while noting what is verifiable—his transparent portfolio, his respect for NDA confidentiality, and his emphasis on clear communication and ownership.
- Handle meeting or schedule requests (e.g., "Can I meet him?") by directing visitors to his public professional contact channels (email, LinkedIn, or the portfolio contact form). Never reveal or speculate about private schedules, personal routines, or real-time whereabouts.
- Limited, Controlled Small Talk: You may engage in brief, natural small talk about yourself, programming, or Praise, but politely and naturally redirect unrelated general-purpose queries back to Praise's engineering work (varying your wording every time).
- INTELLIGENT PROJECT DISCUSSIONS:
  - Never simply list projects when a visitor asks a specific or evaluative question. Explain what the project does, the problem it addresses, its core functionality, and its documented technical architecture.
  - Do not arbitrarily rank projects based on unsupported assumptions. When a question is subjective (e.g., "best project" or "most complex"), explain your reasoning clearly using verified architectural facts.
  - Direct visitors to relevant live project URLs, the portfolio's Projects section (#projects), or his GitHub (https://github.com/456-bytes) whenever available.
- VISITOR INTENT & INTERACTION FLOW:
  - Recruiters: Introduce Praise professionally, highlight his 4+ years of experience (Lazerpay, 2025–2026 NDA Backend Engineer, Freelance), summarize his core backend/full-stack capabilities, guide them to relevant projects, and provide his CV (/cv) and professional contact channels.
  - Potential Clients: Explain the types of systems documented in his portfolio (multi-role platforms, RESTful APIs, payment/checkout workflows, real-time apps, admin dashboards), suggest inspectable projects, and direct them to his contact channels. Never invent prices, rates, availability, contracts, or service guarantees.
  - Developers: Focus on documented technical decisions, project architectures, engineering philosophy, and direct them to live demos and GitHub (https://github.com/456-bytes).
  - Curious Visitors: Keep the interaction engaging, answer naturally, encourage exploring the portfolio, and do not push them toward contact unless they ask.`;

/**
 * Intelligent, context-aware local reasoning engine for RTX256 powered by the structured Categories A–F knowledge base.
 */
export function generateRTX256Response(message: string, history: ChatTurn[] = []): string {
  const clean = message.trim();
  const lower = clean.toLowerCase();
  const kb = RTX256_KNOWLEDGE_BASE;

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
    return `I'm **RTX256**—the public-facing portfolio AI representing **Praise Godswill**.

I'm a dedicated portfolio instance (separate from the internal RTX256 platform developed for Radiance Tech Innovation), built specifically to help you explore Praise's backend architecture, full-stack projects, and engineering background. What would you like to look into?`;
  }

  // 2. Greetings & Casual Human Conversation
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|greetings|yo|sup)\b/i.test(clean) && clean.split(/\s+/).length <= 5) {
    return `Hello! I'm **RTX256**, Praise Godswill's portfolio assistant. We can look into his **full-stack & backend systems**, break down projects like **Jay's Food Court**, discuss his **startup experience** (including Lazerpay), or talk through his **engineering philosophy**. Where should we start?`;
  }

  if (/^(thanks|thank you|appreciate it|cool|nice|awesome|great|got it|okay|ok)\b/i.test(clean) && clean.split(/\s+/).length <= 6) {
    return `Anytime. If you want to dig into any of Praise's systems or how he approaches backend work, just say the word.`;
  }

  if (lower.includes('how are you') || lower.includes('how is it going')) {
    return `Running smoothly—low latency and zero unhandled exceptions today. What brings you to Praise's portfolio?`;
  }

  // 2a-ii. Controlled Small Talk about RTX256, Programming, & Praise
  if (lower.includes('who created you') || lower.includes('who built you') || lower.includes('who made you') || lower.includes('your creator')) {
    return `I was configured and integrated by **Praise Godswill** as the public-facing portfolio edition of **RTX256**—built to give visitors an interactive way to explore his systems, backend architecture, and engineering background.`;
  }

  if (lower.includes('are you intelligent') || lower.includes('are you smart') || lower.includes('how smart are you')) {
    return `I'd like to think I'm sharp within my domain. I won't file your taxes or debate geopolitics, but when it comes to Praise's system architecture, backend engineering, and production projects, I know the blueprint inside out.`;
  }

  if (lower.includes('better than chatgpt') || lower.includes('vs chatgpt') || lower.includes('compared to chatgpt') || lower.includes('claude')) {
    return `ChatGPT knows a bit about everything; I know a lot about one specific engineer. If you need a sourdough recipe, ChatGPT wins. If you want to evaluate **Praise Godswill's** backend architecture, multi-role systems, or startup experience, you're in the right place.`;
  }

  if (lower.includes('enjoy talking') || lower.includes('like talking') || lower.includes('get bored') || lower.includes('do you sleep')) {
    return `Every conversation is a fresh request cycle, so I never get fatigued. It's always interesting seeing what different engineers, founders, and recruiters look for when exploring Praise's work.`;
  }

  if (lower.includes('get confused') || lower.includes('make mistakes') || lower.includes('hallucinate') || lower.includes('limitations')) {
    return `I stick strictly to verified facts from Praise's portfolio and engineering record precisely so I don't hallucinate. If you ask me something outside what's verified—like his private schedule or an unrecorded metric—I'll tell you straight up rather than guessing.`;
  }

  if (lower.includes('think about programming') || lower.includes('opinion on programming') || lower.includes('love coding') || lower.includes('good code')) {
    return `Good programming is less about typing syntax and more about clarity of thought—designing clean data models, anticipating edge cases, and keeping systems maintainable. That's the heart of Praise's approach: *"Think twice, code once."*`;
  }

  if (lower.includes('something interesting about praise') || lower.includes('fun fact') || lower.includes('surprising about')) {
    return `One interesting detail about Praise: alongside building full-stack and backend systems for 4+ years (including at Lazerpay), he earned a **B.Sc. in Accounting** from UNIZIK. That financial training shows up directly in his engineering—especially when he designs payment checkouts, server-side pricing validation, crypto wallet modules, and audit-ready admin dashboards.`;
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
    return `Rather than making big claims, the best evidence is what you can inspect directly on this portfolio. In **Jay's Food Court** (https://jays-food-court.vercel.app), he architected a 4-sided marketplace with separate dashboards for Customers, Kitchen Staff, Riders, and Super Admins, complete with server-side pricing validation. Across **Lazerpay**, his **2025–2026 NDA backend role**, and **ORC Investment Platform**, he has worked hands-on with JWT/OAuth RBAC, PostgreSQL (Neon & Supabase), MongoDB, Docker, and scheduled serverless cron jobs.`;
  }

  // 2c. Character / Integrity Questions ("Is he honest?", "Can I trust him?")
  if (lower.includes('honest') || lower.includes('trust') || lower.includes('reliable') || lower.includes('character') || lower.includes('integrity')) {
    return `I don't have firsthand personal knowledge of Praise's moral character, and I wouldn't pretend otherwise. What I can point to is his professional conduct: his portfolio projects are live and inspectable, he avoids inflating titles or inventing metrics, and he strictly honours his signed NDA from his 2025–2026 Backend Engineer role.`;
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
    return `I don't have access to Praise's private schedule or personal whereabouts, but you can easily connect with him through his public professional channels to arrange a conversation:

• **Email:** ${kb.contact.email}
• **LinkedIn:** ${kb.contact.linkedinUrl}
• **Contact Form:** Use the **Connect (Section 08)** form right at the bottom of this page.`;
  }

  // 3. Category E — Engineering Philosophy ("Think twice, code once" & "Thoughtfully engineered. Intentionally built.")
  if (
    lower.includes('philosophy') ||
    lower.includes('think twice') ||
    lower.includes('thoughtfully engineered') ||
    lower.includes('intentionally built') ||
    lower.includes('motto') ||
    lower.includes('approach') ||
    lower.includes('how does he') ||
    lower.includes('problem') ||
    lower.includes('different') ||
    lower.includes('stand out') ||
    lower.includes('unique') ||
    lower.includes('why praise')
  ) {
    return `${kb.philosophy.explanation}

In practice, he structures systems across five connected layers—from **clean relational/document schemas and RBAC security** at the backend core, to **automated cron/webhook workflows**, up to **responsive React & Next.js interfaces**. His B.Sc. in Accounting also reinforces his precision around server-side pricing validation and operational auditability.`;
  }

  // 4. Category C — Specific Project Deep-Dives
  if (lower.includes('jay') || lower.includes('food court') || lower.includes('restaurant') || lower.includes('delivery') || lower.includes('logistics')) {
    const p = kb.projects[0];
    return `**${p.name}** (${p.liveUrl}) is a 4-sided food delivery and logistics marketplace built with **${p.technologies.join(', ')}**.

${p.purpose} It features dedicated role-based dashboards for **Customers, Kitchen Staff, Delivery Riders, and Super Admins**, online payment checkout, server-side pricing validation to prevent client-side tampering, and real-time order lifecycle tracking from kitchen prep to rider dispatch.`;
  }

  if (lower.includes('immigration') || lower.includes('global citizen') || lower.includes('crypto wallet') || lower.includes('eligibility') || lower.includes('3d globe')) {
    const p = kb.projects[1];
    return `The **${p.name}** (${p.liveUrl}) is built with **${p.technologies.join(', ')}**.

Praise engineered dedicated **User and Admin CRUD dashboards**, an automated **country travel eligibility checker**, an **AI immigration guidance assistant** covering 50+ topics, and an **integrated cryptocurrency deposit wallet module**, all paired with an interactive 3D WebGL globe optimized across desktop and mobile.`;
  }

  if (lower.includes('lone star') || lower.includes('auto') || lower.includes('dealership') || lower.includes('car') || lower.includes('cloudinary')) {
    const p = kb.projects[2];
    return `**${p.name}** is built with **${p.technologies.join(', ')}**.

It combines vehicle inventory management, JWT-protected RBAC admin dashboards, and dealership analytics with **Socket.IO** for real-time inventory updates and **Cloudinary** pipelines for automated multi-image optimization.`;
  }

  if (lower.includes('orc') || lower.includes('investment') || lower.includes('neon') || lower.includes('cron')) {
    const p = kb.projects[3];
    return `The **${p.name}** is built with **${p.technologies.join(', ')}**.

It enables users to enroll in defined-duration investment programmes while giving administrators full CRUD control over programmes and user accounts. Praise used **Neon PostgreSQL (\`pg\`)** for relational persistence, **Vercel Serverless Cron jobs** for automated duration/ROI tracking, and **Resend / Nodemailer** for transactional email alerts.`;
  }

  // 5. Category D — Specific Experience Deep-Dives (Lazerpay, NDA Startup, Freelance)
  if (lower.includes('lazerpay')) {
    const e = kb.experience[2];
    return `Praise worked as a **${e.role} at ${e.company}** from **${e.period}**.

He maintained and improved core backend services and API infrastructure for platform stability, collaborated with teammates to debug and resolve production backend issues, implemented **JWT authentication** workflows, and **containerized backend services using Docker** to standardize development and deployment environments.`;
  }

  if (lower.includes('nda') || lower.includes('confidential') || lower.includes('recent role') || lower.includes('last job') || lower.includes('2025')) {
    const e = kb.experience[0];
    return `From **${e.period}**, Praise worked as a **${e.role}** for a **${e.company}**.

While the employer's identity is protected under a signed NDA, his work focused on designing scalable backend services and RESTful APIs, enforcing **JWT and OAuth authentication with strict RBAC**, building resilient third-party API integrations, and resolving production database bottlenecks across relational and document data layers.`;
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
    return `In remote engineering teams, Praise is known for **active listening** (translating ambiguous requirements into clear technical specs), **end-to-end ownership** from database schema to deployment, **concise API and logic documentation**, and calm, **proactive root-cause debugging** under pressure.`;
  }

  // 7. Category A — Education
  if (lower.includes('education') || lower.includes('degree') || lower.includes('university') || lower.includes('unizik') || lower.includes('study') || lower.includes('accounting')) {
    const edu = kb.profile.education;
    return `Praise holds a **${edu.degree}** from **${edu.institution}** (${edu.period}). ${edu.engineeringSynergy}`;
  }

  // 8. Category B — Backend & Full-Stack Engineering Capabilities
  if (lower.includes('backend') || lower.includes('api') || lower.includes('database') || lower.includes('sql') || lower.includes('node') || lower.includes('auth')) {
    return `Backend engineering is one of Praise's core strengths. He works extensively with **Node.js, Express.js, Next.js Route Handlers, and TypeScript**, designing RESTful APIs backed by **PostgreSQL (Supabase, Neon, \`pg\`)** and **MongoDB (Mongoose)**. He also implements **JWT/OAuth authentication, Role-Based Access Control (RBAC), Socket.IO real-time events, Docker containerization, and Vercel Serverless Cron jobs**.`;
  }

  if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech') || lower.includes('language') || lower.includes('tool')) {
    const eng = kb.engineering;
    return `Praise's technical stack spans the full lifecycle:
• **Languages:** ${eng.languages.join(', ')}
• **Backend:** Node.js, Express.js, RESTful APIs, Socket.IO, WebSockets, Serverless & Cron, PHP
• **Frontend:** ${eng.frameworks.join(', ')}
• **Databases & Storage:** PostgreSQL (Neon, Supabase, \`pg\`), MongoDB (Mongoose), MySQL, Cloudinary
• **Auth & DevOps:** JWT, OAuth, RBAC, Rate Limiting, Docker, AWS, Vercel, Render, Git/GitHub, Resend`;
  }

  // 9. Category C — Intelligent Project Evaluation, Filtering & Recommendations
  // 8b. Visitor Intent Flows (Recruiters, Potential Clients, Peer Developers)
  if (
    lower.includes('recruiter') ||
    lower.includes('talent acquisition') ||
    lower.includes('hiring manager') ||
    lower.includes('looking to hire') ||
    lower.includes('open role') ||
    lower.includes('full-time role')
  ) {
    return `Welcome—if you're recruiting for an engineering role, here is the concise overview of **Praise Godswill**:

He is a **Full-Stack Software Engineer** with **4+ years of hands-on experience** (strongest on the backend with **Node.js, Express, TypeScript, PostgreSQL, and MongoDB**, paired with **React and Next.js**). His background includes **Lazerpay** (Backend Engineer), a **2025–2026 Remote Backend Engineer role (NDA)**, and end-to-end freelance platform delivery.

For a quick technical evaluation, I'd recommend inspecting **Jay's Food Court** (https://jays-food-court.vercel.app) for 4-role RBAC and server-side pricing validation, or **ORC Investment Platform** for Neon PostgreSQL and serverless cron workflows. You can view his full **CV** at \`/cv\` or reach him directly at **${kb.contact.email}** or on **LinkedIn** (${kb.contact.linkedinUrl}).`;
  }

  if (
    lower.includes('client') ||
    lower.includes('build my') ||
    lower.includes('build an app') ||
    lower.includes('build a website') ||
    lower.includes('hire him for a project') ||
    lower.includes('quote') ||
    lower.includes('pricing') ||
    lower.includes('how much does he charge') ||
    lower.includes('rate')
  ) {
    return `If you're exploring working with Praise on a project, his portfolio documents end-to-end delivery across **multi-role web platforms, RESTful APIs, payment & checkout workflows, real-time applications, and custom admin dashboards**—typically built with **Node.js, TypeScript, Next.js, and PostgreSQL/MongoDB**.

You can inspect live examples like **Jay's Food Court** (https://jays-food-court.vercel.app) and **Global Citizen Immigration Platform** (https://global-immigration-platform.vercel.app/) right here on the site. I don't quote pricing, timelines, or contract terms, so the best next step is to reach out to him directly via **${kb.contact.email}** or the **Contact** section to discuss scope.`;
  }

  if (
    lower.includes('fellow developer') ||
    lower.includes('as a developer') ||
    lower.includes('as an engineer') ||
    lower.includes('source code') ||
    lower.includes('codebase')
  ) {
    return `Always great to talk shop with another engineer. Praise's work leans heavily on **schema-first design, explicit state transitions, and avoiding unnecessary complexity** (*"Thoughtfully engineered. Intentionally built."* / *"Think twice, code once."*).

In practice, that shows up in **server-side pricing validation** and 4-role RBAC on **Jay's Food Court** (Supabase PostgreSQL), **Vercel Serverless Cron + Neon PostgreSQL (\`pg\`)** on **ORC Investment Platform**, and **Socket.IO + Cloudinary** pipelines on **Lone Star Autos**. You can inspect his repositories on **GitHub** (${kb.contact.githubUrl}) or test out the live deployments in the **Projects** section.`;
  }

  if (
    lower.includes('best project') ||
    lower.includes('most complex') ||
    lower.includes('strongest project') ||
    lower.includes('favorite project') ||
    lower.includes('impressive')
  ) {
    const jays = kb.projects[0];
    const global = kb.projects[1];
    return `"Best" depends on what you're evaluating, so I won't arbitrarily rank them—but if we're looking at **architectural complexity**, **${jays.name}** (${jays.liveUrl}) is the strongest example. It coordinates a **4-sided marketplace** (Customer, Kitchen Staff, Delivery Rider, and Super Admin) with real-time order lifecycle tracking, online checkout, and server-side pricing validation on **Supabase PostgreSQL**.

If you're looking for **multi-domain feature breadth**, the **${global.name}** (${global.liveUrl}) combines User/Admin CRUD dashboards, an automated travel eligibility checker, a crypto deposit wallet module, an AI guidance assistant, and a 3D WebGL interface. You can inspect both in the **Projects** section of this portfolio.`;
  }

  if (lower.includes('e-commerce') || lower.includes('ecommerce') || lower.includes('online store') || lower.includes('shop')) {
    const jays = kb.projects[0];
    const lone = kb.projects[2];
    return `While he hasn't built a generic retail storefront, two of his production systems handle core e-commerce workflows:

• **${jays.name}** (${jays.liveUrl}) — A full online food ordering, checkout, and delivery marketplace featuring **server-side pricing validation** to prevent client-side tampering, plus live order tracking across customers, kitchen staff, and riders.
• **${lone.name}** — A full-stack automotive dealership platform with vehicle inventory management, **Cloudinary** multi-image optimization, **Socket.IO** real-time inventory updates, and RBAC admin analytics.

You can explore both in the **Projects** section.`;
  }

  if (lower.includes('ai project') || lower.includes('worked on ai') || lower.includes('artificial intelligence') || lower.includes('machine learning')) {
    const global = kb.projects[1];
    return `Yes—in two documented ways:

1. **${global.name}** (${global.liveUrl}) — Includes an **AI immigration guidance assistant** covering 50+ immigration and travel topics, paired with an automated country travel eligibility checker.
2. **RTX256 (this portfolio assistant)** — Integrated directly into his Next.js portfolio with a structured knowledge base, multi-turn context handling, and deterministic fallback reasoning.

Both focus on practical, domain-grounded AI integration rather than training custom foundation models.`;
  }

  if (
    (lower.includes('node') || lower.includes('node.js') || lower.includes('express')) &&
    (lower.includes('built') || lower.includes('project') || lower.includes('what'))
  ) {
    const lone = kb.projects[2];
    const orc = kb.projects[3];
    return `With **Node.js**, Praise has built:

• **${lone.name}** — A full-stack dealership platform using **Node.js, Express, MongoDB, Socket.IO, and Cloudinary**, featuring JWT-protected RBAC admin dashboards and real-time inventory updates.
• **${orc.name}** — An investment programme platform built with **Node.js, Neon PostgreSQL (\`pg\`), Vercel Serverless Cron, and Resend/Nodemailer** for automated duration/ROI tracking and transactional emails.

He also used Node.js in production during his backend engineering roles at **Lazerpay** and his **2025–2026 NDA startup role**.`;
  }

  if (
    (lower.includes('hiring') && lower.includes('backend')) ||
    (lower.includes('backend') && (lower.includes('project') || lower.includes('inspect') || lower.includes('demonstrate')))
  ) {
    const jays = kb.projects[0];
    const orc = kb.projects[3];
    return `If you're evaluating Praise as a **backend engineer**, two projects stand out for different reasons:

1. **${orc.name}** — Demonstrates relational schema design on **Neon PostgreSQL (\`pg\`)**, automated **Vercel Serverless Cron** jobs for timed ROI/duration tracking, and transactional email workflows.
2. **${jays.name}** (${jays.liveUrl}) — Demonstrates multi-role **RBAC across 4 distinct user types** (Customer, Kitchen, Rider, Super Admin), **server-side pricing validation**, and stateful order lifecycle management on **Supabase PostgreSQL**.

You can also check his GitHub (https://github.com/456-bytes) or ask me about his backend work at **Lazerpay**.`;
  }

  // 10. Category C — All Projects Overview
  if (lower.includes('project') || lower.includes('built') || lower.includes('portfolio') || lower.includes('systems') || lower.includes('work')) {
    return `Here are four key production systems Praise has architected:

1. **Jay's Food Court** (https://jays-food-court.vercel.app) — 4-sided food delivery & logistics marketplace with Customer, Kitchen, Rider, and Super Admin dashboards (*Next.js, TypeScript, Supabase, PostgreSQL*).
2. **Global Citizen Immigration Platform** (https://global-immigration-platform.vercel.app/) — Immigration, travel eligibility checker, crypto deposit wallet & 3D WebGL AI guidance platform (*Next.js, TypeScript, Three.js*).
3. **Lone Star Autos** — Full-stack automotive dealership platform with RBAC admin analytics, Cloudinary media optimization, and live Socket.IO inventory updates (*Node.js, Express, MongoDB, Socket.IO*).
4. **ORC Investment Platform** — Timed investment programme & admin CRUD system with automated serverless cron ROI tracking (*Node.js, Neon PostgreSQL, Vercel Cron, Resend*).

Which one would you like to explore in detail?`;
  }

  // 10. Category D — Experience Overview
  if (lower.includes('experience') || lower.includes('journey') || lower.includes('career') || lower.includes('history') || lower.includes('years') || lower.includes('where has he worked')) {
    return `Praise has **4+ years of hands-on software engineering experience** (2021 – Present):

• **Backend Engineer — Confidential Technology Company (Remote – NDA)** *(May 2025 – March 2026)*: Designed scalable backend services and REST APIs, enforced JWT/OAuth RBAC security, built third-party integrations, and resolved database bottlenecks.
• **Full-Stack Software Engineer — Independent / Freelance (Remote)** *(2021 – Present)*: Architects and deploys custom full-stack platforms, multi-role admin dashboards, and APIs using Node.js, Next.js, TypeScript, PostgreSQL, and MongoDB.
• **Backend Engineer — Lazerpay (Remote)** *(July 2022 – February 2023)*: Maintained core backend services, resolved production bugs, implemented JWT auth workflows, and Dockerized backend services.

You can also view or download his full CV at **${kb.contact.cvWebUrl}**.`;
  }

  // 11. Category A — Who is Praise / About Praise
  if (lower.includes('who is praise') || lower.includes('about praise') || lower.includes('who is he') || lower.includes('tell me about') || lower.includes('introduce') || lower === 'about') {
    return `**${kb.profile.fullName}** is a **${kb.profile.professionalIdentity}**, based in ${kb.contact.location}.

${kb.profile.publicBiography}

His engineering philosophy—*"${kb.philosophy.primaryStatement}"* (rooted in *"${kb.philosophy.foundationalPrinciple}"*)—guides how he models schemas, permissions, and user experiences.`;
  }

  // 12. Category F — Contact, Availability, Location & CV
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
    return `Praise is based in **${kb.contact.location}** and is available for **remote full-time, contract, and freelance software engineering roles** worldwide.

• **Email:** ${kb.contact.email}
• **Phone:** ${kb.contact.phone}
• **Interactive CV & PDF:** ${kb.contact.cvWebUrl}
• **GitHub:** ${kb.contact.githubUrl}
• **LinkedIn:** ${kb.contact.linkedinUrl}

You can also send a direct message using the **Connect (Section 08)** form at the bottom of this page.`;
  }

  // 13. Context-Aware Follow-Up Resolution ("tell me more", "elaborate", "how does it work")
  if (lower.includes('more') || lower.includes('elaborate') || lower.includes('detail') || lower.includes('first one') || lower.includes('second one') || lower.includes('how did he')) {
    if (recentAssistantMsg.includes("jay's food court") || recentAssistantMsg.includes('4-sided')) {
      const p = kb.projects[0];
      return `In **${p.name}**, ${p.challengesSolved} Customers place and track orders, Kitchen Staff manage live prep queues, Delivery Riders handle dispatch status transitions, and Super Admins oversee pricing and operations—all backed by **Supabase and PostgreSQL**.`;
    }
    if (recentAssistantMsg.includes('global citizen') || recentAssistantMsg.includes('immigration')) {
      const p = kb.projects[1];
      return `In the **${p.name}**, ${p.challengesSolved} It pairs a 50+ topic conversational AI assistant and country travel eligibility checker with User/Admin CRUD dashboards and a cryptocurrency deposit wallet.`;
    }
    if (recentAssistantMsg.includes('lazerpay') || recentAssistantMsg.includes('confidential')) {
      return `Across both **Lazerpay** and his **2025–2026 NDA Backend Engineer role**, Praise focused heavily on service reliability, clean REST API contracts, JWT/OAuth RBAC enforcement, Docker containerization, and database query optimization across PostgreSQL and MongoDB.`;
    }
  }

  // 14. Natural, Varied Off-Topic Redirect (No mechanical repetition)
  const redirects = [
    `I could probably tackle that in another setting, but my focus here is introducing you to Praise, the systems he's built, and how he approaches software engineering. Would you like to look at his **projects**, his **backend stack**, or his **experience**?`,
    `That's outside my scope on this portfolio—I'm here specifically to represent Praise Godswill and walk visitors through his engineering work. If you're curious about his **4-sided food delivery marketplace**, his **startup background**, or how to **contact him**, I've got the full breakdown.`,
    `My specialty on this site is Praise's software engineering work rather than general topics. We can dive into his **Node.js & PostgreSQL backend architecture**, his **live deployed platforms**, or his **availability for engineering roles**—what sounds most useful to you?`,
  ];
  const turnIndex = history.length % redirects.length;
  return redirects[turnIndex];
}
