"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send, CheckCircle, Sparkles } from "lucide-react"
import { FadeIn } from "@/components/animation/fade-in"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSection() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
      setIsSubscribed(true)
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }, 1000)
  }

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-chart-2 to-chart-3" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/20" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="newsletter-dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="2" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#newsletter-dots)" />
        </svg>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            animate={{
              y: ["0%", "-100%"],
              x: ["-10%", "110%"],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
            }}
          />
        ))}
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <FadeIn>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Mail className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">
                Stay Updated with ClarityAI
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get the Latest 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
                Insights & Updates
              </span>
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of data professionals who receive our weekly newsletter with the latest tips, 
              insights, and product updates on data visualization and analytics.
            </p>

            <motion.form 
              onSubmit={handleSubmit} 
              className="max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3 sm:gap-0">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="pl-12 pr-4 py-4 h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 rounded-xl w-full focus:border-white/40 focus:ring-white/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <motion.div
                      className="absolute inset-0 border border-white/30 rounded-xl pointer-events-none"
                      animate={{ opacity: email ? 1 : 0.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-8 py-4 h-14 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                      disabled={isSubmitting || isSubscribed}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="h-5 w-5" />
                        </motion.div>
                      ) : isSubscribed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Subscribe
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              <motion.p 
                className="mt-4 text-sm opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                We respect your privacy. Unsubscribe at any time. No spam, ever.
              </motion.p>
            </motion.form>

            {/* Stats */}
            <motion.div 
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {[
                { number: "25,000+", label: "Subscribers" },
                { number: "98%", label: "Open Rate" },
                { number: "Weekly", label: "Updates" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}