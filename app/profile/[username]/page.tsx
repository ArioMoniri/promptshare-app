import { Metadata } from "next"
import { UserProfile } from "@/components/user-profile"

export const metadata: Metadata = {
  title: "User Profile - PromptShare",
  description: "View user profile and prompts",
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <UserProfile username={params.username} />
    </div>
  )
}

