"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Shield, Network, Cloud, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    num: "01",
    title: "Full-Stack Development",
    icon: Code2,
    description:
      "Build responsive, scalable applications with modern frontend interfaces, backend services, APIs, and database-driven systems.",
  },
  {
    num: "02",
    title: "Data Structures & Algorithms",
    icon: Cpu,
    description:
      "Solve complex problems using efficient data structures, optimized algorithms, and strong foundations in computational thinking.",
  },
  {
    num: "03",
    title: "Cloud & DevOps",
    icon: Cloud,
    description:
      "Work with deployment workflows, version control, cloud infrastructure, CI/CD pipelines, and reliable application environments.",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left philosophy statement
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Animate right cards list
      if (rightRef.current) {
        const cards = rightRef.current.querySelectorAll(".feature-card");
        gsap.fromTo(
          cards,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="pt-24 md:pt-40 pb-24 border-t border-white/5 bg-[#000000] relative"
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left Column: Philosophy */}
          <div ref={leftRef} className="col-span-1 md:col-span-5 space-y-6">
            {/* Section Header */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-accent">
                [ IDENTITY & OUTLINE ]
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase font-sans leading-tight">
                Behind the Code
              </h2>
            </div>

            <p className="text-lg font-mono text-zinc-400 leading-relaxed">
              I’m Aditya Sharma, a full stack developer focused on building elegant, scalable web experiences and reliable software systems. I enjoy turning ideas into products that are fast, maintainable, and genuinely useful.
            </p>
            <p className="text-sm font-mono text-zinc-500 leading-relaxed">
              My work spans frontend engineering, backend architecture, and product-focused problem solving. I care about clean code, thoughtful design, and shipping experiences people enjoy using.
            </p>
          </div>

          {/* Right Column: Feature Cards */}
          <div ref={rightRef} className="col-span-1 md:col-span-7 space-y-6">
            {FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.num}
                  className="feature-card group relative p-6 rounded-xl bg-zinc-950/40 border border-white/5 hover:border-brand/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                >
                  {/* Glowing background on hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.05),transparent_60%)] pointer-events-none rounded-xl" />

                  {/* Header Row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 group-hover:text-brand transition-colors duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-200 group-hover:text-white transition-colors duration-300">
                        {feat.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-zinc-600 group-hover:text-brand transition-colors duration-300">
                      [{feat.num}]
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm font-mono text-zinc-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
