"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BarChart, Github, Twitter, Linkedin, Mail, ArrowUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animation/fade-in"

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Case Studies", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "API", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR", href: "#" },
  ],
  resources: [
    { name: "Help Center", href: "#" },
    { name: "Community", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Webinars", href: "#" },
  ],
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Email", icon: Mail, href: "#" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/40 to-muted/60" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-5"
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "100%", "0%"],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              background: `hsl(var(--chart-${(i % 3) + 1}))`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <FadeIn>
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <BarChart className="h-8 w-8 text-primary" />
                </motion.div>
                <span className="font-bold text-2xl">ClarityAI</span>
              </Link>
              <p className="text-muted-foreground mb-8 leading-relaxed max-w-md">
                Transform your business data into visual intelligence with powerful AI-driven analytics. 
                Join thousands of companies making data-driven decisions with confidence.
              </p>
              
              {/* Social links */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full glass-card hover:bg-primary/10 hover:text-primary transition-all duration-300" 
                      asChild
                    >
                      <Link href={social.href} aria-label={social.name}>
                        <social.icon className="h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
          
          {/* Links sections */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <FadeIn key={category} delay={categoryIndex * 0.1}>
                <div>
                  <h3 className="font-semibold mb-4 capitalize flex items-center">
                    {category}
                    <Sparkles className="ml-2 h-3 w-3 text-primary opacity-60" />
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <motion.li 
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: linkIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Link 
                          href={link.href} 
                          className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm hover:underline"
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-border/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <FadeIn>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} ClarityAI. All rights reserved. Made with ❤️ for data enthusiasts.
              </p>
            </FadeIn>
            
            <div className="flex items-center gap-4">
              <FadeIn delay={0.1}>
                <select className="bg-transparent border border-border/50 rounded-lg px-3 py-1 text-sm text-muted-foreground hover:border-primary/50 transition-colors">
                  <option value="en">🇺🇸 English</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="es">🇪🇸 Español</option>
                  <option value="de">🇩🇪 Deutsch</option>
                </select>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <motion.button
                  onClick={scrollToTop}
                  className="glass-card p-2 rounded-full hover:bg-primary/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.button>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}