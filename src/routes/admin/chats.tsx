import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ThemeSwitch } from '@/components/theme-switch';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { adminSidebarData } from '@/components/layout/data/sidebar-data';

export const Route = createFileRoute('/admin/chats')({
  component: AdminChatsAsInvestments,
});

function AdminChatsAsInvestments() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false';
  const [investments, setInvestments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const response = await fetch('http://localhost:8080/api/admin/user-investment-summary', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 401) {
          window.location.href = '/admin/login';
          return;
        }
        if (!response.ok) {
          setError('Failed to fetch user investment summary.');
          toast.error('Failed to fetch user investment summary.');
          setLoading(false);
          return;
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setInvestments(data);
          setSuccess('User investment summary fetched successfully.');
          toast.success('User investment summary fetched successfully.');
        } else {
          setError('Unexpected response format.');
          toast.error('Unexpected response format.');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        toast.error('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchInvestments();
  }, []);

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar data={adminSidebarData} />
      <div className="ml-auto w-full max-w-full flex h-svh flex-col">
        <Header fixed>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <h2 className="text-2xl font-bold mb-6">New Investments</h2>
          {loading && <div className="p-4">Loading...</div>}
          {error && <div className="p-4 text-red-600">{error}</div>}
          {success && <div className="p-4 text-green-600">{success}</div>}
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-3 py-2 text-left font-semibold">User</th>
                  <th className="px-3 py-2 text-left font-semibold">Fund</th>
                  <th className="px-3 py-2 text-left font-semibold">Amount</th>
                  <th className="px-3 py-2 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv: any) => (
                  <tr key={inv.userId + '-' + inv.fundName + '-' + inv.investedAt} className="border-t">
                    <td className="px-3 py-2">{inv.fullName || `User #${inv.userId}`}</td>
                    <td className="px-3 py-2">{inv.fundName}</td>
                    <td className="px-3 py-2">${inv.amountInvested?.toLocaleString?.() ?? inv.amountInvested}</td>
                    <td className="px-3 py-2">{inv.investedAt ? new Date(inv.investedAt).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Main>
      </div>
    </SidebarProvider>
  );
}

export default AdminChatsAsInvestments; 