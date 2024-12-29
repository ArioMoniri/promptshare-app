"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"

interface IssueFormProps {
  promptId: string
  onIssueAdded?: () => void
}

export function IssueForm({ promptId, onIssueAdded }: IssueFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to report issues",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/v1/prompts/${promptId}/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, description })
      })

      if (!response.ok) throw new Error('Failed to create issue')

      setTitle("")
      setDescription("")
      if (onIssueAdded) onIssueAdded()
      toast({
        title: "Success",
        description: "Issue reported successfully",
      })
    } catch (error) {
      console.error('Error creating issue:', error)
      toast({
        title: "Error",
        description: "Failed to report issue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Issue title"
        disabled={isLoading}
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the issue..."
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !title.trim() || !description.trim()}>
        {isLoading ? "Submitting..." : "Submit Issue"}
      </Button>
    </form>
  )
}

