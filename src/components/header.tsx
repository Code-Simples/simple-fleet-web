import { CarFront } from 'lucide-react'

import { AccountMenu } from '@/components/account-menu'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <CarFront className="h-8 w-8 text-muted-foreground" />
          <span className="flex flex-row font-leckerli-one text-xl tracking-wider text-primary">
            Simple<p className="text-muted-foreground">Fleet</p>
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
