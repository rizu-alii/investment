import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

export default function Dashboard() {
  const navigate = useNavigate();
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate({ to: '/sign-in' });
    }
    // In the future: validate token or call dashboard API with token
  }, [navigate]);

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <div className="ml-auto w-full max-w-full peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)] peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))] sm:transition-[width] sm:duration-200 sm:ease-linear flex h-svh flex-col group-data-[scroll-locked=1]/body:h-full has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh">
          {/* ===== Top Heading ===== */}
          <Header>
            <div className='flex items-center w-full'>
              {/* Sidebar icon is handled by AppSidebar, so nothing needed here */}
              <div className='ml-auto flex items-center space-x-4'>
                <ThemeSwitch />
              </div>
            </div>
          </Header>

          {/* ===== Main ===== */}
          <Main>
            <div className='mb-2 flex items-center justify-between space-y-2'>
              <h1 className='text-2xl font-bold tracking-tight'>User Dashboard</h1>
            </div>
            <div className='space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Investment</CardTitle>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='text-muted-foreground h-4 w-4'><path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' /></svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>$120,000</div>
                    <p className='text-muted-foreground text-xs'>Total amount invested</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Withdraw</CardTitle>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='text-muted-foreground h-4 w-4'><path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' /><circle cx='9' cy='7' r='4' /><path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' /></svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>$30,000</div>
                    <p className='text-muted-foreground text-xs'>Total amount withdrawn</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Current Profit</CardTitle>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='text-muted-foreground h-4 w-4'><rect width='20' height='14' x='2' y='5' rx='2' /><path d='M2 10h20' /></svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>$15,000</div>
                    <p className='text-muted-foreground text-xs'>Current profit from investments</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Active Investments</CardTitle>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='text-muted-foreground h-4 w-4'><path d='M22 12h-4l-3 9L9 3l-3 9H2' /></svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>8</div>
                    <p className='text-muted-foreground text-xs'>Number of active investments</p>
                  </CardContent>
                </Card>
              </div>
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                <Card className='col-span-1 lg:col-span-7'>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <Overview />
                  </CardContent>
                </Card>
              </div>
            </div>
          </Main>
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
