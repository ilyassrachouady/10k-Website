"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Info, Sparkles, Zap, Shield, Crown } from "lucide-react"
import { FadeIn } from "@/components/animation/fade-in"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type BillingType = "monthly" | "yearly"

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams just getting started with data visualization.",
    monthlyPrice: 29,
    yearlyPrice: 290,
    icon: <Sparkles className="h-6 w-6" />,
    color: "from-chart-4 to-chart-5",
    features: [
      "5 users included",
      "10 dashboards",
      "Basic data connectors",
      "Standard visualizations",
      "Email support",
      "7-day data history",
    ],
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses with advanced analytics needs.",
    monthlyPrice: 79,
    yearlyPrice: 790,
    popular: true,
    icon: <Zap className="h-6 w-6" />,
    color: "from-primary to-chart-2",
    features: [
      "20 users included",
      "Unlimited dashboards",
      "Advanced data connectors",
      "AI-powered insights",
      "Priority support",
      "30-day data history",
      "Custom branding",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    description: "Comprehensive solution for large organizations with complex requirements.",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    icon: <Crown className="h-6 w-6" />,
    color: "from-chart-1 to-chart-3",
    features: [
      "Unlimited users",
      "Unlimited dashboards",
      "All data connectors",
      "Advanced AI analytics",
      "24/7 dedicated support",
      "Full data history",
      "Single sign-on (SSO)",
      "Custom development",
      "Dedicated account manager",
      "On-premise deployment option",
    ],
  },
]

export function PricingSection() {
  const [billingType, setBillingType] = useState<BillingType>("monthly")
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  const getPrice = (plan: typeof plans[0]) => {
    return billingType === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
  }

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12
    const yearlyCost = plan.yearlyPrice
    return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100)
  }

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "100%", "0%"],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              background: `hsl(var(--chart-${i + 1}))`,
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
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-sm font-medium premium-text-gradient">
                Simple, Transparent Pricing
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your 
              <span className="premium-text-gradient"> Perfect Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Unlock the full potential of your data with our comprehensive analytics platform. All plans include core visualization features.
            </p>

            {/* Billing toggle */}
            <motion.div 
              className="flex items-center justify-center space-x-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Label 
                htmlFor="billing-toggle" 
                className={cn(
                  "text-lg font-medium transition-colors",
                  billingType === "monthly" ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Monthly
              </Label>
              <div className="relative">
                <Switch
                  id="billing-toggle"
                  checked={billingType === "yearly"}
                  onCheckedChange={(checked) => setBillingType(checked ? "yearly" : "monthly")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              <Label 
                htmlFor="billing-toggle" 
                className={cn(
                  "text-lg font-medium transition-colors",
                  billingType === "yearly" ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Yearly 
                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                  Save up to 20%
                </Badge>
              </Label>
            </motion.div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <FadeIn key={plan.name} delay={index * 0.1} direction="up">
              <motion.div
                className="relative h-full"
                onHoverStart={() => setHoveredPlan(plan.name)}
                onHoverEnd={() => setHoveredPlan(null)}
                whileHover={{ y: -12 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className={cn(
                  "relative overflow-hidden h-full glass-card transition-all duration-500",
                  plan.popular ? "border-primary shadow-2xl scale-105" : "hover:shadow-xl",
                  hoveredPlan === plan.name ? "shadow-2xl" : ""
                )}>
                  {/* Background gradient */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-500 bg-gradient-to-br",
                    plan.color,
                    hoveredPlan === plan.name ? "opacity-5" : ""
                  )} />
                  
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute top-0 right-0 z-10">
                      <motion.div 
                        className="bg-gradient-to-r from-primary to-chart-2 text-primary-foreground text-sm font-medium px-4 py-2 rounded-bl-2xl rounded-tr-2xl"
                        initial={{ scale: 0, rotate: 12 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        Most Popular
                      </motion.div>
                    </div>
                  )}
                  
                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <motion.div
                        className={cn(
                          "p-3 rounded-xl bg-gradient-to-br",
                          plan.color,
                          "text-white"
                        )}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {plan.icon}
                      </motion.div>
                      <div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-baseline space-x-2">
                        <motion.span 
                          className="text-5xl font-bold"
                          key={`${plan.name}-${billingType}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ${getPrice(plan)}
                        </motion.span>
                        <span className="text-muted-foreground text-lg">
                          /{billingType === "monthly" ? "month" : "year"}
                        </span>
                      </div>
                      {billingType === "yearly" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-2"
                        >
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                            Save {getSavings(plan)}% annually
                          </Badge>
                        </motion.div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={feature} 
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="mt-0.5">
                            <Check className="h-5 w-5 text-primary shrink-0" />
                          </div>
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="relative z-10 pt-0">
                    <motion.div
                      className="w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className={cn(
                          "w-full h-12 text-base font-medium transition-all duration-300",
                          plan.popular 
                            ? "bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/25" 
                            : "hover:bg-primary/90"
                        )}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                        {plan.popular && <Sparkles className="ml-2 h-4 w-4" />}
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <FadeIn delay={0.5}>
            <motion.div 
              className="inline-flex items-center gap-3 glass-card px-6 py-4 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Info className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">
                Need a custom plan? 
                <motion.a 
                  href="#" 
                  className="text-primary font-medium ml-1 hover:underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Contact our sales team
                </motion.a>
              </span>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}