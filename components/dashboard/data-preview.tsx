"use client"

import { useState } from "react"
import { ArrowDownUp, ChevronDown, ChevronUp, Download, Filter, MoreHorizontal, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Sample data
const data = [
  { id: 1, product: "Product Alpha", category: "Electronics", status: "In Stock", sales: 1245, revenue: "$12,450", growth: "+12.3%" },
  { id: 2, product: "Product Beta", category: "Home & Kitchen", status: "Low Stock", sales: 876, revenue: "$8,760", growth: "+5.7%" },
  { id: 3, product: "Product Gamma", category: "Electronics", status: "In Stock", sales: 1432, revenue: "$14,320", growth: "+18.2%" },
  { id: 4, product: "Product Delta", category: "Apparel", status: "Out of Stock", sales: 654, revenue: "$6,540", growth: "-2.1%" },
  { id: 5, product: "Product Epsilon", category: "Electronics", status: "In Stock", sales: 987, revenue: "$9,870", growth: "+8.9%" },
  { id: 6, product: "Product Zeta", category: "Home & Kitchen", status: "In Stock", sales: 765, revenue: "$7,650", growth: "+3.5%" },
  { id: 7, product: "Product Eta", category: "Apparel", status: "Low Stock", sales: 543, revenue: "$5,430", growth: "+1.2%" },
]

type SortDirection = "asc" | "desc" | null

export function DataPreview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  
  const sortData = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if already sorting by this column
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc")
      if (sortDirection === "desc") setSortColumn(null)
    } else {
      // Set new sort column and direction
      setSortColumn(column)
      setSortDirection("asc")
    }
  }
  
  // Filter and sort data
  const filteredData = data.filter(item => 
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortColumn === null || sortDirection === null) return 0
    
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      // Remove dollar signs and commas for string comparison if they look like currency
      const aValueClean = aValue.replace(/[$,]/g, "")
      const bValueClean = bValue.replace(/[$,]/g, "")
      
      // Check if both values are numbers after cleaning
      if (!isNaN(Number(aValueClean)) && !isNaN(Number(bValueClean))) {
        return sortDirection === "asc" 
          ? Number(aValueClean) - Number(bValueClean)
          : Number(bValueClean) - Number(aValueClean)
      }
      
      // Regular string comparison
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue)
    }
    
    // Number comparison
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Data Preview</CardTitle>
            <CardDescription>View and analyze your product performance data</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search data..."
                className="pl-8 md:w-[200px] lg:w-[300px]"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => sortData("product")}>
                    <span>Product</span>
                    {sortColumn === "product" ? (
                      sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ArrowDownUp className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end space-x-1 cursor-pointer" onClick={() => sortData("sales")}>
                    <span>Sales</span>
                    {sortColumn === "sales" ? (
                      sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ArrowDownUp className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end space-x-1 cursor-pointer" onClick={() => sortData("revenue")}>
                    <span>Revenue</span>
                    {sortColumn === "revenue" ? (
                      sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ArrowDownUp className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">Growth</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        item.status === "In Stock" 
                          ? "default" 
                          : item.status === "Low Stock" 
                            ? "outline" 
                            : "destructive"
                      }
                      className={
                        item.status === "In Stock"
                          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                          : item.status === "Low Stock"
                            ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                            : ""
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{item.sales.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.revenue}</TableCell>
                  <TableCell className={`text-right ${item.growth.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                    {item.growth}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit product</DropdownMenuItem>
                        <DropdownMenuItem>View history</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {sortedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No results found. Try adjusting your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}