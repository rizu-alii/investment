import { createFileRoute } from '@tanstack/react-router';
import Dashboard from '@/admin/dashboard';

export const Route = createFileRoute('/admin/dashboard')({
  component: Dashboard,
}); 