"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Download, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const portraitScrollRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance letters animation
      if (nameRef.current) {
        const letters = nameRef.current.querySelectorAll(".letter");
        gsap.fromTo(
          letters,
          { opacity: 0, scale: 0.8, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            stagger: 0.04,
            ease: "power3.out",
          }
        );
      }

      // 2. Centered Portrait animation
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power4.out" }
        );
      }

      // 3. Left Resume Links animation
      if (leftRef.current) {
        const cards = leftRef.current.querySelectorAll(".link-card");
        gsap.fromTo(
          cards,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, delay: 0.5, ease: "power2.out" }
        );
      }

      // 4. Right Stats animation
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current.children,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, delay: 0.5, ease: "power2.out" }
        );
      }

      // 5. Scroll-triggered section zoop-out and fade-out
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          scale: 0.92,
          opacity: 0,
          ease: "none",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center md:items-end justify-center py-20 md:py-0 md:pb-16 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#000000]"
    >
      {/* Background name spanning horizontally across the center (behind the head/shoulders) */}
      <div className="absolute top-[32%] md:top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 hidden md:block">
        <h1
          ref={nameRef}
          className="font-sans text-[11vw] md:text-[12vw] lg:text-[13vw] font-black uppercase tracking-tighter leading-none text-zinc-800/95"
        >
          {"Aditya Kumar Sharma".split("").map((char, index) => (
            <span key={index} className="letter inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-end z-10">
        
        {/* Left Column: View Resume & Download buttons (desktop only) */}
        <div
          ref={leftRef}
          className="hidden md:flex md:col-span-3 flex-col space-y-4"
        >
          <a
            href="#resume"
            className="link-card group flex flex-col justify-between p-5 h-28 rounded-lg bg-zinc-950/20 border border-white/5 hover:border-brand/40 transition-all duration-300 hover:bg-zinc-900/10 cursor-pointer text-left"
          >
            <div className="flex items-center justify-between text-zinc-500 group-hover:text-brand transition-colors duration-300">
              <FileText className="h-5 w-5" />
              <ExternalLink className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">RESUME</span>
              <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors duration-200 mt-1">VIEW RESUME</span>
            </div>
          </a>

          <a
            href="#resume"
            className="link-card group flex flex-col justify-between p-5 h-28 rounded-lg bg-zinc-950/20 border border-white/5 hover:border-brand/40 transition-all duration-300 hover:bg-zinc-900/10 cursor-pointer text-left"
          >
            <div className="flex items-center justify-between text-zinc-500 group-hover:text-brand transition-colors duration-300">
              <FileText className="h-5 w-5" />
              <Download className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">LOCAL REPO</span>
              <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors duration-200 mt-1">DOWNLOAD PDF</span>
            </div>
          </a>
        </div>

        {/* Center Column: spacing placeholder on desktop, holds mobile portrait on mobile */}
        <div className="col-span-1 md:col-span-6 flex flex-col items-center justify-end min-h-[350px] md:min-h-[460px]">
          
          {/* Mobile Only Header info */}
          <div className="block md:hidden text-center mb-6 w-full">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase leading-none">
              Aditya Sharma
            </h1>
            <p className="text-sm font-mono text-brand mt-2 uppercase tracking-widest">
              {"//"} Full Stack Developer
            </p>
          </div>

          {/* Mobile-Only Portrait (visible only on mobile, sits inside grid flow) */}
          <div className="block md:hidden relative h-72 w-72 sm:h-80 sm:w-80 group">
            <Image
              src="/adipic.png"
              alt="Aditya Sharma"
              fill
              priority
              className="object-contain filter grayscale contrast-125"
            />
          </div>

          {/* Mobile Only Quick Actions */}
          <div className="flex md:hidden gap-3 mt-6">
            <a
              href="#resume"
              className="px-4 py-2 border border-white/10 rounded-md text-xs font-mono text-zinc-400 hover:text-white"
            >
              VIEW RESUME
            </a>
            <a
              href="#resume"
              className="px-4 py-2 bg-brand/10 border border-brand/20 rounded-md text-xs font-mono text-brand"
            >
              DOWNLOAD
            </a>
          </div>
        </div>

        {/* Right Column: Disciplines, Divider line, Grid of stats, and tags */}
        <div
          ref={rightRef}
          className="col-span-1 md:col-span-3 flex flex-col space-y-6 md:space-y-8"
        >
          {/* Discipline Title */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{"// Resilience"}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Full Stack Developer
            </h2>
          </div>

          {/* Divider line */}
          <div className="h-[1px] bg-zinc-800 w-full" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Status Info */}
            <div className="flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500">STATUS</span>
              <span className="text-xs font-mono text-zinc-300 mt-1 leading-tight">
                B.Tech Computer Science<br />Problem solver & software engineer
              </span>
            </div>

            {/* CGPA Stats */}
            <div className="flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500">CGPA</span>
              <div className="flex items-baseline mt-1">
                <span className="text-4xl md:text-5xl font-black tracking-tighter text-white">B+</span>
                <span className="text-[10px] font-mono text-zinc-500 ml-1">focus</span>
              </div>
            </div>
          </div>

          {/* Divider line */}
          <div className="h-[1px] bg-zinc-900 w-full" />

          {/* Tag labels */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-white/5 text-zinc-400">SOFTWARE</span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-white/5 text-zinc-400">BACKEND</span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-white/5 text-zinc-400">FRONTEND</span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-white/5 text-zinc-400">CLOUD</span>
          </div>

        </div>

      </div>

      {/* Desktop-Only Centered Portrait - positioned at the absolute bottom of the section */}
      <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[390px] md:h-[600px] md:w-[460px] lg:h-[700px] lg:w-[540px] z-10">
        <div
          ref={portraitScrollRef}
          className="w-full h-full relative"
        >
          <div
            ref={portraitRef}
            className="w-full h-full relative"
          >
            <Image
              src="/adipic.png"
              alt="Aditya Kumar Sharma"
              fill
              priority
              className="object-contain object-bottom filter grayscale contrast-125"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
