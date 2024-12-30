import { Metadata } from "next"
import { PromptFeed } from "@/components/prompt-feed"
import { TrendingPrompts } from "@/components/trending-prompts"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "PromptShare - Home",
  description: "Discover and share AI prompts",
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Welcome to PromptShare</h1>
        <Button asChild>
          <Link href="/prompts/create">Create Prompt</Link>
        </Button>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Latest Prompts</h2>
          <PromptFeed />
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Trending Prompts</h2>
          <TrendingPrompts />
        </section>
      </div>
    </div>
  )
}

