"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: StaggerChildrenProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <motion.div variants={item} className={cn(className)}>
      {children}
    </motion.div>
  )
}