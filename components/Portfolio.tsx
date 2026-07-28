"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];

const stats = [
  ["120+", "APIs shaped for production use"],
  ["40%", "Approx. faster response paths"],
  ["10k+", "Daily image workloads handled"],
  ["4", "Utility organizations supported"],
];

const skillGroups = [
  {
    title: "Core Backend",
    items: ["Node.js", "TypeScript", "JavaScript", "SQL", "Express.js", "Joi"],
    accent: "green",
  },
  {
    title: "Data & Persistence",
    items: ["PostgreSQL", "Prisma", "MySQL", "MongoDB", "Indexing", "Query Optimization"],
    accent: "cyan",
  },
  {
    title: "Architecture",
    items: [
      "REST APIs",
      "Event-Driven Systems",
      "Kafka",
      "Microservices",
      "Multi-Tenant Platforms",
      "RBAC",
      "JWT Auth",
    ],
    accent: "violet",
  },
  {
    title: "Cloud & Workflow",
    items: ["AWS S3", "Git", "Postman", "API Documentation", "Debugging", "Release Support"],
    accent: "green",
  },
];

const projects = [
  {
    name: "SMRITI 3.0",
    subtitle: "A multi-tenant backend platform for utility operations and analytics.",
    tech: ["Node.js", "TypeScript", "Express.js", "PostgreSQL", "SaiGPT", "AWS S3"],
    story:
      "Built around the realities of enterprise utility workflows: different organizations, different access boundaries, large operational datasets, and dashboards that need to stay responsive under everyday field usage.",
    highlights: [
      "Designed backend modules that keep tenant data separated while still supporting shared analytics workflows.",
      "Improved dashboard responsiveness with caching and targeted invalidation instead of broad, fragile refreshes.",
      "Strengthened internal access control using granular role permissions across sensitive operational actions.",
    ],
    glow: "from-emerald-500/20 to-cyan-500/10",
  },
  {
    name: "Async OCR Pipeline",
    subtitle: "An event-driven image processing workflow for high-volume field data.",
    tech: ["Node.js", "TypeScript", "Apache Kafka", "PostgreSQL", "AWS S3"],
    story:
      "Designed for messy, real-world uploads where reliability matters more than a perfect happy path. The system decouples ingestion, processing, retries, storage, and failure handling so the user-facing app stays fast.",
    highlights: [
      "Moved heavy OCR work out of request-response flows into asynchronous producer-consumer processing.",
      "Added retry and dead-letter handling so failed images could be inspected without blocking the full pipeline.",
      "Helped reduce repetitive manual entry by turning field images into structured operational data.",
    ],
    glow: "from-violet-500/20 to-emerald-500/10",
  },
];

const experience = [
  "I work on backend services where correctness, access control, and performance directly affect operational teams.",
  "My day-to-day work spans API design, database modelling, authentication flows, debugging production issues, and coordinating backend changes with frontend and product needs.",
  "I enjoy systems that are boring in the best way: predictable, observable, secure, and easy for the next engineer to extend.",
  "Recently, I have been especially focused on async workloads, multi-tenant access patterns, and reducing latency in data-heavy API paths.",
];

const contactCards = [
  {
    label: "Email",
    value: "joshikrati03@gmail.com",
    href: "mailto:joshikrati03@gmail.com",
    accent: "green",
  },
  {
    label: "WhatsApp",
    value: "Send a quick message",
    href: "https://wa.me/919760157772",
    accent: "cyan",
  },
  {
    label: "Location",
    value: "Meerut, UP - Open to relocation",
    href: "https://www.google.com/maps/search/Meerut,+Uttar+Pradesh",
    accent: "violet",
  },
];

function sectionVariants(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-120px" },
    transition: { duration: 0.65, delay, ease: "easeOut" },
  };
}

function getAccentClasses(accent: string) {
  if (accent === "cyan") return "border-cyan-400/25 bg-cyan-400/10 text-cyan-200";
  if (accent === "violet") return "border-violet-400/25 bg-violet-400/10 text-violet-200";
  return "border-emerald-400/25 bg-emerald-400/10 text-emerald-200";
}

function getGlowClass(accent: string) {
  if (accent === "cyan") return "hover:border-cyan-400/50 hover:shadow-cyanGlow";
  if (accent === "violet") return "hover:border-violet-400/50 hover:shadow-violetGlow";
  return "hover:border-emerald-400/50 hover:shadow-glow";
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openExperience, setOpenExperience] = useState(true);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 28 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 28 });
  const spotlight = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(520px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.13), transparent 45%)`,
  );

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-void text-white"
      onMouseMove={(event) => {
        pointerX.set(event.clientX);
        pointerY.set(event.clientY);
      }}
    >
      <motion.div className="pointer-events-none fixed inset-0 z-0 hidden md:block" style={{ background: spotlight }} />
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-35" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-dots opacity-20" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-night/70 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#hero" className="group flex items-center gap-3 font-mono text-sm font-semibold text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-400/35 bg-emerald-400/10 text-lg text-emerald-300 shadow-glow transition group-hover:scale-105">
              &gt;_
            </span>
            <span className="text-emerald-200">&lt;KratiJoshi /&gt;</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-mist transition hover:text-emerald-300">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="/Krati-Joshi-Resume.pdf" target="_blank" className="rounded-full border border-emerald-400/50 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/10 hover:shadow-glow">
              View Resume
            </a>
            <a href="mailto:joshikrati03@gmail.com" className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 hover:shadow-glow">
              Get in Touch
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
          >
            <span className="font-mono">{menuOpen ? "x" : "menu"}</span>
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              className="absolute right-4 top-16 w-[min(22rem,calc(100vw-2rem))] rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
            >
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-mist transition hover:bg-white/5 hover:text-emerald-300"
                  >
                    {item}
                  </a>
                ))}
                <a href="/Krati-Joshi-Resume.pdf" target="_blank" className="mt-2 rounded-2xl border border-emerald-400/40 px-4 py-3 text-center text-sm font-bold text-emerald-200">
                  View Resume
                </a>
                <a href="mailto:joshikrati03@gmail.com" onClick={() => setMenuOpen(false)} className="rounded-2xl bg-emerald-400 px-4 py-3 text-center text-sm font-bold text-slate-950">
                  Get in Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="hero" className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div {...sectionVariants()}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 font-mono text-xs text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-glow" />
            Backend Engineer - Node.js - TypeScript - PostgreSQL
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <span className="text-gradient">Krati Joshi</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300">
            I build backend systems that make complex operational workflows feel simple, fast, and reliable.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-mist">
            My work sits at the intersection of API design, database performance, secure access control, and event-driven processing - the pieces users rarely see, but always feel.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#projects" className="group rounded-full bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-glow">
              Explore My Work <span className="transition group-hover:translate-x-1">-&gt;</span>
            </a>
            <a href="mailto:joshikrati03@gmail.com" className="rounded-full border border-cyan-400/40 px-6 py-3 text-center font-bold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-400/10 hover:shadow-cyanGlow">
              Contact Me
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-mist">
            <a className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-emerald-400/40 hover:text-emerald-200" href="https://github.com/KRATI-cmd" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-400/40 hover:text-cyan-200" href="https://www.linkedin.com/in/krati-joshi-9b000a20b/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-emerald-400/40 hover:text-emerald-200" href="https://dev.to/joshikrati03" target="_blank" rel="noreferrer">
              Dev.to
            </a>
            <a className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-violet-400/40 hover:text-violet-200" href="mailto:joshikrati03@gmail.com">
              Email
            </a>
          </div>
        </motion.div>

        <motion.div {...sectionVariants(0.12)} className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 blur-3xl" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card relative overflow-hidden rounded-[2rem]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <span className="font-mono text-xs text-mist">systems/krati.json</span>
            </div>
            <div className="p-5 font-mono text-sm leading-7 text-slate-300 sm:p-7">
              <p><span className="text-violet-300">const</span> backend = {"{"}</p>
              <p className="pl-5"><span className="text-cyan-300">focus</span>: <span className="text-emerald-300">&quot;secure scalable APIs&quot;</span>,</p>
              <p className="pl-5"><span className="text-cyan-300">patterns</span>: [&quot;RBAC&quot;, &quot;caching&quot;, &quot;queues&quot;, &quot;multi-tenancy&quot;],</p>
              <p className="pl-5"><span className="text-cyan-300">style</span>: <span className="text-emerald-300">&quot;clear contracts, calm systems&quot;</span>,</p>
              <p className="pl-5"><span className="text-cyan-300">status</span>: <span className="text-emerald-300">&quot;available for backend roles&quot;</span></p>
              <p>{"}"}</p>
              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <p className="text-emerald-200">$ curl /api/platform/health</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0.7, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="mt-2 text-white"
                >
                  200 OK - latency low - auth enforced - jobs running
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <motion.section id="about" {...sectionVariants()} className="relative z-10 mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="glass-card mb-6 rounded-[2rem] p-7 sm:p-9">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-emerald-300">About</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">A backend engineer who likes turning messy workflows into dependable systems.</h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-mist">
            Krati focuses on the invisible foundation behind useful software: clean APIs, practical data models, safe permission systems, and background jobs that keep moving even when inputs are imperfect. She brings a product-aware backend mindset - not just writing endpoints, but understanding how each service supports people using the platform every day.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label], index) => (
            <motion.div
              key={label}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="glass-card rounded-3xl p-6 transition hover:border-emerald-400/40 hover:shadow-glow"
            >
              <p className="font-mono text-4xl font-extrabold text-white">{value}</p>
              <p className="mt-3 text-sm leading-6 text-mist">{label}</p>
              <div className={`mt-5 h-1 rounded-full ${index % 2 ? "bg-cyan-400" : "bg-emerald-400"}`} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section id="skills" className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <motion.div {...sectionVariants()} className="max-w-3xl">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-emerald-300">Technical Stack</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Tools chosen for maintainable backend work.</h2>
          <p className="mt-5 text-lg leading-8 text-mist">The stack is intentionally practical: API contracts, relational data, async processing, cloud storage, and security patterns that hold up in real teams.</p>
        </motion.div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group, index) => (
            <motion.div key={group.title} {...sectionVariants(index * 0.06)} className="glass-card rounded-3xl p-6 transition hover:border-cyan-400/30 hover:shadow-cyanGlow">
              <h3 className="text-xl font-bold text-white">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span key={item} className={`rounded-full border px-3 py-2 font-mono text-xs ${getAccentClasses(group.accent)}`}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <motion.div {...sectionVariants()} className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">Featured Projects</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Selected backend systems and architecture work.</h2>
          </div>
          <p className="max-w-md text-mist">Rather than repeating resume bullets, these snapshots explain the product problem, backend approach, and engineering choices behind the work.</p>
        </motion.div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article key={project.name} {...sectionVariants(index * 0.08)} whileHover={{ y: -8 }} className="glass-card group relative overflow-hidden rounded-[2rem] p-7 transition hover:border-emerald-400/35">
              <div className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-br ${project.glow} opacity-80 blur-3xl transition group-hover:opacity-100`} />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">{project.name}</h3>
                    <p className="mt-2 text-cyan-200">{project.subtitle}</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-200">SYSTEM</span>
                </div>
                <p className="mt-6 text-sm leading-7 text-slate-300">{project.story}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="mt-7 space-y-4 text-sm leading-7 text-mist">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-glow" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="experience" className="relative z-10 mx-auto max-w-5xl px-5 py-24 lg:px-8">
        <motion.div {...sectionVariants()} className="glass-card rounded-[2rem] p-6 sm:p-8">
          <button onClick={() => setOpenExperience((value) => !value)} className="flex w-full items-start justify-between gap-6 text-left">
            <span>
              <span className="font-mono text-sm uppercase tracking-[0.25em] text-violet-300">Experience</span>
              <span className="mt-3 block text-3xl font-bold text-white">Backend Developer - SAI Computers Limited</span>
              <span className="mt-2 block text-mist">Feb 2024 - Present</span>
            </span>
            <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 font-mono text-violet-200">{openExperience ? "-" : "+"}</span>
          </button>
          <AnimatePresence initial={false}>
            {openExperience && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="mt-8 border-l border-emerald-400/25 pl-6">
                  {experience.map((item, index) => (
                    <motion.div key={item} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} className="relative pb-6 last:pb-0">
                      <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-emerald-400 shadow-glow" />
                      <p className="text-slate-300">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      <section id="contact" className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <motion.div {...sectionVariants()} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-emerald-300">Contact</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Let&apos;s talk backend, platforms, and production systems.</h2>
            <p className="mt-5 text-lg leading-8 text-mist">
              The form has been removed so nothing breaks silently. Use the direct links instead - faster, clearer, and recruiter-friendly.
            </p>
          </div>
          <div className="grid gap-4">
            {contactCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.label === "Location" || card.label === "WhatsApp" ? "_blank" : undefined}
                rel={card.label === "Location" || card.label === "WhatsApp" ? "noreferrer" : undefined}
                className={`glass-card rounded-3xl p-6 transition hover:-translate-y-1 ${getGlowClass(card.accent)}`}
              >
                <p className={`font-mono text-xs uppercase tracking-[0.22em] ${card.accent === "cyan" ? "text-cyan-300" : card.accent === "violet" ? "text-violet-300" : "text-emerald-300"}`}>
                  {card.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{card.value}</p>
              </a>
            ))}
            <a href="/Krati-Joshi-Resume.pdf" target="_blank" className="rounded-full bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950 transition hover:bg-emerald-300 hover:shadow-glow">
              Open Resume PDF
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-mist sm:flex-row">
          <p>Copyright {new Date().getFullYear()} Krati Joshi. Built in dark mode.</p>
          <div className="flex gap-3">
            <a className="transition hover:text-emerald-300" href="https://github.com/KRATI-cmd" target="_blank" rel="noreferrer">GitHub</a>
            <a className="transition hover:text-cyan-300" href="https://www.linkedin.com/in/krati-joshi-9b000a20b/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="transition hover:text-emerald-300" href="https://dev.to/joshikrati03" target="_blank" rel="noreferrer">Dev.to</a>
            <a className="transition hover:text-green-300" href="https://wa.me/919760157772" target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="transition hover:text-violet-300" href="mailto:joshikrati03@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
