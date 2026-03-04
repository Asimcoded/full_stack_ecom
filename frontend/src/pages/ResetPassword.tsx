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

import { requestPasswordResetAPI } from '@/apis/auth.api';
import { Link } from 'react-router';
import { toast } from 'sonner';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type EmailForm = z.infer<typeof emailSchema>;

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  //@ts-ignore
  const form = useForm<EmailForm>({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: emailSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        await requestPasswordResetAPI(value.email);
        setSuccess(true);
        toast.success("Email send successfully")
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Something went wrong')
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md bg-background  shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Enter your email to receive a reset link</CardDescription>
        </CardHeader>

        <CardContent>
          {success ? (
            <div className="text-center font-medium">
              Reset link sent! Please check your email.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
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
                        //@ts-ignore
                        <p className="text-sm text-red-500">{field.state.meta.errors[0].message}</p>
                      )}
                  </div>
                )}
              </form.Field>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link to="/auth/login" className="text-accent-foreground">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
