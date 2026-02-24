'use client'

import { Badge } from '@/components/ui/badge'
import { useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { useTranslations } from 'next-intl'
import {
  CodeIcon,
  MobileIcon,
  GearIcon,
  DesktopIcon,
  ArrowRightIcon,
  RocketIcon,
} from '@radix-ui/react-icons'

interface Service {
  id: string
  key: string
  title: string
  description: string
  badgeText: string
}

interface ServicesSectionProps {
  data: Service[]
}

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  web: CodeIcon,
  mobile: MobileIcon,
  backend: GearIcon,
  design: DesktopIcon
}

export function ServicesSection({ data: services }: ServicesSectionProps) {
  const t = useTranslations('services')
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, 0.1)

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section bg-secondary/20"
    >
      <div className="container-custom">
        {/* Section header - Centered */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 mb-4 text-muted-foreground">
            <RocketIcon className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm font-medium">{t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Services layout: Large card left + Grid right */}
        <div className={`grid lg:grid-cols-3 gap-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          {/* Left - Large intro card */}
          <div className="lg:row-span-2 relative overflow-hidden rounded-2xl bg-foreground dark:bg-card text-background dark:text-foreground p-8 flex flex-col justify-between min-h-[400px]">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-grid" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <span className="text-sm font-medium text-primary dark:text-primary-foreground bg-primary/20 dark:bg-primary px-3 py-1 rounded-full">
                Expertise
              </span>
            </div>

            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold">
                Ce que je peux faire pour vous
              </h3>
              <p className="text-background/70 dark:text-muted-foreground leading-relaxed">
                Des solutions digitales sur mesure, de la conception à la mise en production. Je vous accompagne dans tous vos projets web et mobile.
              </p>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-[gap,color] duration-200"
              >
                Discutons de votre projet <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right - Services grid (2x2) */}
          {services.map((service) => {
            const Icon = serviceIcons[service.key] || CodeIcon
            return (
              <div
                key={service.id}
                className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-[border-color,box-shadow] duration-300"
              >
                {/* Service content */}
                <div className="space-y-4">
                  {/* Icon + Title row */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom row: Badge + Icon */}
                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="secondary" className="text-xs">
                      {service.badgeText}
                    </Badge>
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Hover line indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
