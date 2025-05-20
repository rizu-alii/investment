import { createFileRoute } from '@tanstack/react-router';
import Users from '@/admin/users';

export const Route = createFileRoute('/admin/users')({
  component: Users,
}); 