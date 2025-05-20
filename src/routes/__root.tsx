import { QueryClient } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
