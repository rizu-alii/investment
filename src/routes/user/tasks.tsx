import { createFileRoute } from '@tanstack/react-router';
import Tasks from '@/user/tasks';

export const Route = createFileRoute('/user/tasks')({
  component: Tasks,
}); 