'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from './navigation'

export function NavigationWrapper() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/ctrl-9f3k2x')) {
    return null
  }

  return <Navigation />
}
