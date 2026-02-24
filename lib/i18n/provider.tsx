'use client'

import { NextIntlClientProvider } from 'next-intl'
import { createContext, use, useState, useEffect, ReactNode } from 'react'
import en from '@/messages/en.json'
import fr from '@/messages/fr.json'

const messages = { en, fr } as const
type Locale = keyof typeof messages

const STORAGE_KEY = 'portfolio-locale'
const DEFAULT_LOCALE: Locale = 'fr'
const TIME_ZONE = 'Europe/Paris'

// Cache localStorage read to avoid repeated access
let cachedLocale: Locale | null = null

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function useLocale() {
  const context = use(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Use cached value if available, otherwise read from localStorage
    if (cachedLocale === null) {
      cachedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null
    }

    if (cachedLocale && (cachedLocale === 'en' || cachedLocale === 'fr')) {
      setLocaleState(cachedLocale)
    }
    setMounted(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    cachedLocale = newLocale // Update cache
    localStorage.setItem(STORAGE_KEY, newLocale)
  }

  if (!mounted) {
    return (
      <NextIntlClientProvider locale={DEFAULT_LOCALE} messages={messages[DEFAULT_LOCALE]} timeZone={TIME_ZONE}>
        {children}
      </NextIntlClientProvider>
    )
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone={TIME_ZONE}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}
