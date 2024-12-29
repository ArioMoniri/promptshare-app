"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type TrendingPrompt = {
  id: number
  title: string
  user: {
    nickname: string
  }
  promotions: number
}

export function TrendingPrompts() {
  const [trendingPrompts, setTrendingPrompts] = useState<TrendingPrompt[]>([])

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchTrendingPrompts = async () => {
      const response = await fetch("/api/prompts/trending")
      const data = await response.json()
      setTrendingPrompts(data)
    }

    fetchTrendingPrompts()
  }, [])

  return (
    <div className="space-y-4">
      {trendingPrompts.map((prompt) => (
        <Card key={prompt.id}>
          <CardHeader>
            <CardTitle className="text-base">
              <Link href={`/prompts/${prompt.id}`} className="hover:underline">
                {prompt.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">by {prompt.user.nickname}</span>
              <Badge variant="secondary">{prompt.promotions} promotions</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

