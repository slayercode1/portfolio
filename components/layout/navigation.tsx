'use client'

import Link from 'next/link'
import { ArrowLeftIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from "@/components/layout/theme-provider"
import { cn } from '@/lib/utils'

interface NavigationProps {
  showBackLink?: boolean
}

export function Navigation({ showBackLink = false }: NavigationProps) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/85 backdrop-blur-md">
      <nav
        className={cn('section-shell flex h-16 items-center', showBackLink ? 'justify-between' : 'justify-end')}
        aria-label="Navigation principale"
      >
        {showBackLink ? (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeftIcon aria-hidden="true" />
            Retour
          </Link>
        ) : null}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
            aria-label="Changer de thème"
          >
            <SunIcon className="h-4 w-4 dark:hidden" aria-hidden="true" />
            <MoonIcon className="hidden h-4 w-4 dark:block" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  )
}
