"use client"

import { useRouter } from 'next/navigation'
import { MessageSquare, Plus } from 'lucide-react'
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/contexts/AuthContext"

export function Header() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => handleNavigation('/')} className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6" />
            <span className="text-lg font-bold">PromptShare</span>
          </Button>
        </div>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => handleNavigation('/trending')}>
            Trending
          </Button>
          <Button variant="ghost" onClick={() => handleNavigation('/search')}>
            Search
          </Button>
          <ModeToggle />
          {!isLoading && (
            user ? (
              <>
                <Button onClick={() => handleNavigation('/prompts/create')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Prompt
                </Button>
                <UserNav />
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => handleNavigation('/login')}>
                  Login
                </Button>
                <Button onClick={() => handleNavigation('/signup')}>
                  Sign Up
                </Button>
              </>
            )
          )}
        </nav>
      </div>
    </header>
  )
}

