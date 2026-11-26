const fs = require('fs');
const path = require('path');

/**
 * Generates an authentic, 100% text-selectable, ATS-scannable 2-Page PDF (A4: 595.28 x 841.89 pt)
 * matching Praise Godswill's updated CV exactly.
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
    this.topY = 788;
    this.bottomMargin = 50;
    this.y = this.topY;
    this.leftMargin = 48;
    this.rightMargin = 547;
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
    this.ensureSpace(42);
    this.y -= 10;
    this.addLine(this.y + 12);
    this.y -= 4;
    this.addText(title.toUpperCase(), this.leftMargin, this.y, 'F2', 8.8, [0.42, 0.45, 0.5]);
    this.y -= 16;
  }

  addParagraph(text, font = 'F1', size = 9.5, lineHeight = 14.2, maxChars = 95, color = [0.18, 0.21, 0.26]) {
    const lines = wrapText(text, maxChars);
    this.ensureSpace(lines.length * lineHeight + 6);
    for (const line of lines) {
      this.addText(line, this.leftMargin, this.y, font, size, color);
      this.y -= lineHeight;
    }
    this.y -= 5;
  }

  addSkillRow(category, items) {
    this.ensureSpace(16);
    this.addText(category + ':', this.leftMargin, this.y, 'F2', 9.2, [0.06, 0.09, 0.15]);
    const wrapped = wrapText(items, 82);
    wrapped.forEach((line) => {
      this.addText(line, this.leftMargin + 115, this.y, 'F1', 9.2, [0.22, 0.25, 0.31]);
      this.y -= 13.5;
    });
    this.y -= 2;
  }

  addSoftSkillsGrid(pairs) {
    const col1X = this.leftMargin;
    const col2X = 304;
    for (let i = 0; i < pairs.length; i += 2) {
      this.ensureSpace(32);
      const left = pairs[i];
      const right = pairs[i + 1];

      // Left column item
      this.addText('- ' + left.title + ':', col1X, this.y, 'F2', 8.8, [0.06, 0.09, 0.15]);
      if (right) {
        this.addText('- ' + right.title + ':', col2X, this.y, 'F2', 8.8, [0.06, 0.09, 0.15]);
      }
      this.y -= 12;

      this.addText(left.desc, col1X + 8, this.y, 'F1', 8.7, [0.24, 0.27, 0.33]);
      if (right) {
        this.addText(right.desc, col2X + 8, this.y, 'F1', 8.7, [0.24, 0.27, 0.33]);
      }
      this.y -= 15;
    }
    this.y -= 2;
  }

  addRole(titleAndCompany, period, bullets) {
    this.ensureSpace(55);
    this.addText(titleAndCompany, this.leftMargin, this.y, 'F2', 10.2, [0.04, 0.06, 0.1]);
    const periodX = this.rightMargin - period.length * 4.6;
    this.addText(period, periodX, this.y, 'F1', 8.8, [0.42, 0.45, 0.5]);
    this.y -= 15;

    for (const b of bullets) {
      const lines = wrapText(b, 92);
      this.ensureSpace(lines.length * 13.5 + 4);
      this.addText('-', this.leftMargin + 4, this.y, 'F2', 9.2, [0.4, 0.45, 0.52]);
      for (const line of lines) {
        this.addText(line, this.leftMargin + 15, this.y, 'F1', 9.3, [0.2, 0.23, 0.28]);
        this.y -= 13.5;
      }
      this.y -= 3.5;
    }
    this.y -= 8;
  }

  addProject(name, link, stack, bullets) {
    this.ensureSpace(55);
    this.addText(name, this.leftMargin, this.y, 'F2', 10.0, [0.04, 0.06, 0.1]);
    if (link) {
      const linkX = this.rightMargin - link.length * 4.4;
      this.addText(link, linkX, this.y, 'F1', 8.5, [0.11, 0.3, 0.85]);
    }
    this.y -= 13.5;
    this.addText(stack, this.leftMargin, this.y, 'F3', 8.7, [0.38, 0.42, 0.48]);
    this.y -= 14.5;

    for (const b of bullets) {
      const lines = wrapText(b, 92);
      this.ensureSpace(lines.length * 13.5 + 4);
      this.addText('-', this.leftMargin + 4, this.y, 'F2', 9.2, [0.4, 0.45, 0.52]);
      for (const line of lines) {
        this.addText(line, this.leftMargin + 15, this.y, 'F1', 9.3, [0.2, 0.23, 0.28]);
        this.y -= 13.5;
      }
      this.y -= 3.5;
    }
    this.y -= 8;
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
      const footerLeft = 'Praise Godswill - Full-Stack Software Engineer';
      const footerRight = `Page ${idx + 1} of ${totalPages}`;
      cmds.push(`BT /F1 8 Tf 0.55 0.58 0.63 rg 1 0 0 1 48 26 Tm (${escapePdfText(footerLeft)}) Tj ET`);
      cmds.push(`BT /F1 8 Tf 0.55 0.58 0.63 rg 1 0 0 1 502 26 Tm (${escapePdfText(footerRight)}) Tj ET`);

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
pdf.addText('PRAISE GODSWILL', 48, pdf.y, 'F2', 21, [0.04, 0.06, 0.1]);
pdf.addText('"Thoughtfully engineered. Intentionally built."', 338, pdf.y + 3, 'F3', 9.0, [0.42, 0.45, 0.5]);
pdf.y -= 17;
pdf.addText('Full-Stack Software Engineer', 48, pdf.y, 'F2', 12, [0.11, 0.3, 0.85]);
pdf.y -= 16;
pdf.addText(
  'Lekki Orchid, Lagos, Nigeria   |   +234 901 840 3385   |   praisegodswill23@gmail.com',
  48,
  pdf.y,
  'F1',
  9.0,
  [0.28, 0.32, 0.38]
);
pdf.y -= 13;
pdf.addText(
  'Portfolio: praise-dev-pi.vercel.app   |   GitHub: github.com/456-bytes   |   LinkedIn: linkedin.com/in/praise-godswill-85ab38205',
  48,
  pdf.y,
  'F1',
  8.8,
  [0.28, 0.32, 0.38]
);
pdf.y -= 8;

// 2. PROFESSIONAL SUMMARY
pdf.addSectionHeader('Professional Summary');
pdf.addParagraph(
  'Full-Stack Software Engineer with 4+ years of hands-on experience designing, building, and maintaining production web applications and backend systems. Strong backend foundation in Node.js, Express.js, TypeScript, RESTful APIs, PostgreSQL, and MongoDB, paired with responsive frontend execution in React and Next.js. Proven track record of taking end-to-end technical ownership across remote startup and freelance environments-delivering secure authentication flows, real-time architectures, and containerized cloud deployments. Adaptable, collaborative communicator who thrives in fast-paced distributed teams.'
);

// 3. TECHNICAL SKILLS
pdf.addSectionHeader('Technical Skills');
pdf.addSkillRow('Languages', 'JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3');
pdf.addSkillRow('Backend', 'Node.js, Express.js, RESTful API Design, Socket.IO, WebSockets, Serverless & Cron Functions');
pdf.addSkillRow('Frontend', 'React, Next.js (App Router & SSR), Tailwind CSS, Three.js / WebGL, EJS, Responsive UI');
pdf.addSkillRow('Databases & Storage', 'PostgreSQL (Neon, Supabase, node-postgres), MongoDB (Mongoose), MySQL, Cloudinary');
pdf.addSkillRow('Auth & Security', 'JWT Authentication, OAuth, Role-Based Access Control (RBAC), Session Management, Rate Limiting');
pdf.addSkillRow('DevOps & Tooling', 'Docker, AWS, Vercel, Render, Firebase, CI/CD Workflows, Git, GitHub, Postman, Resend / Nodemailer');

// 4. CORE SOFT SKILLS & WORK ETHIC
pdf.addSectionHeader('Core Soft Skills & Work Ethic');
pdf.addSoftSkillsGrid([
  { title: 'Active Listening', desc: 'Translates ambiguous requirements into clear technical specs.' },
  { title: 'Adaptability & Unlearning', desc: 'Quickly adopts modern frameworks as needs evolve.' },
  { title: 'Cross-Functional Collaboration', desc: 'Works seamlessly across distributed remote teams.' },
  { title: 'Continuous Learning', desc: 'Masters new technologies to solve novel problems.' },
  { title: 'End-to-End Ownership', desc: 'Accountable from schema design through deployment.' },
  { title: 'Proactive Problem-Solving', desc: 'Isolates root causes calmly under pressure.' },
  { title: 'Clear Technical Communication', desc: 'Documents APIs and logic concisely.' },
  { title: 'Growth Mindset', desc: 'Receptive to code reviews and architectural feedback.' },
]);

// 5. PROFESSIONAL EXPERIENCE
pdf.addSectionHeader('Professional Experience');

pdf.addRole(
  'Backend Engineer - Confidential Technology Company (Remote - NDA)',
  'May 2025 - March 2026',
  [
    'Designed and maintained scalable backend services and RESTful API endpoints supporting core application workflows in a distributed team.',
    'Implemented secure authentication and authorization layers using JWT and OAuth, enforcing strict RBAC and request validation across protected routes.',
    'Built third-party API integrations and asynchronous data handlers with graceful error recovery to ensure reliable service-to-service communication.',
    'Diagnosed and resolved production bottlenecks and database query defects across relational and document data layers.',
  ]
);

pdf.addRole(
  'Full-Stack Software Engineer - Independent / Freelance Engineering (Remote)',
  '2021 - Present',
  [
    'Partner with businesses and founders to architect, build, and deploy custom full-stack web platforms from initial concept to production.',
    'Engineer backend APIs with Node.js, Express, Next.js Route Handlers, PostgreSQL, and MongoDB to power complex CRUD and operational workflows.',
    'Build secure multi-role admin dashboards, customer session management, and automated transactional email pipelines (Resend, Nodemailer).',
    'Develop responsive, accessible user interfaces in React, Next.js, TypeScript, and Tailwind CSS while managing cloud CI/CD deployments on Vercel and Render.',
  ]
);

pdf.addRole(
  'Backend Engineer - Lazerpay (Remote)',
  'July 2022 - February 2023',
  [
    'Maintained and improved core backend services and API infrastructure, contributing to overall platform stability and uptime.',
    'Investigated and resolved production backend bugs in close collaboration with engineering teammates.',
    'Implemented JWT-based authentication workflows and contributed to backend API enhancements.',
    'Containerized backend services using Docker to standardize local development and deployment environments across the team.',
  ]
);

// 6. SELECTED ENGINEERING PROJECTS
pdf.addSectionHeader('Selected Engineering Projects');

pdf.addProject(
  "Jay's Food Court - Full-Stack Food Delivery & Logistics Marketplace",
  'jays-food-court.vercel.app',
  'Stack: Next.js, TypeScript, Supabase, PostgreSQL, Tailwind CSS',
  [
    'Architected a 4-sided online food ordering and delivery platform featuring dedicated, role-based dashboards for Customers, Kitchen Staff, Delivery Riders, and Super Admins.',
    'Implemented secure online payment checkout, server-side pricing validation, and real-time order lifecycle tracking across customer placement, kitchen prep queues, rider dispatch, and administrative oversight.',
  ]
);

pdf.addProject(
  'Global Citizen Immigration Platform - Immigration, Eligibility & Crypto Wallet Platform',
  'global-immigration-platform.vercel.app',
  'Stack: Next.js, React, TypeScript, Three.js / WebGL, Tailwind CSS',
  [
    'Engineered dedicated User and Admin dashboards featuring full administrative CRUD controls, an automated country travel eligibility checker, and an AI immigration guidance assistant (50+ topics).',
    'Built an integrated user wallet module supporting cryptocurrency deposits alongside an interactive 3D WebGL globe optimized across desktop and mobile devices.',
  ]
);

pdf.addProject(
  'Lone Star Autos - Full-Stack Automotive Dealership Platform',
  '',
  'Stack: Node.js, Express.js, MongoDB, Socket.IO, Cloudinary, JWT',
  [
    'Built a dealership inventory and operations platform featuring RBAC admin dashboards, analytics, and automated Cloudinary media optimization.',
    'Integrated Socket.IO for real-time communication and live inventory state updates.',
  ]
);

pdf.addProject(
  'ORC Investment Platform - Investment Programme & Admin System',
  '',
  'Stack: Node.js, JavaScript, Tailwind CSS, Neon PostgreSQL, Vercel Cron, Resend',
  [
    'Developed user investment workflows and an admin CRUD portal to manage timed investment programmes and user accounts.',
    'Implemented automated Vercel serverless cron jobs for programme duration/ROI tracking and transactional email alerts.',
  ]
);

// 7. EDUCATION
pdf.addSectionHeader('Education');
pdf.ensureSpace(30);
pdf.addText('Bachelor of Science (B.Sc.) in Accounting - Nnamdi Azikiwe University (UNIZIK)', 48, pdf.y, 'F2', 9.8, [0.04, 0.06, 0.1]);
pdf.addText('2021 - 2025', 495, pdf.y, 'F1', 9.0, [0.42, 0.45, 0.5]);

const outPath = path.join(__dirname, '..', 'public', 'cv.pdf');
fs.writeFileSync(outPath, pdf.build(), 'utf8');
console.log('✅ Generated updated 2-page ATS-compliant PDF at', outPath, 'Pages:', pdf.pages.length);
