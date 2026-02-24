import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { NavigationWrapper } from '@/components/layout/navigation-wrapper'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'
import { LocaleProvider } from '@/lib/i18n/provider'
import { SITE_URL } from '@/lib/constants'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Yann Clain | Développeur Web & Mobile',
    template: '%s | Yann Clain',
  },
  description: "Développeur web & mobile passionné par la création d'applications performantes et innovantes. Spécialisé React, Next.js, TypeScript et Node.js.",
  keywords: ['développeur web', 'développeur mobile', 'React', 'Next.js', 'TypeScript', 'Node.js', 'portfolio', 'Yann Clain', 'freelance', 'full-stack'],
  authors: [{ name: 'Yann Clain', url: SITE_URL }],
  creator: 'Yann Clain',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Yann Clain | Développeur Web & Mobile',
    siteName: 'Yann Clain Portfolio',
    url: SITE_URL,
    description: "Développeur web & mobile passionné par la création d'applications performantes et innovantes.",
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Yann Clain - Développeur Web & Mobile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yann Clain | Développeur Web & Mobile',
    description: "Développeur web & mobile passionné par la création d'applications performantes et innovantes.",
    creator: '@YannLeDev',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#FAFBFC" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0D1117" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <LocaleProvider>
          <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
              Skip to main content
            </a>
            <div className="relative flex min-h-screen flex-col">
              <NavigationWrapper />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
