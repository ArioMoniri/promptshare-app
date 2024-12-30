"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, Star, GitFork, MessageSquare, AlertTriangle } from 'lucide-react'
import { RichTextEditor } from "@/components/RichTextEditor"
import { PromptTester } from "@/components/PromptTester"
import { getPrompt, likePrompt, unlikePrompt, forkPrompt, createVersion } from "@/services/api"
import { useToast } from "@/components/ui/use-toast"

type Prompt = {
  id: number
  title: string
  content: string
  category: string
  tags: string[]
  version: string
  upvotes: number
  downvotes: number
  user: {
    username: string
    avatar: string
  }
}

type PromptDetailProps = {
  promptId: number
}

export function PromptDetail({ promptId }: PromptDetailProps) {
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState("")
  const [changeLog, setChangeLog] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await getPrompt(promptId.toString())
        setPrompt(response.data)
        setEditedContent(response.data.content)
      } catch (error) {
        console.error('Error fetching prompt:', error)
        toast({
          title: "Error",
          description: "Failed to fetch prompt details",
          variant: "destructive",
        })
      }
    }

    fetchPrompt()
  }, [promptId, toast])

  const handleLike = async () => {
    if (!prompt) return
    try {
      await likePrompt(prompt.id.toString())
      setPrompt(prev => prev ? { ...prev, upvotes: prev.upvotes + 1 } : null)
    } catch (error) {
      console.error('Error liking prompt:', error)
      toast({
        title: "Error",
        description: "Failed to like prompt",
        variant: "destructive",
      })
    }
  }

  const handleUnlike = async () => {
    if (!prompt) return
    try {
      await unlikePrompt(prompt.id.toString())
      setPrompt(prev => prev ? { ...prev, downvotes: prev.downvotes + 1 } : null)
    } catch (error) {
      console.error('Error unliking prompt:', error)
      toast({
        title: "Error",
        description: "Failed to unlike prompt",
        variant: "destructive",
      })
    }
  }

  const handleFork = async () => {
    if (!prompt) return
    try {
      const response = await forkPrompt(prompt.id.toString())
      router.push(`/prompts/${response.data.id}`)
      toast({
        title: "Success",
        description: "Prompt forked successfully",
      })
    } catch (error) {
      console.error('Error forking prompt:', error)
      toast({
        title: "Error",
        description: "Failed to fork prompt",
        variant: "destructive",
      })
    }
  }

  const handleSaveVersion = async () => {
    if (!prompt) return
    try {
      await createVersion(prompt.id.toString(), editedContent, changeLog)
      setPrompt(prev => prev ? { ...prev, content: editedContent, version: (parseFloat(prev.version) + 0.1).toFixed(1) } : null)
      setIsEditing(false)
      toast({
        title: "Success",
        description: "New version created successfully",
      })
    } catch (error) {
      console.error('Error creating new version:', error)
      toast({
        title: "Error",
        description: "Failed to create new version",
        variant: "destructive",
      })
    }
  }

  if (!prompt) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{prompt.title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={prompt.user.avatar} />
            <AvatarFallback>{prompt.user.username[0]}</AvatarFallback>
          </Avatar>
          <span>{prompt.user.username}</span>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <RichTextEditor initialValue={editedContent} onChange={setEditedContent} />
            <Input
              placeholder="Describe your changes"
              value={changeLog}
              onChange={(e) => setChangeLog(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button onClick={handleSaveVersion}>Save New Version</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: prompt.content }} />
        )}
        <div className="mt-4">
          <span className="font-semibold">Category:</span> {prompt.category}
        </div>
        <div className="mt-2">
          <span className="font-semibold">Tags:</span> {prompt.tags.join(", ")}
        </div>
        <div className="mt-2">
          <span className="font-semibold">Version:</span> {prompt.version}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleLike}>
            <ThumbsUp className="mr-2 h-4 w-4" /> {prompt.upvotes}
          </Button>
          <Button variant="outline" size="sm" onClick={handleUnlike}>
            <ThumbsDown className="mr-2 h-4 w-4" /> {prompt.downvotes}
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleFork}>
            <GitFork className="mr-2 h-4 w-4" /> Fork
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push(`/prompts/${promptId}/issues`)}>
            <AlertTriangle className="mr-2 h-4 w-4" /> Issues
          </Button>
        </div>
      </CardFooter>
      <CardContent>
        <PromptTester />
      </CardContent>
    </Card>
  )
}

