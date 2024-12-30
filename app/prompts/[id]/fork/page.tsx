import { Metadata } from "next"
import { ForkPromptForm } from "@/components/fork-prompt-form"

export const metadata: Metadata = {
  title: "Fork Prompt",
  description: "Create a new version of an existing prompt",
}

export default function ForkPromptPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fork Prompt</h1>
      <ForkPromptForm promptId={params.id} />
    </div>
  )
}

