import { Suspense } from "react"
import { SearchForm } from "@/components/search-form"
import { SearchResults } from "@/components/search-results"

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Prompts</h1>
      <Suspense fallback={<div>Loading search form...</div>}>
        <SearchForm />
      </Suspense>
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  )
}

