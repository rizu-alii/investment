import { createFileRoute } from '@tanstack/react-router';
import Settings from '@/user/settings';

export const Route = createFileRoute('/user/settings')({
  component: Settings,
}); 