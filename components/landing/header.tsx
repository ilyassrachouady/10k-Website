"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <BarChart className="h-6 w-6" />
            <span className="font-bold text-xl">ClarityAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link href="#features">Features</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#pricing">Pricing</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#testimonials">Testimonials</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#faq">FAQ</Link>
            </Button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-b"
          >
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
                </Button>
                <div className="pt-4 border-t flex flex-col space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}