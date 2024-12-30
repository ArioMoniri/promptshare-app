"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { testPrompt } from "@/services/api"

interface PromptTesterProps {
  promptId: string
  promptContent: string
}

export function PromptTester({ promptId, promptContent }: PromptTesterProps) {
  const [apiKey, setApiKey] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTest = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await testPrompt(promptId, promptContent, apiKey)
      setResult(response.result)
    } catch (error) {
      console.error('Error testing prompt:', error)
      toast({
        title: "Error",
        description: "Failed to test prompt. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Test Prompt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Test Prompt</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to test this prompt.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Enter your OpenAI API key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Textarea
            placeholder="Prompt content"
            value={promptContent}
            readOnly
          />
          <Button onClick={handleTest} disabled={isLoading}>
            {isLoading ? "Testing..." : "Test"}
          </Button>
          {result && (
            <Textarea
              placeholder="Result will appear here"
              value={result}
              readOnly
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

