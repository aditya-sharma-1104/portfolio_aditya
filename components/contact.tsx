"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Github, Linkedin, RotateCcw } from "lucide-react";
import SocialDock from "./social-dock";

type LogLine = {
  type: "system" | "command" | "output";
  text: string;
};

export default function Contact() {
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const [logs, setLogs] = useState<LogLine[]>([
    { type: "system", text: "[* Initializing secure connection protocol...]" },
    { type: "system", text: "[* Connected to gateway: aditya.dev [AES-256-GCM]]" },
    { type: "command", text: "./load_contact_menu.sh" },
    { type: "system", text: "Available commands loaded. Select a target below to execute:" },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [currentPromptText, setCurrentPromptText] = useState("");

  const scrollToBottom = () => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs, currentPromptText]);

  const typeAndExecute = (command: string, executeFn: () => void) => {
    if (isTyping) return;
    setIsTyping(true);
    setCurrentPromptText("");

    let index = 0;
    const interval = setInterval(() => {
      setCurrentPromptText((prev) => prev + command[index]);
      index++;
      if (index >= command.length) {
        clearInterval(interval);
        setTimeout(() => {
          setLogs((prev) => [...prev, { type: "command", text: command }]);
          executeFn();
          setCurrentPromptText("");
          setIsTyping(false);
        }, 150);
      }
    }, 45);
  };

  const handleCommandClick = (cmd: string) => {
    if (cmd === "cat contact_info.json") {
      typeAndExecute(cmd, () => {
        setLogs((prev) => [
          ...prev,
          {
            type: "output",
            text: `{\n  "email": "adityamaxsanu@gmail.com",\n  "phone": "+91 7004957023"\n}`,
          },
        ]);
      });
    } else if (cmd === "ssh linkedin_profile") {
      typeAndExecute(cmd, () => {
        setLogs((prev) => [
          ...prev,
          {
            type: "output",
            text: "Connecting to linkedin.com/in/aditya-kumar-sharma-700652193/..\nConnection established.\nRedirecting to LinkedIn profile in background.",
          },
        ]);
        setTimeout(() => {
          window.open("https://www.linkedin.com/in/aditya-kumar-sharma-700652193/", "_blank");
        }, 800);
      });
    } else if (cmd === "curl -s github.manifest") {
      typeAndExecute(cmd, () => {
        setLogs((prev) => [
          ...prev,
          {
            type: "output",
            text: "GitHub: github.com/aditya-sharma-1104\nActive Repositories: portfolio, projects, experiments\nLoading GitHub overview in background.",
          },
        ]);
        setTimeout(() => {
          window.open("https://github.com/aditya-sharma-1104", "_blank");
        }, 800);
      });
    } else if (cmd === "clear") {
      typeAndExecute("clear", () => {
        setLogs([
          { type: "system", text: "[* Logs cleared. Session active.]" },
          { type: "system", text: "Available commands loaded. Select a target below to execute:" },
        ]);
      });
    }
  };

  return (
    <section
      id="contact"
      className="py-24 border-t border-white/5 bg-[#000000] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-12 space-y-2 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">
            [ SECURE CHANNEL ]
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Establish Connection
          </h2>
          <p className="text-sm font-mono text-zinc-500 max-w-md mx-auto">
            Trigger commands below to fetch coordinates or access social gateway routing.
          </p>
        </div>

        {/* Faux-Terminal Window */}
        <div className="w-full rounded-xl bg-zinc-950/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs sm:text-sm">
          
          {/* Terminal Header */}
          <div className="px-4 py-3 bg-zinc-900 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <span className="text-zinc-500 text-xs">guest@aditya.dev: ~</span>
            <div className="flex items-center gap-1.5 text-brand">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse inline-block" />
              <span className="text-[10px] uppercase font-bold tracking-wider">SECURE</span>
            </div>
          </div>

          {/* Terminal Console screen */}
          <div
            ref={terminalContainerRef}
            className="p-6 min-h-[250px] max-h-[350px] overflow-y-auto space-y-3 leading-relaxed text-zinc-400 bg-black/95 custom-scrollbar"
          >
            {logs.map((log, index) => {
              if (log.type === "system") {
                return (
                  <div key={index} className="text-zinc-500">
                    {log.text}
                  </div>
                );
              }
              if (log.type === "command") {
                return (
                  <div key={index} className="text-white">
                    <span className="text-zinc-500">guest@aditya.dev:~$ </span>
                    {log.text}
                  </div>
                );
              }
              return (
                <div key={index} className="text-brand whitespace-pre-wrap pl-4 border-l border-brand/20 py-0.5">
                  {log.text}
                </div>
              );
            })}

            {/* Current Active typing line */}
            {isTyping && (
              <div className="text-white">
                <span className="text-zinc-500">guest@aditya.dev:~$ </span>
                <span>{currentPromptText}</span>
                <span className="inline-block w-1.5 h-3 bg-white ml-0.5 animate-blink" />
              </div>
            )}
          </div>

          {/* Interactive triggers grid */}
          <div className="p-6 bg-zinc-950/60 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleCommandClick("cat contact_info.json")}
              disabled={isTyping}
              className="flex items-center justify-between p-3.5 rounded-lg bg-zinc-900/40 border border-white/5 hover:border-brand/40 text-zinc-400 hover:text-white hover:bg-zinc-900/80 transition-all duration-300 group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-zinc-500 group-hover:text-brand transition-colors duration-300" />
                <span className="font-mono text-xs">cat contact_info.json</span>
              </div>
              <span className="text-[10px] text-zinc-600 font-mono group-hover:text-brand transition-colors duration-300">[EXECUTE]</span>
            </button>

            <button
              onClick={() => handleCommandClick("curl -s github.manifest")}
              disabled={isTyping}
              className="flex items-center justify-between p-3.5 rounded-lg bg-zinc-900/40 border border-white/5 hover:border-brand/40 text-zinc-400 hover:text-white hover:bg-zinc-900/80 transition-all duration-300 group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <Github className="h-4 w-4 text-zinc-500 group-hover:text-brand transition-colors duration-300" />
                <span className="font-mono text-xs">curl -s github.manifest</span>
              </div>
              <span className="text-[10px] text-zinc-600 font-mono group-hover:text-brand transition-colors duration-300">[LINK]</span>
            </button>

            <button
              onClick={() => handleCommandClick("ssh linkedin_profile")}
              disabled={isTyping}
              className="flex items-center justify-between p-3.5 rounded-lg bg-zinc-900/40 border border-white/5 hover:border-brand/40 text-zinc-400 hover:text-white hover:bg-zinc-900/80 transition-all duration-300 group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 text-zinc-500 group-hover:text-brand transition-colors duration-300" />
                <span className="font-mono text-xs">ssh linkedin_profile</span>
              </div>
              <span className="text-[10px] text-zinc-600 font-mono group-hover:text-brand transition-colors duration-300">[SSH]</span>
            </button>

            <button
              onClick={() => handleCommandClick("clear")}
              disabled={isTyping}
              className="flex items-center justify-between p-3.5 rounded-lg bg-zinc-900/40 border border-white/5 hover:border-accent/40 text-zinc-400 hover:text-white hover:bg-zinc-900/80 transition-all duration-300 group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="h-4 w-4 text-zinc-500 group-hover:text-accent transition-colors duration-300" />
                <span className="font-mono text-xs">clear console</span>
              </div>
              <span className="text-[10px] text-zinc-600 font-mono group-hover:text-accent transition-colors duration-300">[RESET]</span>
            </button>
          </div>

        </div>

        {/* Mobile-only static social dock */}
        <div className="mt-8 md:hidden flex justify-center">
          <SocialDock inline />
        </div>

      </div>
    </section>
  );
}
