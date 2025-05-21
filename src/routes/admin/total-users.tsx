import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import Cookies from 'js-cookie'
import { adminSidebarData } from '@/components/layout/data/sidebar-data'
import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

const demoUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', regDate: '2024-05-01', investments: 3, suspended: false },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', regDate: '2024-04-15', investments: 1, suspended: false },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', regDate: '2024-03-20', investments: 2, suspended: false },
]

function TotalUsers() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  const [users, setUsers] = useState(demoUsers)
  const [nameSearch, setNameSearch] = useState('')
  const [emailSearch, setEmailSearch] = useState('')
  const [filter, setFilter] = useState('')
  const navigate = useNavigate()

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
    u.email.toLowerCase().includes(emailSearch.toLowerCase()) &&
    (filter ? u.regDate === filter : true)
  )

  const handleSuspend = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, suspended: !u.suspended } : u))
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
          <h2 className="text-2xl font-bold mb-6">Total Registered Users</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name"
              value={nameSearch}
              onChange={e => setNameSearch(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Search by email"
              value={emailSearch}
              onChange={e => setEmailSearch(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-3 py-2 text-left font-semibold">Name</th>
                  <th className="px-3 py-2 text-left font-semibold">Email</th>
                  <th className="px-3 py-2 text-left font-semibold">Registration Date</th>
                  <th className="px-3 py-2 text-left font-semibold"># Investments</th>
                  <th className="px-3 py-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-t">
                    <td className="px-3 py-2">{user.name}</td>
                    <td className="px-3 py-2">{user.email}</td>
                    <td className="px-3 py-2">{user.regDate}</td>
                    <td className="px-3 py-2">{user.investments}</td>
                    <td className="px-3 py-2 space-x-2">
                      <button
                        className="text-blue-600 px-2 py-1 rounded transition-colors hover:bg-blue-100"
                        onClick={() => navigate({ to: `/admin/user-profile/${user.id}` })}
                      >
                        View Profile
                      </button>
                      <button
                        className="text-green-600 px-2 py-1 rounded transition-colors hover:bg-green-100"
                        onClick={() => navigate({ to: `/admin/user-history/${user.id}` })}
                      >
                        History
                      </button>
                      <button
                        className="text-yellow-600 px-2 py-1 rounded transition-colors hover:bg-yellow-100"
                        onClick={() => alert('Edit user info')}
                      >
                        Edit
                      </button>
                      <button
                        className={user.suspended ? 'text-gray-600 px-2 py-1 rounded transition-colors hover:bg-gray-200' : 'text-red-600 px-2 py-1 rounded transition-colors hover:bg-red-100'}
                        onClick={() => handleSuspend(user.id)}
                      >
                        {user.suspended ? 'Unsuspend' : 'Suspend'}
                      </button>
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

export const Route = createFileRoute('/admin/total-users')({
  component: TotalUsers,
}) 