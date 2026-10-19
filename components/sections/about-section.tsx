import { SectionHeading } from '@/components/ui/section-heading'

interface Certification {
  key: string
  title: string
}

interface AboutData {
  title: string
  description: string
  certificationsTitle: string
  stackTitle: string
  certifications: Certification[]
  technologies: string[]
}

interface AboutSectionProps {
  data: AboutData
}

// Sépare « Intitulé (Bac+5) » en intitulé et niveau pour les afficher sur deux colonnes.
function splitCertificationTitle(title: string) {
  const match = title.match(/^(.*?)\s*\(([^)]+)\)$/)
  return match ? { name: match[1], level: match[2] } : { name: title, level: null }
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading index="01 · Profil" title={data.title} description={data.description} />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {data.certifications.length > 0 && (
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {data.certificationsTitle}
              </h3>
              <ul className="mt-5 divide-y divide-border/70 border-y border-border/70">
                {data.certifications.map((cert) => {
                  const { name, level } = splitCertificationTitle(cert.title)

                  return (
                    <li key={cert.key} className="flex items-baseline justify-between gap-6 py-4 text-[0.9375rem] leading-6">
                      <span className="text-foreground/90">{name}</span>
                      {level ? (
                        <span className="shrink-0 font-mono text-xs font-medium text-muted-foreground">{level}</span>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {data.technologies.length > 0 && (
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {data.stackTitle}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={data.stackTitle}>
                {data.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-border/80 bg-surface/50 px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
