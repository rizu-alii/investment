import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import Cookies from 'js-cookie'
import { adminSidebarData } from '@/components/layout/data/sidebar-data'
import { createFileRoute, useSearch } from '@tanstack/react-router'

const demoHistory: { [key: number]: { type: string; fund: string; amount: number; date: string }[] } = {
  1: [
    { type: 'Investment', fund: 'Prudential FMCG Fund', amount: 10000, date: '2024-05-10' },
    { type: 'Deposit', fund: '-', amount: 5000, date: '2024-05-12' },
    { type: 'Withdrawal', fund: '-', amount: 2000, date: '2024-05-15' },
  ],
  2: [
    { type: 'Investment', fund: 'Index Sensex Direct', amount: 5000, date: '2024-04-20' },
    { type: 'Deposit', fund: '-', amount: 2000, date: '2024-04-22' },
  ],
  3: [
    { type: 'Investment', fund: 'Growth Equity Fund', amount: 8000, date: '2024-03-25' },
    { type: 'Withdrawal', fund: '-', amount: 1000, date: '2024-03-28' },
  ],
}

function UserHistory() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  const search = useSearch({ from: '/admin/user-history' })
  const userId = parseInt(search.id)
  const history = demoHistory[userId] || []
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
          <h2 className="text-2xl font-bold mb-6">User History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-3 py-2 text-left font-semibold">Type</th>
                  <th className="px-3 py-2 text-left font-semibold">Fund</th>
                  <th className="px-3 py-2 text-left font-semibold">Amount</th>
                  <th className="px-3 py-2 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item: any, idx: number) => (
                  <tr key={idx} className="border-t">
                    <td className="px-3 py-2">{item.type}</td>
                    <td className="px-3 py-2">{item.fund}</td>
                    <td className="px-3 py-2">${item.amount.toLocaleString()}</td>
                    <td className="px-3 py-2">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Main>
      </div>
    </SidebarProvider>
  )
}

export const Route = createFileRoute('/admin/user-history')({
  component: UserHistory,
  validateSearch: (search) => ({
    id: String(search.id ?? ''),
  }),
}) 