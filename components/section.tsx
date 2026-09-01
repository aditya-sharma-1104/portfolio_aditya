"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import useIsMobile from "@/hooks/use-is-mobile"

export default function Section({
  id,
  children,
  className,
  title,
}: {
  id?: string
  children: ReactNode
  className?: string
  title?: string
}) {
  const isMobile = useIsMobile()

  return (
    <section id={id} className={className}>
      {title && (
        <div className="mb-8 space-y-2">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-pretty text-glow"
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: isMobile ? 0.1 : 0.6 }}
            transition={{ duration: isMobile ? 0.1 : 0.6 }}
          >
            {title}
          </motion.h2>
        </div>
      )}
      {/* Remove wrapper animation on mobile for instant content display */}
      {isMobile ? (
        <div>{children}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      )}
    </section>
  )
}
