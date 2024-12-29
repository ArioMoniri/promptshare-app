import { Metadata } from "next"
import { PromptDetail } from "@/components/prompt-detail"

export const metadata: Metadata = {
  title: "Prompt Details",
  description: "View and interact with a specific prompt",
}

export default function PromptPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <PromptDetail promptId={parseInt(params.id)} />
    </div>
  )
}

