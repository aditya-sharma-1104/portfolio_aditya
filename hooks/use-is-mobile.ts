"use client"

import { useEffect, useState } from "react"

export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => {
      const ua = typeof navigator !== "undefined" ? navigator.userAgent : ""
      const touch = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
      setIsMobile((typeof window !== "undefined" && window.innerWidth < breakpoint) || touch)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [breakpoint])

  return isMobile
}
