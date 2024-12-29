"use client"

import { useState, useEffect } from "react"
import { PromptCard } from "@/components/prompt-card"
import { getPrompts } from "@/services/api"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function PromptFeed() {
  const [prompts, setPrompts] = useState([
    {
      id: 'example',
      title: 'Example Prompt',
      description: 'A comprehensive example showing all prompt features.',
      content: 'This is an example prompt to demonstrate rendering with all available features.',
      category: 'example',
      user: {
        username: 'exampleUser',
        avatar: '/placeholder.svg?height=40&width=40'
      },
      likes: 10,
      dislikes: 2,
      comments: 5,
      stars: 8,
      forks: 3,
      issues: 1,
      version: '1.0',
      tags: ['example', 'demo'],
      created_at: new Date().toISOString()
    }
  ])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchPrompts = async () => {
    setIsLoading(true)
    try {
      const response = await getPrompts(page)
      setPrompts(prevPrompts => [
        ...prevPrompts.filter(p => p.id !== 'example'),
        ...response.data
      ])
      setPage(prevPage => prevPage + 1)
    } catch (error) {
      console.error('Error fetching prompts:', error)
      toast({
        title: "Error",
        description: "Failed to load prompts. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPrompts()
  }, [])

  console.log('Prompts to render:', prompts);

  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
      {prompts.length > 0 && (
        <Button onClick={fetchPrompts} disabled={isLoading} className="w-full">
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  )
}

