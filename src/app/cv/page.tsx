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
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] antialiased selection:bg-[#111827] selection:text-white print:bg-white">
      {/* Top Action Bar (Hidden in Print) */}
      <div className="sticky top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#E5E7EB] print:hidden">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-[#374151] bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F3F4F6] hover:border-[#9CA3AF] transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <a
              href="/cv.pdf"
              download="Praise_Godswill_Software_Engineer_CV.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-semibold text-white bg-[#111827] rounded-lg hover:bg-[#1F2937] transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Editorial Document Sheet */}
      <main className="max-w-4xl mx-auto my-8 sm:my-12 px-4 sm:px-6 print:my-0 print:px-0 print:max-w-none">
        <article className="bg-white border border-[#E5E7EB] rounded-none sm:rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_12px_36px_rgba(0,0,0,0.03)] px-6 py-10 sm:px-14 sm:py-16 print:border-none print:shadow-none print:p-0">
          {/* 1. HEADER & PROFESSIONAL IDENTITY */}
          <header className="border-b border-[#E5E7EB] pb-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#090D16]">
                  Praise Godswill
                </h1>
                <p className="text-base sm:text-lg font-medium text-[#1D4ED8] mt-1 tracking-tight">
                  Full-Stack Software Engineer
                </p>
              </div>
              <p className="text-xs font-mono text-[#6B7280] tracking-wide italic">
                &ldquo;Think twice, code once. Engineered to scale.&rdquo;
              </p>
            </div>

            {/* Contact Metadata Grid — Clean, ATS-Readable, Clickable */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
              <span>Lekki Orchid, Lagos, Nigeria</span>
              <span className="text-[#D1D5DB] select-none">•</span>
              <a
                href="tel:+2349018403385"
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                09018403385
              </a>
              <span className="text-[#D1D5DB] select-none">•</span>
              <a
                href="mailto:praisegodswill23@gmail.com"
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                praisegodswill23@gmail.com
              </a>
              <span className="text-[#D1D5DB] select-none">•</span>
              <a
                href="https://praise-dev-pi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111827] font-medium hover:text-[#1D4ED8] underline-offset-4 hover:underline transition-colors"
              >
                praise-dev-pi.vercel.app
              </a>
              <span className="text-[#D1D5DB] select-none">•</span>
              <a
                href="https://github.com/456-bytes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                github.com/456-bytes
              </a>
              <span className="text-[#D1D5DB] select-none">•</span>
              <a
                href="https://linkedin.com/in/praise-godswill-85ab38205"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                linkedin.com/in/praise-godswill-85ab38205
              </a>
            </div>
          </header>

          {/* 2. PROFESSIONAL SUMMARY */}
          <section className="mb-9" aria-labelledby="summary-heading">
            <h2
              id="summary-heading"
              className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#6B7280] mb-3"
            >
              Professional Summary
            </h2>
            <p className="text-sm sm:text-[15px] text-[#1F2937] leading-[1.75]">
              Full-Stack Software Engineer with 5+ years of hands-on experience designing, building, debugging, and maintaining production web applications and backend systems. Strong backend engineering foundation in{' '}
              <strong className="font-semibold text-[#111827]">Node.js, Express.js, TypeScript, RESTful API design, PostgreSQL, and MongoDB</strong>, paired with modern frontend execution in{' '}
              <strong className="font-semibold text-[#111827]">React and Next.js</strong>. Experienced in implementing secure authentication and authorisation (JWT, OAuth, session workflows), real-time event architectures (Socket.IO), third-party service integrations, containerised services (Docker), and cloud deployment pipelines. Proven track record of taking end-to-end technical ownership across startup and freelance engineering environments—delivering reliable, maintainable software built around clear operational logic.
            </p>
          </section>

          {/* 3. TECHNICAL SKILLS */}
          <section className="mb-9 border-t border-[#E5E7EB] pt-8" aria-labelledby="skills-heading">
            <h2
              id="skills-heading"
              className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#6B7280] mb-4"
            >
              Technical Skills &amp; Core Competencies
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3.5 text-sm">
              <div>
                <span className="font-semibold text-[#111827]">Languages: </span>
                <span className="text-[#374151]">JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3</span>
              </div>
              <div>
                <span className="font-semibold text-[#111827]">Backend Engineering: </span>
                <span className="text-[#374151]">
                  Node.js, Express.js, RESTful API Design, Socket.IO, WebSockets, Cron &amp; Serverless Functions, PHP
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#111827]">Frontend Engineering: </span>
                <span className="text-[#374151]">
                  React, Next.js (App Router &amp; SSR), Tailwind CSS, Three.js / WebGL, Bootstrap, EJS, Responsive UI
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#111827]">Databases &amp; Storage: </span>
                <span className="text-[#374151]">
                  PostgreSQL (Neon, Supabase, node-postgres), MongoDB (Mongoose), MySQL, Cloudinary
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#111827]">Authentication &amp; Security: </span>
                <span className="text-[#374151]">
                  JWT Authentication, OAuth, Role-Based Access Control (RBAC), Session Management, Rate Limiting
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#111827]">DevOps, Cloud &amp; Tooling: </span>
                <span className="text-[#374151]">
                  Docker, Vercel, Render, AWS, Firebase, CI/CD Workflows, Git, GitHub, Postman, Resend / Nodemailer
                </span>
              </div>
            </div>
          </section>

          {/* 4. PROFESSIONAL EXPERIENCE */}
          <section className="mb-9 border-t border-[#E5E7EB] pt-8" aria-labelledby="experience-heading">
            <h2
              id="experience-heading"
              className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#6B7280] mb-6"
            >
              Professional Experience
            </h2>

            <div className="space-y-8">
              {/* Role 1: Confidential Technology Startup */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-[#090D16]">
                      Backend Engineer
                    </h3>
                    <p className="text-sm font-medium text-[#374151]">
                      Confidential Technology Company <span className="text-[#6B7280] font-normal">(Remote — NDA)</span>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#6B7280] shrink-0">
                    May 2025 – March 2026
                  </span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#374151] leading-relaxed list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Designed, developed, and maintained backend services and RESTful API endpoints supporting core application workflows within a distributed remote engineering team.
                  </li>
                  <li>
                    Implemented secure authentication and authorisation mechanisms using JWT and OAuth, enforcing strict access control and request validation across protected service routes.
                  </li>
                  <li>
                    Built and maintained third-party API integrations and asynchronous data processing handlers, ensuring reliable service-to-service communication and graceful error handling.
                  </li>
                  <li>
                    Diagnosed, debugged, and resolved application bottlenecks and production defects across backend modules and relational/document database layers.
                  </li>
                  <li>
                    Collaborated with frontend and product stakeholders in an agile remote environment to deliver maintainable, well-documented backend releases.
                  </li>
                </ul>
              </div>

              {/* Role 2: Freelance Full-Stack Software Engineer */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-[#090D16]">
                      Full-Stack Software Engineer
                    </h3>
                    <p className="text-sm font-medium text-[#374151]">
                      Independent / Freelance Engineering <span className="text-[#6B7280] font-normal">(Remote)</span>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#6B7280] shrink-0">
                    2021 – Present
                  </span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#374151] leading-relaxed list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Architect and deliver end-to-end full-stack web applications and operational software systems for clients and businesses, taking ownership from database schema design through production deployment.
                  </li>
                  <li>
                    Engineer backend architectures and RESTful APIs using Node.js, Express.js, Next.js Route Handlers, PostgreSQL, and MongoDB to support complex business logic, CRUD workflows, and data persistence.
                  </li>
                  <li>
                    Implement secure user authentication, role-based administrative dashboards, session handling, and automated transactional email pipelines (Resend, Nodemailer).
                  </li>
                  <li>
                    Develop responsive, accessible frontend interfaces using React, Next.js, TypeScript, and Tailwind CSS that translate complex operational data into intuitive user experiences.
                  </li>
                  <li>
                    Maintain, troubleshoot, refactor, and optimise existing client codebases—resolving runtime bugs, improving query efficiency, and managing cloud deployments on Vercel and Render.
                  </li>
                </ul>
              </div>

              {/* Role 3: Lazerpay */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-[#090D16]">
                      Backend Engineer
                    </h3>
                    <p className="text-sm font-medium text-[#374151]">
                      Lazerpay <span className="text-[#6B7280] font-normal">(Remote)</span>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#6B7280] shrink-0">
                    July 2022 – February 2023
                  </span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#374151] leading-relaxed list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Maintained and supported existing backend services and API systems, contributing to ongoing platform stability, functionality, and operational reliability.
                  </li>
                  <li>
                    Investigated, debugged, and resolved backend defects across existing codebases, working closely with engineering teammates to troubleshoot service issues.
                  </li>
                  <li>
                    Implemented JWT-based authentication workflows and contributed to backend API functionality and service architecture enhancements.
                  </li>
                  <li>
                    Containerised backend services using Docker to standardise local development and deployment environments across the engineering team.
                  </li>
                  <li>
                    Contributed to system maintainability and scaling efforts while collaborating asynchronously within a remote engineering workflow.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. SELECTED ENGINEERING PROJECTS */}
          <section className="mb-9 border-t border-[#E5E7EB] pt-8" aria-labelledby="projects-heading">
            <div className="flex items-baseline justify-between mb-6">
              <h2
                id="projects-heading"
                className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#6B7280]"
              >
                Selected Engineering Projects
              </h2>
              <span className="text-[11px] font-mono text-[#6B7280]">
                Independent Systems &amp; Architecture
              </span>
            </div>

            <div className="space-y-7">
              {/* Project A: Jay's Food Court */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-[#090D16]">
                      Jay&apos;s Food Court — Full-Stack Restaurant Ordering &amp; Operations Platform
                    </h3>
                    <a
                      href="https://jays-food-court.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#1D4ED8] hover:underline"
                    >
                      <span>jays-food-court.vercel.app</span>
                      <ExternalLink className="w-3 h-3 print:hidden" />
                    </a>
                  </div>
                </div>
                <p className="text-xs font-mono text-[#4B5563] mt-1">
                  Next.js • TypeScript • Supabase • PostgreSQL • Tailwind CSS • Server-Side Order Workflows
                </p>
                <ul className="mt-2.5 space-y-1.5 text-sm text-[#374151] leading-relaxed list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Architected and built a full-stack restaurant ordering and internal operations platform uniting customer ordering, kitchen processing, and rider delivery workflows in a database-driven system.
                  </li>
                  <li>
                    Engineered a mobile-first customer ordering interface supporting category &amp; menu management, item customisation, guest checkout, secure customer session handling, and delivery address management.
                  </li>
                  <li>
                    Implemented server-side pricing validation and structured order lifecycle management—connecting order placement, kitchen preparation queues, rider dispatch workflows, and live order status tracking backed by Supabase and PostgreSQL.
                  </li>
                </ul>
              </div>

              {/* Project B: Global Citizen Immigration Platform */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-[#090D16]">
                      Global Citizen Immigration Platform — Interactive 3D &amp; AI Guidance System
                    </h3>
                    <a
                      href="https://global-immigration-platform.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#1D4ED8] hover:underline"
                    >
                      <span>global-immigration-platform.vercel.app</span>
                      <ExternalLink className="w-3 h-3 print:hidden" />
                    </a>
                  </div>
                </div>
                <p className="text-xs font-mono text-[#4B5563] mt-1">
                  Next.js • React • TypeScript • Three.js / WebGL • Conversational AI Engine • Tailwind CSS
                </p>
                <ul className="mt-2.5 space-y-1.5 text-sm text-[#374151] leading-relaxed list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Developed an interactive digital guidance platform designed to make complex immigration information accessible through a modern, responsive web experience.
                  </li>
                  <li>
                    Engineered an AI-powered conversational assistant structured around 50+ immigration questions, topics, and pathway categories to deliver instant, context-aware informational responses.
                  </li>
                  <li>
                    Integrated an interactive 3D WebGL globe alongside a responsive frontend architecture, balancing rich 3D visual rendering with cross-device performance and usability.
                  </li>
                </ul>
              </div>

              {/* Project C: Lone Star Autos */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="text-base font-bold text-[#090D16]">
                    Lone Star Autos — Full-Stack Automotive Dealership &amp; Real-Time Inventory Platform
                  </h3>
                </div>
                <p className="text-xs font-mono text-[#4B5563] mt-1">
                  Node.js • Express.js • MongoDB • Socket.IO • Cloudinary • JWT Authentication
                </p>
                <ul className="mt-2.5 space-y-1.5 text-sm text-[#374151] leading-relaxed list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Built a full-stack automotive dealership system combining vehicle inventory management, real-time customer-dealer communication, and administrative operations.
                  </li>
                  <li>
                    Designed the backend REST API architecture and MongoDB data models with secure authentication and protected administrative workflows for vehicle listings and dealership analytics.
                  </li>
                  <li>
                    Integrated Socket.IO for real-time event updates and bidirectional communication, alongside Cloudinary media pipelines for automated multi-image upload and delivery optimisation.
                  </li>
                </ul>
              </div>

              {/* Project D: ORC Investment Platform */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="text-base font-bold text-[#090D16]">
                    ORC Investment Platform — Investment Programme &amp; Administrative Management System
                  </h3>
                </div>
                <p className="text-xs font-mono text-[#4B5563] mt-1">
                  Node.js • Vanilla JavaScript • HTML5 / Tailwind CSS / CSS3 • Neon PostgreSQL (pg) • Resend / Nodemailer • Vercel Serverless &amp; Cron
                </p>
                <ul className="mt-2.5 space-y-1.5 text-sm text-[#374151] leading-relaxed list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Developed a full-stack investment programme management platform enabling users to enrol in structured investment programmes and track returns according to defined programme durations and terms.
                  </li>
                  <li>
                    Engineered a comprehensive administrative dashboard with full CRUD control over investment programmes, centralized user account monitoring, and oversight of system-wide investment activities.
                  </li>
                  <li>
                    Implemented relational persistence with Neon PostgreSQL (`pg`), scheduled serverless cron jobs on Vercel for duration/ROI lifecycle processing, and automated transactional email notifications via Resend and Nodemailer.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. EDUCATION */}
          <section className="border-t border-[#E5E7EB] pt-8" aria-labelledby="education-heading">
            <h2
              id="education-heading"
              className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#6B7280] mb-4"
            >
              Education
            </h2>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3 className="text-sm font-bold text-[#090D16]">
                    Bachelor of Science (B.Sc.) in Accounting
                  </h3>
                  <p className="text-sm text-[#4B5563]">
                    Nnamdi Azikiwe University (UNIZIK)
                  </p>
                </div>
                <span className="text-xs font-mono text-[#6B7280]">
                  2021 – 2025
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3 className="text-sm font-semibold text-[#1F2937]">
                    Secondary Education
                  </h3>
                  <p className="text-sm text-[#4B5563]">
                    Anglican Comprehensive Secondary School, Kubwa, Abuja
                  </p>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      {/* Dedicated Print Stylesheet for Clean 2-Page A4 / Letter Output */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 14mm 16mm;
          }
          html,
          body {
            background: #ffffff !important;
            color: #111827 !important;
            font-size: 11pt;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          a {
            text-decoration: none !important;
            color: inherit !important;
          }
          section {
            page-break-inside: auto;
          }
          h2,
          h3 {
            page-break-after: avoid;
          }
          ul,
          li {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
