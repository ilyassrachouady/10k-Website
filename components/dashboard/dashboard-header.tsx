"use client"

import { Download, Filter, MoreHorizontal, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DashboardHeader() {
  return (
    <div className="flex flex-col space-y-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Analyze your data and gain valuable insights
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Refresh data</DropdownMenuItem>
              <DropdownMenuItem>Save as template</DropdownMenuItem>
              <DropdownMenuItem>Manage access</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Card className="bg-card/60 backdrop-blur-sm">
        <CardContent className="p-3">
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 lg:w-auto">
              <TabsTrigger value="all">All Data</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="finance" className="hidden md:flex">Finance</TabsTrigger>
              <TabsTrigger value="customers" className="hidden md:flex">Customers</TabsTrigger>
              <TabsTrigger value="operations" className="hidden md:flex">Operations</TabsTrigger>
              <TabsTrigger value="custom" className="hidden md:flex">Custom</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}