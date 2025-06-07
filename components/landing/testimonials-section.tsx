"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FadeIn } from "@/components/animation/fade-in"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote: "ClarityAI has transformed how we analyze our business data. The visualizations are stunning and the insights are invaluable for our decision-making process.",
    author: "Sarah Johnson",
    title: "CTO, TechVision Inc.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    company: "TechVision Inc.",
    rating: 5,
    metric: "40% faster decisions",
  },
  {
    quote: "The predictive analytics feature has helped us anticipate market trends with remarkable accuracy. We've increased our ROI by 32% in just six months.",
    author: "Michael Chen",
    title: "Data Science Director, GlobalFinance",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    company: "GlobalFinance",
    rating: 5,
    metric: "32% ROI increase",
  },
  {
    quote: "Implementing ClarityAI was seamless, and the customer support has been exceptional. It's rare to find a product that delivers on all its promises.",
    author: "Elena Rodriguez",
    title: "VP of Operations, Retail Solutions",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    company: "Retail Solutions",
    rating: 5,
    metric: "2 weeks implementation",
  },
  {
    quote: "As a healthcare provider, data security is paramount. ClarityAI's enterprise-grade security features give us peace of mind while delivering powerful analytics.",
    author: "Dr. James Wilson",
    title: "Chief Medical Officer, HealthFirst",
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150",
    company: "HealthFirst",
    rating: 5,
    metric: "100% compliance",
  },
  {
    quote: "The automated reporting has saved our team countless hours. Now we focus on strategy instead of manually creating reports.",
    author: "Amanda Thompson",
    title: "Marketing Director, Brand Innovators",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    company: "Brand Innovators",
    rating: 5,
    metric: "80% time saved",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const slideRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <section className="py-32 relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-10"
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "100%", "0%"],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${400 + i * 100}px`,
              height: `${400 + i * 100}px`,
              background: `hsl(var(--chart-${(i % 3) + 1}))`,
            }}
          />
        ))}
      </div>
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 mb-6 rounded-full glass-card"
            >
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-sm font-medium premium-text-gradient">
                Trusted by Industry Leaders
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our 
              <span className="premium-text-gradient"> Customers Say</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See how organizations are leveraging ClarityAI to transform their data strategy and achieve remarkable results.
            </p>
          </div>
        </FadeIn>

        <div className="relative max-w-5xl mx-auto">
          <div ref={slideRef} className="overflow-hidden py-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                }}
                className="flex flex-col items-center text-center px-4"
              >
                <motion.div 
                  className="glass-card p-12 rounded-3xl max-w-4xl w-full relative overflow-hidden"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5 opacity-50" />
                  
                  {/* Quote icon */}
                  <div className="relative mb-8">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
                    >
                      <Quote className="h-8 w-8 text-primary" />
                    </motion.div>
                    
                    {/* Star rating */}
                    <div className="flex justify-center space-x-1 mb-6">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <motion.blockquote 
                    className="text-2xl md:text-3xl font-medium mb-8 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    "{testimonials[activeIndex].quote}"
                  </motion.blockquote>
                  
                  {/* Metric highlight */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-8"
                  >
                    {testimonials[activeIndex].metric}
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarImage src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].author} />
                      <AvatarFallback>{testimonials[activeIndex].author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-semibold text-lg">{testimonials[activeIndex].author}</div>
                      <div className="text-muted-foreground">{testimonials[activeIndex].title}</div>
                      <div className="text-sm text-primary font-medium">{testimonials[activeIndex].company}</div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
                className={cn(
                  "relative h-3 rounded-full transition-all duration-300 overflow-hidden",
                  index === activeIndex ? "bg-primary w-8" : "bg-primary/30 w-3 hover:bg-primary/50"
                )}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === activeIndex && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-chart-2"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
            <motion.div
              className="pointer-events-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full glass-card hover:bg-primary/10 border-primary/20"
                onClick={prevSlide}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
            </motion.div>
            <motion.div
              className="pointer-events-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full glass-card hover:bg-primary/10 border-primary/20"
                onClick={nextSlide}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}