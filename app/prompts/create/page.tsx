import { Metadata } from "next"
import { CreatePromptForm } from "@/components/create-prompt-form"

export const metadata: Metadata = {
  title: "Create New Prompt - PromptShare",
  description: "Create and share a new AI prompt",
}

export default function CreatePromptPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Prompt</h1>
      <CreatePromptForm />
    </div>
  )
}

