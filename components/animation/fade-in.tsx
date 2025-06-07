"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: FadeInProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  })

  const directionVariants = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionVariants[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionVariants[direction] }}
      transition={{ duration, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}