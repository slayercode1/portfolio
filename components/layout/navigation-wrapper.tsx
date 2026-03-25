'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from './navigation'
import { useEffect, useState } from 'react'

export function NavigationWrapper() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/ctrl-9f3k2x')) {
    return null
  }

  // Wait for LocaleProvider to be ready before rendering Navigation
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-transparent">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div className="h-8 w-[100px]" />
          </div>
        </div>
      </nav>
    )
  }

  return <Navigation />
}
