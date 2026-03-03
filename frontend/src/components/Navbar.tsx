'use client'

import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/authContext'
import { ModeToggle } from './ModeToggle'

export default function Navbar() {
  // remove @ts-ignore later by typing your context properly
  // @ts-ignore
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <nav className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          MyApp
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground">
                {user?.name}
              </span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}