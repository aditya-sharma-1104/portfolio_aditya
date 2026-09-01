"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_ITEMS = [
  {
    type: "milestone",
    role: "Started the Journey",
    org: "B.Tech — Computer Science & Engineering",
    date: "2022",
    description:
      "Started my journey in Computer Science, building a foundation in programming, problem solving, and understanding how software is built.",
  },
  {
    type: "milestone",
    role: "Started Building",
    org: "Development & Programming",
    date: "2023",
    description:
      "Moved beyond academics and started experimenting with programming, web development, and personal projects.",
  },
  {
    type: "milestone",
    role: "Exploring AI & Full Stack",
    org: "Projects & Self-Learning",
    date: "2024",
    description:
      "Started exploring modern web technologies, JavaScript, Python, AI/ML, and full-stack development while turning ideas into working projects.",
  },
  {
    type: "milestone",
    role: "Building With Purpose",
    org: "Projects • Portfolio • Open Source",
    date: "2025",
    description:
      "Focused on building more meaningful projects, improving development skills, and learning how to create applications that solve real problems.",
  },
  {
    type: "current",
    role: "Becoming a Developer",
    org: "Currently Building",
    date: "2026",
    featured: true,
    glowBadge: "⚡ CURRENT CHAPTER",
    glowColor: "amber",
    description:
      "Continuing to sharpen my skills in software development, AI, and full-stack engineering while building projects that represent what I can actually do.",
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Smooth draw-down animation of vertical line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 75%",
              scrub: 0.8, // Snappy & responsive scroll tracking
            },
          }
        );
      }

      // 2. Staggered node animations
      const nodes = containerRef.current?.querySelectorAll(".timeline-node");
      if (nodes) {
        nodes.forEach((node) => {
          const cardContent = node.querySelector(".timeline-card-content");
          const dot = node.querySelector(".timeline-dot");
          const isLeft = node.classList.contains("timeline-left");

          // Animate Dot scaling up springily (independent of position coordinates)
          if (dot) {
            gsap.fromTo(
              dot,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.5)",
                scrollTrigger: {
                  trigger: node,
                  start: "top 92%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Animate Card with hardware-accelerated transforms (no blurs for silky smooth rendering)
          if (cardContent) {
            const isMobile = window.innerWidth < 768;
            const xOffset = isMobile ? 25 : (isLeft ? -40 : 40);
            const rotateYVal = isMobile ? 2 : (isLeft ? 8 : -8);

            gsap.fromTo(
              cardContent,
              {
                opacity: 0,
                x: xOffset,
                rotateY: rotateYVal,
                scale: 0.97,
                transformPerspective: 1000,
              },
              {
                opacity: 1,
                x: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: node,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="py-24 border-t border-white/5 bg-[#000000] relative overflow-hidden scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-16 space-y-2 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">
            [ HISTORY ]
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
            The Journey
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative mt-12 md:mt-20">
          
          {/* Vertical central line (static base - centered using precise negative margins to avoid GSAP scale conflicts) */}
          <div className="absolute left-4 -ml-[1px] md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[2px] bg-zinc-800 pointer-events-none" />
          
          {/* Animated Glowing Gradient Line overlay (solid gradient, no thickness loss) */}
          <div
            ref={lineRef}
            className="absolute left-4 -ml-[1px] md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent to-brand origin-top pointer-events-none"
          />

          {/* Timeline Nodes */}
          <div className="space-y-16 md:space-y-24 relative">
            {JOURNEY_ITEMS.map((item, index) => {
              const isEven = index % 2 === 0;
              const isExperience = item.type === "experience";
              const isFeatured = item.featured;
              
              let themeColorClass = isExperience ? "text-brand" : "text-accent";
              let dotBorderClass = isExperience 
                ? "border-brand shadow-[0_0_8px_rgba(34,197,94,0.4)]" 
                : "border-accent shadow-[0_0_8px_rgba(239,68,68,0.4)]";
              let hoverShadowClass = isExperience 
                ? "hover:shadow-[0_0_30px_rgba(34,197,94,0.12)] hover:border-brand/30" 
                : "hover:shadow-[0_0_30px_rgba(239,68,68,0.12)] hover:border-accent/30";

              if (isFeatured && item.glowColor === "amber") {
                themeColorClass = "text-amber-400 font-bold";
                dotBorderClass = "border-amber-400 bg-amber-400/20 shadow-[0_0_14px_rgba(245,158,11,0.9)] animate-pulse scale-125";
                hoverShadowClass = "border-amber-500/40 bg-zinc-950/60 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_45px_rgba(245,158,11,0.3)] hover:border-amber-400/60";
              } else if (isFeatured && item.glowColor === "rose") {
                themeColorClass = "text-rose-400 font-bold";
                dotBorderClass = "border-rose-400 bg-rose-400/20 shadow-[0_0_14px_rgba(244,63,94,0.9)] animate-pulse scale-125";
                hoverShadowClass = "border-rose-500/40 bg-zinc-950/60 shadow-[0_0_30px_rgba(244,63,94,0.2)] hover:shadow-[0_0_45px_rgba(244,63,94,0.3)] hover:border-rose-400/60";
              }

              return (
                <div
                  key={index}
                  data-type={item.type}
                  className={`timeline-node group relative flex flex-col md:flex-row items-start w-full ${
                    isEven ? "timeline-left" : "timeline-right"
                  }`}
                >
                  {/* Central Node Dot (aligned perfectly with top-7, centered using negative margins to avoid GSAP conflicts) */}
                  <div className="absolute left-4 -ml-[7px] md:left-1/2 md:-ml-[7px] top-7 z-20 flex items-center justify-center h-3.5 w-3.5 pointer-events-none">
                    <div
                      className={`timeline-dot h-3.5 w-3.5 rounded-full bg-black border-2 ${dotBorderClass} pointer-events-auto transition-transform`}
                    />
                  </div>

                  {/* Desktop Alternating Layout */}
                  <div className="flex flex-col md:flex-row w-full justify-between items-start">
                    
                    {/* Left Panel */}
                    <div
                      className={`w-full md:w-[45%] pl-10 md:pl-0 ${
                        isEven ? "md:text-right md:order-1" : "md:order-3 hidden md:block pointer-events-none"
                      }`}
                    >
                      {isEven && (
                        <div className={`timeline-card-content p-6 rounded-xl bg-zinc-950/20 hover:bg-zinc-950/40 border border-white/5 ${hoverShadowClass} transition-all duration-300 text-left md:text-right relative`}>
                          {item.glowBadge && (
                            <div className="mb-2.5 flex md:justify-end">
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                                  item.glowColor === "amber"
                                    ? "text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                                    : "text-rose-400 border-rose-500/40 bg-rose-500/10 shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                                }`}
                              >
                                {item.glowBadge}
                              </span>
                            </div>
                          )}
                          <div className={`text-xs font-mono mb-2 ${themeColorClass} tracking-wider`}>
                            {item.date}
                          </div>
                          <h3 className="text-xl font-bold text-white font-sans tracking-tight mb-1">
                            {item.role}
                          </h3>
                          <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mb-4">
                            {item.org}
                          </div>
                          <p className="text-sm font-sans font-light text-zinc-400 leading-relaxed max-w-lg md:ml-auto">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Spacer / central alignment */}
                    <div className="hidden md:block w-[10%] order-2" />

                    {/* Right Panel */}
                    <div
                      className={`w-full md:w-[45%] pl-10 md:pl-0 ${
                        !isEven ? "md:text-left md:order-3" : "md:order-1 hidden md:block pointer-events-none"
                      }`}
                    >
                      {!isEven && (
                        <div className={`timeline-card-content p-6 rounded-xl bg-zinc-950/20 hover:bg-zinc-950/40 border border-white/5 ${hoverShadowClass} transition-all duration-300 text-left relative`}>
                          {item.glowBadge && (
                            <div className="mb-2.5 flex justify-start">
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                                  item.glowColor === "amber"
                                    ? "text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                                    : "text-rose-400 border-rose-500/40 bg-rose-500/10 shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                                }`}
                              >
                                {item.glowBadge}
                              </span>
                            </div>
                          )}
                          <div className={`text-xs font-mono mb-2 ${themeColorClass} tracking-wider`}>
                            {item.date}
                          </div>
                          <h3 className="text-xl font-bold text-white font-sans tracking-tight mb-1">
                            {item.role}
                          </h3>
                          <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mb-4">
                            {item.org}
                          </div>
                          <p className="text-sm font-sans font-light text-zinc-400 leading-relaxed max-w-lg">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
