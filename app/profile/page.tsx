import { Metadata } from "next"
import { ProfileForm } from "@/components/profile-form"

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile settings",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <ProfileForm />
    </div>
  )
}

