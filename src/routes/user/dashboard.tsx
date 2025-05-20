import { createFileRoute } from '@tanstack/react-router';
import Dashboard from '@/user/dashboard';

export const Route = createFileRoute('/user/dashboard')({
  component: Dashboard,
}); 