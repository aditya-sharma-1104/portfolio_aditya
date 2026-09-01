"use client";

import { useEffect, useRef, useState } from "react";
import { MousePointer2, Pointer } from "lucide-react";

type HoverContext = {
  type: string;
  command: string;
  color: string;
  shadow: string;
  status: string;
};

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const handRef = useRef<SVGSVGElement | null>(null);

  
  const [hoverState, setHoverState] = useState<HoverContext | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  // Use refs to store mutable cursor state to avoid stale closures in requestAnimationFrame tick loop
  const mouseCoords = useRef({ x: 0, y: 0 });
  const currentCoords = useRef({ x: 0, y: 0 });

  const magnetActiveRef = useRef(false);

  useEffect(() => {
    // Check if it is a touch device / mobile
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      if (containerRef.current) containerRef.current.style.display = "none";
      return;
    }

    // Apply global stylesheet to hide default cursor (except inside text inputs)
    const style = document.createElement("style");
    style.innerHTML = `
      @media (pointer: fine) {
        html, body, a, button, select, [role="button"], hover-card, .clickable, input[type="submit"], input[type="button"], .cursor-pointer, .cursor-default {
          cursor: none !important;
        }
        input[type="text"], input[type="email"], input[type="search"], input[type="tel"], textarea {
          cursor: text !important;
        }
      }
      @keyframes cursorBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .cursor-blink {
        animation: cursorBlink 0.8s step-end infinite;
      }
    `;
    document.head.appendChild(style);

    let hasMoved = false;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };

      if (!hasMoved) {
        hasMoved = true;
        
        currentCoords.current = { x: e.clientX, y: e.clientY };

        const container = containerRef.current;
        if (container) container.style.opacity = "1";
      }
    };

    const onMouseEnter = () => {
      if (hasMoved) {
        const container = containerRef.current;
        if (container) container.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      const container = containerRef.current;
      if (container) container.style.opacity = "0";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Hide custom cursor inside text inputs/textareas to let native I-beam display
      const isTextInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.isContentEditable;

      if (isTextInput) {
        setIsHidden(true);
        return;
      } else {
        setIsHidden(false);
      }

      // Detect clickable elements and identify contextual commands
      const anchor = target.closest("a");
      const button = target.closest("button");
      const clickableRole = target.closest("[role='button']");
      const isPointerCursor =
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer";

      const clickable = anchor || button || clickableRole || isPointerCursor;

      if (clickable) {
        magnetActiveRef.current = true;
        const text = (anchor?.innerText || button?.innerText || target.innerText || "").trim().toLowerCase();
        const href = (anchor?.getAttribute("href") || "").toLowerCase();
        const id = (anchor?.id || button?.id || target.id || "").toLowerCase();

        // 1. Social Media Links
        if (href.includes("github.com") || id.includes("github")) {
          setHoverState({
            type: "github",
            command: "git clone github.com",
            color: "#38bdf8", // Sky Blue
            shadow: "rgba(56, 189, 248, 0.4)",
            status: "NET_GITHUB_LINK",
          });
        } else if (href.includes("linkedin.com") || id.includes("linkedin")) {
          setHoverState({
            type: "linkedin",
            command: "ssh linkedin.com",
            color: "#0284c7", // Deep Blue
            shadow: "rgba(2, 132, 199, 0.4)",
            status: "NET_LINKEDIN_LINK",
          });
        } else if (href.includes("leetcode.com") || id.includes("leetcode")) {
          setHoverState({
            type: "leetcode",
            command: "curl leetcode.com",
            color: "#f59e0b", // Warm Amber
            shadow: "rgba(245, 158, 11, 0.4)",
            status: "NET_LEETCODE_LINK",
          });
        } else if (href.startsWith("mailto:") || id.includes("email") || id.includes("contact")) {
          setHoverState({
            type: "email",
            command: "mail adityasharma",
            color: "#10b981", // Emerald
            shadow: "rgba(16, 185, 129, 0.4)",
            status: "NET_MAIL_CLIENT",
          });
        }
        // 2. Navigation Tabs
        else if (id.includes("nav") || target.closest("nav") || target.closest(".navbar") || href.startsWith("#")) {
          const sectionName = href.replace("#", "") || text || "home";
          setHoverState({
            type: "nav",
            command: `cd /${sectionName}`,
            color: "#22c55e", // Terminal Green
            shadow: "rgba(34, 197, 94, 0.4)",
            status: "SYS_NAVIGATE",
          });
        }
        // 3. Resume interactive panel tabs (summary.md, experience.json, etc.)
        else if (text.endsWith(".md") || text.endsWith(".json") || text.endsWith(".yml") || text.endsWith(".yaml")) {
          setHoverState({
            type: "file-tab",
            command: `cat ${text}`,
            color: "#a78bfa", // Cyber Lavender
            shadow: "rgba(167, 139, 250, 0.4)",
            status: "IDE_OPEN_FILE",
          });
        }
        // 4. Download / PDF operations
        else if (href.endsWith(".pdf") || text.includes("download") || id.includes("download")) {
          setHoverState({
            type: "download",
            command: "wget resume.pdf",
            color: "#ef4444", // Crimson Red
            shadow: "rgba(239, 68, 68, 0.4)",
            status: "SYS_PULL_ASSET",
          });
        } else if (text.includes("open pdf") || text.includes("view pdf") || id.includes("pdf")) {
          setHoverState({
            type: "pdf-view",
            command: "cat resume.pdf",
            color: "#f43f5e", // Rose Red
            shadow: "rgba(244, 63, 94, 0.4)",
            status: "SYS_READ_ASSET",
          });
        }
        // 5. Code vs Preview toggle
        else if (text.includes("code") || text.includes("preview")) {
          const mode = text.includes("code") ? "code" : "preview";
          setHoverState({
            type: "toggle",
            command: `view --${mode}`,
            color: "#06b6d4", // Electric Cyan
            shadow: "rgba(6, 182, 212, 0.45)",
            status: "IDE_TOGGLE_VIEW",
          });
        }
        // 6. Test / Diagnostics Terminal trigger
        else if (text.includes("test") || text.includes("run") || text.includes("diagnostics") || id.includes("run")) {
          setHoverState({
            type: "terminal-run",
            command: "npm run test",
            color: "#f43f5e", // Pink-red diagnostics
            shadow: "rgba(244, 63, 94, 0.4)",
            status: "SYS_RUN_TESTS",
          });
        }
        // 7. Project cards and viewer
        else if (target.closest(".project-card") || id.includes("project") || text.includes("view project") || text.includes("source code")) {
          const commandText = text.includes("source") ? "git status" : "ssh live-site";
          setHoverState({
            type: "project",
            command: commandText,
            color: "#c084fc", // Cyber Purple
            shadow: "rgba(192, 132, 252, 0.4)",
            status: "NET_CONN_LIVE",
          });
        }
        // 8. General Clickable elements fallback
        else {
          setHoverState({
            type: "click",
            command: "exec click",
            color: "#22c55e", // Terminal Green
            shadow: "rgba(34, 197, 94, 0.4)",
            status: "SYS_EXEC_CLICK",
          });
        }
      } else {
        magnetActiveRef.current = false;
        setHoverState(null);
      }
    };

    // Frame Tick Loop for smooth coordinates tracking
    const tick = () => {
      const container = containerRef.current;
      const arrow = arrowRef.current;
      const hand = handRef.current;

      // If elements are not rendered yet, wait for next frame
      if (!container || !arrow || !hand) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // Interpolate main coordinates with snappy ultra-responsive LERP
      const ease = 0.55;
      const dx = mouseCoords.current.x - currentCoords.current.x;
      const dy = mouseCoords.current.y - currentCoords.current.y;
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        currentCoords.current.x = mouseCoords.current.x;
        currentCoords.current.y = mouseCoords.current.y;
      } else {
        currentCoords.current.x += dx * ease;
        currentCoords.current.y += dy * ease;
      }

      const isMagnetActive = magnetActiveRef.current;

      // Apply index-finger alignment offset when hovering clickable items
      const offsetTargetX = isMagnetActive ? currentCoords.current.x - 8.5 : currentCoords.current.x;
      const offsetTargetY = currentCoords.current.y;

      container.style.transform = `translate3d(${offsetTargetX}px, ${offsetTargetY}px, 0) translate(-3px, -2px)`;

      // Animate transition between Arrow and Hand SVGs
      if (isMagnetActive) {
        arrow.style.opacity = "0";
        arrow.style.transform = "scale(0.8)";
        hand.style.opacity = "1";
        hand.style.transform = "scale(1.1) translate(-2px, -2px)";
      } else {
        arrow.style.opacity = "1";
        arrow.style.transform = "scale(1)";
        hand.style.opacity = "0";
        hand.style.transform = "scale(0.8)";
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseover", onMouseOver);

    // Launch LERP frame loop
    rafId = requestAnimationFrame(tick);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const currentAccent = hoverState?.color || "#22c55e"; // default brand green
  const currentShadow = hoverState?.shadow || "rgba(34, 197, 94, 0.35)";

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] select-none opacity-0"
      style={{
        width: "24px",
        height: "24px",
        display: isHidden ? "none" : "block",
      }}
    >
      {/* Arrow Pointer (Lucide MousePointer2) */}
      <MousePointer2
        ref={arrowRef}
        className="absolute inset-0 transition-opacity duration-100 ease-out origin-top-left"
        size={20}
        style={{
          color: currentAccent,
          fill: currentAccent,
          filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 6px ${currentShadow})`,
        }}
      />

      {/* Hand Selector (Lucide Pointer - correct tilted pointing index finger) */}
      <Pointer
        ref={handRef}
        className="absolute inset-0 transition-opacity duration-100 ease-out origin-top-left opacity-0"
        size={20}
        style={{
          color: currentAccent,
          fill: "black", // dark solid fill for outline hand contrast
          filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 6px ${currentShadow})`,
        }}
      />
    </div>
  );
}
