import { createFileRoute } from '@tanstack/react-router';
import Users from '@/user/users';

export const Route = createFileRoute('/user/users')({
  component: Users,
}); 