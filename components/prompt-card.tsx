import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Star, GitFork, MessageSquare, AlertTriangle, Share2 } from 'lucide-react'

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
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" />
            {prompt.likes}
          </Button>
          {prompt.dislikes !== undefined && (
            <Button variant="ghost" size="sm">
              <ThumbsDown className="mr-2 h-4 w-4" />
              {prompt.dislikes}
            </Button>
          )}
          <Button variant="ghost" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            {prompt.comments}
          </Button>
        </div>
        <div className="flex space-x-2">
          {prompt.stars !== undefined && (
            <Button variant="ghost" size="sm">
              <Star className="mr-2 h-4 w-4" />
              {prompt.stars}
            </Button>
          )}
          {prompt.forks !== undefined && (
            <Button variant="ghost" size="sm">
              <GitFork className="mr-2 h-4 w-4" />
              {prompt.forks}
            </Button>
          )}
          {prompt.issues !== undefined && (
            <Button variant="ghost" size="sm">
              <AlertTriangle className="mr-2 h-4 w-4" />
              {prompt.issues}
            </Button>
          )}
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

