"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { PromptCard } from "@/components/prompt-card"
import { searchPrompts } from "@/services/api"
import { useToast } from "@/components/ui/use-toast"

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchResults = async () => {
      if (query || category) {
        setIsLoading(true)
        try {
          const searchResults = await searchPrompts(query, category)
          setResults(searchResults)
        } catch (error) {
          console.error("Error searching prompts:", error)
          toast({
            title: "Error",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchResults()
  }, [query, category, toast])

  if (isLoading) {
    return <div>Searching...</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      {results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  )
}

