import { Metadata } from "next"
import { UserDashboard } from "@/components/UserDashboard"

export const metadata: Metadata = {
  title: "User Dashboard - PromptShare",
  description: "Manage your prompts, view activity, and explore trending content",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      <UserDashboard />
    </div>
  )
}

