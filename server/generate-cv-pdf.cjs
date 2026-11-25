const fs = require('fs');
const path = require('path');

/**
 * Generates an authentic, 100% text-selectable, ATS-scannable PDF (A4: 595.28 x 841.89 pt)
 * with generous editorial whitespace, distinct paragraph breaks, and breathable vertical rhythm.
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
    this.topY = 782;
    this.bottomMargin = 54;
    this.y = this.topY;
    this.leftMargin = 52;
    this.rightMargin = 543;
  }

  ensureSpace(needed) {
    if (this.y - needed < this.bottomMargin) {
      this.pages.push([]);
      this.currentPage++;
      this.y = this.topY;
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
    this.ensureSpace(48);
    this.y -= 10;
    this.addLine(this.y + 12);
    this.y -= 5;
    this.addText(title.toUpperCase(), this.leftMargin, this.y, 'F2', 8.8, [0.42, 0.45, 0.5]);
    this.y -= 17;
  }

  addParagraph(text, font = 'F1', size = 9.6, lineHeight = 14.5, maxChars = 92, color = [0.18, 0.21, 0.26]) {
    const lines = wrapText(text, maxChars);
    this.ensureSpace(lines.length * lineHeight + 8);
    for (const line of lines) {
      this.addText(line, this.leftMargin, this.y, font, size, color);
      this.y -= lineHeight;
    }
    this.y -= 7; // Paragraph spacing
  }

  addSkillBlock(category, items) {
    const wrapped = wrapText(items, 90);
    this.ensureSpace(wrapped.length * 13.5 + 18);
    this.addText(category.toUpperCase(), this.leftMargin, this.y, 'F2', 8.6, [0.06, 0.09, 0.15]);
    this.y -= 12.5;
    for (const line of wrapped) {
      this.addText(line, this.leftMargin, this.y, 'F1', 9.5, [0.24, 0.27, 0.33]);
      this.y -= 13.5;
    }
    this.y -= 5;
  }

  addRole(title, company, period, summaryParagraph, bullets) {
    this.ensureSpace(75);
    this.addText(title, this.leftMargin, this.y, 'F2', 11.0, [0.04, 0.06, 0.1]);
    const periodX = this.rightMargin - period.length * 4.8;
    this.addText(period, periodX, this.y, 'F1', 9.0, [0.42, 0.45, 0.5]);
    this.y -= 14;
    this.addText(company, this.leftMargin, this.y, 'F2', 9.5, [0.11, 0.3, 0.85]);
    this.y -= 15.5;

    if (summaryParagraph) {
      const introLines = wrapText(summaryParagraph, 92);
      this.ensureSpace(introLines.length * 14 + 6);
      for (const line of introLines) {
        this.addText(line, this.leftMargin, this.y, 'F3', 9.3, [0.28, 0.32, 0.38]);
        this.y -= 13.8;
      }
      this.y -= 5;
    }

    for (const b of bullets) {
      const lines = wrapText(b, 88);
      this.ensureSpace(lines.length * 14 + 5);
      this.addText('-', this.leftMargin + 4, this.y, 'F2', 9.5, [0.4, 0.45, 0.52]);
      for (const line of lines) {
        this.addText(line, this.leftMargin + 16, this.y, 'F1', 9.5, [0.2, 0.23, 0.28]);
        this.y -= 14;
      }
      this.y -= 4;
    }
    this.y -= 10;
  }

  addProject(name, link, stack, overviewParagraph, bullets) {
    this.ensureSpace(75);
    this.addText(name, this.leftMargin, this.y, 'F2', 10.6, [0.04, 0.06, 0.1]);
    if (link) {
      const linkX = this.rightMargin - link.length * 4.5;
      this.addText(link, linkX, this.y, 'F1', 8.6, [0.11, 0.3, 0.85]);
    }
    this.y -= 14;
    this.addText(stack, this.leftMargin, this.y, 'F3', 8.7, [0.38, 0.42, 0.48]);
    this.y -= 15;

    if (overviewParagraph) {
      const overviewLines = wrapText(overviewParagraph, 92);
      this.ensureSpace(overviewLines.length * 14 + 6);
      for (const line of overviewLines) {
        this.addText(line, this.leftMargin, this.y, 'F1', 9.4, [0.25, 0.29, 0.35]);
        this.y -= 13.8;
      }
      this.y -= 5;
    }

    for (const b of bullets) {
      const lines = wrapText(b, 88);
      this.ensureSpace(lines.length * 14 + 5);
      this.addText('-', this.leftMargin + 4, this.y, 'F2', 9.5, [0.4, 0.45, 0.52]);
      for (const line of lines) {
        this.addText(line, this.leftMargin + 16, this.y, 'F1', 9.4, [0.2, 0.23, 0.28]);
        this.y -= 14;
      }
      this.y -= 4;
    }
    this.y -= 10;
  }

  build() {
    const objects = [];
    const addObj = (content) => {
      objects.push(content);
      return objects.length;
    };

    addObj('<< /Type /Catalog /Pages 2 0 R >>');
    addObj('');

    const f1 = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    const f2 = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    const f3 = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');

    const pageIds = [];
    const totalPages = this.pages.length;
    for (let idx = 0; idx < totalPages; idx++) {
      const cmds = this.pages[idx];
      // Add subtle page footer
      const footerText = `Praise Godswill  |  Full-Stack Software Engineer  |  Page ${idx + 1} of ${totalPages}`;
      cmds.push(`BT /F1 8 Tf 0.55 0.58 0.63 rg 1 0 0 1 52 28 Tm (${escapePdfText(footerText)}) Tj ET`);

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

// 1. HEADER
pdf.addText('PRAISE GODSWILL', 52, pdf.y, 'F2', 22, [0.04, 0.06, 0.1]);
pdf.addText('"Thoughtfully engineered. Intentionally built."', 330, pdf.y + 3, 'F3', 9.2, [0.42, 0.45, 0.5]);
pdf.y -= 19;
pdf.addText('Full-Stack Software Engineer', 52, pdf.y, 'F2', 12.5, [0.11, 0.3, 0.85]);
pdf.y -= 18;
pdf.addText(
  'Lekki Orchid, Lagos, Nigeria   |   09018403385   |   praisegodswill23@gmail.com',
  52,
  pdf.y,
  'F1',
  9.2,
  [0.28, 0.32, 0.38]
);
pdf.y -= 14;
pdf.addText(
  'Portfolio: https://praise-dev-pi.vercel.app   |   GitHub: github.com/456-bytes   |   LinkedIn: linkedin.com/in/praise-godswill-85ab38205',
  52,
  pdf.y,
  'F1',
  9.0,
  [0.28, 0.32, 0.38]
);
pdf.y -= 10;

// 2. PROFESSIONAL SUMMARY (2 Distinct Paragraphs)
pdf.addSectionHeader('Professional Summary');
pdf.addParagraph(
  'Full-Stack Software Engineer with over 5 years of hands-on experience designing, building, debugging, and maintaining production web applications and backend systems. Strong backend engineering foundation in Node.js, Express.js, TypeScript, RESTful API design, PostgreSQL, and MongoDB, paired with modern, responsive frontend execution in React and Next.js.'
);
pdf.addParagraph(
  'Experienced in implementing secure authentication and authorisation workflows (JWT, OAuth, role-based access control), real-time event architectures (Socket.IO), third-party service integrations, containerised services (Docker), and cloud deployment pipelines. Proven track record of taking end-to-end technical ownership across remote startup and freelance engineering environments-delivering reliable, maintainable software systems built around clear operational logic.'
);

// 3. TECHNICAL SKILLS
pdf.addSectionHeader('Technical Skills & Core Competencies');
pdf.addSkillBlock('Languages', 'JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3');
pdf.addSkillBlock('Backend Engineering', 'Node.js, Express.js, RESTful API Design, Socket.IO, WebSockets, Serverless & Cron Functions, PHP');
pdf.addSkillBlock('Frontend Engineering', 'React, Next.js (App Router & SSR), Tailwind CSS, Three.js / WebGL, Bootstrap, EJS, Responsive UI');
pdf.addSkillBlock('Databases & Storage', 'PostgreSQL (Neon, Supabase, node-postgres), MongoDB (Mongoose), MySQL, Cloudinary');
pdf.addSkillBlock('Authentication & Security', 'JWT Authentication, OAuth, Role-Based Access Control (RBAC), Session Management, Rate Limiting');
pdf.addSkillBlock('DevOps, Cloud & Tooling', 'Docker, Vercel, Render, AWS, Firebase, CI/CD Workflows, Git, GitHub, Postman, Resend / Nodemailer');

// 4. PROFESSIONAL EXPERIENCE
pdf.addSectionHeader('Professional Experience');

pdf.addRole(
  'Backend Engineer',
  'Confidential Technology Company (Remote - NDA)',
  'May 2025 - March 2026',
  'Worked within a distributed engineering team developing and maintaining backend services, secure authentication layers, and API integrations under a confidentiality agreement.',
  [
    'Designed, developed, and maintained backend services and RESTful API endpoints supporting core application workflows within a remote engineering environment.',
    'Implemented secure authentication and authorisation mechanisms using JWT and OAuth, enforcing strict access control and request validation across protected service routes.',
    'Built and maintained third-party API integrations and asynchronous data processing handlers, ensuring reliable service-to-service communication and graceful error handling.',
    'Diagnosed, debugged, and resolved application bottlenecks and production defects across backend modules and relational/document database layers.',
  ]
);

pdf.addRole(
  'Full-Stack Software Engineer',
  'Independent / Freelance Engineering (Remote)',
  '2021 - Present',
  'Partner with clients and businesses to architect, build, debug, and deploy custom full-stack web applications and operational software systems from concept through production delivery.',
  [
    'Engineer backend architectures and RESTful APIs using Node.js, Express.js, Next.js Route Handlers, PostgreSQL, and MongoDB to support complex business logic, CRUD workflows, and data persistence.',
    'Implement secure user authentication, role-based administrative dashboards, customer session handling, and automated transactional email pipelines (Resend, Nodemailer).',
    'Develop responsive, accessible frontend interfaces using React, Next.js, TypeScript, and Tailwind CSS that translate complex operational data into clean user experiences.',
    'Maintain, troubleshoot, refactor, and optimise existing client codebases-resolving runtime bugs, improving database query efficiency, and managing cloud deployments on Vercel and Render.',
  ]
);

pdf.addRole(
  'Backend Engineer',
  'Lazerpay (Remote)',
  'July 2022 - February 2023',
  'Contributed to backend engineering, system maintenance, and service reliability across existing backend infrastructure within a remote engineering team.',
  [
    'Maintained and supported existing backend services and API systems, contributing to ongoing platform stability, functionality, and operational reliability.',
    'Investigated, debugged, and resolved backend issues across existing codebases, collaborating with engineering teammates to troubleshoot service behaviour.',
    'Implemented JWT-based authentication workflows and contributed to backend API functionality and architectural improvements.',
    'Containerised backend services using Docker to standardise development and deployment environments across the engineering team.',
  ]
);

// 5. SELECTED PROJECTS
pdf.addSectionHeader('Selected Engineering Projects');

pdf.addProject(
  "Jay's Food Court - Full-Stack Restaurant Ordering & Operations Platform",
  'https://jays-food-court.vercel.app',
  'Next.js  |  TypeScript  |  Supabase  |  PostgreSQL  |  Tailwind CSS  |  Server-Side Order Workflows',
  'A full-stack restaurant ordering and internal operations platform designed to coordinate customer ordering, kitchen preparation, and rider delivery workflows within a unified database-driven architecture.',
  [
    'Engineered a mobile-first customer ordering interface supporting menu and category management, food customisation, guest checkout, secure customer session handling, and delivery address management.',
    'Implemented server-side pricing calculation and structured order lifecycle management-connecting order placement, kitchen operations queues, rider delivery workflows, and real-time order status tracking backed by Supabase and PostgreSQL.',
  ]
);

pdf.addProject(
  'Global Citizen Immigration Platform - Interactive 3D & AI Guidance System',
  'https://global-immigration-platform.vercel.app/',
  'Next.js  |  React  |  TypeScript  |  Three.js / WebGL  |  Conversational AI Engine  |  Tailwind CSS',
  'An immigration-focused digital information platform designed to make immigration guidance accessible through an interactive 3D and conversational AI interface.',
  [
    'Engineered an AI-powered conversational assistant designed around 50+ immigration-related questions and topics to provide structured, accessible informational guidance.',
    'Integrated an interactive 3D WebGL globe alongside a responsive modern frontend architecture that adapts smoothly across desktop and mobile devices.',
  ]
);

pdf.addProject(
  'Lone Star Autos - Full-Stack Automotive Dealership Platform',
  'github.com/456-bytes',
  'Node.js  |  Express.js  |  MongoDB  |  Socket.IO  |  Cloudinary  |  JWT Authentication',
  'A full-stack automotive dealership application combining vehicle inventory management, real-time communication, administrative oversight, and cloud media optimisation.',
  [
    'Designed the backend REST API architecture and MongoDB schemas with secure authentication, protected administrative dashboard controls, and dealership analytics.',
    'Integrated Socket.IO for real-time communication and live state updates, paired with Cloudinary pipelines for automated vehicle image upload and delivery optimisation.',
  ]
);

pdf.addProject(
  'ORC Investment Platform - Investment Programme & Administrative System',
  'github.com/456-bytes',
  'Node.js  |  Vanilla JS  |  HTML5 / Tailwind CSS / CSS3  |  Neon PostgreSQL (pg)  |  Resend / Nodemailer  |  Vercel Cron',
  'A full-stack investment programme management platform enabling users to participate in defined-duration investment programmes while providing administrators with centralised operational control.',
  [
    'Built user-facing investment workflows and an administrative dashboard with full CRUD functionality to create, manage, and control investment programmes and monitor user accounts.',
    'Implemented relational database persistence using Neon PostgreSQL (pg), scheduled serverless cron jobs on Vercel for programme duration and ROI tracking, and transactional email alerts via Resend and Nodemailer.',
  ]
);

// 6. EDUCATION
pdf.addSectionHeader('Education');
pdf.ensureSpace(70);
pdf.addText('Bachelor of Science (B.Sc.) in Accounting', 52, pdf.y, 'F2', 10.5, [0.04, 0.06, 0.1]);
pdf.addText('2021 - 2025', 495, pdf.y, 'F1', 9.2, [0.42, 0.45, 0.5]);
pdf.y -= 15;
pdf.addText('Nnamdi Azikiwe University (UNIZIK)', 52, pdf.y, 'F1', 9.6, [0.25, 0.28, 0.34]);
pdf.y -= 22;
pdf.addText('Secondary Education', 52, pdf.y, 'F2', 10.2, [0.04, 0.06, 0.1]);
pdf.y -= 15;
pdf.addText('Anglican Comprehensive Secondary School, Kubwa, Abuja', 52, pdf.y, 'F1', 9.6, [0.25, 0.28, 0.34]);

const outPath = path.join(__dirname, '..', 'public', 'cv.pdf');
fs.writeFileSync(outPath, pdf.build(), 'utf8');
console.log('✅ Generated breathable, spacious ATS-compliant PDF at', outPath, 'Pages:', pdf.pages.length);
