"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  Zap,
  Terminal,
  Cpu,
  Maximize2,
  X,
  FileText,
  Download,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Category =
  | "ALL"
  | "CLOUD & ARCHITECTURE"
  | "BIG DATA & AI"
  | "PROBLEM SOLVING"
  | "HACKATHONS & RECOGNITIONS";

type CertificationItem = {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  credentialId: string;
  category: Category;
  status: "VERIFIED" | "NATIONAL AWARD" | "TOP 5 FINALIST";
  statusColor: string;
  accentColor: string;
  imageSrc: string;
  isPdf?: boolean;
  pdfPath?: string;
  verifyUrl: string;
  skills: string[];
  icon: typeof Award;
};

const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-aws-ai",
    title: "2nd Runner-Up - AWS AI for Bharat Hackathon",
    issuer: "Amazon Web Services (AWS)",
    issuedDate: "April 2026",
    credentialId: "AWS-AI-BFRT-02",
    category: "HACKATHONS & RECOGNITIONS",
    status: "NATIONAL AWARD",
    statusColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    accentColor: "border-amber-500/30 hover:border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.1)]",
    imageSrc: "/certificates/aws-ai-for-bharat-certificate.png",
    isPdf: true,
    verifyUrl: "https://certificate.hack2skill.com/verify/2026H2S04AIFB-SR00004",
    skills: ["Rust", "AI Agents", "TUI", "GitHub API", "AWS Bedrock", "Lambda"],
    icon: Trophy,
  },
  {
    id: "cert-sih-isro",
    title: "Top 5 Finalist - Smart India Hackathon (ISRO)",
    issuer: "Ministry of Education & ISRO",
    issuedDate: "Dec 2025",
    credentialId: "SIH-2025-ISRO-05",
    category: "HACKATHONS & RECOGNITIONS",
    status: "TOP 5 FINALIST",
    statusColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    accentColor: "border-rose-500/30 hover:border-rose-400/60 shadow-[0_0_20px_rgba(244,63,94,0.1)]",
    imageSrc: "/certificates/SIH25-certificate.jpeg",
    verifyUrl: "https://drive.google.com/file/d/1VgOs2-xuNvw_hiDEwBo4DXouJeeAfh3P/view?usp=sharing",
    skills: ["SaaS Platform", "PostgreSQL", "RBAC", "Air Quality Analytics", "FastAPI"],
    icon: Zap,
  },
  {
    id: "cert-bigdata",
    title: "Big Data Computing",
    issuer: "NPTEL",
    issuedDate: "Nov 2025",
    credentialId: "NPTEL-BDA-7721",
    category: "BIG DATA & AI",
    status: "VERIFIED",
    statusColor: "text-brand border-brand/30 bg-brand/10",
    accentColor: "border-brand/20 hover:border-brand/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]",
    imageSrc: "/certificates/NPTEL-certificate.png",
    verifyUrl: "/certificates/NPTEL-certificate.png",
    skills: ["Big Data Analytics", "Hadoop", "Spark", "Distributed Computing"],
    icon: Cpu,
  },
  {
    id: "cert-dsa",
    title: "30 Days DSA Bootcamp",
    issuer: "Unstop",
    issuedDate: "Jan 2025",
    credentialId: "DSA-BOOTCAMP-2024",
    category: "PROBLEM SOLVING",
    status: "VERIFIED",
    statusColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    accentColor: "border-cyan-500/20 hover:border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]",
    imageSrc: "/certificates/dsa-bootcamp-certificate.jpg",
    verifyUrl: "https://unstop.com/certificate-preview/cf624d71-4586-41bf-8ab7-27579a9ad38d",
    skills: ["Algorithms", "C++", "Data Structures", "System Design"],
    icon: Terminal,
  },
  {
    id: "cert-datascience",
    title: "The Data Science Course: Complete Data Science Bootcamp",
    issuer: "Udemy",
    issuedDate: "Oct 2024",
    credentialId: "DS-ANALYTICS-99",
    category: "BIG DATA & AI",
    status: "VERIFIED",
    statusColor: "text-brand border-brand/30 bg-brand/10",
    accentColor: "border-brand/20 hover:border-brand/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]",
    imageSrc: "/certificates/data-science-certificate.jpg",
    verifyUrl: "https://www.udemy.com/certificate/UC-ce5f33f9-95d2-4d6e-9dea-2ffbee35f9d9/",
    skills: ["Python", "Data Analysis", "Machine Learning", "Pandas", "SQL"],
    icon: ShieldCheck,
  },
  {
    id: "cert-naukri",
    title: "Naukri Campus Young Turks 2025 Merit Certificate",
    issuer: "Naukri Campus",
    issuedDate: "Sept 2025",
    credentialId: "NAUKRI-ENG-502",
    category: "CLOUD & ARCHITECTURE",
    status: "VERIFIED",
    statusColor: "text-brand border-brand/30 bg-brand/10",
    accentColor: "border-brand/20 hover:border-brand/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]",
    imageSrc: "/certificates/naukri-certificate.png",
    verifyUrl: "https://www.naukri.com/campus/certificates/young_turks_round_1_achievement/v0/68d9bab67baf842bcc2d8acb",
    skills: ["Backend Development", "Node.js", "System Architecture", "PostgreSQL"],
    icon: ShieldCheck,
  },
];

const CATEGORIES: Category[] = [
  "ALL",
  "CLOUD & ARCHITECTURE",
  "BIG DATA & AI",
  "PROBLEM SOLVING",
  "HACKATHONS & RECOGNITIONS",
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("ALL");
  const [activeModalCert, setActiveModalCert] = useState<CertificationItem | null>(null);

  const filteredCerts =
    selectedCategory === "ALL"
      ? CERTIFICATIONS
      : CERTIFICATIONS.filter((c) => c.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".cert-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="py-24 border-t border-white/5 bg-[#000000] relative scroll-mt-20 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-mono tracking-widest text-accent uppercase">
            <Award className="h-3.5 w-3.5 text-brand" />
            <span>[ CERTIFICATIONS & CREDENTIALS ]</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Verified Competencies
          </h2>
          <p className="text-sm font-mono text-zinc-400 max-w-2xl mx-auto">
            Official technical certifications, algorithmic credentials, and national hackathon recognitions.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === "ALL"
                ? CERTIFICATIONS.length
                : CERTIFICATIONS.filter((c) => c.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg font-mono text-xs transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? "bg-zinc-900 text-white border-brand/50 shadow-[0_0_12px_rgba(34,197,94,0.2)] font-bold"
                    : "bg-zinc-950/40 text-zinc-400 border-white/5 hover:border-white/20 hover:text-white"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                    isActive
                      ? "bg-brand text-black"
                      : "bg-zinc-900 text-zinc-500 border border-white/5"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => {
            const IconComponent = cert.icon;

            return (
              <div
                key={cert.id}
                className={`cert-card group flex flex-col justify-between rounded-2xl bg-zinc-950/50 border transition-all duration-300 relative overflow-hidden backdrop-blur-md ${cert.accentColor}`}
              >
                {/* Certificate Image Preview Frame */}
                <div
                  onClick={() => setActiveModalCert(cert)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border-b border-white/10 cursor-pointer"
                >
                  <Image
                    src={cert.imageSrc}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Expand Image overlay badge */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <span className="p-2.5 rounded-full bg-black/80 border border-white/20 text-white shadow-xl flex items-center gap-1.5 text-xs font-mono">
                      <Maximize2 className="h-4 w-4 text-brand" />
                      <span>View Credential</span>
                    </span>
                  </div>

                  {/* Top Status Pill */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${cert.statusColor}`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {cert.status}
                    </span>
                  </div>
                </div>

                {/* Card Content Header */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white group-hover:border-brand/40 group-hover:text-brand transition-colors duration-300 shrink-0 mt-0.5">
                        <IconComponent className="h-5 w-5" />
                      </div>

                      <div className="space-y-1">
                        <h3
                          onClick={() => setActiveModalCert(cert)}
                          className="text-base font-bold font-sans text-white group-hover:text-brand transition-colors duration-300 leading-snug cursor-pointer"
                        >
                          {cert.title}
                        </h3>
                        <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                          <span className="text-zinc-300 font-semibold">{cert.issuer}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-zinc-500 text-[11px]">{cert.issuedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body & Skills Footer */}
                  <div className="space-y-3 pt-3 border-t border-white/5">
                    {/* Credential ID tag */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500 text-[10px]">ID HASH</span>
                      <span className="text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-white/5 text-[11px]">
                        {cert.credentialId}
                      </span>
                    </div>

                    {/* Skill Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900/60 border border-white/5 text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Action Links Row */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setActiveModalCert(cert)}
                        className="flex-1 px-3 py-2 rounded-lg bg-zinc-900/80 border border-white/10 hover:border-brand/40 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        <Maximize2 className="h-3.5 w-3.5 text-brand" />
                        <span>Preview Certificate</span>
                      </button>

                      <a
                        href={cert.isPdf && cert.pdfPath ? cert.pdfPath : cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-zinc-900/80 border border-white/10 hover:border-brand/40 text-zinc-400 hover:text-white transition-colors"
                        title={cert.isPdf ? "Open PDF Document" : "Verify Credential Online"}
                      >
                        {cert.isPdf ? (
                          <FileText className="h-4 w-4 text-amber-400" />
                        ) : (
                          <ExternalLink className="h-4 w-4 text-zinc-400" />
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ----------------------------------------------------
          Full Screen Lightbox Modal
          ---------------------------------------------------- */}
      <AnimatePresence>
        {activeModalCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalCert(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/60">
                <div className="space-y-0.5">
                  <h3 className="text-base md:text-lg font-bold font-sans text-white flex items-center gap-2">
                    <span>{activeModalCert.title}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${activeModalCert.statusColor}`}
                    >
                      {activeModalCert.status}
                    </span>
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    {activeModalCert.issuer} • {activeModalCert.issuedDate} (ID: {activeModalCert.credentialId})
                  </p>
                </div>

                <button
                  onClick={() => setActiveModalCert(null)}
                  className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body Image Container */}
              <div className="relative flex-1 min-h-[350px] max-h-[65vh] bg-black/90 p-4 flex items-center justify-center overflow-auto">
                <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                  <Image
                    src={activeModalCert.imageSrc}
                    alt={activeModalCert.title}
                    width={1200}
                    height={850}
                    className="object-contain max-h-[60vh] rounded-lg shadow-2xl border border-white/10"
                  />
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-white/10 bg-zinc-900/60 font-mono text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {activeModalCert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-zinc-800 border border-white/5 text-zinc-300 text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {activeModalCert.isPdf && activeModalCert.pdfPath && (
                    <a
                      href={activeModalCert.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 transition-colors flex items-center gap-2 font-bold"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </a>
                  )}

                  <a
                    href={activeModalCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-brand/20 border border-brand/40 text-brand hover:bg-brand/30 transition-colors flex items-center gap-2 font-bold"
                  >
                    <span>Verify Online</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
