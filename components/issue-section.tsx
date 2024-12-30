"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Issue = {
  id: number
  title: string
  description: string
  status: "open" | "closed"
  user: {
    nickname: string
  }
  createdAt: string
}

type IssueSectionProps = {
  promptId: number
}

export function IssueSection({ promptId }: IssueSectionProps) {
  const [issues, setIssues] = useState<Issue[]>([])
  const [newIssueTitle, setNewIssueTitle] = useState("")
  const [newIssueDescription, setNewIssueDescription] = useState("")

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchIssues = async () => {
      const response = await fetch(`/api/prompts/${promptId}/issues`)
      const data = await response.json()
      setIssues(data)
    }

    fetchIssues()
  }, [promptId])

  const handleAddIssue = async () => {
    // TODO: Implement add issue functionality
    console.log(`Adding issue to prompt ${promptId}: ${newIssueTitle}`)
    setNewIssueTitle("")
    setNewIssueDescription("")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Report an Issue</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={newIssueTitle}
            onChange={(e) => setNewIssueTitle(e.target.value)}
            placeholder="Issue title"
            className="mb-2"
          />
          <Textarea
            value={newIssueDescription}
            onChange={(e) => setNewIssueDescription(e.target.value)}
            placeholder="Describe the issue"
            rows={3}
            className="mb-2"
          />
          <Button onClick={handleAddIssue}>Submit Issue</Button>
        </CardContent>
      </Card>
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
              Reported by {issue.user.nickname} on {new Date(issue.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

