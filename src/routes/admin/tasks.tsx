import { createFileRoute } from '@tanstack/react-router';
import Tasks from '@/admin/tasks';

export const Route = createFileRoute('/admin/tasks')({
  component: Tasks,
}); 