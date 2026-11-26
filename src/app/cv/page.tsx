'use client';

import Link from 'next/link';
import { ArrowLeft, Download, Printer, ExternalLink } from 'lucide-react';

export default function CVPage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] antialiased selection:bg-[#111827] selection:text-white print:bg-white">
      {/* Top Action Bar (Hidden in Print) */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium text-[#374151] bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F3F4F6] hover:border-[#9CA3AF] transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save as PDF</span>
              <span className="sm:hidden">Print</span>
            </button>
            <a
              href="/cv.pdf"
              download="Praise_Godswill_Software_Engineer_CV.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold text-white bg-[#111827] rounded-lg hover:bg-[#1F2937] transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Editorial Document Sheet */}
      <main className="max-w-4xl mx-auto my-8 sm:my-14 px-4 sm:px-8 print:my-0 print:px-0 print:max-w-none">
        <article className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02),0_24px_60px_rgba(0,0,0,0.03)] px-6 py-10 sm:px-16 sm:py-16 print:border-none print:shadow-none print:p-0">
          
          {/* 1. HEADER & PROFESSIONAL IDENTITY */}
          <header className="border-b border-[#E5E7EB] pb-8 mb-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#090D16] leading-tight uppercase">
                  Praise Godswill
                </h1>
                <p className="text-base sm:text-lg font-medium text-[#1D4ED8] mt-1.5 tracking-tight">
                  Full-Stack Software Engineer
                </p>
              </div>
              <p className="text-xs sm:text-sm font-mono text-[#6B7280] tracking-wide italic md:text-right">
                &ldquo;Thoughtfully engineered. Intentionally built.&rdquo;
              </p>
            </div>

            {/* Contact Metadata Grid */}
            <div className="mt-6 pt-5 border-t border-[#F3F4F6] flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs sm:text-[13.5px] text-[#4B5563] leading-relaxed">
              <span>Lekki Orchid, Lagos, Nigeria</span>
              <span className="text-[#D1D5DB] select-none hidden sm:inline">•</span>
              <a
                href="tel:+2349018403385"
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                +234 901 840 3385
              </a>
              <span className="text-[#D1D5DB] select-none hidden sm:inline">•</span>
              <a
                href="mailto:praisegodswill23@gmail.com"
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                praisegodswill23@gmail.com
              </a>
              <span className="text-[#D1D5DB] select-none hidden sm:inline">•</span>
              <a
                href="https://praise-dev-pi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111827] font-medium hover:text-[#1D4ED8] underline-offset-4 hover:underline transition-colors"
              >
                Portfolio: praise-dev-pi.vercel.app
              </a>
              <span className="text-[#D1D5DB] select-none hidden sm:inline">•</span>
              <a
                href="https://github.com/456-bytes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                GitHub: github.com/456-bytes
              </a>
              <span className="text-[#D1D5DB] select-none hidden sm:inline">•</span>
              <a
                href="https://linkedin.com/in/praise-godswill-85ab38205"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                LinkedIn: linkedin.com/in/praise-godswill-85ab38205
              </a>
            </div>
          </header>

          {/* 2. PROFESSIONAL SUMMARY */}
          <section className="mb-11" aria-labelledby="summary-heading">
            <h2
              id="summary-heading"
              className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-4"
            >
              Professional Summary
            </h2>
            <p className="text-sm sm:text-[15px] text-[#374151] leading-[1.85]">
              Full-Stack Software Engineer with 4+ years of hands-on experience designing, building, and maintaining production web applications and backend systems. Strong backend foundation in{' '}
              <strong className="font-semibold text-[#111827]">
                Node.js, Express.js, TypeScript, RESTful APIs, PostgreSQL, and MongoDB
              </strong>
              , paired with responsive frontend execution in{' '}
              <strong className="font-semibold text-[#111827]">React and Next.js</strong>. Proven track record of taking end-to-end technical ownership across remote startup and freelance environments—delivering secure authentication flows, real-time architectures, and containerized cloud deployments. Adaptable, collaborative communicator who thrives in fast-paced distributed teams.
            </p>
          </section>

          {/* 3. TECHNICAL SKILLS */}
          <section className="mb-11 border-t border-[#E5E7EB] pt-9" aria-labelledby="skills-heading">
            <h2
              id="skills-heading"
              className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-5"
            >
              Technical Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                  Languages
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                  Backend
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  Node.js, Express.js, RESTful API Design, Socket.IO, WebSockets, Serverless &amp; Cron Functions
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                  Frontend
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  React, Next.js (App Router &amp; SSR), Tailwind CSS, Three.js / WebGL, EJS, Responsive UI
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                  Databases &amp; Storage
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  PostgreSQL (Neon, Supabase, node-postgres), MongoDB (Mongoose), MySQL, Cloudinary
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                  Auth &amp; Security
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  JWT Authentication, OAuth, Role-Based Access Control (RBAC), Session Management, Rate Limiting
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                  DevOps &amp; Tooling
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  Docker, AWS, Vercel, Render, Firebase, CI/CD Workflows, Git, GitHub, Postman, Resend / Nodemailer
                </p>
              </div>
            </div>
          </section>

          {/* 4. CORE SOFT SKILLS & WORK ETHIC */}
          <section className="mb-11 border-t border-[#E5E7EB] pt-9" aria-labelledby="soft-skills-heading">
            <h2
              id="soft-skills-heading"
              className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-5"
            >
              Core Soft Skills &amp; Work Ethic
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-[#374151] leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="text-[#1D4ED8] font-bold mt-0.5">•</span>
                <p>
                  <strong className="font-semibold text-[#111827]">Active Listening:</strong> Translates ambiguous requirements into clear technical specifications.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#1D4ED8] font-bold mt-0.5">•</span>
                <p>
                  <strong className="font-semibold text-[#111827]">Adaptability &amp; Unlearning:</strong> Quickly adopts modern frameworks as needs evolve.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#1D4ED8] font-bold mt-0.5">•</span>
                <p>
                  <strong className="font-semibold text-[#111827]">Cross-Functional Collaboration:</strong> Works seamlessly across distributed remote teams.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#1D4ED8] font-bold mt-0.5">•</span>
                <p>
                  <strong className="font-semibold text-[#111827]">Continuous Learning:</strong> Masters new technologies to solve novel problems.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#1D4ED8] font-bold mt-0.5">•</span>
                <p>
                  <strong className="font-semibold text-[#111827]">End-to-End Ownership:</strong> Accountable from schema design through deployment.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#1D4ED8] font-bold mt-0.5">•</span>
                <p>
                  <strong className="font-semibold text-[#111827]">Proactive Problem-Solving:</strong> Isolates root causes calmly under pressure.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#1D4ED8] font-bold mt-0.5">•</span>
                <p>
                  <strong className="font-semibold text-[#111827]">Clear Technical Communication:</strong> Documents APIs and logic concisely.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#1D4ED8] font-bold mt-0.5">•</span>
                <p>
                  <strong className="font-semibold text-[#111827]">Growth Mindset:</strong> Receptive to code reviews and architectural feedback.
                </p>
              </div>
            </div>
          </section>

          {/* 5. PROFESSIONAL EXPERIENCE */}
          <section className="mb-11 border-t border-[#E5E7EB] pt-9" aria-labelledby="experience-heading">
            <h2
              id="experience-heading"
              className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-7"
            >
              Professional Experience
            </h2>

            <div className="space-y-9">
              {/* Role 1: Confidential Technology Company */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 mb-2.5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#090D16]">
                      Backend Engineer — Confidential Technology Company{' '}
                      <span className="text-sm font-normal text-[#6B7280]">(Remote – NDA)</span>
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full w-fit shrink-0">
                    May 2025 – March 2026
                  </span>
                </div>

                <ul className="space-y-2 text-sm sm:text-[14.5px] text-[#374151] leading-[1.75] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Designed and maintained scalable backend services and RESTful API endpoints supporting core application workflows in a distributed team.
                  </li>
                  <li>
                    Implemented secure authentication and authorization layers using JWT and OAuth, enforcing strict RBAC and request validation across protected routes.
                  </li>
                  <li>
                    Built third-party API integrations and asynchronous data handlers with graceful error recovery to ensure reliable service-to-service communication.
                  </li>
                  <li>
                    Diagnosed and resolved production bottlenecks and database query defects across relational and document data layers.
                  </li>
                </ul>
              </div>

              {/* Role 2: Independent / Freelance Engineering */}
              <div className="border-t border-[#F3F4F6] pt-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 mb-2.5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#090D16]">
                      Full-Stack Software Engineer — Independent / Freelance Engineering{' '}
                      <span className="text-sm font-normal text-[#6B7280]">(Remote)</span>
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full w-fit shrink-0">
                    2021 – Present
                  </span>
                </div>

                <ul className="space-y-2 text-sm sm:text-[14.5px] text-[#374151] leading-[1.75] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Partner with businesses and founders to architect, build, and deploy custom full-stack web platforms from initial concept to production.
                  </li>
                  <li>
                    Engineer backend APIs with Node.js, Express, Next.js Route Handlers, PostgreSQL, and MongoDB to power complex CRUD and operational workflows.
                  </li>
                  <li>
                    Build secure multi-role admin dashboards, customer session management, and automated transactional email pipelines (Resend, Nodemailer).
                  </li>
                  <li>
                    Develop responsive, accessible user interfaces in React, Next.js, TypeScript, and Tailwind CSS while managing cloud CI/CD deployments on Vercel and Render.
                  </li>
                </ul>
              </div>

              {/* Role 3: Lazerpay */}
              <div className="border-t border-[#F3F4F6] pt-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 mb-2.5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#090D16]">
                      Backend Engineer — Lazerpay{' '}
                      <span className="text-sm font-normal text-[#6B7280]">(Remote)</span>
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full w-fit shrink-0">
                    July 2022 – February 2023
                  </span>
                </div>

                <ul className="space-y-2 text-sm sm:text-[14.5px] text-[#374151] leading-[1.75] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Maintained and improved core backend services and API infrastructure, contributing to overall platform stability and uptime.
                  </li>
                  <li>
                    Investigated and resolved production backend bugs in close collaboration with engineering teammates.
                  </li>
                  <li>
                    Implemented JWT-based authentication workflows and contributed to backend API enhancements.
                  </li>
                  <li>
                    Containerized backend services using Docker to standardize local development and deployment environments across the team.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. SELECTED ENGINEERING PROJECTS */}
          <section className="mb-11 border-t border-[#E5E7EB] pt-9" aria-labelledby="projects-heading">
            <h2
              id="projects-heading"
              className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-7"
            >
              Selected Engineering Projects
            </h2>

            <div className="space-y-9">
              {/* Project A: Jay's Food Court */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#090D16]">
                    Jay&apos;s Food Court — Full-Stack Food Delivery &amp; Logistics Marketplace
                  </h3>
                  <a
                    href="https://jays-food-court.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#1D4ED8] hover:underline shrink-0"
                  >
                    <span>jays-food-court.vercel.app</span>
                    <ExternalLink className="w-3.5 h-3.5 print:hidden" />
                  </a>
                </div>

                <p className="text-xs font-mono text-[#6B7280] mb-2.5">
                  Stack: Next.js, TypeScript, Supabase, PostgreSQL, Tailwind CSS
                </p>

                <ul className="space-y-2 text-sm sm:text-[14.5px] text-[#374151] leading-[1.75] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Architected a 4-sided online food ordering and delivery platform featuring dedicated, role-based dashboards for Customers, Kitchen Staff, Delivery Riders, and Super Admins.
                  </li>
                  <li>
                    Implemented secure online payment checkout, server-side pricing validation, and real-time order lifecycle tracking across customer placement, kitchen prep queues, rider dispatch, and administrative oversight.
                  </li>
                </ul>
              </div>

              {/* Project B: Global Citizen Immigration Platform */}
              <div className="border-t border-[#F3F4F6] pt-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#090D16]">
                    Global Citizen Immigration Platform — Immigration, Eligibility &amp; Crypto Wallet Platform
                  </h3>
                  <a
                    href="https://global-immigration-platform.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#1D4ED8] hover:underline shrink-0"
                  >
                    <span>global-immigration-platform.vercel.app</span>
                    <ExternalLink className="w-3.5 h-3.5 print:hidden" />
                  </a>
                </div>

                <p className="text-xs font-mono text-[#6B7280] mb-2.5">
                  Stack: Next.js, React, TypeScript, Three.js / WebGL, Tailwind CSS
                </p>

                <ul className="space-y-2 text-sm sm:text-[14.5px] text-[#374151] leading-[1.75] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Engineered dedicated User and Admin dashboards featuring full administrative CRUD controls, an automated country travel eligibility checker, and an AI immigration guidance assistant (50+ topics).
                  </li>
                  <li>
                    Built an integrated user wallet module supporting cryptocurrency deposits alongside an interactive 3D WebGL globe optimized across desktop and mobile devices.
                  </li>
                </ul>
              </div>

              {/* Project C: Lone Star Autos */}
              <div className="border-t border-[#F3F4F6] pt-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#090D16]">
                    Lone Star Autos — Full-Stack Automotive Dealership Platform
                  </h3>
                </div>

                <p className="text-xs font-mono text-[#6B7280] mb-2.5">
                  Stack: Node.js, Express.js, MongoDB, Socket.IO, Cloudinary, JWT
                </p>

                <ul className="space-y-2 text-sm sm:text-[14.5px] text-[#374151] leading-[1.75] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Built a dealership inventory and operations platform featuring RBAC admin dashboards, analytics, and automated Cloudinary media optimization.
                  </li>
                  <li>
                    Integrated Socket.IO for real-time communication and live inventory state updates.
                  </li>
                </ul>
              </div>

              {/* Project D: ORC Investment Platform */}
              <div className="border-t border-[#F3F4F6] pt-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#090D16]">
                    ORC Investment Platform — Investment Programme &amp; Admin System
                  </h3>
                </div>

                <p className="text-xs font-mono text-[#6B7280] mb-2.5">
                  Stack: Node.js, JavaScript, Tailwind CSS, Neon PostgreSQL, Vercel Cron, Resend
                </p>

                <ul className="space-y-2 text-sm sm:text-[14.5px] text-[#374151] leading-[1.75] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Developed user investment workflows and an admin CRUD portal to manage timed investment programmes and user accounts.
                  </li>
                  <li>
                    Implemented automated Vercel serverless cron jobs for programme duration/ROI tracking and transactional email alerts.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 7. EDUCATION */}
          <section className="border-t border-[#E5E7EB] pt-9" aria-labelledby="education-heading">
            <h2
              id="education-heading"
              className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-4"
            >
              Education
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div>
                <h3 className="text-base font-bold text-[#090D16]">
                  Bachelor of Science (B.Sc.) in Accounting — Nnamdi Azikiwe University (UNIZIK)
                </h3>
              </div>
              <span className="text-xs font-mono text-[#6B7280]">
                2021 – 2025
              </span>
            </div>
          </section>
        </article>
      </main>

      {/* Dedicated Print Stylesheet */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 14mm 15mm;
          }
          html,
          body {
            background: #ffffff !important;
            color: #111827 !important;
            font-size: 10pt;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          a {
            text-decoration: none !important;
            color: inherit !important;
          }
          h2,
          h3 {
            page-break-after: avoid;
          }
          ul,
          li,
          p {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
