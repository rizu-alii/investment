import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: '',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/user/dashboard',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Active Investments',
          url: '/user/tasks',
          icon: IconChecklist,
        },
        {
          title: 'Investment Area',
          url: '/user/users',
          icon: IconUsers,
        },
      ],
    },
  ],
}

export const adminSidebarData: SidebarData = {
  user: {
    name: 'admin',
    email: '',
    avatar: '/avatars/admin.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/admin/dashboard',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Withdraw Requests',
          url: '/admin/tasks',
          icon: IconChecklist,
        },
        {
          title: 'Web Analytics',
          url: '/admin/apps',
          icon: IconPackages,
        },
        {
          title: 'New Investments',
          url: '/admin/chats',
          badge: '3',
          icon: IconMessages,
        },
        {
          title: 'Total Users',
          url: '/admin/total-users',
          icon: IconUserCog,
        },
        {
          title: 'New Investment',
          url: '/admin/users',
          icon: IconPackages,
        },
      ],
    },
  ],
}
