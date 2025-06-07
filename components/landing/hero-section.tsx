"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { ChevronRight, Play } from "lucide-react"
import { FadeIn } from "@/components/animation/fade-in"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animationRef.current) return

    const tl = gsap.timeline()
    
    // Animate the grid elements
    const elements = animationRef.current.querySelectorAll(".grid-element")
    
    tl.fromTo(
      elements,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.1,
        ease: "power3.out"
      }
    )
    
    // Create floating animation
    elements.forEach((el) => {
      gsap.to(el, {
        y: "random(-8, 8)",
        x: "random(-5, 5)",
        rotation: "random(-5, 5)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: "random(0, 2)"
      })
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted opacity-80 dark:from-background dark:via-background dark:to-background z-0"></div>
      
      {/* Animated background grid */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <div ref={animationRef} className="w-full h-full relative">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className="grid-element absolute rounded-full bg-primary"
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i + 12} 
              className="grid-element absolute rounded-md bg-chart-1"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.1,
                transform: `rotate(${Math.random() * 45}deg)`,
              }}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i + 20} 
              className="grid-element absolute rounded-md bg-chart-2"
              style={{
                width: `${Math.random() * 50 + 25}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.1,
                transform: `rotate(${Math.random() * 90}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn delay={0.2}>
            <motion.div 
              className="inline-flex items-center px-4 py-2 mb-6 rounded-full glass-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary via-chart-2 to-chart-3">
                Next-generation Analytics Platform
              </span>
            </motion.div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              Transform Business Data into{" "}
              <span className="premium-text-gradient">
                Visual Intelligence
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              ClarityAI helps businesses transform complex data into actionable insights with powerful
              AI-driven analytics, beautiful visualizations, and intelligent automation.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="h-14 px-8 text-lg premium-gradient">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 text-lg glass-card hover:bg-primary/10"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </motion.div>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="mt-16 flex items-center justify-center space-x-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.img
                    key={i}
                    src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32`}
                    alt={`User ${i}`}
                    className="w-8 h-8 rounded-full border-2 border-background"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">2,500+</span> data analysts trust ClarityAI
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}