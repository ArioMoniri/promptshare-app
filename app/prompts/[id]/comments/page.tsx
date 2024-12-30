import { Metadata } from "next"
import { CommentSection } from "@/components/comment-section"

export const metadata: Metadata = {
  title: "Prompt Comments",
  description: "View and add comments for this prompt",
}

export default function CommentsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Prompt Comments</h1>
      <CommentSection promptId={params.id} />
    </div>
  )
}

