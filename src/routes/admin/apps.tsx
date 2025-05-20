import { createFileRoute } from '@tanstack/react-router';
import Apps from '@/admin/apps';

export const Route = createFileRoute('/admin/apps')({
  component: Apps,
}); 