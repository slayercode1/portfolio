import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

interface Project {
  category: string
  description: string
  hasLiveUrl: boolean
  image: string
  subtitle: string
  technologies: string[]
  title: string
  websiteUrl: string | null
}

interface ProjectsSectionProps {
  data: Project[]
}

interface ProjectItemProps {
  featured: boolean
  project: Project
}

function ProjectItem({ featured, project }: ProjectItemProps) {
  const hasWebsite = project.hasLiveUrl && Boolean(project.websiteUrl)

  return (
    <article className={cn('group', featured && 'sm:col-span-2')}>
      <div
        className={cn(
          'relative overflow-hidden bg-muted',
          featured ? 'aspect-[16/10] sm:aspect-[16/7]' : 'aspect-[16/10]'
        )}
      >
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-highlight" aria-hidden="true" />
          {project.category}
        </span>

        {project.image ? (
          <Image
            src={project.image}
            alt={`Aperçu du projet ${project.title}`}
            fill
            sizes={featured ? '(max-width: 768px) calc(100vw - 40px), 1120px' : '(max-width: 640px) calc(100vw - 40px), 550px'}
            loading="lazy"
            className={cn(
              'object-cover object-top transition-transform duration-200 ease-out',
              hasWebsite && 'group-hover:scale-[1.012]'
            )}
          />
        ) : (
          <div className="flex h-full items-end p-7 sm:p-10" aria-hidden="true">
            <p className="text-5xl font-semibold tracking-[-0.06em] text-muted-foreground/45 sm:text-7xl">
              {project.title}
            </p>
          </div>
        )}
      </div>

      <div className={cn('mt-5', featured && 'max-w-3xl')}>
        {project.subtitle ? (
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {project.subtitle}
          </p>
        ) : null}

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

        <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
          {project.description}
        </p>

        {project.technologies.length > 0 ? (
          <p className="mt-4 text-xs font-medium leading-6 text-muted-foreground/75">
            {project.technologies.join('  ·  ')}
          </p>
        ) : null}
      </div>
    </article>
  )
}

export function ProjectsSection({ data: projects }: ProjectsSectionProps) {
  if (projects.length === 0) return null

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          index="02 · Projets"
          title="Projets sélectionnés"
          description="Des produits sur lesquels j’ai réellement travaillé, de la plateforme métier à l’outil desktop."
        />

        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectItem key={project.title} project={project} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
