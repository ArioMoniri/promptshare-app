import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PromptActions } from "@/components/prompt-actions"
import { PromptTester } from "@/components/prompt-tester"

type PromptCardProps = {
  prompt: {
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
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <PromptActions
            promptId={prompt.id}
            initialLikes={prompt.likes}
            initialDislikes={prompt.dislikes}
            initialStars={prompt.stars}
            initialComments={prompt.comments}
          />
          <PromptTester promptId={prompt.id} promptContent={prompt.content} />
        </div>
      </CardFooter>
    </Card>
  )
}

