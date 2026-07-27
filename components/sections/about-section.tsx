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

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading index="01 · Profil" title={data.title} description={data.description} />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {data.certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {data.certificationsTitle}
              </h3>
              <ul className="mt-5 space-y-4">
                {data.certifications.map((cert) => (
                  <li key={cert.key} className="flex gap-3 text-[15px] leading-6 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{cert.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.technologies.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {data.stackTitle}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2" aria-label={data.stackTitle}>
                {data.technologies.map((technology, index) => (
                  <li key={technology} className="flex items-center gap-3 text-sm text-muted-foreground">
                    {technology}
                    {index < data.technologies.length - 1 ? (
                      <span className="text-highlight" aria-hidden="true">·</span>
                    ) : null}
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
