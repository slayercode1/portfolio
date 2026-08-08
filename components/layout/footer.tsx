import Link from 'next/link'
import { AmbientScene } from '@/components/visuals/ambient-scene'

export function Footer() {
  return (
    <footer className="relative mx-4 mb-4 mt-20 overflow-hidden rounded-2xl bg-surface sm:mx-6 sm:mb-6 sm:mt-28">
      <AmbientScene
        variant="footer"
        className="absolute -bottom-20 right-[8%] h-56 w-56 opacity-30 sm:h-64 sm:w-64"
      />
      <div className="section-shell relative z-10 flex flex-col gap-10 py-14 sm:flex-row sm:items-end sm:justify-between sm:py-16">
        <div>
          <a href="#home" className="text-sm font-semibold tracking-[-0.01em] text-foreground">
            Yann Clain
          </a>
          <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
            Des interfaces claires, pensées pour durer.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Yann Clain. Tous droits réservés.
          </p>
        </div>

        <div className="flex max-w-lg flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground sm:justify-end">
          <Link href="/mentions-legales" className="transition-colors duration-200 hover:text-primary">
            Mentions légales
          </Link>
          <Link href="/politique-de-confidentialite" className="transition-colors duration-200 hover:text-primary">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  )
}
