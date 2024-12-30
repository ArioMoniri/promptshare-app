"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Comment = {
  id: number
  content: string
  user: {
    nickname: string
  }
}

type CommentListProps = {
  promptId: number
}

export function CommentList({ promptId }: CommentListProps) {
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
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardContent className="py-2">
            <p>{comment.content}</p>
            <span className="text-sm text-gray-500">by {comment.user.nickname}</span>
          </CardContent>
        </Card>
      ))}
      <div>
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleAddComment}>Add Comment</Button>
      </div>
    </div>
  )
}

