import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { useState } from 'react'
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { apps } from '@/features/apps/data/apps'
import Cookies from 'js-cookie'
import { adminSidebarData } from '@/components/layout/data/sidebar-data'
import { Card, CardContent } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const appText = new Map<string, string>([
  ['all', 'All Apps'],
  ['connected', 'Connected'],
  ['notConnected', 'Not Connected'],
])

const visitorsData = [
  { date: '2024-05-15', unique: 120, returning: 40 },
  { date: '2024-05-16', unique: 150, returning: 60 },
  { date: '2024-05-17', unique: 180, returning: 80 },
  { date: '2024-05-18', unique: 200, returning: 90 },
  { date: '2024-05-19', unique: 170, returning: 70 },
  { date: '2024-05-20', unique: 210, returning: 100 },
]

const devicesData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 100 },
]
const deviceColors = ['#8884d8', '#82ca9d', '#ffc658']

const countriesData = [
  { country: 'USA', visitors: 220 },
  { country: 'India', visitors: 180 },
  { country: 'UK', visitors: 90 },
  { country: 'Germany', visitors: 60 },
  { country: 'Canada', visitors: 50 },
]

const latestLogins = [
  { user: 'John Doe', country: 'USA', device: 'Desktop', time: '2024-05-20 10:15' },
  { user: 'Jane Smith', country: 'India', device: 'Mobile', time: '2024-05-20 09:50' },
  { user: 'Alice Johnson', country: 'UK', device: 'Tablet', time: '2024-05-20 09:30' },
  { user: 'Bob Lee', country: 'Germany', device: 'Desktop', time: '2024-05-20 08:45' },
  { user: 'Maria Garcia', country: 'Canada', device: 'Mobile', time: '2024-05-20 08:20' },
]

export default function AdminAppsAnalytics() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  const [sort, setSort] = useState('ascending')
  const [appType, setAppType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredApps = apps
    .sort((a, b) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((app) =>
      appType === 'connected'
        ? app.connected
        : appType === 'notConnected'
          ? !app.connected
          : true
    )
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar data={adminSidebarData} />
        <div className="ml-auto w-full max-w-full flex h-svh flex-col">
          {/* ===== Top Heading ===== */}
          <Header fixed>
            <div className='ml-auto flex items-center space-x-4'>
              <ThemeSwitch />
              <ProfileDropdown />
            </div>
          </Header>

          {/* ===== Content ===== */}
          <Main>
            <h2 className="text-2xl font-bold mb-6">Web Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Unique Visitors & Visit Frequency</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={visitorsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="unique" stroke="#8884d8" name="Unique Visitors" />
                      <Line type="monotone" dataKey="returning" stroke="#82ca9d" name="Returning Visitors" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Devices</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={devicesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {devicesData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={deviceColors[idx % deviceColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Countries of Origin</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={countriesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="visitors" fill="#8884d8" name="Visitors" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Latest Logins</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm">
                      <thead>
                        <tr className="bg-muted">
                          <th className="px-3 py-2 text-left font-semibold">User</th>
                          <th className="px-3 py-2 text-left font-semibold">Country</th>
                          <th className="px-3 py-2 text-left font-semibold">Device</th>
                          <th className="px-3 py-2 text-left font-semibold">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {latestLogins.map((login, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="px-3 py-2">{login.user}</td>
                            <td className="px-3 py-2">{login.country}</td>
                            <td className="px-3 py-2">{login.device}</td>
                            <td className="px-3 py-2">{login.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
                  </div>
          </Main>
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
} 