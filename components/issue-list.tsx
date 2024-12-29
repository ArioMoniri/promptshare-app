"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Issue = {
  id: number
  title: string
  description: string
  status: "open" | "closed"
  user: {
    nickname: string
  }
}

type IssueListProps = {
  promptId: number
}

export function IssueList({ promptId }: IssueListProps) {
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
      {issues.map((issue) => (
        <Card key={issue.id}>
          <CardContent className="py-2">
            <h4 className="font-semibold">{issue.title}</h4>
            <p>{issue.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">by {issue.user.nickname}</span>
              <span className={`text-sm ${issue.status === "open" ? "text-green-500" : "text-red-500"}`}>
                {issue.status}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
      <div>
        <Textarea
          placeholder="Issue title"
          value={newIssueTitle}
          onChange={(e) => setNewIssueTitle(e.target.value)}
          className="mb-2"
        />
        <Textarea
          placeholder="Issue description"
          value={newIssueDescription}
          onChange={(e) => setNewIssueDescription(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleAddIssue}>Add Issue</Button>
      </div>
    </div>
  )
}

