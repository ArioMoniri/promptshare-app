"use client"

import { useState, useEffect } from "react"
import { PromptCard } from "@/components/prompt-card"
import { getPrompts } from "@/services/api"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Prompt = {
  id: string
  title: string
  description: string
  content: string
  category: string
  user: {
    username: string
    avatar: string
  }
  likes: number
  dislikes: number
  comments: number
  stars: number
  forks: number
  version?: string
  tags?: string[]
  created_at: string
}

export function PromptFeed() {
  const [prompts, setPrompts] = useState<Prompt[]>([
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
      version: '1.0',
      tags: ['example', 'demo'],
      created_at: new Date().toISOString()
    }
  ])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const { toast } = useToast()

  const fetchPrompts = async () => {
    setIsLoading(true)
    try {
      const response = await getPrompts(page)
      const newPrompts = response.data
      setPrompts(prevPrompts => {
        // Remove the example prompt after the first fetch
        const updatedPrompts = page === 1 ? newPrompts : [...prevPrompts, ...newPrompts]
        return updatedPrompts.filter((prompt, index, self) =>
          index === self.findIndex((t) => t.id === prompt.id)
        )
      })
      setPage(prevPage => prevPage + 1)
      setHasMore(newPrompts.length > 0)
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

  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <Dialog key={prompt.id}>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <PromptCard prompt={prompt} />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{prompt.title}</DialogTitle>
              <DialogDescription>
                Created by {prompt.user.username}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h4 className="font-semibold">Content:</h4>
              <p>{prompt.content}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Description:</h4>
              <p>{prompt.description}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Category:</h4>
              <p>{prompt.category}</p>
            </div>
            {prompt.tags && (
              <div className="mt-4">
                <h4 className="font-semibold">Tags:</h4>
                <p>{prompt.tags.join(", ")}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ))}
      {hasMore && (
        <Button onClick={fetchPrompts} disabled={isLoading} className="w-full">
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  )
}

