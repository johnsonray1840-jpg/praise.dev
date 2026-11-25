const fs = require('fs');
const path = require('path');

/**
 * Generates an authentic, 100% text-selectable, ATS-scannable 2-page PDF (A4: 595.28 x 841.89 pt)
 * using native PDF Type1 Helvetica / Helvetica-Bold / Helvetica-Oblique fonts.
 * Zero external dependencies required.
 */

function escapePdfText(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/•/g, '|')
    .replace(/“|”/g, '"')
    .replace(/’|‘/g, "'");
}

function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxChars) {
      lines.push(current.trim());
      current = w;
    } else {
      current = (current + ' ' + w).trim();
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines;
}

class PDFBuilder {
  constructor() {
    this.pages = [[]];
    this.currentPage = 0;
    this.y = 800;
    this.leftMargin = 44;
    this.rightMargin = 551;
  }

  ensureSpace(needed) {
    if (this.y - needed < 40) {
      this.pages.push([]);
      this.currentPage++;
      this.y = 800;
    }
  }

  cmd(str) {
    this.pages[this.currentPage].push(str);
  }

  addText(text, x, y, font = 'F1', size = 10, color = [0.1, 0.12, 0.16]) {
    const [r, g, b] = color;
    const safe = escapePdfText(text);
    this.cmd(`BT /${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${safe}) Tj ET`);
  }

  addLine(y, color = [0.88, 0.9, 0.92], width = 0.75) {
    const [r, g, b] = color;
    this.cmd(`${width} w ${r} ${g} ${b} RG ${this.leftMargin} ${y.toFixed(2)} m ${this.rightMargin} ${y.toFixed(2)} l S`);
  }

  addSectionHeader(title) {
    this.ensureSpace(32);
    this.y -= 6;
    this.addLine(this.y + 10);
    this.y -= 3;
    this.addText(title.toUpperCase(), this.leftMargin, this.y, 'F2', 8.5, [0.42, 0.45, 0.5]);
    this.y -= 13;
  }

  addParagraph(text, font = 'F1', size = 9.2, lineHeight = 12.2, maxChars = 104, color = [0.15, 0.18, 0.22]) {
    const lines = wrapText(text, maxChars);
    this.ensureSpace(lines.length * lineHeight + 2);
    for (const line of lines) {
      this.addText(line, this.leftMargin, this.y, font, size, color);
      this.y -= lineHeight;
    }
  }

  addSkillRow(category, items) {
    this.ensureSpace(14);
    this.addText(category + ':', this.leftMargin, this.y, 'F2', 9.0, [0.06, 0.09, 0.15]);
    const catWidth = category.length * 4.8 + 10;
    const wrapped = wrapText(items, 88);
    wrapped.forEach((line, idx) => {
      this.addText(line, this.leftMargin + (idx === 0 ? Math.max(125, catWidth) : 125), this.y, 'F1', 9.0, [0.22, 0.25, 0.31]);
      this.y -= 11.8;
    });
  }

  addRole(title, company, period, bullets) {
    this.ensureSpace(38);
    this.addText(title, this.leftMargin, this.y, 'F2', 10.0, [0.04, 0.06, 0.1]);
    const periodX = this.rightMargin - period.length * 4.6;
    this.addText(period, periodX, this.y, 'F1', 8.6, [0.42, 0.45, 0.5]);
    this.y -= 11.5;
    this.addText(company, this.leftMargin, this.y, 'F2', 9.0, [0.11, 0.3, 0.85]);
    this.y -= 12.5;

    for (const b of bullets) {
      const lines = wrapText(b, 100);
      this.ensureSpace(lines.length * 11.5 + 2);
      this.addText('-', this.leftMargin + 5, this.y, 'F2', 9.0, [0.4, 0.45, 0.52]);
      for (const line of lines) {
        this.addText(line, this.leftMargin + 14, this.y, 'F1', 9.0, [0.2, 0.23, 0.28]);
        this.y -= 11.5;
      }
      this.y -= 1.5;
    }
    this.y -= 4;
  }

  addProject(name, link, stack, bullets) {
    this.ensureSpace(38);
    this.addText(name, this.leftMargin, this.y, 'F2', 9.8, [0.04, 0.06, 0.1]);
    if (link) {
      const linkX = this.rightMargin - link.length * 4.4;
      this.addText(link, linkX, this.y, 'F1', 8.4, [0.11, 0.3, 0.85]);
    }
    this.y -= 11.5;
    this.addText(stack, this.leftMargin, this.y, 'F3', 8.4, [0.35, 0.39, 0.45]);
    this.y -= 12;

    for (const b of bullets) {
      const lines = wrapText(b, 100);
      this.ensureSpace(lines.length * 11.5 + 2);
      this.addText('-', this.leftMargin + 5, this.y, 'F2', 9.0, [0.4, 0.45, 0.52]);
      for (const line of lines) {
        this.addText(line, this.leftMargin + 14, this.y, 'F1', 9.0, [0.2, 0.23, 0.28]);
        this.y -= 11.5;
      }
      this.y -= 1.5;
    }
    this.y -= 4;
  }

  build() {
    const objects = [];
    const addObj = (content) => {
      objects.push(content);
      return objects.length;
    };

    // 1: Catalog, 2: Pages placeholder
    addObj('<< /Type /Catalog /Pages 2 0 R >>');
    addObj(''); // Pages placeholder

    // Fonts: 3=Helvetica, 4=Helvetica-Bold, 5=Helvetica-Oblique
    const f1 = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    const f2 = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    const f3 = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');

    const pageIds = [];
    for (const cmds of this.pages) {
      const streamData = cmds.join('\n');
      const streamId = addObj(`<< /Length ${Buffer.byteLength(streamData, 'utf8')} >>\nstream\n${streamData}\nendstream`);
      const pageId = addObj(
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R /F3 ${f3} 0 R >> >> /Contents ${streamId} 0 R >>`
      );
      pageIds.push(pageId);
    }

    objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    for (let i = 0; i < objects.length; i++) {
      offsets.push(Buffer.byteLength(pdf, 'utf8'));
      pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
    }

    const xrefOffset = Buffer.byteLength(pdf, 'utf8');
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= objects.length; i++) {
      pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
    }
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
    return pdf;
  }
}

const pdf = new PDFBuilder();

// HEADER
pdf.addText('PRAISE GODSWILL', 48, pdf.y, 'F2', 20, [0.04, 0.06, 0.1]);
pdf.addText('"Think twice, code once. Engineered to scale."', 345, pdf.y + 2, 'F3', 8.8, [0.42, 0.45, 0.5]);
pdf.y -= 16;
pdf.addText('Full-Stack Software Engineer', 48, pdf.y, 'F2', 11.5, [0.11, 0.3, 0.85]);
pdf.y -= 15;
pdf.addText(
  'Lekki Orchid, Lagos, Nigeria  |  09018403385  |  praisegodswill23@gmail.com  |  praise-dev-pi.vercel.app',
  48,
  pdf.y,
  'F1',
  8.8,
  [0.28, 0.32, 0.38]
);
pdf.y -= 12;
pdf.addText(
  'GitHub: https://github.com/456-bytes  |  LinkedIn: https://linkedin.com/in/praise-godswill-85ab38205',
  48,
  pdf.y,
  'F1',
  8.8,
  [0.28, 0.32, 0.38]
);
pdf.y -= 8;

// SUMMARY
pdf.addSectionHeader('Professional Summary');
pdf.addParagraph(
  'Full-Stack Software Engineer with 5+ years of hands-on experience designing, building, debugging, and maintaining production web applications and backend systems. Strong backend engineering foundation in Node.js, Express.js, TypeScript, RESTful API design, PostgreSQL, and MongoDB, paired with modern frontend execution in React and Next.js. Experienced in implementing secure authentication and authorisation (JWT, OAuth, session workflows), real-time event architectures (Socket.IO), third-party service integrations, containerised services (Docker), and cloud deployment pipelines. Proven track record of taking end-to-end technical ownership across startup and freelance engineering environments.',
  'F1',
  9.3,
  13.2,
  98
);

// TECHNICAL SKILLS
pdf.addSectionHeader('Technical Skills & Core Competencies');
pdf.addSkillRow('Languages', 'JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3');
pdf.addSkillRow('Backend Engineering', 'Node.js, Express.js, RESTful APIs, Socket.IO, WebSockets, Serverless & Cron, PHP');
pdf.addSkillRow('Frontend Engineering', 'React, Next.js (App Router & SSR), Tailwind CSS, Three.js / WebGL, Bootstrap, EJS');
pdf.addSkillRow('Databases & Storage', 'PostgreSQL (Neon, Supabase, node-postgres), MongoDB (Mongoose), MySQL, Cloudinary');
pdf.addSkillRow('Auth & Security', 'JWT Authentication, OAuth, Role-Based Access Control (RBAC), Session Management');
pdf.addSkillRow('DevOps & Cloud', 'Docker, Vercel, Render, AWS, Firebase, CI/CD, Git, GitHub, Postman, Resend / Nodemailer');

// PROFESSIONAL EXPERIENCE
pdf.addSectionHeader('Professional Experience');

pdf.addRole(
  'Backend Engineer',
  'Confidential Technology Company (Remote - NDA)',
  'May 2025 - March 2026',
  [
    'Designed, developed, and maintained backend services and RESTful API endpoints supporting core application workflows within a distributed remote engineering team.',
    'Implemented secure authentication and authorisation mechanisms using JWT and OAuth, enforcing strict access control and request validation across protected service routes.',
    'Built and maintained third-party API integrations and asynchronous data processing handlers, ensuring reliable service-to-service communication and graceful error handling.',
    'Diagnosed, debugged, and resolved application bottlenecks and production defects across backend modules and relational/document database layers.',
    'Collaborated with frontend and product stakeholders in an agile remote environment to deliver maintainable, well-documented backend releases.',
  ]
);

pdf.addRole(
  'Full-Stack Software Engineer',
  'Independent / Freelance Engineering (Remote)',
  '2021 - Present',
  [
    'Architect and deliver end-to-end full-stack web applications and operational software systems for clients and businesses, taking ownership from database schema design through production deployment.',
    'Engineer backend architectures and RESTful APIs using Node.js, Express.js, Next.js Route Handlers, PostgreSQL, and MongoDB to support complex business logic, CRUD workflows, and data persistence.',
    'Implement secure user authentication, role-based administrative dashboards, session handling, and automated transactional email pipelines (Resend, Nodemailer).',
    'Develop responsive, accessible frontend interfaces using React, Next.js, TypeScript, and Tailwind CSS that translate complex operational data into intuitive user experiences.',
    'Maintain, troubleshoot, refactor, and optimise existing client codebases-resolving runtime bugs, improving query efficiency, and managing cloud deployments on Vercel and Render.',
  ]
);

pdf.addRole(
  'Backend Engineer',
  'Lazerpay (Remote)',
  'July 2022 - February 2023',
  [
    'Maintained and supported existing backend services and API systems, contributing to ongoing platform stability, functionality, and operational reliability.',
    'Investigated, debugged, and resolved backend defects across existing codebases, working closely with engineering teammates to troubleshoot service issues.',
    'Implemented JWT-based authentication workflows and contributed to backend API functionality and service architecture enhancements.',
    'Containerised backend services using Docker to standardise local development and deployment environments across the engineering team.',
    'Contributed to system maintainability and scaling efforts while collaborating asynchronously within a remote engineering workflow.',
  ]
);

// SELECTED PROJECTS
pdf.addSectionHeader('Selected Engineering Projects');

pdf.addProject(
  "Jay's Food Court - Full-Stack Restaurant Ordering & Operations Platform",
  'https://jays-food-court.vercel.app',
  'Next.js  |  TypeScript  |  Supabase  |  PostgreSQL  |  Tailwind CSS  |  Server-Side Order Workflows',
  [
    'Architected and built a full-stack restaurant ordering and internal operations platform uniting customer ordering, kitchen processing, and rider delivery workflows in a database-driven system.',
    'Engineered a mobile-first customer ordering interface supporting category & menu management, item customisation, guest checkout, secure customer session handling, and delivery address management.',
    'Implemented server-side pricing validation and structured order lifecycle management-connecting order placement, kitchen preparation queues, rider dispatch workflows, and live order status tracking backed by Supabase and PostgreSQL.',
  ]
);

pdf.addProject(
  'Global Citizen Immigration Platform - Interactive 3D & AI Guidance System',
  'https://global-immigration-platform.vercel.app/',
  'Next.js  |  React  |  TypeScript  |  Three.js / WebGL  |  Conversational AI Engine  |  Tailwind CSS',
  [
    'Developed an interactive digital guidance platform designed to make complex immigration information accessible through a modern, responsive web experience.',
    'Engineered an AI-powered conversational assistant structured around 50+ immigration questions, topics, and pathway categories to deliver instant, context-aware informational responses.',
    'Integrated an interactive 3D WebGL globe alongside a responsive frontend architecture, balancing rich 3D visual rendering with cross-device performance and usability.',
  ]
);

pdf.addProject(
  'Lone Star Autos - Full-Stack Automotive Dealership & Real-Time Inventory Platform',
  'github.com/456-bytes',
  'Node.js  |  Express.js  |  MongoDB  |  Socket.IO  |  Cloudinary  |  JWT Authentication',
  [
    'Built a full-stack automotive dealership system combining vehicle inventory management, real-time customer-dealer communication, and administrative operations.',
    'Designed the backend REST API architecture and MongoDB data models with secure authentication and protected administrative workflows for vehicle listings and dealership analytics.',
    'Integrated Socket.IO for real-time event updates and bidirectional communication, alongside Cloudinary media pipelines for automated multi-image upload and delivery optimisation.',
  ]
);

pdf.addProject(
  'ORC Investment Platform - Investment Programme & Administrative Management System',
  'github.com/456-bytes',
  'Node.js  |  Vanilla JS  |  HTML5 / Tailwind CSS / CSS3  |  Neon PostgreSQL (pg)  |  Resend / Nodemailer  |  Vercel Cron',
  [
    'Developed a full-stack investment programme management platform enabling users to enrol in structured investment programmes and track returns according to defined programme durations and terms.',
    'Engineered a comprehensive administrative dashboard with full CRUD control over investment programmes, centralized user account monitoring, and oversight of system-wide investment activities.',
    'Implemented relational persistence with Neon PostgreSQL (pg), scheduled serverless cron jobs on Vercel for duration/ROI lifecycle processing, and automated transactional email notifications via Resend and Nodemailer.',
  ]
);

// EDUCATION
pdf.addSectionHeader('Education');
pdf.ensureSpace(45);
pdf.addText('Bachelor of Science (B.Sc.) in Accounting', 48, pdf.y, 'F2', 9.8, [0.04, 0.06, 0.1]);
pdf.addText('2021 - 2025', 500, pdf.y, 'F1', 8.8, [0.42, 0.45, 0.5]);
pdf.y -= 13;
pdf.addText('Nnamdi Azikiwe University (UNIZIK)', 48, pdf.y, 'F1', 9.2, [0.25, 0.28, 0.34]);
pdf.y -= 16;
pdf.addText('Secondary Education', 48, pdf.y, 'F2', 9.5, [0.04, 0.06, 0.1]);
pdf.y -= 12.5;
pdf.addText('Anglican Comprehensive Secondary School, Kubwa, Abuja', 48, pdf.y, 'F1', 9.2, [0.25, 0.28, 0.34]);

const outPath = path.join(__dirname, '..', 'public', 'cv.pdf');
fs.writeFileSync(outPath, pdf.build(), 'utf8');
console.log('✅ Generated ATS-compliant selectable PDF at', outPath, 'Pages:', pdf.pages.length);
