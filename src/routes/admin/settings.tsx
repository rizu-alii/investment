import { createFileRoute } from '@tanstack/react-router';
import Settings from '@/admin/settings';

export const Route = createFileRoute('/admin/settings')({
  component: Settings,
}); 