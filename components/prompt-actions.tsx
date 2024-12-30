"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, Star, GitFork, MessageSquare, AlertTriangle, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { likePrompt, unlikePrompt, starPrompt, unstarPrompt, forkPrompt } from "@/services/api"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  const handleAction = async (action: () => Promise<any>, successMessage: string) => {
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
      const result = await action()
      if (onActionComplete) onActionComplete()
      toast({
        title: "Success",
        description: successMessage,
      })
      return result
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
    const result = await likePrompt(promptId)
    setLikes(result.likes_count)
    setDislikes(result.dislikes_count)
  }, "Prompt liked successfully")

  const handleDislike = () => handleAction(async () => {
    const result = await unlikePrompt(promptId)
    setLikes(result.likes_count)
    setDislikes(result.dislikes_count)
  }, "Prompt disliked successfully")

  const handleStar = () => handleAction(async () => {
    const result = await starPrompt(promptId)
    setStars(result.stars_count)
  }, "Prompt starred successfully")

  const handleFork = () => handleAction(async () => {
    await forkPrompt(promptId)
    router.push(`/prompts/${promptId}/fork`)
  }, "Navigating to fork page")

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
        <Link href={`/prompts/${promptId}/comments`}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {initialComments}
        </Link>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <Link href={`/prompts/${promptId}/issues`}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Report Issue
        </Link>
      </Button>
      <Button variant="outline" size="sm" onClick={() => {
        navigator.clipboard.writeText(`${window.location.origin}/prompts/${promptId}`)
        toast({
          title: "Link Copied",
          description: "Prompt link copied to clipboard",
        })
      }}>
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  )
}

