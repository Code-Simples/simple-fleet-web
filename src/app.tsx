import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query'
import { router } from '@/routes'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="sistema" storageKey="simple-fleet-theme">
        <Helmet titleTemplate="%s | Simple Fleet" />

        <RouterProvider router={router} />

        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  )
}
