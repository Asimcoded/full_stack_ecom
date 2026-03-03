'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuth } from '@/contexts/authContext';
import { Link } from 'react-router';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  // @ts-ignore
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const form = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        await login(value);
      } catch (err: any) {
        alert(err.response?.data?.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-xl bg-background">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* Email Field */}
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="you@example.com"
                  />
                  {(field.state.meta.isTouched || form.state.isSubmitted) &&
                    field.state.meta.errors?.[0] && (
                      // @ts-ignore
                      <p className="text-sm text-red-500">{field.state.meta.errors[0].message}</p>
                    )}
                </div>
              )}
            </form.Field>

            {/* Password Field */}
            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to={'/reset-password'}
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="******"
                  />
                  {(field.state.meta.isTouched || form.state.isSubmitted) &&
                    field.state.meta.errors?.[0] && (
                      //@ts-ignore
                      <p className="text-sm text-red-500">{field.state.meta.errors[0].message}</p>
                    )}
                </div>
              )}
            </form.Field>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Don’t have an account?{' '}
          <Link to={'/register'} className="text-accent-foreground">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
