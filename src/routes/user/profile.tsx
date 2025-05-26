import { createFileRoute } from '@tanstack/react-router';
import UserProfile from '@/user/profile';

export const Route = createFileRoute('/user/profile')({
  component: UserProfile,
}); 