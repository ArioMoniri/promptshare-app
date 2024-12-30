"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { commentOnPrompt, getComments } from "@/services/api"

interface Comment {
  id: number
  content: string
  user: {
    username: string
  }
  created_at: string
}

interface CommentSectionProps {
  promptId: string
}

export function CommentSection({ promptId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchComments()
  }, [promptId])

  const fetchComments = async () => {
    try {
      const fetchedComments = await getComments(promptId)
      setComments(fetchedComments)
    } catch (error) {
      console.error('Error fetching comments:', error)
      toast({
        title: "Error",
        description: "Failed to fetch comments",
        variant: "destructive",
      })
    }
  }

  const handleAddComment = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to comment",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await commentOnPrompt(promptId, newComment)
      setNewComment("")
      fetchComments()
      toast({
        title: "Success",
        description: "Comment added successfully",
      })
    } catch (error) {
      console.error('Error adding comment:', error)
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        disabled={isLoading}
      />
      <Button onClick={handleAddComment} disabled={isLoading || !newComment.trim()}>
        {isLoading ? "Adding..." : "Add Comment"}
      </Button>
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="py-4">
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                By {comment.user.username} on {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

