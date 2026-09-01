"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code2, Folder, History, Award, FileText, Mail } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "journey", label: "Experience", icon: History },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.15,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] shadow-black/80 max-w-[calc(100vw-1.5rem)]"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative p-2 sm:p-3 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200 min-w-0 flex-shrink-0 flex items-center justify-center"
              aria-label={item.label}
            >
              {/* Glow backdrop for active/hovered items */}
              <AnimatePresence>
                {hoveredItem === item.id && (
                  <motion.span
                    layoutId="navHoverGlow"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 rounded-full bg-white/5 border border-white/5 pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              {/* Icon rendering */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative z-10 flex items-center justify-center"
              >
                <Icon
                  className={`h-[18px] w-[18px] sm:h-5 sm:w-5 transition-colors duration-300 ${
                    isActive ? "text-brand drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "text-zinc-400"
                  }`}
                />
              </motion.div>

              {/* Active Indicator Dot */}
              {isActive && (
                <motion.span
                  layoutId="activeDot"
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-brand shadow-[0_0_8px_#22c55e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Hover Tooltip Label */}
              <AnimatePresence>
                {hoveredItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: -42, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute left-1/2 -translate-x-1/2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-zinc-950 border border-white/10 text-[10px] sm:text-xs font-mono text-zinc-300 whitespace-nowrap pointer-events-none shadow-xl"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </motion.nav>
    </div>
  );
}
