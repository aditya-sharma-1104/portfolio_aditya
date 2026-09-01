"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileText,
  ExternalLink,
  Download,
  GraduationCap,
  Folder,
  ChevronDown,
  Code,
  Eye,
  Terminal,
  Play,
  Loader2,
  Cpu,
  Layers,
  Wrench,
  Award,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------
// Mock Files Data
// ----------------------------------------------------
type FileName =
  | "summary.md"
  | "experience.json"
  | "education.json"
  | "skills.yml";

const FILES: Record<
  FileName,
  { name: string; language: "markdown" | "json" | "yaml"; content: string }
> = {
  "summary.md": {
    name: "summary.md",
    language: "markdown",
    content: `# Aditya Kumar Sharma
## Full Stack Developer

I’m Aditya Kumar  Sharma, a software developer focused on building clean, scalable products and thoughtful user experiences. I enjoy turning ideas into reliable interfaces, efficient APIs, and robust systems that teams can confidently build on.

### Contact Details
- **Email:** adityamaxsanu@gmail.com
- **Phone:** +91 7004957023
- **GitHub:** [github.com/aditya-sharma-1104](https://github.com/aditya-sharma-1104)
- **LinkedIn:** [linkedin.com/in/aditya-kumar-sharma-700652193](https://www.linkedin.com/in/aditya-kumar-sharma-700652193/)

### Academic Summary
- **Degree:** B.Tech in Computer Science
- **Focus:** Software Engineering, Web Development, and Product Design
- **Strengths:** Full stack development, problem solving, UI/UX thinking, and scalable system design
`,
  },
  "education.json": {
    name: "education.json",
    language: "json",
    content: `{
  "education": [
    {
      "institution": "SOA University (Siksha 'O' Anusandhan)",
      "location": "Bhubaneswar",
      "degree": "B.Tech in Computer Science & Engineering",
      "specialization": "Big Data Analytics",
      "timeline": "June 2023 - May 2027",
      "grade": "7.5 CGPA"
    },
    {
      "institution": "Valley View School",
      "location": "Jamshedpur",
      "degree": "AISSCE Senior Secondary (Class XII)",
      "specialization": "Pure Science with Computer Science & English",
      "timeline": "May 2023",
      "grade": "63.8%"
    },
    {
      "institution": "Loyola School",
      "location": "Jamshedpur",
      "degree": "AISSE Secondary (Class X)",
      "specialization": "Computer Science & English",
      "timeline": "Aug 2021",
      "grade": "75%"
    }
  ]
}`,
  },
  "skills.yml": {
    name: "skills.yml",
    language: "yaml",
    content: `skills:
  core_languages:
    - Java
    - C
    - C++
    - Python
    - TypeScript
    - JavaScript
    - Data Structures
  web_frameworks:
    - React.js
    - Next.js
    - Node.js
    - Express.js
    - FastAPI
    - Django
    - Flask
    - Tailwind CSS
  databases_systems:
    - PostgreSQL
    - SQL
    - MongoDB
    - Distributed Systems
  developer_tools:
    - Git & GitHub
    - Docker
    - npm
`,
  },
};

// ----------------------------------------------------
// Custom Simple Regex Highlighter
// ----------------------------------------------------
function highlightCode(code: string, language: string) {
  // Escape html characters to avoid script injection or broken tags
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  if (language === "json") {
    return escaped.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "text-accent"; // Default accent color (red/orange)
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-zinc-400 font-medium"; // Keys
          } else {
            cls = "text-brand"; // String values (green)
          }
        } else if (/true|false/.test(match)) {
          cls = "text-amber-500 font-semibold";
        } else if (/null/.test(match)) {
          cls = "text-zinc-600 italic";
        } else {
          cls = "text-cyan-400 font-mono"; // Numbers
        }
        return `<span class="${cls}">${match}</span>`;
      },
    );
  }

  if (language === "yaml") {
    return escaped
      .replace(
        /^(\s*)([^#\-\n]+?)(:)/gm,
        '$1<span class="text-zinc-400 font-medium">$2</span>$3',
      )
      .replace(/(-\s+)(.*)$/gm, '$1<span class="text-brand">$2</span>')
      .replace(/(#.*)$/gm, '<span class="text-zinc-500 italic">$1</span>');
  }

  if (language === "markdown") {
    return escaped
      .replace(
        /^(#{1,6}\s+)(.*)$/gm,
        '<span class="text-accent font-black">$1$2</span>',
      )
      .replace(
        /^(\s*[-*+]\s+)(.*)$/gm,
        '$1<span class="text-zinc-300">$2</span>',
      )
      .replace(
        /(\*\*|__)(.*?)\1/g,
        '<strong class="text-white font-bold">$2</strong>',
      )
      .replace(
        /(`)(.*?)\1/g,
        '<code class="bg-zinc-900/60 px-1 py-0.5 rounded border border-white/5 text-brand">$2</code>',
      );
  }

  return escaped;
}

export default function Resume() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeFile, setActiveFile] = useState<FileName>("summary.md");
  const [viewMode, setViewMode] = useState<"code" | "preview">("preview");

  // Terminal Simulator State
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "AdityaSharma-OS v1.4.2 (TTY/1)",
    "System status: ONLINE",
    "Type command or select execution script below...",
  ]);
  const [isTerminalRunning, setIsTerminalRunning] = useState(false);

  const desktopTerminalRef = useRef<HTMLDivElement>(null);
  const mobileTerminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom without scrolling browser window
  useEffect(() => {
    if (desktopTerminalRef.current) {
      desktopTerminalRef.current.scrollTop =
        desktopTerminalRef.current.scrollHeight;
    }
    if (mobileTerminalRef.current) {
      mobileTerminalRef.current.scrollTop =
        mobileTerminalRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Section intro fade scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current.querySelector(".workspace-window"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ----------------------------------------------------
  // Run Script Handler
  // ----------------------------------------------------
  const runScript = (scriptType: "download" | "open" | "test") => {
    if (isTerminalRunning) return;

    setIsTerminalRunning(true);

    if (scriptType === "download") {
      setTerminalLogs((prev) => [
        ...prev,
        "",
        "$ ./download_resume.sh",
        "[INFO] Initiating resume package download...",
        "[INFO] Resolving endpoint: public/Aditya_Kumar_Sharma_Resume.pdf",
      ]);

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setTerminalLogs((prev) => {
          const next = [...prev];
          const lastLine = next[next.length - 1];
          const bar =
            "=".repeat(currentProgress / 5) +
            ">" +
            " ".repeat(20 - currentProgress / 5);
          const barText = `[${bar}] ${currentProgress}%`;

          if (lastLine.startsWith("[")) {
            next[next.length - 1] = barText;
          } else {
            next.push(barText);
          }
          return next;
        });

        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setTerminalLogs((prev) => [
              ...prev,
              "[SUCCESS] Download completed! Triggering browser dialog.",
            ]);
            setIsTerminalRunning(false);

            // Trigger physical download
            const link = document.createElement("a");
            link.href = "/Aditya_Kumar_Sharma_Resume.pdf";
            link.download = "Aditya_Kumar_Sharma_Resume.pdf";
            link.click();
          }, 300);
        }
      }, 100);
    } else if (scriptType === "open") {
      setTerminalLogs((prev) => [
        ...prev,
        "",
        "$ ./open_pdf.sh",
        "[INFO] Connecting to file viewer API...",
        "[INFO] Retrieving PDF document parameters...",
      ]);

      setTimeout(() => {
        setTerminalLogs((prev) => [
          ...prev,
          "[INFO] Loading PDF canvas...",
          "[SUCCESS] Redirecting output stream to window context.",
        ]);
        setIsTerminalRunning(false);
        window.open("/Aditya_Kumar_Sharma_Resume.pdf", "_blank", "noopener,noreferrer");
      }, 1200);
    } else if (scriptType === "test") {
      setTerminalLogs((prev) => [
        ...prev,
        "",
        "$ npm run test:all",
        "> aditya-portfolio@1.4.2 test:all",
        "> jest --verbose",
        "",
        "[WAIT] Running portfolio diagnostic test suite...",
      ]);

      setTimeout(() => {
        setTerminalLogs((prev) => [
          ...prev,
          "PASS  tests/backend-latency.test.ts",
          "  ✓ response latency check (under 50ms) (11ms)",
          "  ✓ database pool acquisition (4ms)",
          "",
          "[WAIT] Running core algorithm unit assertions...",
        ]);
      }, 800);

      setTimeout(() => {
        setTerminalLogs((prev) => [
          ...prev,
          "PASS  tests/algorithms.test.ts",
          "  ✓ graph-traversal search optimization (8ms)",
          "  ✓ custom cache eviction policy validation (2ms)",
          "",
          "[WAIT] Checking deployment pipeline configurations...",
        ]);
      }, 1600);

      setTimeout(() => {
        setTerminalLogs((prev) => [
          ...prev,
          "PASS  tests/infrastructure.test.ts",
          "  ✓ container health check probes (14ms)",
          "  ✓ secure custom dns routing validation (9ms)",
          "",
          "Test Suites: 3 passed, 3 total",
          "Tests:       6 passed, 6 total",
          "Snapshots:   0 total",
          "Time:        2.31s",
          "[SUCCESS] All 6 systems operational! Compilation checks passed.",
        ]);
        setIsTerminalRunning(false);
      }, 2400);
    }
  };

  const renderTerminal = (
    termRef: React.RefObject<HTMLDivElement>,
    isMobile: boolean,
  ) => {
    return (
      <div
        className={`border-t border-white/10 bg-black/90 flex flex-col h-[280px] ${isMobile ? "lg:hidden" : "hidden lg:flex"}`}
      >
        {/* Terminal Pane Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-zinc-950/90 text-2xs font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-brand" />
            <span>bash (terminal)</span>
          </span>
          <div className="flex items-center gap-2">
            {isTerminalRunning && (
              <Loader2 className="h-3 w-3 text-brand animate-spin" />
            )}
            <span className="text-zinc-600">[tty/1]</span>
          </div>
        </div>

        {/* Simulated CLI Output Screen */}
        <div
          ref={termRef}
          className="flex-1 p-4 font-mono text-3xs text-zinc-400 overflow-y-auto space-y-1.5 custom-scrollbar select-text"
        >
          {terminalLogs.map((log, index) => {
            let textClass = "";
            if (log.startsWith("$")) textClass = "text-white font-semibold";
            else if (log.startsWith("[SUCCESS]"))
              textClass = "text-brand font-medium";
            else if (log.startsWith("[INFO]")) textClass = "text-zinc-500";
            else if (log.includes("✓")) textClass = "text-emerald-400";
            else if (log.startsWith("PASS"))
              textClass =
                "text-emerald-950 bg-emerald-500/90 px-1 rounded font-bold";
            return (
              <div key={index} className={`leading-relaxed ${textClass}`}>
                {log}
              </div>
            );
          })}
        </div>

        {/* Console Action Bar / Commands (Redesigned: Large, Clear Buttons) */}
        <div className="p-3 border-t border-white/10 bg-zinc-950/80 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Download Button */}
            <button
              onClick={() => runScript("download")}
              disabled={isTerminalRunning}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-white/10 bg-zinc-900 hover:bg-zinc-800 hover:border-brand/40 text-xs font-mono text-zinc-300 hover:text-white disabled:opacity-50 disabled:pointer-events-none transition duration-200 group shadow-md"
            >
              <Download className="h-4 w-4 group-hover:text-brand transition-colors" />
              <span>Download PDF</span>
            </button>

            {/* Open PDF Button */}
            <button
              onClick={() => runScript("open")}
              disabled={isTerminalRunning}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-white/10 bg-zinc-900 hover:bg-zinc-800 hover:border-brand/40 text-xs font-mono text-zinc-300 hover:text-white disabled:opacity-50 disabled:pointer-events-none transition duration-200 group shadow-md"
            >
              <ExternalLink className="h-4 w-4 group-hover:text-brand transition-colors" />
              <span>Open PDF</span>
            </button>
          </div>

          {/* Diagnostics Button */}
          <button
            onClick={() => runScript("test")}
            disabled={isTerminalRunning}
            className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg border border-white/10 bg-zinc-900/60 hover:bg-zinc-900 hover:border-accent/40 text-xs font-mono text-zinc-400 hover:text-white disabled:opacity-50 disabled:pointer-events-none transition duration-200 group shadow-sm"
          >
            <Play className="h-3.5 w-3.5 group-hover:text-accent transition-colors" />
            <span>Run System Diagnostics</span>
          </button>
        </div>
      </div>
    );
  };

  // Split lines of code for line numbers gutter
  const fileLines = FILES[activeFile].content.split("\n");
  if (fileLines[fileLines.length - 1] === "") {
    fileLines.pop();
  }

  return (
    <section
      id="resume"
      ref={containerRef}
      className="py-24 border-t border-white/5 bg-[#000000] scroll-mt-20 relative overflow-hidden"
    >
      {/* Custom scrollbars stylesheet injection */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.35);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) rgba(0, 0, 0, 0.3);
        }
      `,
        }}
      />
      {/* Background cyber accent gradients */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        {/* Section Header (Centered) */}
        <div className="mb-16 space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-mono tracking-widest text-accent uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            [ Live System Document ]
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Resume
          </h2>
        </div>

        {/* ----------------------------------------------------
            Futuristic Workspace Window
            ---------------------------------------------------- */}
        <div className="workspace-window glass rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/80 border-b border-white/10 select-none">
            {/* Window control buttons */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Window title tab */}
            <div className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-zinc-600" />
              <span>aditya@workspace:~/resume</span>
            </div>

            {/* Empty spacer for alignment */}
            <div className="w-12" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[600px]">
            {/* ----------------------------------------------------
                Left Panel (Explorer Sidebar + Console)
                ---------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 bg-zinc-950/50">
              {/* Explorer Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/40 border-b border-white/5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
                  <Folder className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Explorer</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-600">
                  ADITYA-OS
                </span>
              </div>

              {/* Workspace Directory Tree */}
              <div className="p-3 space-y-1.5 flex-1 select-none">
                <div className="flex items-center gap-1 px-1 py-1 text-xs font-mono text-zinc-400">
                  <ChevronDown className="h-3 w-3 text-zinc-500" />
                  <Folder className="h-3.5 w-3.5 text-zinc-500 fill-zinc-500/20" />
                  <span className="font-bold text-zinc-300">resume_data</span>
                </div>

                <div className="pl-6 space-y-1">
                  {(Object.keys(FILES) as FileName[]).map((fName) => {
                    const isActive = activeFile === fName;
                    const file = FILES[fName];
                    let iconColor = "text-zinc-500";
                    if (file.language === "markdown")
                      iconColor = "text-rose-500";
                    if (file.language === "json")
                      iconColor = "text-emerald-500";
                    if (file.language === "yaml") iconColor = "text-amber-500";

                    return (
                      <button
                        key={fName}
                        onClick={() => {
                          setActiveFile(fName);
                          // Keep preview open on file click to look professional, but allow toggling
                        }}
                        className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md font-mono text-xs text-left transition-all ${isActive
                          ? "bg-zinc-900 border border-white/5 text-white shadow-sm"
                          : "hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-200"
                          }`}
                      >
                        <FileText className={`h-3.5 w-3.5 ${iconColor}`} />
                        <span className="flex-1">{file.name}</span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Desktop-only Integrated Terminal console */}
              {renderTerminal(desktopTerminalRef, false)}
            </div>

            {/* ----------------------------------------------------
                Right Panel (Editor Area + Preview Switcher)
                ---------------------------------------------------- */}
            <div className="lg:col-span-8 flex flex-col bg-zinc-950/20">
              {/* Editor Path Breadcrumbs & Mode Switcher */}
              <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950/60 select-none px-4 py-2">
                {/* Active path breadcrumbs */}
                <div className="flex items-center gap-1.5 font-mono text-2xs text-zinc-500">
                  <Folder className="h-3.5 w-3.5 text-zinc-600 fill-zinc-600/10 hidden sm:inline-block" />
                  <span className="hidden sm:inline-block">resume_data</span>
                  <span className="text-zinc-700 hidden sm:inline-block">
                    /
                  </span>
                  <span className="text-zinc-300 font-medium">
                    {activeFile}
                  </span>
                </div>

                {/* View Mode Toggle Controls (Code / Preview) */}
                <div className="flex items-center p-0.5 bg-zinc-900/80 rounded-md border border-white/5 text-2xs font-mono select-none">
                  {/* Code View button */}
                  <button
                    onClick={() => setViewMode("code")}
                    className={`flex items-center gap-1 px-2 py-1 sm:gap-1.5 sm:px-3 sm:py-1.5 rounded-md transition-colors ${viewMode === "code"
                      ? "bg-zinc-800 text-white font-bold"
                      : "text-zinc-500 hover:text-zinc-300"
                      }`}
                  >
                    <Code className="h-3 w-3" />
                    <span className="hidden sm:inline-block">Code</span>
                  </button>

                  {/* Rendered Preview button */}
                  <button
                    onClick={() => setViewMode("preview")}
                    className={`flex items-center gap-1 px-2 py-1 sm:gap-1.5 sm:px-3 sm:py-1.5 rounded-md transition-colors ${viewMode === "preview"
                      ? "bg-zinc-800 text-white font-bold"
                      : "text-zinc-500 hover:text-zinc-300"
                      }`}
                  >
                    <Eye className="h-3 w-3" />
                    <span className="hidden sm:inline-block">Preview</span>
                  </button>
                </div>
              </div>

              {/* Editor Workspace Content Container */}
              <div className="flex-1 p-5 md:p-6 overflow-y-auto max-h-[580px] custom-scrollbar select-text">
                {viewMode === "code" ? (
                  // ----------------------------------------------------
                  // IDE CODE VIEW (Syntax Highlighted)
                  // ----------------------------------------------------
                  <div className="flex items-start gap-4 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
                    {/* Line numbers gutter */}
                    <div className="text-right text-zinc-700 select-none border-r border-white/5 pr-4 shrink-0 font-light">
                      {fileLines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>

                    {/* Pre-formatted code with syntax coloring */}
                    <pre className="flex-1 text-zinc-300 overflow-x-auto whitespace-pre pb-4 scrollbar-none font-medium">
                      <code
                        dangerouslySetInnerHTML={{
                          __html: highlightCode(
                            FILES[activeFile].content,
                            FILES[activeFile].language,
                          ),
                        }}
                      />
                    </pre>
                  </div>
                ) : (
                  // ----------------------------------------------------
                  // RENDERED PREVIEW VIEW
                  // ----------------------------------------------------
                  <div className="space-y-6">
                    {activeFile === "summary.md" && (
                      <div className="space-y-6 animate-fade-in">
                        {/* Summary Info */}
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold font-sans text-white border-b border-white/5 pb-2">
                            Overview Summary
                          </h3>
                          <p className="text-zinc-400 font-mono text-sm leading-relaxed">
                            I am a software developer passionate about building
                            scalable applications and solving complex
                            challenges. Rather than simply writing code, I focus
                            on creating efficient systems, clean architectures,
                            and seamless user experiences that remain reliable,
                            maintainable, and impactful as products evolve. My
                            work spans full-stack development, backend
                            engineering, and AI-powered solutions.
                          </p>
                        </div>

                        {/* Metrics Dashboard Widgets */}
                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
                            {"// System Stats Dashboard"}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Academic Performance CGPA card */}
                            <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/40 flex flex-col justify-between hover:border-brand/30 transition-all duration-300">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-2xs font-mono text-zinc-500">
                                  ACADEMICS_CGPA
                                </span>
                                <Award className="h-4 w-4 text-brand" />
                              </div>
                              <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-2xl font-bold font-sans text-white">
                                  7.5
                                </span>
                                <span className="text-xs font-mono text-zinc-500">
                                  / 10.0
                                </span>
                              </div>
                              <div className="mt-3">
                                <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className="bg-brand h-full rounded-full shadow-[0_0_8px_#22c55e]"
                                    style={{ width: "97.9%" }}
                                  />
                                </div>
                                <span className="text-3xs font-mono text-zinc-600 block mt-1">
                                  SOA University (Siksha &apos;O&apos; Anusandhan)
                                </span>
                              </div>
                            </div>

                            {/* Secondary education stats card */}
                            <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/40 flex flex-col justify-between hover:border-accent/30 transition-all duration-300">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-2xs font-mono text-zinc-500">
                                  HIGH_SCHOOL_GRADE
                                </span>
                                <GraduationCap className="h-4 w-4 text-accent" />
                              </div>
                              <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-2xl font-bold font-sans text-white">
                                  63.8%
                                </span>
                                <span className="text-xs font-mono text-zinc-500">
                                  aggreg.
                                </span>
                              </div>
                              <div className="mt-3">
                                <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className="bg-accent h-full rounded-full shadow-[0_0_8px_#ef4444]"
                                    style={{ width: "85.2%" }}
                                  />
                                </div>
                                <span className="text-3xs font-mono text-zinc-600 block mt-1">
                                  Valley View School (XII Science & Computer
                                  Science)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Engineering Core Values */}
                        <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/60 font-mono text-xs text-zinc-400 space-y-2">
                          <div className="text-white font-bold text-sm">
                            {"// Development Directives"}
                          </div>
                          <div>
                            • Build high-performance applications optimized for low latency and smooth user experience.
                          </div>
                          <div>
                            • Engineer scalable product architectures with clean, modular, and maintainable codebases.
                          </div>
                          <div>
                            • Design extensible systems to support rapid feature iteration and seamless product growth.
                          </div>
                        </div>
                      </div>
                    )}

                    {activeFile === "experience.json" && (
                      <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <h3 className="text-xl font-bold font-sans text-white">
                            Professional Experience
                          </h3>
                          <span className="text-2xs font-mono text-brand flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-ping" />
                            Active Stream
                          </span>
                        </div>

                        <div className="relative border-l border-zinc-800/80 ml-3.5 pl-6 space-y-8 py-2">
                          {/* Item 1 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-[#000000] border-2 border-brand shadow-[0_0_8px_rgba(34,197,94,0.4)] flex items-center justify-center" />

                            <div className="space-y-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h4 className="text-base font-bold text-white">
                                  Backend Developer Intern
                                </h4>
                                <span className="text-2xs font-mono text-zinc-500">
                                  June 2025 - Sept 2025
                                </span>
                              </div>
                              <div className="text-xs font-mono text-brand font-semibold flex items-center gap-2">
                                <span>SAARC MASTS TECH PVT LTD</span>
                                <span className="text-zinc-600">|</span>
                                <span className="text-zinc-500 text-3xs font-light">
                                  Remote
                                </span>
                              </div>

                              <ul className="mt-3 space-y-1.5 text-xs text-zinc-400 list-disc pl-4 font-mono leading-relaxed">
                                <li>
                                  Built and optimized frontend and backend systems for
                                  mentor-student networking and progress
                                  tracking using Node.js, Express.js, PostgreSQL and React.js,
                                  ensuring scalable performance and efficient
                                  data management.
                                </li>
                                <li>
                                  Engineered telemetry microservices and
                                  refactored bottleneck endpoints, cutting
                                  response latency by 35% and improving data
                                  throughput.
                                </li>
                                <li>
                                  Conducted code reviews and maintained
                                  high-quality, production-ready code following
                                  backend development best practices.
                                </li>
                              </ul>

                              <div className="flex flex-wrap gap-1.5 pt-3">
                                {[
                                  "Node.js",
                                  "PostgreSQL",
                                  "Express",
                                  "Microservices",
                                  "Telemetry",
                                  "Git",
                                ].map((t) => (
                                  <span
                                    key={t}
                                    className="text-3xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-300"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Item 2 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-[#000000] border-2 border-zinc-700 flex items-center justify-center" />

                            <div className="space-y-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h4 className="text-base font-bold text-white">
                                  Full Stack Developer Intern
                                </h4>
                                <span className="text-2xs font-mono text-zinc-500">
                                  Dec 2024 - Mar 2025
                                </span>
                              </div>
                              <div className="text-xs font-mono text-brand font-semibold flex items-center gap-2">
                                <span>
                                  International Federation of Inventors&apos;
                                  Association - Bharat Chapter
                                </span>
                                <span className="text-zinc-600">|</span>
                                <span className="text-zinc-500 text-3xs font-light">
                                  Remote
                                </span>
                              </div>

                              <ul className="mt-3 space-y-1.5 text-xs text-zinc-400 list-disc pl-4 font-mono leading-relaxed">
                                <li>
                                  Led end-to-end development and deployment of
                                  the IFIA Bharat web application, cutting page
                                  load time by 50% and improving responsiveness
                                  through SSR and automated CI/CD releases.
                                </li>
                                <li>
                                  Engineered scalable CI/CD pipelines and
                                  optimized custom DNS configurations to enable
                                  fast, reliable releases.
                                </li>
                              </ul>

                              <div className="flex flex-wrap gap-1.5 pt-3">
                                {[
                                  "Next.js",
                                  "Tailwind CSS",
                                  "TypeScript",
                                  "Node.js",
                                  "Express",
                                  "PostgreSQL",
                                  "Vercel",
                                  "Docker",
                                ].map((t) => (
                                  <span
                                    key={t}
                                    className="text-3xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-300"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeFile === "education.json" && (
                      <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-bold font-sans text-white border-b border-white/5 pb-2">
                          Education Credentials
                        </h3>

                        <div className="space-y-6">
                          {/* SOA University */}
                          <div className="p-5 rounded-xl border border-white/5 bg-zinc-950/40 hover:border-brand/30 transition-all duration-300 flex items-start gap-4">
                            <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/10 p-1.5 shrink-0 flex items-center justify-center overflow-hidden shadow-md">
                              <Image
                                src="/icons/soa.png"
                                alt="SOA University Logo"
                                width={40}
                                height={40}
                                className="h-full w-full object-contain filter brightness-110"
                              />
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h4 className="text-base font-bold text-white">
                                  SOA University (Siksha &apos;O&apos; Anusandhan)
                                </h4>
                                <span className="text-xs font-mono text-zinc-500">
                                  June 2023 - May 2027
                                </span>
                              </div>
                              <div className="text-xs font-mono text-zinc-400">
                                B.Tech in Computer Science and Engineering
                                (Specialization: CSE CORE ){" "}
                                <span className="text-zinc-500 font-light">
                                  | Bhubaneswar
                                </span>
                              </div>
                              <div className="pt-2 flex items-center gap-1.5 text-xs font-mono">
                                <span className="text-zinc-500">Grade:</span>
                                <span className="text-brand font-bold">
                                  7.5 CGPA
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Valley View XII */}
                          <div className="p-5 rounded-xl border border-white/5 bg-zinc-950/40 hover:border-accent/30 transition-all duration-300 flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-zinc-900 border border-white/5 text-accent shrink-0"><Image
                              src="/icons/vvs.jpg"
                              alt="Valley View School Logo"
                              width={30}
                              height={30}
                              className="h-full w-full object-contain filter brightness-110"
                            />
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h4 className="text-base font-bold text-white">
                                  Valley View School
                                </h4>
                                <span className="text-xs font-mono text-zinc-500">
                                  May 2023
                                </span>
                              </div>
                              <div className="text-xs font-mono text-zinc-400">
                                AISSCE Senior Secondary (Class XII), Pure
                                Science with Computer Science & English{" "}
                                <span className="text-zinc-500 font-light">
                                  | Jamshedpur
                                </span>
                              </div>
                              <div className="pt-2 flex items-center gap-1.5 text-xs font-mono">
                                <span className="text-zinc-500">Score:</span>
                                <span className="text-red-600 font-bold">
                                  63.8%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Loyola School X */}
                          <div className="p-5 rounded-xl border border-white/5 bg-zinc-950/40 hover:border-accent/35 transition-all duration-300 flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 shrink-0">
                              <Image
                                src="/icons/loyola.png"
                                alt="Loyola School Logo"
                                width={25}
                                height={25}
                                className="h-full w-full object-contain filter brightness-110"
                              />
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h4 className="text-base font-bold text-white">
                                  Loyola School
                                </h4>
                                <span className="text-xs font-mono text-zinc-500">
                                  May 2021
                                </span>
                              </div>
                              <div className="text-xs font-mono text-zinc-400">
                                CISCE Secondary (Class X), English{" "}
                                <span className="text-zinc-500 font-light">
                                  | Jamshedpur
                                </span>
                              </div>
                              <div className="pt-2 flex items-center gap-1.5 text-xs font-mono">
                                <span className="text-zinc-500">Score:</span>
                                <span className="text-white font-bold">
                                  75%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeFile === "skills.yml" && (
                      <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-bold font-sans text-white border-b border-white/5 pb-2">
                          Engineering Strengths
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Core Languages */}
                          <div className="p-5 rounded-xl border border-white/5 bg-zinc-950/40 space-y-3">
                            <div className="flex items-center gap-2 text-brand">
                              <Cpu className="h-4 w-4" />
                              <h4 className="text-sm font-mono font-bold uppercase tracking-wider">
                                Core & Languages
                              </h4>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 font-mono text-xs text-zinc-400">
                              {[
                                "C",
                                "Java",
                                "Python",
                                "TypeScript",
                                "JavaScript",
                                "Data Structures",
                              ].map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Web & Frameworks */}
                          <div className="p-5 rounded-xl border border-white/5 bg-zinc-950/40 space-y-3">
                            <div className="flex items-center gap-2 text-accent">
                              <Layers className="h-4 w-4" />
                              <h4 className="text-sm font-mono font-bold uppercase tracking-wider">
                                Web & Frameworks
                              </h4>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 font-mono text-xs text-zinc-400">
                              {[
                                "React.js",
                                "Next.js",
                                "Node.js",
                                "Express.js",
                                "FastAPI",
                                "Django",
                                "Flask",
                                "Tailwind CSS",
                              ].map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Databases & Systems */}
                          <div className="p-5 rounded-xl border border-white/5 bg-zinc-950/40 space-y-3">
                            <div className="flex items-center gap-2 text-amber-500">
                              <Wrench className="h-4 w-4" />
                              <h4 className="text-sm font-mono font-bold uppercase tracking-wider">
                                Databases & Systems
                              </h4>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 font-mono text-xs text-zinc-400">
                              {[
                                "PostgreSQL",
                                "MySQL",
                                "MongoDB",
                                "Distributed Systems",
                              ].map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Developer Tools */}
                          <div className="p-5 rounded-xl border border-white/5 bg-zinc-950/40 space-y-3">
                            <div className="flex items-center gap-2 text-cyan-400">
                              <Terminal className="h-4 w-4" />
                              <h4 className="text-sm font-mono font-bold uppercase tracking-wider">
                                Developer Tools
                              </h4>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 font-mono text-xs text-zinc-400">
                              {[
                                "Git & GitHub",
                                "Docker"
                              ].map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile-only Integrated Terminal console */}
              {renderTerminal(mobileTerminalRef, true)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
