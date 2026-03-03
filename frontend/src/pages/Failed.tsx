'use client'

import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

export default function Failed() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center bg-background shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">
            Verification Failed
          </CardTitle>
          <CardDescription>
            The link is invalid or has expired.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            className="w-full"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/')}
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}