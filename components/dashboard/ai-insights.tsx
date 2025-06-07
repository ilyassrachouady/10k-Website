"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BrainCircuit, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const insightTexts = [
  "Sales have increased by 24% compared to last month, primarily driven by the new product line.",
  "Customer retention has improved to 87%, which is 12% above industry average.",
  "The Northeast region is showing a 15% decrease in engagement - recommend targeted campaign.",
  "Conversion rate from trial to paid subscription has increased to 32% after UI improvements.",
  "The average time spent in the application has increased by 8 minutes since the latest update.",
]

export function AiInsights() {
  const [currentInsight, setCurrentInsight] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [displayText, setDisplayText] = useState("")
  const [typingPosition, setTypingPosition] = useState(0)
  
  // Simulate typing effect
  useEffect(() => {
    if (isTyping && typingPosition < insightTexts[currentInsight].length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + insightTexts[currentInsight][typingPosition])
        setTypingPosition(prev => prev + 1)
      }, 30) // Typing speed
      
      return () => clearTimeout(timeout)
    } else if (isTyping && typingPosition >= insightTexts[currentInsight].length) {
      setIsTyping(false)
    }
  }, [isTyping, typingPosition, currentInsight])
  
  // Reset for new insight
  const showNextInsight = () => {
    setIsTyping(true)
    setDisplayText("")
    setTypingPosition(0)
    setCurrentInsight((prev) => (prev + 1) % insightTexts.length)
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex flex-1 items-center">
          <CardTitle className="text-base">AI Insights</CardTitle>
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-xs">
            <Sparkles className="mr-1 h-3 w-3" /> 
            Powered by AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-start space-x-4 mb-4">
          <div className="mt-1 bg-primary/10 text-primary rounded-full p-2">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm">
              {displayText}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Confidence Score</div>
            <div className="text-sm">92%</div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          <h4 className="text-sm font-medium">Related Metrics</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted rounded-md p-2">
              <div className="text-xs text-muted-foreground">Sales Growth</div>
              <div className="text-sm font-bold">+24%</div>
            </div>
            <div className="bg-muted rounded-md p-2">
              <div className="text-xs text-muted-foreground">Retention</div>
              <div className="text-sm font-bold">87%</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={showNextInsight}
          >
            <Sparkles className="mr-2 h-3 w-3" />
            Generate new insight
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}