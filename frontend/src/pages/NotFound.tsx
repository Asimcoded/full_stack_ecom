import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md rounded-2xl bg-background shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
          <div className="text-6xl font-bold text-primary">404</div>

          <div>
            <h1 className="text-2xl font-semibold">Page Not Found</h1>
            <p className="mt-2 text-muted-foreground">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>

          <Button
            onClick={() => navigate('/')}
            className="rounded-sm px-6"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}