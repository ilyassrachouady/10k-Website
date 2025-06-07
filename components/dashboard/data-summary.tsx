"use client"

import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface DataSummaryProps {
  title: string
  value: string
  change: string
  positive: boolean
}

export function DataSummary({ title, value, change, positive }: DataSummaryProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <HelpCircle className="h-3.5 w-3.5 ml-1 inline-block text-muted-foreground/70" />
            </TooltipTrigger>
            <TooltipContent side="top">
              {title} metrics from the past 30 days
            </TooltipContent>
          </Tooltip>
        </CardTitle>
        <div className={cn(
          "flex items-center rounded-full px-2 py-1 text-xs font-medium",
          positive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        )}>
          {positive ? <ArrowUp className="h-3.5 w-3.5 mr-1" /> : <ArrowDown className="h-3.5 w-3.5 mr-1" />}
          {change}
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Compared to previous period
          </p>
        </motion.div>
      </CardContent>
    </Card>
  )
}