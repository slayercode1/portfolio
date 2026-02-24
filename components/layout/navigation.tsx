'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { GlobeIcon, MoonIcon, SunIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useTheme } from "@/components/layout/theme-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslations } from "next-intl"
import { useLocale } from "@/lib/i18n/provider"
import { NAV_LINKS, scrollToSection } from "@/lib/constants"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Navigation() {
  const t = useTranslations()
  const [mounted, setMounted] = useState(false)
  const { locale, setLocale } = useLocale()
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = NAV_LINKS.map(link => link.key)
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLanguage = (lng: string) => {
    setLocale(lng as 'en' | 'fr')
  }

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 transition-[background-color,backdrop-filter] duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-background/60'
          : 'bg-transparent'
      }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">

          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#home')
            }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo.png"
              width={100}
              height={40}
              alt="Yann Clain Logo"
              className="h-8 w-auto"
            />
          </a>


          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={`nav-link px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.key
                    ? 'active'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </div>


          <div className="hidden md:flex items-center gap-2">

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Toggle theme">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  {t('theme.light')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  {t('theme.dark')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  {t('theme.system')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Toggle language">
                  <GlobeIcon className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage("fr")}>
                  {t('language.fr')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("en")}>
                  {t('language.en')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


            <Button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary ml-2"
            >
              {t('nav.cta')}
            </Button>
          </div>


          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Open menu">
                  <HamburgerMenuIcon className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full py-6">

                  <nav className="flex-1 space-y-2">
                    {NAV_LINKS.map((link) => (
                      <SheetClose asChild key={link.key}>
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection(link.href)
                          }}
                          className={`nav-link block w-full text-left px-4 py-3 rounded-full text-base font-medium transition-colors duration-200 ${
                            activeSection === link.key
                              ? 'active'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                          }`}
                        >
                          {t(`nav.${link.key}`)}
                        </a>
                      </SheetClose>
                    ))}
                  </nav>


                  <div className="space-y-4 pt-6 border-t border-border">

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Theme
                      </label>
                      <Select onValueChange={(value) => setTheme(value)} defaultValue={theme}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">{t('theme.light')}</SelectItem>
                          <SelectItem value="dark">{t('theme.dark')}</SelectItem>
                          <SelectItem value="system">{t('theme.system')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>


                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Language
                      </label>
                      <Select onValueChange={(value) => changeLanguage(value)} defaultValue={locale}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">{t('language.fr')}</SelectItem>
                          <SelectItem value="en">{t('language.en')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

        
                    <SheetClose asChild>
                      <Button
                        onClick={() => scrollToSection('#contact')}
                        className="w-full btn-primary"
                      >
                        {t('nav.cta')}
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
