"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BarChart, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  PieChart, 
  Settings, 
  FileText, 
  Users, 
  Folder, 
  LayoutDashboard, 
  HelpCircle,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, href: "/dashboard" },
  { title: "Reports", icon: <FileText className="h-5 w-5" />, href: "/reports", badge: "New" },
  { title: "Data Sources", icon: <Folder className="h-5 w-5" />, href: "/data-sources" },
  { title: "Visualizations", icon: <BarChart className="h-5 w-5" />, href: "/visualizations" },
  { title: "Analytics", icon: <PieChart className="h-5 w-5" />, href: "/analytics" },
  { title: "Team", icon: <Users className="h-5 w-5" />, href: "/team" },
]

const secondaryNavItems: NavItem[] = [
  { title: "Settings", icon: <Settings className="h-5 w-5" />, href: "/settings" },
  { title: "Help & Support", icon: <HelpCircle className="h-5 w-5" />, href: "/help" },
]

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ width: isOpen ? 240 : 0, x: isOpen ? 0 : -240 }}
        animate={{ 
          width: isOpen ? 240 : 0,
          x: isOpen ? 0 : -240,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-background border-r md:relative md:z-0",
          isOpen ? "block" : "hidden md:block"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-4 border-b justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <BarChart className="h-6 w-6" />
              <span className="font-bold text-xl">ClarityAI</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto py-2">
            <div className="px-3 py-2">
              <Button className="w-full justify-start space-x-2">
                <Plus className="h-5 w-5" />
                <span>New Analysis</span>
              </Button>
            </div>
            
            <nav className="space-y-1 px-2">
              {mainNavItems.map((item, index) => (
                <NavItem key={item.title} item={item} isOpen={isOpen} />
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t px-2">
              <h3 className="px-3 text-xs font-medium text-muted-foreground mb-2">
                Support
              </h3>
              <nav className="space-y-1">
                {secondaryNavItems.map((item) => (
                  <NavItem key={item.title} item={item} isOpen={isOpen} />
                ))}
              </nav>
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-chart-4" />
              <div className="text-sm">
                <p className="font-medium">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Toggle button for desktop */}
      <div className="hidden md:block absolute left-0 bottom-4 z-50 ml-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full shadow-md"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </>
  )
}

function NavItem({ item, isOpen }: { item: NavItem; isOpen: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Link 
          href={item.href}
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium",
            "transition-colors duration-200 hover:bg-muted",
            item.href === "/dashboard" ? "bg-primary/10 text-primary" : "text-foreground"
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="relative">
            {item.icon}
            {item.badge && (
              <span className="absolute -top-1 -right-1 h-4 px-1 min-w-[16px] rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-primary-foreground">
                {item.badge}
              </span>
            )}
          </span>
          <span>{item.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="md:hidden">
        {item.title}
      </TooltipContent>
    </Tooltip>
  )
}