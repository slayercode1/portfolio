import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="section-shell flex flex-col gap-7 py-10 sm:flex-row sm:items-end sm:justify-between sm:py-12">
        <div>
          <a href="#home" className="text-sm font-semibold tracking-[-0.01em] text-foreground">
            Yann Clain
          </a>
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
