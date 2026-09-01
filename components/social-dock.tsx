"use client"

import { motion } from "framer-motion"
import { useState } from "react"

type SocialDockProps = {
  linkedin?: string
  github?: string
  email?: string
  leetcode?: string
  inline?: boolean
}

export default function SocialDock({
  linkedin = "https://www.linkedin.com/in/aditya-kumar-sharma-700652193/",
  github = "https://github.com/aditya-sharma-1104",
  leetcode = "https://leetcode.com/u/adityasharma1104/",
  email = "mailto:adityamaxsanu@gmail.com",
  inline = false
}: SocialDockProps) {
  const items = [
    { href: linkedin, src: "/icons/linkedin.png", alt: "LinkedIn" },
    { href: github, src: "/icons/github.png", alt: "GitHub" },
    { href: leetcode, src: "/icons/leetcode.png", alt: "LeetCode" },
    { href: email, src: "/icons/email.png", alt: "Email" },
  ]

  const [hovered, setHovered] = useState<number | null>(null)

  if (inline) {
    return (
      <div className="glass border border-border/60 rounded-full py-2 px-4 flex items-center gap-3.5 shadow-xl">
        {items.map((it, i) => (
          <motion.a
            key={it.alt}
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel={it.href.startsWith("http") ? "noreferrer" : undefined}
            className="group relative rounded-full p-1.5 transition"
            aria-label={it.alt}
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              className="absolute inset-0 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(closest-side,rgba(56,189,248,0.35),transparent)]"
              aria-hidden
            />
            <motion.img
              src={it.src || "/placeholder.svg?height=48&width=48&query=social icon"}
              alt={it.alt}
              className="rounded-full object-cover"
              initial={false}
              animate={{
                width: hovered === i ? 36 : 28,
                height: hovered === i ? 36 : 28,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            />
          </motion.a>
        ))}
      </div>
    )
  }

  return (
    <motion.aside
      initial={{ x: 24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40"
      aria-label="Social links"
    >
      <div className="glass rounded-full p-3 flex flex-col gap-3 shadow-2xl border border-border/60">
        {items.map((it, i) => (
          <motion.a
            key={it.alt}
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel={it.href.startsWith("http") ? "noreferrer" : undefined}
            className="group relative flex items-center"
            aria-label={it.alt}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* spotlight glow */}
            <span
              className="pointer-events-none absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(closest-side,rgba(56,189,248,0.45),transparent)]"
              aria-hidden
            />
            <div
              className="rounded-full h-12 w-12 grid place-items-center bg-background/40 backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden transition will-change-transform"
              style={{
                transform:
                  hovered === null
                    ? "translateY(0px) rotate(0deg)"
                    : hovered === i
                      ? "translateY(-2px) rotate(3deg)"
                      : "translateY(0px) rotate(0deg)",
              }}
            >
              <motion.img
                src={it.src || "/placeholder.svg?height=48&width=48&query=social icon"}
                alt={it.alt}
                className="rounded-full object-cover"
                initial={false}
                animate={{
                  width: hovered === i ? 48 : hovered === null ? 28 : 24,
                  height: hovered === i ? 48 : hovered === null ? 28 : 24,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              />
            </div>
            {/* slide-out label to the left */}
            <span className="pointer-events-none absolute right-full mr-2 origin-right translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs select-none glass px-2 py-1 rounded-md border border-border/60">
              {it.alt}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.aside>
  )
}
