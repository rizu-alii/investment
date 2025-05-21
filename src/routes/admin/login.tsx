import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '@/features/auth/auth-layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { UserAuthForm } from '@/features/auth/sign-in/components/user-auth-form'

function AdminLogin() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>Admin Login</CardTitle>
          <CardDescription>
            Enter your admin email and password below to <br />
            log into the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export const Route = createFileRoute('/admin/login')({
  component: AdminLogin,
}) 