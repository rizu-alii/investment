import { createFileRoute } from '@tanstack/react-router';
import Apps from '@/user/apps';

export const Route = createFileRoute('/user/apps')({
  component: Apps,
}); 