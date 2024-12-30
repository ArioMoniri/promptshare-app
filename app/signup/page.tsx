import { Metadata } from "next"
import { SignUpForm } from "@/components/signup-form"

export const metadata: Metadata = {
  title: "Sign Up - PromptShare",
  description: "Create a new PromptShare account",
}

export default function SignUpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <SignUpForm />
    </div>
  )
}

