'use client';

import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { resetPasswordAPI } from '@/apis/auth.api';
import { toast } from 'sonner';

const passwordSchema = z
  .object({
    password: z.string().min(6, 'Minimum 6 characters'),
    confirmPassword: z.string().min(6, 'Minimum 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

type LoaderData = {
  userId: string;
};

export default function NewPassword() {
  const { userId } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //@ts-ignore
  const form = useForm<PasswordForm>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: passwordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);

        await resetPasswordAPI({
          userId,
          password: value.password,
        });
        toast.success("New password is created")
        navigate('/auth/login');
      } catch (err: any) {
        alert(err.response?.data?.message || 'Reset failed');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md  bg-background shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
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
            {/* Password */}
            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <Label>New Password</Label>
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

            {/* Confirm Password */}
            <form.Field name="confirmPassword">
              {(field) => (
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
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
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
