"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { StaggerChildren, StaggerItem } from "@/components/animation/stagger-children"
import { FadeIn } from "@/components/animation/fade-in"
import { BarChart3, LineChart, PieChart, TrendingUp, Zap, BrainCircuit, Layers, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Data Visualization",
    description: "Transform complex data into intuitive charts and graphs that reveal patterns and insights at a glance.",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    icon: <BrainCircuit className="h-8 w-8" />,
    title: "AI-Powered Insights",
    description: "Leverage advanced machine learning to automatically discover trends and anomalies in your data.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Predictive Analytics",
    description: "Forecast future trends with sophisticated predictive models that learn from historical data.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "Real-time Monitoring",
    description: "Track KPIs and metrics as they change with live dashboards that update in real-time.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: <Layers className="h-8 w-8" />,
    title: "Data Integration",
    description: "Connect to all your data sources with our extensive library of pre-built connectors.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Automated Reporting",
    description: "Schedule and automate reports to keep stakeholders informed without manual effort.",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Enterprise Security",
    description: "Rest easy with enterprise-grade security and compliance features built into the platform.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: <PieChart className="h-8 w-8" />,
    title: "Custom Dashboards",
    description: "Create personalized dashboards tailored to specific roles and responsibilities.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl glass-card hover:shadow-2xl transition-all duration-500"
    >
      <div className="p-8">
        <div 
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            feature.bgColor
          )} 
          style={{
            background: `radial-gradient(circle at 50% 0%, hsl(var(--chart-1)), transparent)`,
            opacity: 0.1
          }}
        />
        
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn("inline-flex items-center justify-center rounded-xl p-3 mb-4", feature.bgColor)}
        >
          <div className={feature.color}>{feature.icon}</div>
        </motion.div>
        
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          {feature.description}
        </p>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  )
}

export function FeaturesSection() {
  return (
    <section className="py-32 relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              background: `hsl(var(--chart-${i + 1}))`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 mb-6 rounded-full glass-card"
            >
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-sm font-medium premium-text-gradient">
                Powerful Features
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Data into 
              <span className="premium-text-gradient"> Actionable Insights</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Our comprehensive suite of tools helps you unlock the full potential of your business data.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}