import { createFileRoute } from '@tanstack/react-router';
import Chats from '@/admin/chats';

export const Route = createFileRoute('/admin/chats')({
  component: Chats,
}); 