"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Minus, HelpCircle, Sparkles } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FadeIn } from "@/components/animation/fade-in"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "What is ClarityAI?",
    answer: "ClarityAI is a powerful data visualization and analytics platform that helps businesses transform complex data into actionable insights. Our platform combines advanced AI technology with intuitive design to make data analysis accessible to everyone in your organization.",
    category: "General"
  },
  {
    question: "How does the pricing work?",
    answer: "We offer three main pricing tiers: Starter, Professional, and Enterprise. Each plan is priced per month with the option to save by paying annually. The main differences between plans are the number of users, dashboards, and advanced features like AI analytics and custom development options.",
    category: "Pricing"
  },
  {
    question: "Can I try ClarityAI before purchasing?",
    answer: "Yes! We offer a 14-day free trial of our Professional plan with no credit card required. This gives you full access to explore our platform and see how it can benefit your business. You can sign up for the trial directly from our website.",
    category: "Trial"
  },
  {
    question: "What data sources can I connect to?",
    answer: "ClarityAI connects to a wide range of data sources including SQL databases (MySQL, PostgreSQL, SQL Server), cloud storage (AWS S3, Google Cloud Storage), spreadsheets (Excel, Google Sheets), CRM systems (Salesforce, HubSpot), marketing platforms (Google Analytics, Facebook Ads), and many more through our API connectors.",
    category: "Integration"
  },
  {
    question: "Is my data secure with ClarityAI?",
    answer: "Absolutely. We take data security very seriously. ClarityAI employs bank-level encryption, regular security audits, and complies with major security standards including SOC 2, GDPR, and HIPAA. Your data is encrypted both in transit and at rest, and we offer advanced security features like SSO and role-based access controls.",
    category: "Security"
  },
  {
    question: "Do I need technical expertise to use ClarityAI?",
    answer: "No technical expertise is required. ClarityAI is designed with an intuitive drag-and-drop interface that makes it easy for anyone to create stunning visualizations. Of course, for users who want more control, we also offer advanced features and customization options.",
    category: "Usability"
  },
  {
    question: "Can I customize the dashboards to match our brand?",
    answer: "Yes, our Professional and Enterprise plans include custom branding options. You can adjust colors, add your logo, and customize the look and feel of your dashboards to align with your brand identity.",
    category: "Customization"
  }
]

export function FaqSection() {
  const [openItems, setOpenItems] = useState<string[]>([])

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-10"
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "100%", "0%"],
              rotate: [0, 360],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${250 + i * 100}px`,
              height: `${250 + i * 100}px`,
              background: `hsl(var(--chart-${(i % 3) + 1}))`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 mb-6 rounded-full glass-card"
            >
              <HelpCircle className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium premium-text-gradient">
                Frequently Asked Questions
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Got 
              <span className="premium-text-gradient"> Questions?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about ClarityAI. Can't find what you're looking for? Our support team is here to help.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.2}>
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <AccordionItem 
                      value={`item-${index}`} 
                      className="border-b border-border/50 last:border-b-0"
                    >
                      <AccordionTrigger className="text-left hover:no-underline group py-6">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-4">
                            <motion.div
                              className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                              whileHover={{ scale: 1.1, rotate: 180 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <Sparkles className="h-4 w-4 text-primary" />
                            </motion.div>
                            <span className="text-lg font-semibold group-hover:text-primary transition-colors">
                              {faq.question}
                            </span>
                          </div>
                          <motion.div
                            animate={{ rotate: openItems.includes(`item-${index}`) ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0 ml-4"
                          >
                            <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </motion.div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="ml-12 text-muted-foreground leading-relaxed"
                        >
                          {faq.answer}
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <FadeIn delay={0.5}>
            <motion.div 
              className="inline-flex flex-col items-center gap-4 glass-card px-8 py-6 rounded-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <p className="text-lg font-medium">Still have questions?</p>
              <p className="text-muted-foreground">
                Our support team is available 24/7 to help you get the most out of ClarityAI.
              </p>
              <motion.button
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}