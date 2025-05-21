import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import Cookies from 'js-cookie'
import { adminSidebarData } from '@/components/layout/data/sidebar-data'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

const demoUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', regDate: '2024-05-01', investments: 3, suspended: false },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', regDate: '2024-04-15', investments: 1, suspended: false },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', regDate: '2024-03-20', investments: 2, suspended: true },
]

function UserEdit() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  const search = useSearch({ from: '/admin/user-edit' })
  const userId = parseInt(search.id)
  const user = demoUsers.find(u => u.id === userId)
  const [form, setForm] = useState(user || { name: '', email: '', regDate: '', investments: 0, suspended: false })
  const [success, setSuccess] = useState(false)
  if (!user) return <div>User not found</div>

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
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
          <h2 className="text-2xl font-bold mb-6 text-center">Edit User Profile</h2>
          <div className="flex items-center justify-center min-h-[60vh]">
            <form onSubmit={handleSubmit} className="max-w-lg w-full border rounded p-6 bg-white space-y-4">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Registration Date</label>
                <input name="regDate" type="date" value={form.regDate} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
              </div>
              <div>
                <label className="block font-semibold mb-1"># Investments</label>
                <input name="investments" type="number" value={form.investments} onChange={handleChange} className="border rounded px-3 py-2 w-full" min={0} required />
              </div>
              <div className="flex items-center gap-2">
                <input name="suspended" type="checkbox" checked={form.suspended} onChange={handleChange} />
                <label className="font-semibold">Suspended</label>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
              {success && <div className="text-green-600 mt-2">Profile updated (demo only)</div>}
            </form>
          </div>
        </Main>
      </div>
    </SidebarProvider>
  )
}

export const Route = createFileRoute('/admin/user-edit')({
  component: UserEdit,
  validateSearch: (search) => ({
    id: String(search.id ?? ''),
  }),
}) 