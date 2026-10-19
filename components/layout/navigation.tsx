'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { ArrowLeftIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from "@/components/layout/theme-provider"
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'

const SECTION_LINKS = [
  { id: 'about', label: 'Profil' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
]

interface NavigationProps {
  showBackLink?: boolean
}

// Indique la section visible pour que le visiteur sache toujours où il se trouve.
function useActiveSection(enabled: boolean) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    for (const section of document.querySelectorAll('section[id]')) observer.observe(section)
    return () => observer.disconnect()
  }, [enabled])

  return activeId
}

function useHasScrolled() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const update = () => setHasScrolled(window.scrollY > 8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return hasScrolled
}

export function Navigation({ showBackLink = false }: NavigationProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const activeId = useActiveSection(!showBackLink)
  const hasScrolled = useHasScrolled()

  // Fondu entre les thèmes plutôt qu'un saut brutal de luminosité.
  function toggleTheme() {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || reduceMotion) {
      setTheme(nextTheme)
      return
    }

    document.startViewTransition(() => flushSync(() => setTheme(nextTheme)))
  }

  return (
    <header
      className={cn(
        'material fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-xl backdrop-saturate-150',
        'after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-6 after:bg-gradient-to-b after:from-background/60 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
        hasScrolled && 'after:opacity-100'
      )}
    >
      <nav className="section-shell flex h-16 items-center justify-between" aria-label="Navigation principale">
        {showBackLink ? (
          <Link
            href="/"
            className="pressable inline-flex h-10 items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon aria-hidden="true" />
            Retour
          </Link>
        ) : (
          <a href="#home" className="pressable inline-flex h-10 items-center" aria-label="Yann Clain, retour en haut de page">
            <Logo />
          </a>
        )}

        <div className="flex items-center gap-1">
          {showBackLink ? null : (
            <ul className="mr-2 hidden items-center gap-1 sm:flex">
              {SECTION_LINKS.map((link) => {
                const isActive = activeId === link.id

                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'pressable inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium',
                        isActive
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            className="pressable flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
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
