"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DataSummary } from "@/components/dashboard/data-summary"
import { DataVisualization } from "@/components/dashboard/data-visualization"
import { DataPreview } from "@/components/dashboard/data-preview"
import { AiInsights } from "@/components/dashboard/ai-insights"
import { FileUpload } from "@/components/dashboard/file-upload"
import { FadeIn } from "@/components/animation/fade-in"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  
  return (
    <div className="flex h-screen bg-muted/30">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto">
            <FadeIn>
              <DashboardHeader />
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
              <FadeIn delay={0.1}>
                <DataSummary title="Total Records" value="12,846" change={"+14.5%"} positive />
              </FadeIn>
              <FadeIn delay={0.2}>
                <DataSummary title="Processing Time" value="1.2s" change={"-8.3%"} positive />
              </FadeIn>
              <FadeIn delay={0.3}>
                <DataSummary title="Data Quality" value="97.8%" change={"+2.1%"} positive />
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
              <FadeIn delay={0.2} className="lg:col-span-2">
                <DataVisualization />
              </FadeIn>
              <FadeIn delay={0.3}>
                <AiInsights />
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-6 mb-6">
              <FadeIn delay={0.4}>
                <FileUpload />
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <FadeIn delay={0.5}>
                <DataPreview />
              </FadeIn>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}