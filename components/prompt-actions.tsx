"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, Star, GitFork, MessageSquare, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { likePrompt, unlikePrompt, forkPrompt } from "@/services/api"

interface PromptActionsProps {
  promptId: string
  initialLikes: number
  initialDislikes: number
  initialStars: number
  initialComments: number
  onActionComplete?: () => void
}

export function PromptActions({
  promptId,
  initialLikes,
  initialDislikes,
  initialStars,
  initialComments,
  onActionComplete
}: PromptActionsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to like prompts",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await likePrompt(promptId)
      setLikes(prev => prev + 1)
      if (onActionComplete) onActionComplete()
      toast({
        title: "Success",
        description: "Prompt liked successfully",
      })
    } catch (error) {
      console.error('Error liking prompt:', error)
      toast({
        title: "Error",
        description: "Failed to like prompt",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDislike = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to dislike prompts",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await unlikePrompt(promptId)
      setDislikes(prev => prev + 1)
      if (onActionComplete) onActionComplete()
      toast({
        title: "Success",
        description: "Prompt disliked successfully",
      })
    } catch (error) {
      console.error('Error disliking prompt:', error)
      toast({
        title: "Error",
        description: "Failed to dislike prompt",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFork = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to fork prompts",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await forkPrompt(promptId)
      if (onActionComplete) onActionComplete()
      toast({
        title: "Success",
        description: "Prompt forked successfully",
      })
      return response
    } catch (error) {
      console.error('Error forking prompt:', error)
      toast({
        title: "Error",
        description: "Failed to fork prompt",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleLike}
        disabled={isLoading}
      >
        <ThumbsUp className="mr-2 h-4 w-4" />
        {likes}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDislike}
        disabled={isLoading}
      >
        <ThumbsDown className="mr-2 h-4 w-4" />
        {dislikes}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleFork}
        disabled={isLoading}
      >
        <GitFork className="mr-2 h-4 w-4" />
        Fork
      </Button>
      <Button
        variant="outline"
        size="sm"
        asChild
      >
        <a href={`/prompts/${promptId}/comments`}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {initialComments}
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        asChild
      >
        <a href={`/prompts/${promptId}/issues`}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Report Issue
        </a>
      </Button>
    </div>
  )
}

