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
import { adminSidebarData } from '@/components/layout/data/sidebar-data'
import { IconUsers, IconChecklist, IconPackages, IconLayoutDashboard, IconBrowserCheck } from '@tabler/icons-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Link } from '@tanstack/react-router'

const demoStats = [
  { title: 'Total Registered Users', value: '5,200', description: 'All users in the system', icon: IconUsers },
  { title: 'Active Investments', value: '1,200', description: 'Currently active', icon: IconChecklist },
  { title: 'Completed Investments', value: '980', description: 'Completed by users', icon: IconChecklist },
  { title: 'Total Deposits', value: '$2,500,000', description: 'All-time deposits', icon: IconPackages },
  { title: 'Total Withdrawals', value: '$1,200,000', description: 'All-time withdrawals', icon: IconPackages },
  { title: 'Average Overall Return', value: '8.2%', description: 'Across all investments', icon: IconLayoutDashboard },
  { title: 'Web Traffic', value: '32,000', description: 'Visits this month', icon: IconBrowserCheck },
  { title: 'Visits by Date', value: '1,200 (today)', description: 'Today\'s visits', icon: IconBrowserCheck },
];

const graphData = [
  { date: 'Mon', webTraffic: 4000, visits: 800 },
  { date: 'Tue', webTraffic: 4200, visits: 900 },
  { date: 'Wed', webTraffic: 3900, visits: 850 },
  { date: 'Thu', webTraffic: 4500, visits: 1100 },
  { date: 'Fri', webTraffic: 4700, visits: 1200 },
  { date: 'Sat', webTraffic: 4300, visits: 950 },
  { date: 'Sun', webTraffic: 4800, visits: 1300 },
];

export default function Dashboard() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar data={adminSidebarData} />
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
              <h1 className='text-2xl font-bold tracking-tight'>Admin Dashboard</h1>
            </div>
            {/* Quick Links Section */}
            <div className='mb-6'>
              <h2 className='text-lg font-semibold mb-3'>Quick Links</h2>
              <div className='flex flex-wrap gap-3'>
                <Link to='/admin/investments'><Button variant='outline'>New Investments</Button></Link>
                <Link to='/admin/tasks'><Button variant='outline'>Pending Withdrawal Approvals</Button></Link>
                <Link to='/admin/users/latest'><Button variant='outline'>Latest User Registrations</Button></Link>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {demoStats.map((stat, idx) => (
                  <Card key={idx}>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
                      {stat.icon && <stat.icon className='text-muted-foreground h-4 w-4' />}
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>{stat.value}</div>
                      <p className='text-muted-foreground text-xs'>{stat.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <Card>
                  <CardHeader>
                    <CardTitle>System Overview Graph</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <div className='h-64 w-full'>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={graphData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="webTraffic" stroke="#8884d8" name="Web Traffic" />
                          <Line type="monotone" dataKey="visits" stroke="#82ca9d" name="Visits by Date" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
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
