import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import Cookies from 'js-cookie'
import { adminSidebarData } from '@/components/layout/data/sidebar-data'
import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'

const demoPackages = [
  {
    id: 1,
    name: 'Prudential FMCG Fund - Growth',
    category: 'Equity | Consumption',
    fundSize: '1,189.60cr',
    projectedReturn: '+3.29%',
    risk: 'High',
    description: 'A leading FMCG fund with a strong track record.'
  },
  {
    id: 2,
    name: 'Index Sensex Direct Plan-Growth',
    category: 'Equity | Consumption',
    fundSize: '2,555.96cr',
    projectedReturn: '+23.37%',
    risk: 'High',
    description: 'Direct exposure to Sensex index growth.'
  },
]

export default function Users() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  const [packages, setPackages] = useState(demoPackages)
  const [form, setForm] = useState({
    name: '',
    category: '',
    fundSize: '',
    projectedReturn: '',
    risk: '',
    description: '',
  })
  const [errors, setErrors] = useState({
    fundSize: '',
    projectedReturn: '',
    risk: '',
  })
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const editFormRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    let valid = true
    const newErrors: typeof errors = { fundSize: '', projectedReturn: '', risk: '' }
    // Fund size must be a number
    if (!/^\d+(\.\d+)?(cr)?$/.test(form.fundSize.trim())) {
      newErrors.fundSize = 'Fund size must be a number (optionally ending with cr)'
      valid = false
    }
    // Projected return must be a percentage
    if (!/^\+?\d+(\.\d+)?%$/.test(form.projectedReturn.trim())) {
      newErrors.projectedReturn = 'Projected return must be a percentage (e.g. +5.5%)'
      valid = false
    }
    // Risk must be High or Low
    if (form.risk !== 'High' && form.risk !== 'Low') {
      newErrors.risk = 'Risk level must be High or Low'
      valid = false
    }
    setErrors(newErrors)
    return valid
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setPackages([
      ...packages,
      { ...form, id: Date.now() },
    ])
    setForm({ name: '', category: '', fundSize: '', projectedReturn: '', risk: '', description: '' })
  }

  const handleEditClick = (idx: number) => {
    setEditIndex(idx)
    setForm({ ...packages[idx] })
    setEditDialogOpen(true)
  }

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (editIndex !== null) {
      const updated = [...packages]
      updated[editIndex] = { ...form, id: updated[editIndex].id }
      setPackages(updated)
      setEditDialogOpen(false)
      setEditIndex(null)
    }
  }

  const handleDelete = (idx: number) => {
    setPackages(packages.filter((_, i) => i !== idx))
  }

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar data={adminSidebarData} />
        <div className="ml-auto w-full max-w-full flex h-svh flex-col">
          <Header fixed>
            <Search />
            <div className='ml-auto flex items-center space-x-4'>
              <ThemeSwitch />
              <ProfileDropdown />
            </div>
          </Header>
          <Main>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Create New Investment Package</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleCreate}>
                  <Input name="name" value={form.name} onChange={handleChange} placeholder="Package Name" required />
                  <Input name="category" value={form.category} onChange={handleChange} placeholder="Category/Type" required />
                  <div>
                    <Input name="fundSize" value={form.fundSize} onChange={handleChange} placeholder="Fund Size (e.g. 100000 or 1.5cr)" required />
                    {errors.fundSize && <div className="text-red-600 text-xs mt-1">{errors.fundSize}</div>}
                  </div>
                  <div>
                    <Input name="projectedReturn" value={form.projectedReturn} onChange={handleChange} placeholder="Projected Return (e.g. +5.5%)" required />
                    {errors.projectedReturn && <div className="text-red-600 text-xs mt-1">{errors.projectedReturn}</div>}
                  </div>
                  <div>
                    <select name="risk" value={form.risk} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                      <option value="">Select Risk Level</option>
                      <option value="High">High</option>
                      <option value="Low">Low</option>
                    </select>
                    {errors.risk && <div className="text-red-600 text-xs mt-1">{errors.risk}</div>}
                  </div>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="col-span-1 md:col-span-2 border rounded px-3 py-2 min-h-[40px]" required />
                  <div className="col-span-1 md:col-span-2 flex justify-end">
                    <Button type="submit">Create Package</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Existing Investment Packages</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-3 py-2 text-left font-semibold">Name</th>
                        <th className="px-3 py-2 text-left font-semibold">Category</th>
                        <th className="px-3 py-2 text-left font-semibold">Fund Size</th>
                        <th className="px-3 py-2 text-left font-semibold">Projected Return</th>
                        <th className="px-3 py-2 text-left font-semibold">Risk</th>
                        <th className="px-3 py-2 text-left font-semibold">Description</th>
                        <th className="px-3 py-2 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map((pkg, idx) => (
                        <tr key={pkg.id} className="border-t">
                          <td className="px-3 py-2">{pkg.name}</td>
                          <td className="px-3 py-2">{pkg.category}</td>
                          <td className="px-3 py-2">{pkg.fundSize}</td>
                          <td className="px-3 py-2">{pkg.projectedReturn}</td>
                          <td className="px-3 py-2">{pkg.risk}</td>
                          <td className="px-3 py-2">{pkg.description}</td>
                          <td className="px-3 py-2 space-x-2">
                            <button className="text-blue-600 px-2 py-1 rounded hover:bg-blue-100" onClick={() => handleEditClick(idx)}>Edit</button>
                            <button className="text-red-600 px-2 py-1 rounded hover:bg-red-100" onClick={() => handleDelete(idx)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  {editDialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                      <form ref={editFormRef} onSubmit={handleEditSave} className="bg-white p-6 rounded shadow-lg w-full max-w-lg space-y-4">
                        <h3 className="text-lg font-semibold mb-2">Edit Investment Package</h3>
                        <Input name="name" value={form.name} onChange={handleChange} placeholder="Package Name" required />
                        <Input name="category" value={form.category} onChange={handleChange} placeholder="Category/Type" required />
                        <div>
                          <Input name="fundSize" value={form.fundSize} onChange={handleChange} placeholder="Fund Size (e.g. 100000 or 1.5cr)" required />
                          {errors.fundSize && <div className="text-red-600 text-xs mt-1">{errors.fundSize}</div>}
                        </div>
                        <div>
                          <Input name="projectedReturn" value={form.projectedReturn} onChange={handleChange} placeholder="Projected Return (e.g. +5.5%)" required />
                          {errors.projectedReturn && <div className="text-red-600 text-xs mt-1">{errors.projectedReturn}</div>}
                        </div>
                        <div>
                          <select name="risk" value={form.risk} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                            <option value="">Select Risk Level</option>
                            <option value="High">High</option>
                            <option value="Low">Low</option>
                          </select>
                          {errors.risk && <div className="text-red-600 text-xs mt-1">{errors.risk}</div>}
                        </div>
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded px-3 py-2 min-h-[40px]" required />
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                          <Button type="submit">Save</Button>
                        </div>
                      </form>
                    </div>
                  )}
                </Dialog>
              </CardContent>
            </Card>
          </Main>
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'users/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'All Users',
    href: 'users/all',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Roles & Permissions',
    href: 'users/roles',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Teams',
    href: 'users/teams',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Activity Log',
    href: 'users/activity',
    isActive: false,
    disabled: false,
  },
] 