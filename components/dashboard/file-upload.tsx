"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileUp, Upload, FileCheck, AlertCircle, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FileUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files).map(file => file.name)
    handleUpload(files)
  }
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map(file => file.name)
      handleUpload(files)
    }
  }
  
  const handleUpload = (files: string[]) => {
    if (files.length === 0) return
    
    setUploadState("uploading")
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadState("success")
          setUploadedFiles(prev => [...prev, ...files])
          return 100
        }
        return prev + 5
      })
    }, 200)
  }
  
  const removeFile = (file: string) => {
    setUploadedFiles(prev => prev.filter(f => f !== file))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Upload</CardTitle>
        <CardDescription>Upload your data files for analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-muted p-4">
              <FileUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium">Drag and drop your files here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Supports CSV, Excel, JSON and SQL files up to 50MB
              </p>
            </div>
            <p className="text-xs text-muted-foreground">or</p>
            <Button asChild>
              <label htmlFor="file-upload" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                <Upload className="mr-2 h-4 w-4" />
                Browse files
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleFileInput}
                />
              </label>
            </Button>
          </div>
        </div>
        
        {uploadState === "uploading" && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}
        
        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium">Uploaded Files</h3>
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {uploadedFiles.map((file, index) => (
                <motion.div
                  key={file}
                  className="flex items-center justify-between bg-muted p-3 rounded-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <FileCheck className="h-5 w-5 text-primary" />
                    <span className="text-sm">{file}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeFile(file)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}