import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons"

export const SITE_URL = 'https://yann-dev.fr'

export const NAV_LINKS = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
] as const

export const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: LinkedInLogoIcon,
  github: GitHubLogoIcon,
  twitter: TwitterLogoIcon,
}

export const LOGIN_PATH = "/ctrl-9f3k2x"

export function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}
