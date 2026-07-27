'use client'

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "@/components/layout/theme-provider"

export function Navigation() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/85 backdrop-blur-md">
      <nav className="section-shell flex h-16 items-center justify-end" aria-label="Navigation principale">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
            aria-label={resolvedTheme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
          >
            <SunIcon className="h-4 w-4 dark:hidden" aria-hidden="true" />
            <MoonIcon className="hidden h-4 w-4 dark:block" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  )
}
