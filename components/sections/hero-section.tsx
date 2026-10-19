import { AmbientScene } from '@/components/visuals/ambient-scene'

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
    <section id="home" className="relative min-h-svh overflow-hidden pb-8 pt-24 sm:pt-28">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[64%] bg-gradient-to-r from-background via-background/90 to-transparent lg:block"
        aria-hidden="true"
      />
      <AmbientScene
        variant="hero"
        className="absolute -right-24 top-36 hidden h-[30rem] w-[30rem] opacity-60 md:block lg:-right-12 lg:h-[34rem] lg:w-[34rem] xl:right-2"
      />
      <p
        className="pointer-events-none absolute -right-8 top-20 hidden select-none text-[clamp(8rem,18vw,17rem)] font-semibold leading-none tracking-[-0.08em] text-foreground/[0.025] lg:block"
        aria-hidden="true"
      >
        01
      </p>

      <div className="section-shell relative z-10 flex min-h-[calc(100svh-8rem)] flex-col justify-between">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.6fr)] lg:gap-14">
          <div>
            <p className="material inline-flex w-fit items-center gap-2.5 rounded-full border border-border/80 bg-surface/60 py-1.5 pl-3 pr-3.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.08em] sm:text-[0.6875rem] sm:tracking-[0.12em] text-muted-foreground backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-highlight" />
              </span>
              {data.availability}
            </p>

            <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              {data.name}
            </p>

            <h1 className="mt-5 max-w-4xl text-[clamp(2.5rem,min(5.4vw,10svh),5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-foreground">
              {data.statement}
            </h1>
          </div>

          <div className="material relative max-w-md lg:ml-auto lg:mt-10 lg:rounded-2xl lg:border lg:border-border/60 lg:bg-background/75 lg:p-6 lg:backdrop-blur-xl">
            <p className="text-lg font-medium leading-7 text-foreground">
              {data.title}
            </p>
            <p className="mt-5 text-[0.9375rem] leading-7 text-foreground/75">
              {data.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex h-10 cursor-pointer items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground pressable hover:bg-primary/85"
              >
                {data.ctaProjects}
                <span className="ml-2 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true">↓</span>
              </a>
              <a
                href="#contact"
                className="group inline-flex h-10 cursor-pointer items-center rounded-full border border-border px-5 text-sm font-semibold text-muted-foreground pressable hover:border-foreground/30 hover:text-foreground"
              >
                {data.ctaContact}
                <span className="ml-2 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6" aria-label="Réseaux sociaux">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex min-h-10 cursor-pointer items-center text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                {social.name} ↗
              </a>
            ))}
          </nav>

          <a
            href="#about"
            className="w-fit cursor-pointer font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground pressable hover:text-foreground"
          >
            Défiler pour découvrir <span className="ml-2" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
