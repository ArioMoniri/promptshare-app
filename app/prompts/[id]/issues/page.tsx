import { Metadata } from "next"
import { IssueList } from "@/components/issue-list"
import { IssueForm } from "@/components/issue-form"

export const metadata: Metadata = {
  title: "Prompt Issues",
  description: "View and report issues for this prompt",
}

export default function IssuesPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Prompt Issues</h1>
      <IssueForm promptId={params.id} />
      <div className="mt-8">
        <IssueList promptId={params.id} />
      </div>
    </div>
  )
}

