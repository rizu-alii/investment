import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import Cookies from 'js-cookie'
import { adminSidebarData } from '@/components/layout/data/sidebar-data'
import { createFileRoute, useSearch } from '@tanstack/react-router'

const demoUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', regDate: '2024-05-01', investments: 3, suspended: false },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', regDate: '2024-04-15', investments: 1, suspended: false },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', regDate: '2024-03-20', investments: 2, suspended: true },
]

function UserProfile() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  const search = useSearch({ from: '/admin/user-profile' })
  const userId = parseInt(search.id)
  const user = demoUsers.find(u => u.id === userId)
  if (!user) return <div>User not found</div>
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
          <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="max-w-lg w-full border rounded p-6 bg-white">
              <div className="mb-2"><span className="font-semibold">Name:</span> {user.name}</div>
              <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
              <div className="mb-2"><span className="font-semibold">Registration Date:</span> {user.regDate}</div>
              <div className="mb-2"><span className="font-semibold">Number of Investments:</span> {user.investments}</div>
              <div className="mb-2"><span className="font-semibold">Status:</span> {user.suspended ? 'Suspended' : 'Active'}</div>
            </div>
          </div>
        </Main>
      </div>
    </SidebarProvider>
  )
}

export const Route = createFileRoute('/admin/user-profile')({
  component: UserProfile,
  validateSearch: (search) => ({
    id: String(search.id ?? ''),
  }),
}) 