import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { NavigationWrapper } from '@/components/layout/navigation-wrapper'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'
import { SITE_URL } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Yann Clain | Développeur Web & Mobile',
    template: '%s | Yann Clain',
  },
  description: "J'aide les entreprises et les porteurs de projet à transformer leurs processus complexes en applications web et mobile simples, rapides et faciles à maintenir.",
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
    description: "Je transforme les processus complexes en applications web et mobile simples, rapides et faciles à maintenir.",
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Yann Clain | Développeur Web & Mobile',
    description: "Je transforme les processus complexes en applications web et mobile simples, rapides et faciles à maintenir.",
    creator: '@YannLeDev',
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
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#FAFAFA" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1C1C1C" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
            Aller au contenu principal
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
      </body>
    </html>
  )
}
