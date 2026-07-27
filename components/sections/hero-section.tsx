interface HeroData {
  name: string
  title: string
  description: string
  statement: string
  ctaProjects: string
  ctaContact: string
  availability: string
}

interface SocialLink {
  name: string
  url: string
}

interface HeroSectionProps {
  data: HeroData
  socials: SocialLink[]
}

export function HeroSection({ data, socials }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-svh overflow-hidden pb-10 pt-28 sm:pt-32">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <p
        className="pointer-events-none absolute -right-8 top-20 hidden select-none text-[clamp(8rem,18vw,17rem)] font-semibold leading-none tracking-[-0.08em] text-foreground/[0.025] lg:block"
        aria-hidden="true"
      >
        01
      </p>

      <div className="section-shell relative flex min-h-[calc(100svh-10.5rem)] flex-col justify-between">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.65fr)] lg:gap-20">
          <div>
            <p className="flex w-fit items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-highlight" aria-hidden="true" />
              {data.availability}
            </p>

            <p className="mt-9 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              {data.name}
            </p>

            <h1 className="mt-5 max-w-4xl text-[clamp(3.4rem,7.6vw,7rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-foreground">
              {data.statement}
            </h1>
          </div>

          <div className="max-w-md lg:pt-28">
            <p className="text-lg font-medium leading-7 text-foreground">
              {data.title}
            </p>
            <p className="mt-5 text-[15px] leading-7 text-muted-foreground">
              {data.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex h-10 cursor-pointer items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
              >
                {data.ctaProjects}
                <span className="ml-2" aria-hidden="true">↓</span>
              </a>
              <a
                href="#contact"
                className="inline-flex h-10 cursor-pointer items-center rounded-md px-2 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {data.ctaContact}
                <span className="ml-2" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Réseaux sociaux">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {social.name} ↗
              </a>
            ))}
          </nav>

          <a
            href="#about"
            className="w-fit cursor-pointer font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Défiler pour découvrir <span className="ml-2" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
