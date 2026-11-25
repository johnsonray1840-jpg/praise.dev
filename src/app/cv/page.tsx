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

      {/* Editorial Document Sheet — Generous Whitespace & Breathing Room */}
      <main className="max-w-4xl mx-auto my-8 sm:my-14 px-4 sm:px-8 print:my-0 print:px-0 print:max-w-none">
        <article className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02),0_24px_60px_rgba(0,0,0,0.03)] px-6 py-10 sm:px-16 sm:py-20 print:border-none print:shadow-none print:p-0">
          
          {/* 1. HEADER & PROFESSIONAL IDENTITY */}
          <header className="border-b border-[#E5E7EB] pb-10 mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#090D16] leading-tight">
                  Praise Godswill
                </h1>
                <p className="text-lg sm:text-xl font-medium text-[#1D4ED8] mt-2 tracking-tight">
                  Full-Stack Software Engineer
                </p>
              </div>
              <p className="text-xs sm:text-sm font-mono text-[#6B7280] tracking-wide italic md:text-right">
                &ldquo;Thoughtfully engineered. Intentionally built.&rdquo;
              </p>
            </div>

            {/* Contact Metadata Grid — Clean, Breathable, Clickable */}
            <div className="mt-7 pt-6 border-t border-[#F3F4F6] flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              <span>Lekki Orchid, Lagos, Nigeria</span>
              <span className="text-[#D1D5DB] select-none hidden sm:inline">•</span>
              <a
                href="tel:+2349018403385"
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                09018403385
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
                praise-dev-pi.vercel.app
              </a>
              <span className="text-[#D1D5DB] select-none hidden sm:inline">•</span>
              <a
                href="https://github.com/456-bytes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                github.com/456-bytes
              </a>
              <span className="text-[#D1D5DB] select-none hidden sm:inline">•</span>
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

          {/* 2. PROFESSIONAL SUMMARY — Split into 2 Breathable Paragraphs */}
          <section className="mb-14" aria-labelledby="summary-heading">
            <h2
              id="summary-heading"
              className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#6B7280] mb-5"
            >
              Professional Summary
            </h2>
            <div className="space-y-4 text-sm sm:text-[15.5px] text-[#374151] leading-[1.85]">
              <p>
                Full-Stack Software Engineer with over 5 years of hands-on experience designing, building, debugging, and maintaining production web applications and backend systems. Strong backend engineering foundation in{' '}
                <strong className="font-semibold text-[#111827]">
                  Node.js, Express.js, TypeScript, RESTful API design, PostgreSQL, and MongoDB
                </strong>
                , paired with modern, responsive frontend execution in{' '}
                <strong className="font-semibold text-[#111827]">React and Next.js</strong>.
              </p>
              <p>
                Experienced in implementing secure authentication and authorisation workflows (JWT, OAuth, role-based access control), real-time event architectures (Socket.IO), third-party service integrations, containerised services (Docker), and cloud deployment pipelines. Proven track record of taking end-to-end technical ownership across remote startup and freelance engineering environments—delivering reliable, maintainable software systems built around clear operational logic.
              </p>
            </div>
          </section>

          {/* 3. TECHNICAL SKILLS — Structured Cards with Clear Separation */}
          <section className="mb-14 border-t border-[#E5E7EB] pt-12" aria-labelledby="skills-heading">
            <h2
              id="skills-heading"
              className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#6B7280] mb-7"
            >
              Technical Skills &amp; Core Competencies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-2">
                  Languages
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-2">
                  Backend Engineering
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  Node.js, Express.js, RESTful API Design, Socket.IO, WebSockets, Serverless &amp; Cron Functions, PHP
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-2">
                  Frontend Engineering
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  React, Next.js (App Router &amp; SSR), Tailwind CSS, Three.js / WebGL, Bootstrap, EJS, Responsive UI
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-2">
                  Databases &amp; Storage
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  PostgreSQL (Neon, Supabase, node-postgres), MongoDB (Mongoose), MySQL, Cloudinary
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-2">
                  Authentication &amp; Security
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  JWT Authentication, OAuth, Role-Based Access Control (RBAC), Session Management, Rate Limiting
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-2">
                  DevOps, Cloud &amp; Tooling
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  Docker, Vercel, Render, AWS, Firebase, CI/CD Workflows, Git, GitHub, Postman, Resend / Nodemailer
                </p>
              </div>
            </div>
          </section>

          {/* 4. PROFESSIONAL EXPERIENCE — Generous Vertical Spacing & Paragraph Intro */}
          <section className="mb-14 border-t border-[#E5E7EB] pt-12" aria-labelledby="experience-heading">
            <h2
              id="experience-heading"
              className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#6B7280] mb-8"
            >
              Professional Experience
            </h2>

            <div className="space-y-12">
              {/* Role 1: Confidential Technology Startup */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#090D16]">
                      Backend Engineer
                    </h3>
                    <p className="text-sm font-medium text-[#1D4ED8] mt-0.5">
                      Confidential Technology Company{' '}
                      <span className="text-[#6B7280] font-normal">(Remote — NDA)</span>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full w-fit shrink-0">
                    May 2025 – March 2026
                  </span>
                </div>

                <p className="text-sm text-[#4B5563] leading-[1.8] mb-3.5">
                  Worked within a distributed engineering team developing and maintaining backend services, secure authentication layers, and API integrations under a confidentiality agreement.
                </p>

                <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#374151] leading-[1.8] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Designed, developed, and maintained backend services and RESTful API endpoints supporting core application workflows within a remote engineering environment.
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
                </ul>
              </div>

              {/* Role 2: Freelance Full-Stack Software Engineer */}
              <div className="border-t border-[#F3F4F6] pt-10">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#090D16]">
                      Full-Stack Software Engineer
                    </h3>
                    <p className="text-sm font-medium text-[#1D4ED8] mt-0.5">
                      Independent / Freelance Engineering{' '}
                      <span className="text-[#6B7280] font-normal">(Remote)</span>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full w-fit shrink-0">
                    2021 – Present
                  </span>
                </div>

                <p className="text-sm text-[#4B5563] leading-[1.8] mb-3.5">
                  Partner with clients and businesses to architect, build, debug, and deploy custom full-stack web applications and operational software systems from concept through production delivery.
                </p>

                <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#374151] leading-[1.8] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Engineer backend architectures and RESTful APIs using Node.js, Express.js, Next.js Route Handlers, PostgreSQL, and MongoDB to support complex business logic, CRUD workflows, and data persistence.
                  </li>
                  <li>
                    Implement secure user authentication, role-based administrative dashboards, customer session handling, and automated transactional email pipelines (Resend, Nodemailer).
                  </li>
                  <li>
                    Develop responsive, accessible frontend interfaces using React, Next.js, TypeScript, and Tailwind CSS that translate complex operational data into clean user experiences.
                  </li>
                  <li>
                    Maintain, troubleshoot, refactor, and optimise existing client codebases—resolving runtime bugs, improving database query efficiency, and managing cloud deployments on Vercel and Render.
                  </li>
                </ul>
              </div>

              {/* Role 3: Lazerpay */}
              <div className="border-t border-[#F3F4F6] pt-10">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#090D16]">
                      Backend Engineer
                    </h3>
                    <p className="text-sm font-medium text-[#1D4ED8] mt-0.5">
                      Lazerpay <span className="text-[#6B7280] font-normal">(Remote)</span>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full w-fit shrink-0">
                    July 2022 – February 2023
                  </span>
                </div>

                <p className="text-sm text-[#4B5563] leading-[1.8] mb-3.5">
                  Contributed to backend engineering, system maintenance, and service reliability across existing backend infrastructure within a remote engineering team.
                </p>

                <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#374151] leading-[1.8] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Maintained and supported existing backend services and API systems, contributing to ongoing platform stability, functionality, and operational reliability.
                  </li>
                  <li>
                    Investigated, debugged, and resolved backend issues across existing codebases, collaborating with engineering teammates to troubleshoot service behaviour.
                  </li>
                  <li>
                    Implemented JWT-based authentication workflows and contributed to backend API functionality and architectural improvements.
                  </li>
                  <li>
                    Containerised backend services using Docker to standardise development and deployment environments across the engineering team.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. SELECTED ENGINEERING PROJECTS — Breathable Overview Paragraph + Clear Bullets */}
          <section className="mb-14 border-t border-[#E5E7EB] pt-12" aria-labelledby="projects-heading">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
              <h2
                id="projects-heading"
                className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#6B7280]"
              >
                Selected Engineering Projects
              </h2>
              <span className="text-xs font-mono text-[#6B7280]">
                Demonstrable Full-Stack &amp; Backend Systems
              </span>
            </div>

            <div className="space-y-12">
              {/* Project A: Jay's Food Court */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-[#090D16]">
                    Jay&apos;s Food Court — Full-Stack Restaurant Ordering &amp; Operations Platform
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

                <p className="text-xs font-mono text-[#6B7280] mb-3">
                  Next.js • TypeScript • Supabase • PostgreSQL • Tailwind CSS • Server-Side Order Workflows
                </p>

                <p className="text-sm sm:text-[15px] text-[#4B5563] leading-[1.8] mb-3">
                  A full-stack restaurant ordering and internal operations platform designed to coordinate customer ordering, kitchen preparation, and rider delivery workflows within a unified database-driven architecture.
                </p>

                <ul className="space-y-2 text-sm sm:text-[15px] text-[#374151] leading-[1.8] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Engineered a mobile-first customer ordering interface supporting menu and category management, food customisation, guest checkout, secure customer session handling, and delivery address management.
                  </li>
                  <li>
                    Implemented server-side pricing calculation and structured order lifecycle management—connecting order placement, kitchen operations queues, rider delivery workflows, and real-time order status tracking backed by Supabase and PostgreSQL.
                  </li>
                </ul>
              </div>

              {/* Project B: Global Citizen Immigration Platform */}
              <div className="border-t border-[#F3F4F6] pt-10">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-[#090D16]">
                    Global Citizen Immigration Platform — Interactive 3D &amp; AI Guidance System
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

                <p className="text-xs font-mono text-[#6B7280] mb-3">
                  Next.js • React • TypeScript • Three.js / WebGL • Conversational AI Engine • Tailwind CSS
                </p>

                <p className="text-sm sm:text-[15px] text-[#4B5563] leading-[1.8] mb-3">
                  An immigration-focused digital information platform designed to make immigration guidance accessible through an interactive 3D and conversational AI interface.
                </p>

                <ul className="space-y-2 text-sm sm:text-[15px] text-[#374151] leading-[1.8] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Engineered an AI-powered conversational assistant designed around 50+ immigration-related questions and topics to provide structured, accessible informational guidance.
                  </li>
                  <li>
                    Integrated an interactive 3D WebGL globe alongside a responsive modern frontend architecture that adapts smoothly across desktop and mobile devices.
                  </li>
                </ul>
              </div>

              {/* Project C: Lone Star Autos */}
              <div className="border-t border-[#F3F4F6] pt-10">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-[#090D16]">
                    Lone Star Autos — Full-Stack Automotive Dealership Platform
                  </h3>
                </div>

                <p className="text-xs font-mono text-[#6B7280] mb-3">
                  Node.js • Express.js • MongoDB • Socket.IO • Cloudinary • JWT Authentication
                </p>

                <p className="text-sm sm:text-[15px] text-[#4B5563] leading-[1.8] mb-3">
                  A full-stack automotive dealership application combining vehicle inventory management, real-time communication, administrative oversight, and cloud media optimisation.
                </p>

                <ul className="space-y-2 text-sm sm:text-[15px] text-[#374151] leading-[1.8] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Designed the backend REST API architecture and MongoDB schemas with secure authentication, protected administrative dashboard controls, and dealership analytics.
                  </li>
                  <li>
                    Integrated Socket.IO for real-time communication and live state updates, paired with Cloudinary pipelines for automated vehicle image upload and delivery optimisation.
                  </li>
                </ul>
              </div>

              {/* Project D: ORC Investment Platform */}
              <div className="border-t border-[#F3F4F6] pt-10">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-[#090D16]">
                    ORC Investment Platform — Investment Programme &amp; Administrative System
                  </h3>
                </div>

                <p className="text-xs font-mono text-[#6B7280] mb-3">
                  Node.js • Vanilla JavaScript • HTML5 / Tailwind CSS / CSS3 • Neon PostgreSQL (pg) • Resend / Nodemailer • Vercel Serverless &amp; Cron
                </p>

                <p className="text-sm sm:text-[15px] text-[#4B5563] leading-[1.8] mb-3">
                  A full-stack investment programme management platform enabling users to participate in defined-duration investment programmes while providing administrators with centralised operational control.
                </p>

                <ul className="space-y-2 text-sm sm:text-[15px] text-[#374151] leading-[1.8] list-disc pl-5 marker:text-[#9CA3AF]">
                  <li>
                    Built user-facing investment workflows and an administrative dashboard with full CRUD functionality to create, manage, and control investment programmes and monitor user accounts.
                  </li>
                  <li>
                    Implemented relational database persistence using Neon PostgreSQL (`pg`), scheduled serverless cron jobs on Vercel for programme duration and ROI tracking, and transactional email alerts via Resend and Nodemailer.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. EDUCATION */}
          <section className="border-t border-[#E5E7EB] pt-12" aria-labelledby="education-heading">
            <h2
              id="education-heading"
              className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#6B7280] mb-6"
            >
              Education
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold text-[#090D16]">
                    Bachelor of Science (B.Sc.) in Accounting
                  </h3>
                  <p className="text-sm text-[#4B5563] mt-0.5">
                    Nnamdi Azikiwe University (UNIZIK)
                  </p>
                </div>
                <span className="text-xs font-mono text-[#6B7280]">
                  2021 – 2025
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 pt-4 border-t border-[#F3F4F6]">
                <div>
                  <h3 className="text-base font-semibold text-[#1F2937]">
                    Secondary Education
                  </h3>
                  <p className="text-sm text-[#4B5563] mt-0.5">
                    Anglican Comprehensive Secondary School, Kubwa, Abuja
                  </p>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      {/* Dedicated Print Stylesheet */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 16mm 16mm;
          }
          html,
          body {
            background: #ffffff !important;
            color: #111827 !important;
            font-size: 10.5pt;
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
