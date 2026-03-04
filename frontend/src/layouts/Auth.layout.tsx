import { useNavigate, Outlet } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function AuthLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen  bg-background my-3 ">
      <div className="flex justify-start w-full my-1 ">
        <Button
          variant={'ghost'}
          onClick={() => {
            navigate('/');
          }}
        >
          <ArrowLeft /> Back to home{' '}
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
