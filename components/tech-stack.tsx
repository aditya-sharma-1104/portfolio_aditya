"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  name: string;
  iconPath: string;
}

interface TechGroup {
  title: string;
  comment: string;
  items: TechItem[];
}

const STACKS: TechGroup[] = [
  {
    title: "Core & Languages",
    comment: "//LANG.SYS",
    items: [
      { name: "C", iconPath: "/icons/c.png" },
      { name: "C++", iconPath: "/icons/cpp.jpg" },
      { name: "Java", iconPath: "/icons/java.png" },
      { name: "Python", iconPath: "/icons/python.png" },
      { name: "TypeScript", iconPath: "/icons/typescript.png" },
      { name: "JavaScript", iconPath: "/icons/javascript.png" },
      { name: "Data Structures", iconPath: "/icons/dsa.jpg" },
      { name: "OOP", iconPath: "/icons/oop.png" },
    ],
  },
  {
    title: "Web & Frameworks",
    comment: "//WEB.FMW",
    items: [
      { name: "React.js", iconPath: "/icons/react.jpg" },
      { name: "Next.js", iconPath: "/icons/nextjs.png" },
      { name: "Node.js", iconPath: "/icons/node.png" },
      { name: "Express.js", iconPath: "/icons/express.png" },
      { name: "FastAPI", iconPath: "/icons/fastapi.png" },
      { name: "Django", iconPath: "/icons/django.svg" },
      { name: "Flask", iconPath: "/icons/flask.svg" },
      { name: "Tailwind CSS", iconPath: "/icons/tailwind.png" },
    ],
  },
  {
    title: "Databases & Systems",
    comment: "//DB.SYS",
    items: [
      { name: "SQL", iconPath: "/icons/sql.jpg" },
      { name: "PostgreSQL", iconPath: "/icons/postgres.png" },
      { name: "MongoDB", iconPath: "/icons/mongodb.png" },
      { name: "Docker", iconPath: "/icons/docker.png" },
      { name: "Git", iconPath: "/icons/git.png" },
      { name: "Distributed Systems", iconPath: "/icons/distributed-systems.jpg" },
    ],
  },
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const columns = containerRef.current?.querySelectorAll(".stack-column");
      if (columns) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
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
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 border-t border-white/5 bg-[#000000] relative scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">

        {/* Section Header */}
        <div className="mb-16 space-y-2 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">
            [ TECH STACK ]
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
            The Arsenal
          </h2>
        </div>

        {/* Three Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {STACKS.map((stack) => (
            <div
              key={stack.title}
              className="stack-column flex flex-col p-8 rounded-xl bg-zinc-950/40 border border-white/5 hover:border-brand/20 transition-colors duration-300 relative shadow-xl"
            >
              {/* Decorative top dot */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

              {/* Column Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-base font-bold text-zinc-100 font-sans">
                  {stack.title}
                </h3>
                <span className="text-xs font-mono text-zinc-600">
                  {stack.comment}
                </span>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stack.items.map((item) => {
                  return (
                    <div
                      key={item.name}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-brand/40 hover:bg-zinc-900/90 transition-all duration-300 pointer-events-auto shadow-md"
                    >
                      <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-950 border border-white/5 p-0.5 flex items-center justify-center">
                        <Image
                          src={item.iconPath}
                          alt={`${item.name} logo`}
                          width={28}
                          height={28}
                          className="h-full w-full object-contain rounded-md filter brightness-95 group-hover:brightness-100 transition-all duration-300"
                        />
                      </div>
                      <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors duration-300 leading-tight">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
