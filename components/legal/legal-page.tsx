import type { ReactNode } from 'react'

interface LegalPageProps {
  children: ReactNode
  description: string
  eyebrow: string
  title: string
}

export function LegalPage({ children, description, eyebrow, title }: LegalPageProps) {
  return (
    <section className="pb-24 pt-28 sm:pb-28 sm:pt-32">
      <div className="section-shell max-w-4xl">
        <header className="border-b border-border/70 pb-10 sm:pb-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            {description}
          </p>
          <p className="mt-6 text-xs text-muted-foreground/75">
            Dernière mise à jour : <time dateTime="2026-08-08">8 août 2026</time>
          </p>
        </header>

        <div className="mt-12 space-y-12 text-[15px] leading-7 text-muted-foreground sm:mt-16">
          {children}
        </div>
      </div>
    </section>
  )
}

export function LegalSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-[-0.025em] text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}
