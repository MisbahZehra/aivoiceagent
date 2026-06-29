import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Reset your password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                placeholder="you@example.com"
              />
            </div>
            <Button className="w-full">Send reset link</Button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-600">
            Back to{' '}
            <Link href="/login" className="font-medium text-slate-900">
              login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
