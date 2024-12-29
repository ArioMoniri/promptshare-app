"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Comment = {
  id: number
  content: string
  user: {
    nickname: string
  }
  createdAt: string
}

type CommentSectionProps = {
  promptId: number
}

export function CommentSection({ promptId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchComments = async () => {
      const response = await fetch(`/api/prompts/${promptId}/comments`)
      const data = await response.json()
      setComments(data)
    }

    fetchComments()
  }, [promptId])

  const handleAddComment = async () => {
    // TODO: Implement add comment functionality
    console.log(`Adding comment to prompt ${promptId}: ${newComment}`)
    setNewComment("")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here"
            rows={3}
            className="mb-2"
          />
          <Button onClick={handleAddComment}>Post Comment</Button>
        </CardContent>
      </Card>
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardContent className="py-4">
            <p className="mb-2">{comment.content}</p>
            <p className="text-sm text-gray-500">
              by {comment.user.nickname} on {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

