import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Star, GitFork, MessageSquare, AlertTriangle, Share2 } from 'lucide-react'
import { PromptActions } from "@/components/prompt-actions"
import { useState } from "react"

type PromptCardProps = {
  prompt: {
    id: string | number
    title: string
    description: string
    content: string
    category: string
    user: {
      username: string
      avatar: string
    }
    likes: number
    dislikes?: number
    comments: number
    stars?: number
    forks?: number
    issues?: number
    version?: string
    tags?: string[]
    created_at: string
  }
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [likes, setLikes] = useState(prompt.likes)
  const [dislikes, setDislikes] = useState(prompt.dislikes || 0)

  const handleActionComplete = () => {
    // Refresh the prompt data here if needed
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/prompts/${prompt.id}`} className="hover:underline">
            {prompt.title}
          </Link>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={prompt.user.avatar} alt={prompt.user.username} />
            <AvatarFallback>{prompt.user.username[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{prompt.user.username}</span>
          {prompt.version && (
            <Badge variant="secondary">v{prompt.version}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{prompt.description}</p>
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {prompt.tags.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <PromptActions
          promptId={prompt.id.toString()}
          initialLikes={likes}
          initialDislikes={dislikes}
          initialStars={prompt.stars || 0}
          initialComments={prompt.comments}
          onActionComplete={handleActionComplete}
        />
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/prompts/${prompt.id}`}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

