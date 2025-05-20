import { createFileRoute } from '@tanstack/react-router';
import Chats from '@/user/chats';

export const Route = createFileRoute('/user/chats')({
  component: Chats,
}); 