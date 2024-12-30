"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PromptCard } from "@/components/prompt-card"
import { getUser } from '@/services/api'

type UserProfileProps = {
  username: string
}

export function UserProfile({ username }: UserProfileProps) {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUser(username)
        setProfile(data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    fetchProfile()
  }, [username])

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{profile.username}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: {profile.email}</p>
          <p>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User's Prompts</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.prompts.map((prompt: any) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

