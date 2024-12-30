import { Metadata } from "next"
import { TrendingPrompts } from "@/components/trending-prompts"

export const metadata: Metadata = {
  title: "Trending Prompts - PromptShare",
  description: "Discover the most popular AI prompts on PromptShare",
}

export default function TrendingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trending Prompts</h1>
      <TrendingPrompts />
    </div>
  )
}

