import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from '@/features/users/components/users-columns'
import { UsersDialogs } from '@/features/users/components/users-dialogs'
import { UsersPrimaryButtons } from '@/features/users/components/users-primary-buttons'
import { UsersTable } from '@/features/users/components/users-table'
import UsersProvider from '@/features/users/context/users-context'
import { userListSchema } from '@/features/users/data/schema'
import { users } from '@/features/users/data/users'
import Cookies from 'js-cookie'
import { sidebarData } from '@/components/layout/data/sidebar-data'

export default function Users() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  const userList = userListSchema.parse(users)
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar data={sidebarData} />
        <UsersProvider>
          <div className="ml-auto w-full max-w-full flex h-svh flex-col">
            <Header fixed>
              <Search />
              <div className='ml-auto flex items-center space-x-4'>
                <ThemeSwitch />
                <ProfileDropdown />
              </div>
            </Header>
            <Main>
              <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                <div>
                  <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
                  <p className='text-muted-foreground'>
                    Manage your users and their roles here.
                  </p>
                </div>
                <UsersPrimaryButtons />
              </div>
              <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                <UsersTable data={userList} columns={columns} />
              </div>
            </Main>
            <UsersDialogs />
          </div>
        </UsersProvider>
      </SidebarProvider>
    </SearchProvider>
  )
}

const topNav = [
  {
    title: 'All Users',
    href: 'users/all',
    isActive: true,
    disabled: false,
  },
  {
    title: 'My Team',
    href: 'users/team',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Contacts',
    href: 'users/contacts',
    isActive: false,
    disabled: false,
  },
] 