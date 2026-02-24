import { Suspense } from 'react'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { ServicesSection } from '@/components/sections/services-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ContactSection } from '@/components/sections/contact-section'
import { ScrollLogo } from '@/components/project/scroll-logo'
import {
  getHeroSection,
  getAboutSection,
  getTechnologies,
  getServices,
  getProjects,
  getContactSection,
  getSocialLinks,
  getScrollLogos
} from '@/lib/db/queries'
import { JsonLd } from '@/components/seo/json-ld'

export const revalidate = 60

export default async function HomePage() {
  const [hero, about, technologies, services, projects, contact, socials, scrollLogos] = await Promise.all([
    getHeroSection('fr'),
    getAboutSection('fr'),
    getTechnologies(),
    getServices('fr'),
    getProjects(),
    getContactSection('fr'),
    getSocialLinks(),
    getScrollLogos()
  ])

  if (!hero || !about || !contact) {
    return <div>Loading...</div>
  }

  return (
    <>
      <JsonLd />

      <HeroSection data={hero} />

      <section className="py-12 border-y border-border/50 bg-secondary/20">
        <div className="container-custom">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Technologies
          </p>
          <ScrollLogo data={scrollLogos} />
        </div>
      </section>

      <AboutSection data={{ ...about, technologies }} />

      <ServicesSection data={services} />

      <Suspense>
        <ProjectsSection data={projects} />
      </Suspense>

      <ContactSection data={{ ...contact, socials }} />
    </>
  )
}
