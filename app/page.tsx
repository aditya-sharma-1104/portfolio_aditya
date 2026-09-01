"use client";

import Hero from "@/components/hero";
import About from "@/components/about";
import TechStack from "@/components/tech-stack";
import Projects from "@/components/projects";
import Journey from "@/components/journey";
import Certifications from "@/components/certifications";
import Resume from "@/components/resume";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SocialDock from "@/components/social-dock";
import CustomCursor from "@/components/custom-cursor";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#000000] text-foreground font-sans">
      {/* Custom Retro-Futuristic HUD Cursor */}
      <CustomCursor />

      {/* Floating Bottom Nav Dock */}
      <Navbar />

      {/* Floating Social Dock (Unchanged) */}
      <SocialDock
        linkedin="https://www.linkedin.com/in/aditya-kumar-sharma-700652193/"
        github="https://github.com/aditya-sharma-1104"
        leetcode="https://leetcode.com/u/adityasharma1104/"
        email="mailto:adityamaxsanu@gmail.com"
      />

      {/* Main Sections */}
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Journey />
      {/* <Certifications /> */}
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}
