"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Sparkles, Code2, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  subtitle?: string;
  desc: string;
  github?: string;
  live?: string;
  tags: string[];
  img: string;
  badge?: string;
  badgeColor?: string;
  category: "all" | "ai" | "fintech" | "saas";
};

const PROJECTS: Project[] = [
  {
    title: "Smart Health System",
    subtitle: "Surveillance & Early Warning Platform",
    desc: "Predictive health analytics & early warning diagnostic portal with multi-role authentication (Public/Admin), real-time medical monitoring, and clinical data insights.",
    github: "https://github.com/aditya-sharma-1104/SmartHealthML",
    live: "https://smart-health-ml.vercel.app",
    tags: ["TypeScript", "Next.js", "Machine Learning", "Tailwind CSS"],
    img: "/projects/smarthealthml.png",
    badge: "LIVE DEPLOYED • AI HEALTH",
    badgeColor: "text-blue-400 border-blue-500/40 bg-black/85 shadow-[0_0_14px_rgba(59,130,246,0.4)]",
    category: "ai",
  },
  {
    title: "Indian FinTech Banking Engine",
    subtitle: "Localized Banking & Payment Portal",
    desc: "Full-stack digital banking platform localized for Indian financial context featuring RuPay card issuance, UPI money transfers, PAN verification, and real-time transaction audit logs.",
    github: "https://github.com/aditya-sharma-1104/banking-app",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "FinTech", "Tailwind CSS"],
    img: "/projects/banking.png",
    badge: "FINTECH ENGINE",
    badgeColor: "text-emerald-400 border-emerald-500/40 bg-black/85 shadow-[0_0_14px_rgba(16,185,129,0.4)]",
    category: "fintech",
  },
  {
    title: "QuestAI",
    subtitle: "AI Quest & Task Automation Engine",
    desc: "Interactive AI-driven quest generator and intelligent developer task automation workspace leveraging LLM agent workflows and dynamic task graph scheduling.",
    github: "https://github.com/aditya-sharma-1104/QuestAI",
    tags: ["JavaScript", "Node.js", "AI / LLM", "Automation", "REST API"],
    img: "/projects/questai.png",
    badge: "AI AGENT SYSTEM",
    badgeColor: "text-amber-400 border-amber-500/40 bg-black/85 shadow-[0_0_14px_rgba(245,158,11,0.4)]",
    category: "ai",
  },
  {
    title: "Subscription Tracker",
    subtitle: "Recurring Expense Micro-SaaS",
    desc: "Expense management portal tracking recurring subscription billings, payment renewal schedules, monthly category breakdowns, and financial alerts.",
    github: "https://github.com/aditya-sharma-1104/Subscrption_Tracker",
    tags: ["JavaScript", "Node.js", "Expense Management", "Micro-SaaS"],
    img: "/projects/subscriptiontracker.png",
    badge: "EXPENSE SAAS",
    badgeColor: "text-rose-400 border-rose-500/40 bg-black/85 shadow-[0_0_14px_rgba(244,63,94,0.4)]",
    category: "saas",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Works" },
  { id: "ai", label: "AI & Health ML" },
  { id: "fintech", label: "FinTech & Full-Stack" },
  { id: "saas", label: "SaaS & Utilities" },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects = PROJECTS.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".project-card");
      if (cards && cards.length > 0) {
        // Check if section is already in view (e.g. after category filter change)
        const section = containerRef.current;
        const inView = section
          ? section.getBoundingClientRect().top < window.innerHeight * 0.85
          : false;

        if (inView) {
          // Already visible — animate immediately without ScrollTrigger
          gsap.fromTo(
            cards,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
          );
        } else {
          // Not yet visible — use ScrollTrigger
          gsap.fromTo(
            cards,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 border-t border-white/5 bg-[#000000] scroll-mt-20 relative overflow-hidden"
    >
      {/* Background Accent Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 space-y-3 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ FEATURED PROJECTS ]</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Engineering Showcase
          </h2>
          <p className="text-sm font-mono text-zinc-400 max-w-xl mx-auto">
            A curated list of real-world applications, AI systems, full-stack platforms, and developer tools built with modern architecture.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-mono px-4 py-2 rounded-lg border transition-all duration-300 ${activeCategory === cat.id
                  ? "bg-white/10 text-white border-brand/60 shadow-[0_0_15px_rgba(255,255,255,0.1)] font-semibold"
                  : "bg-zinc-950/60 text-zinc-400 border-white/5 hover:border-white/20 hover:text-white"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.title}
              className="project-card group flex flex-col rounded-xl bg-zinc-950/60 border border-white/10 hover:border-brand/50 transition-all duration-300 relative overflow-hidden shadow-2xl backdrop-blur-md"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 border-b border-white/5">
                <Image
                  src={proj.img}
                  alt={`${proj.title} Preview`}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Floating Award / Status Badge */}
                {proj.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${proj.badgeColor}`}
                    >
                      <span>⚡</span>
                      <span>{proj.badge}</span>
                    </span>
                  </div>
                )}

                {/* Dual Action Buttons (Top Right Float) */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View GitHub Repository"
                      className="p-2 rounded-lg bg-black/80 border border-white/15 text-zinc-300 hover:text-white hover:border-white/40 transition-colors duration-300 backdrop-blur-md"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Live Application"
                      className="p-2 rounded-lg bg-black/80 border border-brand/40 text-brand hover:text-white hover:bg-brand/20 transition-colors duration-300 backdrop-blur-md"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Text Information */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-white font-sans tracking-tight">
                    {proj.title}
                  </h3>
                  {proj.subtitle && (
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      {proj.subtitle}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="mt-3 text-xs md:text-sm font-mono text-zinc-400 leading-relaxed flex-grow">
                  {proj.desc}
                </p>

                {/* Monospace tags */}
                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-900/90 border border-white/10 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Bar */}
                <div className="mt-4 flex items-center justify-between text-xs font-mono pt-2">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {proj.live ? (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand hover:underline font-semibold ml-auto"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live App ↗</span>
                    </a>
                  ) : (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 ml-auto"
                    >
                      <span>Explore Repo ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

