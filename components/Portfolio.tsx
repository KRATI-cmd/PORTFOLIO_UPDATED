"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Close,
  Cloud,
  Database,
  DevTo,
  Document,
  Github,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Plus,
  Server,
  Spark,
  Terminal,
  WhatsApp,
} from "./icons";
import { CountUp, EASE, Magnetic, Marquee, Tilt, Typewriter, WordReveal } from "./motion";

type Accent = "sky" | "cyan" | "teal";
type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const RESUME_URL = "/Krati-Joshi-Resume.pdf";
const EMAIL = "joshikrati03@gmail.com";
const WHATSAPP_URL = "https://wa.me/919760157772";

const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];

const socials: { label: string; href: string; icon: IconType; accent: Accent }[] = [
  { label: "GitHub", href: "https://github.com/KRATI-cmd", icon: Github, accent: "sky" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/krati-joshi-9b000a20b/", icon: Linkedin, accent: "cyan" },
  { label: "Dev.to", href: "https://dev.to/joshikrati03", icon: DevTo, accent: "sky" },
  { label: "Email", href: `mailto:${EMAIL}`, icon: Mail, accent: "teal" },
];

const stats: { to: number; suffix: string; label: string; accent: Accent }[] = [
  { to: 120, suffix: "+", label: "APIs shaped for production use", accent: "sky" },
  { to: 40, suffix: "%", label: "Approx. faster response paths", accent: "cyan" },
  { to: 10, suffix: "k+", label: "Daily image workloads handled", accent: "teal" },
  { to: 4, suffix: "", label: "Utility organizations supported", accent: "sky" },
];

const marqueeItems = [
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Apache Kafka",
  "Express.js",
  "Prisma",
  "AWS S3",
  "REST APIs",
  "Microservices",
  "RBAC",
  "JWT Auth",
  "MongoDB",
  "Event-Driven Systems",
  "Query Optimization",
];

const skillGroups: { title: string; items: string[]; accent: Accent; icon: IconType }[] = [
  {
    title: "Core Backend",
    items: ["Node.js", "TypeScript", "JavaScript", "SQL", "Express.js", "Joi"],
    accent: "sky",
    icon: Server,
  },
  {
    title: "Data & Persistence",
    items: ["PostgreSQL", "Prisma", "MySQL", "MongoDB", "Indexing", "Query Optimization"],
    accent: "cyan",
    icon: Database,
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
    accent: "teal",
    icon: Layers,
  },
  {
    title: "Cloud & Workflow",
    items: ["AWS S3", "Git", "Postman", "API Documentation", "Debugging", "Release Support"],
    accent: "sky",
    icon: Cloud,
  },
];

const projects: {
  name: string;
  subtitle: string;
  tag: string;
  tech: string[];
  story: string;
  highlights: string[];
  accent: Accent;
}[] = [
  {
    name: "SMRITI 3.0",
    subtitle: "A multi-tenant backend platform for utility operations and analytics.",
    tag: "Platform",
    tech: ["Node.js", "TypeScript", "Express.js", "PostgreSQL", "SaiGPT", "AWS S3"],
    story:
      "Built around the realities of enterprise utility workflows: different organizations, different access boundaries, large operational datasets, and dashboards that need to stay responsive under everyday field usage.",
    highlights: [
      "Designed backend modules that keep tenant data separated while still supporting shared analytics workflows.",
      "Improved dashboard responsiveness with caching and targeted invalidation instead of broad, fragile refreshes.",
      "Strengthened internal access control using granular role permissions across sensitive operational actions.",
    ],
    accent: "sky",
  },
  {
    name: "Async OCR Pipeline",
    subtitle: "An event-driven image processing workflow for high-volume field data.",
    tag: "Pipeline",
    tech: ["Node.js", "TypeScript", "Apache Kafka", "PostgreSQL", "AWS S3"],
    story:
      "Designed for messy, real-world uploads where reliability matters more than a perfect happy path. The system decouples ingestion, processing, retries, storage, and failure handling so the user-facing app stays fast.",
    highlights: [
      "Moved heavy OCR work out of request-response flows into asynchronous producer-consumer processing.",
      "Added retry and dead-letter handling so failed images could be inspected without blocking the full pipeline.",
      "Helped reduce repetitive manual entry by turning field images into structured operational data.",
    ],
    accent: "teal",
  },
];

const experience = [
  "I work on backend services where correctness, access control, and performance directly affect operational teams.",
  "My day-to-day work spans API design, database modelling, authentication flows, debugging production issues, and coordinating backend changes with frontend and product needs.",
  "I enjoy systems that are boring in the best way: predictable, observable, secure, and easy for the next engineer to extend.",
  "Recently, I have been especially focused on async workloads, multi-tenant access patterns, and reducing latency in data-heavy API paths.",
];

const contactCards: {
  label: string;
  value: string;
  href: string;
  accent: Accent;
  icon: IconType;
  external: boolean;
}[] = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, accent: "sky", icon: Mail, external: false },
  {
    label: "WhatsApp",
    value: "Send a quick message",
    href: WHATSAPP_URL,
    accent: "cyan",
    icon: WhatsApp,
    external: true,
  },
  {
    label: "Location",
    value: "Meerut, UP — open to relocation",
    href: "https://www.google.com/maps/search/Meerut,+Uttar+Pradesh",
    accent: "teal",
    icon: MapPin,
    external: true,
  },
];

const footerLinks: { label: string; href: string; icon: IconType; accent: Accent }[] = [
  ...socials,
  { label: "WhatsApp", href: WHATSAPP_URL, icon: WhatsApp, accent: "sky" },
];

const codeLines = [
  <>
    <span className="text-teal-300">const</span> <span className="text-slate-100">backend</span>{" "}
    <span className="text-slate-500">=</span> {"{"}
  </>,
  <>
    <span className="text-sky-300">focus</span>
    <span className="text-slate-500">:</span> <span className="text-cyan-300">&quot;secure scalable APIs&quot;</span>
    <span className="text-slate-500">,</span>
  </>,
  <>
    <span className="text-sky-300">patterns</span>
    <span className="text-slate-500">:</span> [<span className="text-cyan-300">&quot;RBAC&quot;</span>
    <span className="text-slate-500">,</span> <span className="text-cyan-300">&quot;caching&quot;</span>
    <span className="text-slate-500">,</span> <span className="text-cyan-300">&quot;queues&quot;</span>
    <span className="text-slate-500">,</span> <span className="text-cyan-300">&quot;multi-tenancy&quot;</span>]
    <span className="text-slate-500">,</span>
  </>,
  <>
    <span className="text-sky-300">style</span>
    <span className="text-slate-500">:</span>{" "}
    <span className="text-cyan-300">&quot;clear contracts, calm systems&quot;</span>
    <span className="text-slate-500">,</span>
  </>,
  <>
    <span className="text-sky-300">status</span>
    <span className="text-slate-500">:</span>{" "}
    <span className="text-cyan-300">&quot;available for backend roles&quot;</span>
  </>,
  <>
    {"}"}
    <span className="text-slate-500">;</span>
  </>,
];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

function Eyebrow({ children, accent = "sky" }: { children: React.ReactNode; accent?: Accent }) {
  return (
    <p className="eyebrow" data-accent={accent}>
      {children}
    </p>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:py-28 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openExperience, setOpenExperience] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [curlDone, setCurlDone] = useState(false);

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 26 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 26 });
  const spotlight = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(560px circle at ${x}px ${y}px, rgba(56, 189, 248, 0.10), transparent 46%)`,
  );

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  // Highlight the nav item for whichever section currently owns the viewport.
  useEffect(() => {
    const ids = ["hero", ...navItems.map((item) => item.toLowerCase())];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock background scrolling while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-void text-white"
      onMouseMove={(event) => {
        pointerX.set(event.clientX);
        pointerY.set(event.clientY);
      }}
    >
      {/* Drifting aurora fields */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="aurora animate-aurora-a"
          style={{
            top: "-14%",
            left: "-8%",
            width: "48vw",
            height: "48vw",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.26), transparent 68%)",
          }}
        />
        <div
          className="aurora animate-aurora-b"
          style={{
            top: "6%",
            right: "-12%",
            width: "42vw",
            height: "42vw",
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.2), transparent 68%)",
          }}
        />
        <div
          className="aurora animate-aurora-c"
          style={{
            bottom: "-18%",
            left: "28%",
            width: "52vw",
            height: "52vw",
            background: "radial-gradient(circle, rgba(45, 212, 191, 0.18), transparent 68%)",
          }}
        />
      </div>

      <motion.div className="pointer-events-none fixed inset-0 z-0 hidden md:block" style={{ background: spotlight }} />
      <div className="bg-grid pointer-events-none fixed inset-0 z-0" />
      <div className="bg-noise pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay" />

      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400"
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-night/80 shadow-lift backdrop-blur-2xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a href="#hero" className="group flex items-center gap-3 font-mono text-sm font-semibold text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-sky-400/35 bg-sky-400/10 text-sky-300 shadow-glow transition duration-300 group-hover:scale-105 group-hover:border-sky-400/60">
              <Terminal className="h-5 w-5" />
            </span>
            <span className="hidden text-sky-200 transition group-hover:text-sky-100 sm:inline">
              &lt;KratiJoshi /&gt;
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? "text-sky-300" : "text-mist hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full border border-sky-400/25 bg-sky-400/10"
                    />
                  )}
                  {item}
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 px-4 py-2 text-sm font-semibold text-sky-200 transition hover:border-sky-400/70 hover:bg-sky-400/10 hover:shadow-glow"
            >
              <Document className="h-4 w-4" />
              Resume
            </a>
            <Magnetic strength={0.22}>
              <a
                href={`mailto:${EMAIL}`}
                className="sheen group inline-flex items-center gap-2 rounded-full bg-sky-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-sky-300 hover:shadow-glow"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </div>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-sky-400/40 hover:text-sky-300 lg:hidden"
          >
            {menuOpen ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-void/80 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="card fixed right-4 top-20 z-50 w-[min(22rem,calc(100vw-2rem))] p-3 lg:hidden"
            >
              <motion.div
                className="grid gap-1"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.05, delayChildren: 0.08 }}
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item}
                    variants={{ hidden: { opacity: 0, x: 12 }, visible: { opacity: 1, x: 0 } }}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-mist transition hover:bg-white/5 hover:text-sky-300"
                  >
                    {item}
                    <ArrowRight className="h-4 w-4 opacity-40" />
                  </motion.a>
                ))}
                <div className="my-2 h-px bg-white/10" />
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-sky-400/40 px-4 py-3 text-sm font-bold text-sky-200"
                >
                  <Document className="h-4 w-4" />
                  View Resume
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-sky-400 px-4 py-3 text-sm font-bold text-slate-950"
                >
                  <Mail className="h-4 w-4" />
                  Get in Touch
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------ HERO */}
      <section
        id="hero"
        className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-5 pb-24 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-7 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] py-2 pl-3 pr-4 font-mono text-xs text-cyan-200 backdrop-blur"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute h-2 w-2 animate-pulse-ring rounded-full bg-teal-400" />
              <span className="h-2 w-2 rounded-full bg-teal-400" />
            </span>
            <span className="tracking-wide">Backend Engineer</span>
            <span className="text-cyan-500/60">/</span>
            <span className="tracking-wide">Node.js</span>
            <span className="text-cyan-500/60">/</span>
            <span className="tracking-wide">PostgreSQL</span>
          </motion.div>

          <h1 className="balance max-w-4xl text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            <WordReveal
              text="Hi, I'm Krati Joshi."
              delay={0.15}
              highlight="Krati Joshi"
              highlightClassName="text-gradient"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            className="pretty mt-7 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl sm:leading-9"
          >
            I build backend systems that make complex operational workflows feel simple, fast, and reliable.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.68, ease: EASE }}
            className="pretty mt-4 max-w-2xl text-base leading-8 text-mist sm:text-lg"
          >
            My work sits at the intersection of API design, database performance, secure access control, and
            event-driven processing — the pieces users rarely see, but always feel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.82, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#projects"
                className="sheen group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-400 px-6 py-3.5 font-bold text-slate-950 transition duration-300 hover:bg-sky-300 hover:shadow-glow sm:w-auto"
              >
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/35 px-6 py-3.5 font-bold text-cyan-100 transition duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:shadow-cyanGlow sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.07, delayChildren: 0.95 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            {socials.map(({ label, href, icon: SocialIcon, accent }) => (
              <motion.a
                key={label}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                data-accent={accent}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-mist transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--accent)/0.45)] hover:text-[rgb(var(--accent))]"
              >
                <SocialIcon className="h-4 w-4" />
                {label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-sky-500/25 via-cyan-500/15 to-teal-500/25 opacity-70 blur-3xl" />
          <Tilt max={4}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="card relative overflow-hidden rounded-[1.75rem]"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3.5">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400/90" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/90" />
                  <span className="h-3 w-3 rounded-full bg-teal-400/90" />
                </div>
                <span className="font-mono text-xs text-mist">systems/krati.json</span>
              </div>

              <div className="p-5 font-mono text-[13px] leading-7 text-slate-300 sm:p-7 sm:text-sm">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  transition={{ staggerChildren: 0.11, delayChildren: 0.75 }}
                >
                  {codeLines.map((line, index) => (
                    <motion.p
                      key={index}
                      variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={index > 0 && index < codeLines.length - 1 ? "pl-5" : ""}
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6, ease: EASE }}
                  className="mt-6 rounded-2xl border border-sky-400/20 bg-sky-400/[0.07] p-4"
                >
                  <p className="flex items-center gap-2 text-sky-200">
                    <span className="text-sky-500">$</span>
                    <Typewriter text="curl /api/platform/health" speed={42} startDelay={1900} onDone={() => setCurlDone(true)} />
                    {!curlDone && <span className="inline-block h-4 w-[7px] animate-blink bg-sky-400" />}
                  </p>
                  <AnimatePresence>
                    {curlDone && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-white"
                      >
                        <span className="rounded-md bg-teal-400/15 px-1.5 py-0.5 text-xs font-bold text-teal-300">
                          200 OK
                        </span>
                        <span className="text-slate-400">latency low · auth enforced · jobs running</span>
                        <span className="inline-block h-4 w-[7px] animate-blink bg-sky-400 align-middle" />
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </Tilt>
        </motion.div>
      </section>

      {/* --------------------------------------------------------- MARQUEE */}
      <div className="relative z-10 border-y border-white/[0.07] bg-white/[0.015] py-5 backdrop-blur-sm">
        <Marquee items={marqueeItems} />
      </div>

      {/* ----------------------------------------------------------- ABOUT */}
      <Section id="about">
        <motion.div {...reveal()} className="card card-interactive p-7 sm:p-10">
          <Eyebrow>About</Eyebrow>
          <h2 className="balance mt-4 max-w-4xl text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[2.6rem]">
            A backend engineer who likes turning messy workflows into dependable systems.
          </h2>
          <p className="pretty mt-6 max-w-4xl text-base leading-8 text-mist sm:text-lg">
            Krati focuses on the invisible foundation behind useful software: clean APIs, practical data models, safe
            permission systems, and background jobs that keep moving even when inputs are imperfect. She brings a
            product-aware backend mindset — not just writing endpoints, but understanding how each service supports
            people using the platform every day.
          </p>
        </motion.div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Tilt key={stat.label} max={6}>
              <motion.div
                {...reveal(index * 0.06)}
                whileHover={{ y: -6 }}
                data-accent={stat.accent}
                className="card card-interactive group h-full p-6"
              >
                <p className="font-mono text-4xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-[rgb(var(--accent))]">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </p>
                <p className="pretty mt-3 text-sm leading-6 text-mist">{stat.label}</p>
                <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.2 + index * 0.08, ease: EASE }}
                    className="h-full origin-left rounded-full bg-[rgb(var(--accent))]"
                  />
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ EXPERIENCE */}
      <Section id="experience" className="!max-w-5xl">
        <motion.div {...reveal()} data-accent="teal" className="card p-6 sm:p-9">
          <button
            onClick={() => setOpenExperience((value) => !value)}
            aria-expanded={openExperience}
            className="flex w-full items-start justify-between gap-6 text-left"
          >
            <span>
              <Eyebrow accent="teal">Experience</Eyebrow>
              <span className="mt-4 block text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Backend Developer · SAI Computers Limited
              </span>
              <span className="mt-3 flex flex-wrap items-center gap-2 text-sm text-mist">
                <span className="font-mono">Feb 2024 — Present</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/25 bg-teal-400/10 px-2.5 py-1 text-xs font-semibold text-teal-300">
                  <span className="relative grid h-1.5 w-1.5 place-items-center">
                    <span className="absolute h-1.5 w-1.5 animate-pulse-ring rounded-full bg-teal-400" />
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  </span>
                  Current
                </span>
              </span>
            </span>
            <motion.span
              animate={{ rotate: openExperience ? 45 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-teal-400/30 bg-teal-400/10 text-teal-200"
            >
              <Plus className="h-5 w-5" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openExperience && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <ul className="relative mt-8 space-y-6 pl-7">
                  {/* the rail draws itself downward as the section opens */}
                  <motion.span
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-sky-400/50 via-cyan-400/30 to-transparent"
                  />
                  {experience.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.45, ease: EASE }}
                      className="relative"
                    >
                      <span className="absolute -left-[33px] top-2.5 h-2.5 w-2.5 rounded-full bg-sky-400 shadow-glow ring-4 ring-void" />
                      <p className="pretty leading-8 text-slate-300">{item}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* -------------------------------------------------------- PROJECTS */}
      <Section id="projects">
        <motion.div {...reveal()} className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow accent="cyan">Featured Projects</Eyebrow>
            <h2 className="balance mt-4 text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-5xl">
              Selected backend systems and architecture work.
            </h2>
          </div>
          <p className="pretty max-w-md text-mist">
            Rather than repeating resume bullets, these snapshots explain the product problem, backend approach, and
            engineering choices behind the work.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Tilt key={project.name} max={4} className="h-full">
              <motion.article
                {...reveal(index * 0.08)}
                whileHover={{ y: -8 }}
                data-accent={project.accent}
                className="card card-interactive group relative h-full overflow-hidden p-7 sm:p-8"
              >
                <div className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-[rgb(var(--accent)/0.16)] blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs text-slate-600">{String(index + 1).padStart(2, "0")}</span>
                    <span className="chip">
                      <Spark className="h-3.5 w-3.5" />
                      {project.tag}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-[1.75rem]">
                    {project.name}
                  </h3>
                  <p className="pretty mt-2 text-[rgb(var(--accent))]">{project.subtitle}</p>

                  <p className="pretty mt-6 text-sm leading-7 text-slate-300">{project.story}</p>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.04, delayChildren: 0.15 }}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                        className="chip chip-neutral"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  <ul className="mt-7 space-y-4 border-t border-white/[0.07] pt-6 text-sm leading-7 text-mist">
                    {project.highlights.map((highlight, hIndex) => (
                      <motion.li
                        key={highlight}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + hIndex * 0.08, duration: 0.45, ease: EASE }}
                        className="flex gap-3"
                      >
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[rgb(var(--accent)/0.3)] bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent))]">
                          <Check className="h-3 w-3" strokeWidth={2.4} />
                        </span>
                        <span className="pretty">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </Tilt>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- SKILLS */}
      <Section id="skills">
        <motion.div {...reveal()} className="max-w-3xl">
          <Eyebrow>Technical Stack</Eyebrow>
          <h2 className="balance mt-4 text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-5xl">
            Tools chosen for maintainable backend work.
          </h2>
          <p className="pretty mt-5 text-base leading-8 text-mist sm:text-lg">
            The stack is intentionally practical: API contracts, relational data, async processing, cloud storage, and
            security patterns that hold up in real teams.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group, index) => {
            const GroupIcon = group.icon;
            return (
              <motion.div
                key={group.title}
                {...reveal(index * 0.06)}
                data-accent={group.accent}
                className="card card-interactive card-lift p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[rgb(var(--accent)/0.25)] bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]">
                    <GroupIcon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">{group.title}</h3>
                  <span className="ml-auto font-mono text-xs text-slate-600">{group.items.length}</span>
                </div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.045, delayChildren: 0.12 }}
                  className="mt-6 flex flex-wrap gap-2.5"
                >
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      variants={{ hidden: { opacity: 0, y: 8, scale: 0.92 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                      className="chip"
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* --------------------------------------------------------- CONTACT */}
      <Section id="contact">
        <motion.div {...reveal()} className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="balance mt-4 text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-5xl">
              Let&apos;s talk backend, platforms, and production systems.
            </h2>
            <p className="pretty mt-5 text-base leading-8 text-mist sm:text-lg">
              These links go straight to me — no contact form to fail silently, no reply queue to wait on. Email is
              usually fastest.
            </p>
          </div>

          <div className="grid gap-4">
            {contactCards.map(({ label, value, href, accent, icon: CardIcon, external }, index) => (
              <motion.a
                key={label}
                {...reveal(index * 0.07)}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                data-accent={accent}
                whileHover={{ y: -5 }}
                className="card card-interactive group flex items-center gap-4 p-5 sm:p-6"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[rgb(var(--accent)/0.25)] bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] transition-transform duration-300 group-hover:scale-110">
                  <CardIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.7rem] uppercase tracking-eyebrow text-[rgb(var(--accent))]">
                    {label}
                  </span>
                  <span className="mt-1.5 block truncate text-base font-semibold text-white sm:text-lg">{value}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-600 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgb(var(--accent))]" />
              </motion.a>
            ))}

            <Magnetic strength={0.2}>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="sheen group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-400 px-6 py-4 font-bold text-slate-950 transition duration-300 hover:bg-sky-300 hover:shadow-glow"
              >
                <Document className="h-5 w-5" />
                Open Resume PDF
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </Section>

      {/* ---------------------------------------------------------- FOOTER */}
      <footer className="relative z-10 mt-8 border-t border-white/10 px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <a href="#hero" className="font-mono text-sm font-semibold text-sky-200 transition hover:text-sky-100">
              &lt;KratiJoshi /&gt;
            </a>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Krati Joshi. Built with Next.js.</p>
          </div>

          <div className="flex items-center gap-2">
            {footerLinks.map(({ label, href, icon: SocialIcon, accent }) => (
              <motion.a
                key={label}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                title={label}
                data-accent={accent}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-mist transition-colors duration-300 hover:border-[rgb(var(--accent)/0.45)] hover:text-[rgb(var(--accent))]"
              >
                <SocialIcon className="h-[18px] w-[18px]" />
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
