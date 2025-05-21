import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import Cookies from 'js-cookie'
import { adminSidebarData } from '@/components/layout/data/sidebar-data'
import { useState } from 'react'

const demoWithdrawals = [
  { id: 1, user: 'John Doe', amount: 5000, date: '2024-05-20', status: 'Pending' },
  { id: 2, user: 'Jane Smith', amount: 12000, date: '2024-05-19', status: 'Pending' },
  { id: 3, user: 'Alice Johnson', amount: 3000, date: '2024-05-18', status: 'Pending' },
]

export default function AdminWithdrawals() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  const [withdrawals, setWithdrawals] = useState(demoWithdrawals)

  const handleAction = (id: number, action: 'Accepted' | 'Rejected') => {
    setWithdrawals(withdrawals.map(w => w.id === id ? { ...w, status: action } : w))
  }

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
          <h2 className="text-2xl font-bold mb-6">Withdrawal Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-3 py-2 text-left font-semibold">User</th>
                  <th className="px-3 py-2 text-left font-semibold">Amount</th>
                  <th className="px-3 py-2 text-left font-semibold">Date</th>
                  <th className="px-3 py-2 text-left font-semibold">Status</th>
                  <th className="px-3 py-2 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map(w => (
                  <tr key={w.id} className="border-t">
                    <td className="px-3 py-2">{w.user}</td>
                    <td className="px-3 py-2">${w.amount.toLocaleString()}</td>
                    <td className="px-3 py-2">{w.date}</td>
                    <td className="px-3 py-2">
                      <span className={
                        w.status === 'Pending' ? 'text-yellow-600' :
                        w.status === 'Accepted' ? 'text-green-600' :
                        'text-red-600'
                      }>{w.status}</span>
                    </td>
                    <td className="px-3 py-2 space-x-2">
                      {w.status === 'Pending' && (
                        <>
                          <button className="px-2 py-1 bg-green-100 text-green-700 rounded" onClick={() => handleAction(w.id, 'Accepted')}>Accept</button>
                          <button className="px-2 py-1 bg-red-100 text-red-700 rounded" onClick={() => handleAction(w.id, 'Rejected')}>Reject</button>
                        </>
                      )}
                    </td>
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