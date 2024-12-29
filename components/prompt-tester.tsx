"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type PromptTesterProps = {
  initialPrompt: string
}

export function PromptTester({ initialPrompt }: PromptTesterProps) {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleTest = async () => {
    setIsLoading(true)
    // TODO: Replace with actual API call to test prompt
    try {
      const res = await fetch("/api/test-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      setResponse(data.response)
    } catch (error) {
      console.error("Error testing prompt:", error)
      setResponse("An error occurred while testing the prompt.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Prompt</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Edit the prompt here if needed"
          rows={4}
          className="mb-4"
        />
        <Button onClick={handleTest} disabled={isLoading}>
          {isLoading ? "Testing..." : "Test Prompt"}
        </Button>
      </CardContent>
      {response && (
        <CardFooter>
          <div className="w-full">
            <h3 className="font-semibold mb-2">Response:</h3>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

