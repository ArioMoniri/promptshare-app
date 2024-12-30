"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getIssues } from "@/services/api"
import { useToast } from "@/components/ui/use-toast"

type Issue = {
  id: number
  title: string
  description: string
  status: "open" | "closed"
  user: {
    username: string
  }
  created_at: string
}

type IssueListProps = {
  promptId: string
}

export function IssueList({ promptId }: IssueListProps) {
  const [issues, setIssues] = useState<Issue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await getIssues(promptId)
        setIssues(response.data)
      } catch (error) {
        console.error('Error fetching issues:', error)
        toast({
          title: "Error",
          description: "Failed to fetch issues",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchIssues()
  }, [promptId, toast])

  if (isLoading) {
    return <div>Loading issues...</div>
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <Card key={issue.id}>
          <CardContent className="py-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{issue.title}</h3>
              <Badge variant={issue.status === "open" ? "destructive" : "secondary"}>
                {issue.status}
              </Badge>
            </div>
            <p className="mb-2">{issue.description}</p>
            <p className="text-sm text-gray-500">
              Reported by {issue.user.username} on {new Date(issue.created_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
      {issues.length === 0 && <p>No issues reported yet.</p>}
    </div>
  )
}

