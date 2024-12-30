"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, Star, GitFork, MessageSquare, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { likePrompt, unlikePrompt, starPrompt, unstarPrompt, forkPrompt } from "@/services/api"

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
  const [stars, setStars] = useState(initialStars)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleAction = async (action: () => Promise<void>, successMessage: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to perform this action",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await action()
      if (onActionComplete) onActionComplete()
      toast({
        title: "Success",
        description: successMessage,
      })
    } catch (error) {
      console.error('Error performing action:', error)
      toast({
        title: "Error",
        description: "Failed to perform action",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = () => handleAction(async () => {
    await likePrompt(promptId)
    setLikes(prev => prev + 1)
  }, "Prompt liked successfully")

  const handleDislike = () => handleAction(async () => {
    await unlikePrompt(promptId)
    setDislikes(prev => prev + 1)
  }, "Prompt disliked successfully")

  const handleStar = () => handleAction(async () => {
    await starPrompt(promptId)
    setStars(prev => prev + 1)
  }, "Prompt starred successfully")

  const handleFork = () => handleAction(async () => {
    await forkPrompt(promptId)
  }, "Prompt forked successfully")

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={handleLike} disabled={isLoading}>
        <ThumbsUp className="mr-2 h-4 w-4" />
        {likes}
      </Button>
      <Button variant="outline" size="sm" onClick={handleDislike} disabled={isLoading}>
        <ThumbsDown className="mr-2 h-4 w-4" />
        {dislikes}
      </Button>
      <Button variant="outline" size="sm" onClick={handleStar} disabled={isLoading}>
        <Star className="mr-2 h-4 w-4" />
        {stars}
      </Button>
      <Button variant="outline" size="sm" onClick={handleFork} disabled={isLoading}>
        <GitFork className="mr-2 h-4 w-4" />
        Fork
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a href={`/prompts/${promptId}/comments`}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {initialComments}
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a href={`/prompts/${promptId}/issues`}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Report Issue
        </a>
      </Button>
    </div>
  )
}

