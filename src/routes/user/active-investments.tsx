import { createFileRoute } from '@tanstack/react-router';
import ActiveInvestments from '@/user/tasks';

export const Route = createFileRoute('/user/active-investments')({
  component: ActiveInvestments,
}); 