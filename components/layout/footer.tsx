'use client'

import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/lib/data/projects"
import {
  ArrowUpIcon,
  HeartFilledIcon
} from "@radix-ui/react-icons"
import Image from "next/image"
import { NAV_LINKS, SOCIAL_ICONS, scrollToSection } from "@/lib/constants"

export function Footer() {
  const t = useTranslations()
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container-custom">

        <div className="py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Image
              src="/images/logo.png"
              width={120}
              height={48}
              alt="Yann Clain Logo"
              className="h-10 w-auto"
            />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
          </div>


          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer.navigation')}
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer.socials')}
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon]
                if (!Icon) return null
                return (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                      {social.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>


          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t('footer.legal_notice')}
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t('footer.privacy_policy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>


        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Yann Clain. {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              {t('footer.credit')} <HeartFilledIcon className="w-4 h-4 text-red-500" />
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="gap-2"
            >
              <ArrowUpIcon className="w-4 h-4" />
              {t('footer.back_to_top')}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
