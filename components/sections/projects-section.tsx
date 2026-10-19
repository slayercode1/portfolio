import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/section-heading'
import { ProjectHoverVideo } from '@/components/ui/marketing-video'
import { cn } from '@/lib/utils'

interface Project {
  category: string
  description: string
  hasLiveUrl: boolean
  image: string
  subtitle: string
  technologies: string[]
  title: string
  video: string
  websiteUrl: string | null
}

interface ProjectsSectionProps {
  data: Project[]
}

interface ProjectItemProps {
  featured: boolean
  index: number
  project: Project
  reversed: boolean
}

function ProjectItem({ featured, index, project, reversed }: ProjectItemProps) {
  const hasWebsite = project.hasLiveUrl && Boolean(project.websiteUrl)

  return (
    <article
      className={cn(
        'group',
        featured && 'sm:col-span-2 lg:grid lg:items-center lg:gap-12',
        featured && (reversed ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]' : 'lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]')
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-muted ring-1 ring-inset ring-border/60',
          featured ? 'aspect-[16/10] sm:aspect-[2/1] lg:aspect-[16/10]' : 'aspect-[16/10]',
          featured && reversed && 'lg:order-2'
        )}
      >
        <span className="material absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-foreground backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-highlight" aria-hidden="true" />
          {project.category}
        </span>

        {hasWebsite ? (
          <span
            className="material absolute bottom-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 max-sm:opacity-100"
            aria-hidden="true"
          >
            <ArrowTopRightIcon className="h-4 w-4" />
          </span>
        ) : null}

        {project.image ? (
          <Image
            src={project.image}
            alt={`Aperçu du projet ${project.title}`}
            fill
            sizes={featured ? '(max-width: 1024px) calc(100vw - 64px), 720px' : '(max-width: 640px) calc(100vw - 40px), 600px'}
            loading="lazy"
            className={cn(
              'object-cover object-top transition-transform duration-500 ease-out',
              hasWebsite && 'group-hover:scale-[1.015]'
            )}
          />
        ) : (
          <div className="flex h-full items-end p-7 sm:p-10" aria-hidden="true">
            <p className="text-5xl font-semibold tracking-[-0.06em] text-muted-foreground/45 sm:text-7xl">
              {project.title}
            </p>
          </div>
        )}

        {project.video ? (
          <ProjectHoverVideo src={project.video} />
        ) : null}

        {hasWebsite ? (
          <a
            href={project.websiteUrl ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-[6] rounded-2xl"
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : null}
      </div>

      <div className={cn('mt-5', featured && 'max-w-3xl lg:mt-0')}>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <span className="text-highlight">{String(index + 1).padStart(2, '0')}</span>
          {project.subtitle ? <span> · {project.subtitle}</span> : null}
        </p>

        <h3 className={cn('mt-2 font-semibold tracking-[-0.035em] text-foreground', featured ? 'text-3xl' : 'text-2xl')}>
          {hasWebsite ? (
            <a
              href={project.websiteUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
            >
              {project.title}
              <ArrowTopRightIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Voir le site</span>
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-3 text-[0.9375rem] leading-7 text-muted-foreground">
          {project.description}
        </p>

        {project.technologies.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Technologies du projet ${project.title}`}>
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-border/80 px-2.5 py-1 text-[0.6875rem] font-medium text-muted-foreground"
              >
                {technology}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

// Le premier projet est mis en avant ; le dernier aussi s'il resterait seul sur sa ligne.
function isFeatured(index: number, total: number) {
  const lastIsAlone = (total - 1) % 2 === 1
  return index === 0 || (lastIsAlone && index === total - 1)
}

export function ProjectsSection({ data: projects }: ProjectsSectionProps) {
  if (projects.length === 0) return null

  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          index="02 · Projets"
          title="Projets sélectionnés"
          description="Des problèmes concrets transformés en produits simples, de la plateforme métier à l’outil desktop."
        />

        <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.title}
              project={project}
              index={index}
              featured={isFeatured(index, projects.length)}
              reversed={index > 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
