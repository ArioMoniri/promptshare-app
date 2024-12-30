"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PromptCard } from "@/components/prompt-card"
import { getPrompts } from "@/services/api"
import { LoadingSpinner } from "@/components/LoadingSpinner"

const filters = [
  { name: "Most Upvoted", value: "upvoted" },
  { name: "Latest", value: "latest" },
  { name: "Controversial", value: "controversial" },
]

export function PromptList() {
  const [activeFilter, setActiveFilter] = useState("latest")
  const [prompts, setPrompts] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrompts()
  }, [activeFilter, page])

  const fetchPrompts = async () => {
    setIsLoading(true)
    try {
      const response = await getPrompts(page)
      setPrompts(prevPrompts => [...prevPrompts, ...response.data])
      setError(null)
    } catch (error) {
      console.error('Error fetching prompts:', error)
      setError('Failed to load prompts. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? "default" : "outline"}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.name}
          </Button>
        ))}
      </div>
      {isLoading && <LoadingSpinner />}
      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
      {!isLoading && !error && (
        <Button onClick={loadMore} className="w-full">
          Load More
        </Button>
      )}
    </div>
  )
}

