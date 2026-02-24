'use client'

import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  Cross2Icon,
  ZoomInIcon,
  ZoomOutIcon,
  ResetIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import dynamic from 'next/dynamic'

const TransformWrapper = dynamic(
  () => import('react-zoom-pan-pinch').then(m => m.TransformWrapper),
  { ssr: false }
)
const TransformComponent = dynamic(
  () => import('react-zoom-pan-pinch').then(m => m.TransformComponent),
  { ssr: false }
)

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  technologies: string[]
  category: string
  websiteUrl: string | null
  hasLiveUrl: boolean
}

interface ProjectsSectionProps {
  data: Project[]
}

export function ProjectsSection({ data: projects }: ProjectsSectionProps) {
  const t = useTranslations('projects')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, 0.1)
  const [activeProject, setActiveProject] = useState(() => {
    const param = searchParams.get('project')
    if (!param) return 0
    const idx = parseInt(param, 10)
    return !isNaN(idx) && idx >= 0 && idx < projects.length ? idx : 0
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (index: number) => {
    setActiveProject(index)
    // Update URL with active project
    const params = new URLSearchParams(searchParams.toString())
    params.set('project', index.toString())
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const openImageModal = () => {
    setIsModalOpen(true)
  }

  if (projects.length === 0) {
    return (
      <section ref={sectionRef} id="projects" className="section">
        <div className="container-custom">
          <div className="animate-pulse space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-32"></div>
                <div className="h-16 bg-muted rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const currentProject = projects[activeProject]

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section"
    >
      <div className="container-custom">
        {/* Section header - Split layout */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Left - Badge + Title */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary">✦</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {t('badge')}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {t('title')}
            </h2>
          </div>

          {/* Right - Description + CTA */}
          <div className="flex flex-col justify-center lg:items-end">
            <p className="text-lg text-muted-foreground mb-6 lg:text-right max-w-md">
              {t('description')}
            </p>
            <Button
              size="lg"
              className="btn-primary w-fit"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Me Contacter
            </Button>
          </div>
        </div>

        {/* Projects accordion + Preview */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          {/* Left - Accordion list */}
          <div className="space-y-0">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`border-b border-border transition-colors duration-300 ${
                  activeProject === index ? 'bg-secondary/30' : ''
                }`}
              >
                {/* Accordion header */}
                <button
                  onClick={() => handleProjectClick(index)}
                  aria-expanded={activeProject === index}
                  className="w-full py-5 px-4 flex items-center justify-between text-left hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold transition-colors ${
                      activeProject === index ? 'text-foreground' : 'text-foreground/80'
                    }`}>
                      {project.title}
                    </h3>

                    {/* Expanded content */}
                    <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                      activeProject === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      {project.hasLiveUrl && project.websiteUrl && (
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t('view_site')} <ExternalLinkIcon className="w-3 h-3" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-4 ${
                      activeProject === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Progress bar for active item */}
                {activeProject === index && (
                  <div className="h-1 bg-primary/20">
                    <div className="h-full bg-primary w-1/3 rounded-r" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right - Project preview */}
          <div className="relative lg:sticky lg:top-24">
            <button
              type="button"
              aria-label={`${currentProject.title} — zoom`}
              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-secondary/50 border border-border shadow-lg cursor-zoom-in group focus-visible:ring-2 focus-visible:ring-primary"
              onClick={openImageModal}
            >
              {/* Project image */}
              <Image
                src={currentProject.image}
                alt={currentProject.title}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Zoom icon overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-black/90 rounded-full p-3">
                  <MagnifyingGlassIcon className="w-6 h-6" aria-hidden="true" />
                </div>
              </div>

              {/* Overlay with tech badges */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.slice(0, 5).map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs bg-white/20 text-white border-white/20 backdrop-blur-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </button>

            {/* Project subtitle */}
            <p className="mt-4 text-sm text-muted-foreground text-center">
              {currentProject.subtitle}
            </p>
          </div>
        </div>

        {/* Image Modal with Zoom */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-background/95 backdrop-blur-md border-border overscroll-contain">
            <VisuallyHidden>
              <DialogTitle>{currentProject.title}</DialogTitle>
            </VisuallyHidden>

            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  {/* Controls */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => zoomIn()}
                      className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    >
                      <ZoomInIcon className="w-4 h-4" />
                      <span className="sr-only">Zoom in</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => zoomOut()}
                      className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    >
                      <ZoomOutIcon className="w-4 h-4" />
                      <span className="sr-only">Zoom out</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => resetTransform()}
                      className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    >
                      <ResetIcon className="w-4 h-4" />
                      <span className="sr-only">Reset zoom</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    >
                      <Cross2Icon className="w-4 h-4" />
                      <span className="sr-only">{t('close')}</span>
                    </Button>
                  </div>

                  {/* Project title */}
                  <div className="absolute top-4 left-4 z-20">
                    <h3 className="text-lg font-semibold bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      {currentProject.title}
                    </h3>
                  </div>

                  {/* Zoomable image */}
                  <TransformComponent
                    wrapperStyle={{
                      width: '100%',
                      height: '100%',
                    }}
                    contentStyle={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center p-8">
                      <div className="relative w-full h-full">
                        <Image
                          src={currentProject.image}
                          alt={currentProject.title}
                          fill
                          className="object-contain rounded-lg shadow-2xl"
                          draggable={false}
                          sizes="(max-width: 1280px) 90vw, 1200px"
                        />
                      </div>
                    </div>
                  </TransformComponent>

                  {/* Instructions */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <p className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      Scroll pour zoomer • Glisser pour déplacer
                    </p>
                  </div>
                </>
              )}
            </TransformWrapper>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
