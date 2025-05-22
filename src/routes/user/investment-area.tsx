import { createFileRoute } from '@tanstack/react-router';
import InvestmentArea from '@/user/users';

export const Route = createFileRoute('/user/investment-area')({
  component: InvestmentArea,
}); 